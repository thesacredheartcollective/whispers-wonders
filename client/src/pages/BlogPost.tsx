import { useParams, Link } from "wouter";
import { blogPosts } from "@/data";
import SEO from "@/components/SEO";
import AuthorBio from "@/components/AuthorBio";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import type { ReactElement } from "react";

function renderMarkdown(body: string) {
  // Enhanced markdown renderer supporting headings, paragraphs, lists, blockquotes, images, links, and SVG
  const lines = body.split("\n");
  const elements: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="my-6" />);
    } else if (line.startsWith("> ")) {
      elements.push(<blockquote key={i}>{line.slice(2)}</blockquote>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i}>
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\.\s*/, ""));
        i++;
      }
      elements.push(
        <ol key={i}>
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    } else if (line.startsWith("![")) {
      // Parse markdown image: ![alt text](url)
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        const [, alt, src] = imgMatch;
        if (src.endsWith(".svg")) {
          // Render SVG as an embedded image
          elements.push(
            <figure key={i} className="my-8">
              <img src={src} alt={alt} className="w-full rounded-lg" loading="lazy" />
              {alt && <figcaption className="text-sm text-center mt-2" style={{ color: "var(--ww-muted)" }}>{alt}</figcaption>}
            </figure>
          );
        } else {
          // Render regular image with lazy loading
          elements.push(
            <figure key={i} className="my-8">
              <img src={src} alt={alt} className="w-full rounded-lg" loading="lazy" />
              {alt && <figcaption className="text-sm text-center mt-2" style={{ color: "var(--ww-muted)" }}>{alt}</figcaption>}
            </figure>
          );
        }
      }
    } else if (line.trim()) {
      elements.push(<p key={i}>{renderInlineMarkdown(line)}</p>);
    }
    i++;
  }
  return elements;
}

function renderInlineMarkdown(text: string): ReactElement | string {
  // Parse inline markdown: bold, links, etc.
  const parts: (ReactElement | string)[] = [];
  let lastIndex = 0;

  // Match bold text: **text**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let boldMatch;
  const boldMatches: Array<{ index: number; length: number; text: string }> = [];
  while ((boldMatch = boldRegex.exec(text)) !== null) {
    boldMatches.push({
      index: boldMatch.index,
      length: boldMatch[0].length,
      text: boldMatch[1],
    });
  }

  // Match links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let linkMatch;
  const linkMatches: Array<{ index: number; length: number; text: string; url: string }> = [];
  while ((linkMatch = linkRegex.exec(text)) !== null) {
    linkMatches.push({
      index: linkMatch.index,
      length: linkMatch[0].length,
      text: linkMatch[1],
      url: linkMatch[2],
    });
  }

  // Combine and sort all matches
  const allMatches = [
    ...boldMatches.map((m) => ({ ...m, type: "bold" })),
    ...linkMatches.map((m) => ({ ...m, type: "link" })),
  ].sort((a, b) => a.index - b.index);

  // Process matches
  for (const match of allMatches) {
    if (match.index >= lastIndex) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add match
      if (match.type === "bold") {
        parts.push(
          <strong key={`bold-${match.index}`}>{match.text}</strong>
        );
      } else if (match.type === "link") {
        const url = (match as any).url;
        if (url.startsWith("/")) {
          parts.push(
            <Link key={`link-${match.index}`} href={url} className="no-underline" style={{ color: "var(--ww-gold)" }}>
              {match.text}
            </Link>
          );
        } else {
          parts.push(
            <a key={`link-${match.index}`} href={url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ww-gold)" }}>
              {match.text}
            </a>
          );
        }
      }

      lastIndex = match.index + match.length;
    }
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl mb-4" style={{ color: "var(--ww-cream)" }}>Post Not Found</h1>
        <Link href="/blog" className="no-underline" style={{ color: "var(--ww-gold)" }}>← Back to blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        datePublished={post.date}
        wordCount={post.body.split(/\s+/).length}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://thesoftheartcollective.com/" },
        { name: "Blog", url: "https://thesoftheartcollective.com/blog" },
        { name: post.title, url: `https://thesoftheartcollective.com/blog/${post.slug}` },
      ]} />
      <article className="container py-12 max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm no-underline mb-6 inline-block" style={{ color: "var(--ww-gold)" }}>
          ← All Posts
        </Link>

        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}>
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl mb-4" style={{ color: "var(--ww-cream)" }}>
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm mb-10" style={{ color: "var(--ww-muted)" }}>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>

        <div className="prose-ww">
          {renderMarkdown(post.body)}
        </div>

        {/* Author Bio */}
        <AuthorBio />
      </article>
    </>
  );
}
