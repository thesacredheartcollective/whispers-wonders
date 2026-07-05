import { useParams, Link } from "wouter";
import { blogPosts } from "@/data";
import AuthorBio from "@/components/AuthorBio";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import type { ReactElement } from "react";

function renderMarkdown(body: string) {
  // Simple markdown renderer for headings, paragraphs, lists, blockquotes
  const lines = body.split("\n");
  const elements: ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
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
          {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
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
          {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
        </ol>
      );
      continue;
    } else if (line.trim()) {
      elements.push(<p key={i}>{line}</p>);
    }
    i++;
  }
  return elements;
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
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        datePublished={post.date}
        wordCount={post.body.split(/\s+/).length}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Blog", url: "https://www.thesoftheartcollective.com/blog" },
        { name: post.title, url: `https://www.thesoftheartcollective.com/blog/${post.slug}` },
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
