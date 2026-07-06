import { Link } from "wouter";
import { cards } from "@/data";
import { useState, useMemo } from "react";
import SEO from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Cards() {
  const [filter, setFilter] = useState<"all" | "major" | "wands" | "cups" | "swords" | "pentacles">("all");

  const suitFilter = useMemo(() => {
    if (filter === "all") return cards;
    if (filter === "major") return cards.filter(c => c.arcana.startsWith("Major"));
    const suitMap: Record<string, string> = { wands: "wands", cups: "cups", swords: "swords", pentacles: "pentacles" };
    return cards.filter(c => c.slug.includes(suitMap[filter] || ""));
  }, [filter]);

  return (
    <>
      <SEO 
        title="Tarot Card Meanings"
        description="Explore the full 78-card tarot deck. Find meanings, keywords, crystal pairings, and journal prompts for every Major and Minor Arcana card."
        canonical="/cards"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://thesoftheartcollective.com/" },
        { name: "Tarot Cards", url: "https://thesoftheartcollective.com/cards" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          The 78 Cards
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-8" style={{ color: "var(--ww-body)" }}>
          Explore the full tarot deck — meanings, crystal pairings, journal prompts, and suggested spreads for every card.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["all", "major", "wands", "cups", "swords", "pentacles"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${
                filter === f ? "text-[var(--ww-deep)]" : "text-[var(--ww-body)]"
              }`}
              style={filter === f ? { background: "var(--ww-gold)" } : { background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              {f === "all" ? "All Cards" : f === "major" ? "Major Arcana" : f}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {suitFilter.map((card) => (
            <Link
              key={card.slug}
              href={`/cards/${card.slug}`}
              className="p-4 rounded-xl no-underline transition-transform hover:scale-[1.02]"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--ww-muted)" }}>
                {card.arcana}
              </p>
              <h3 className="text-lg mb-2" style={{ color: "var(--ww-cream)" }}>
                {card.name}
              </h3>
              <p className="text-xs line-clamp-2" style={{ color: "var(--ww-body)" }}>
                {card.meaning}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
