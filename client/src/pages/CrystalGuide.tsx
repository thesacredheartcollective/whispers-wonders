import { cards } from "@/data";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function CrystalGuide() {
  const [search, setSearch] = useState("");

  const crystalMap = useMemo(() => {
    const map = new Map<string, { name: string; properties: Set<string>; cards: { name: string; slug: string }[] }>();
    for (const card of cards) {
      for (const crystal of [card.crystalPrimary, card.crystalSecondary]) {
        if (!map.has(crystal.name)) {
          map.set(crystal.name, { name: crystal.name, properties: new Set(), cards: [] });
        }
        const entry = map.get(crystal.name)!;
        entry.properties.add(crystal.property);
        entry.cards.push({ name: card.name, slug: card.slug });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return crystalMap;
    const q = search.toLowerCase();
    return crystalMap.filter(
      (c) => c.name.toLowerCase().includes(q) || Array.from(c.properties).some((p) => p.toLowerCase().includes(q))
    );
  }, [crystalMap, search]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Crystal Guide", url: "https://www.thesoftheartcollective.com/crystal-guide" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Crystal Pairing Guide
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-4" style={{ color: "var(--ww-body)" }}>
          Crystals and tarot are natural companions. Pair a stone with your card of the day to ground and focus your reading. Find these stones at the shops in our{" "}
          <Link href="/directory" style={{ color: "var(--ww-gold)" }}>local directory</Link>.
        </p>
        <p className="text-center text-sm mb-10" style={{ color: "var(--ww-muted)" }}>
          Showing {crystalMap.length} unique crystals paired across all 78 cards.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by crystal name or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm"
            style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
          />
        </div>

        {/* Crystal List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.map((crystal) => (
            <div
              key={crystal.name}
              className="p-5 rounded-xl"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <h3 className="text-lg mb-1" style={{ color: "var(--ww-cream)" }}>{crystal.name}</h3>
              <p className="text-sm mb-3" style={{ color: "var(--ww-muted)" }}>
                Properties: {Array.from(crystal.properties).join(", ")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {crystal.cards.slice(0, 8).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cards/${c.slug}`}
                    className="text-xs px-2 py-0.5 rounded-full no-underline"
                    style={{ background: "var(--ww-surface)", color: "var(--ww-body)" }}
                  >
                    {c.name}
                  </Link>
                ))}
                {crystal.cards.length > 8 && (
                  <span className="text-xs px-2 py-0.5" style={{ color: "var(--ww-muted)" }}>
                    +{crystal.cards.length - 8} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
