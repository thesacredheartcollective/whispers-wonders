import { Link } from "wouter";
import { blogPosts } from "@/data";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Blog() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Blog", url: "https://www.thesoftheartcollective.com/blog" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Blog
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-10" style={{ color: "var(--ww-body)" }}>
          Long-form guides for your tarot and spiritual practice, written by Kenya Ferguson.
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl no-underline transition-transform hover:scale-[1.01]"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl mb-2" style={{ color: "var(--ww-cream)" }}>
                {post.title}
              </h2>
              <p className="text-sm mb-3" style={{ color: "var(--ww-body)" }}>
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--ww-muted)" }}>
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.readMinutes} min read</span>
                <span>·</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
