import { spreads } from "@/data";
import { useState } from "react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Spreads() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Spreads", url: "https://www.thesoftheartcollective.com/spreads" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Tarot Spreads
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-10" style={{ color: "var(--ww-body)" }}>
          Ten curated spread layouts — from a simple daily pull to the full Celtic Cross. Each includes position meanings and guidance for interpretation.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {spreads.map((spread) => (
            <div
              key={spread.slug}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg" style={{ color: "var(--ww-cream)" }}>{spread.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}>
                    {spread.cardCount} {spread.cardCount === 1 ? "card" : "cards"}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: "var(--ww-body)" }}>{spread.summary}</p>
                <p className="text-xs mb-3" style={{ color: "var(--ww-muted)" }}>Best for: {spread.bestFor}</p>
                <button
                  onClick={() => setExpanded(expanded === spread.slug ? null : spread.slug)}
                  className="text-sm cursor-pointer bg-transparent border-0"
                  style={{ color: "var(--ww-gold)" }}
                >
                  {expanded === spread.slug ? "Hide positions ↑" : "View positions ↓"}
                </button>
              </div>

              {expanded === spread.slug && spread.positions.length > 0 && (
                <div className="px-5 pb-5 border-t" style={{ borderColor: "var(--ww-divider)" }}>
                  <div className="pt-4 space-y-3">
                    {spread.positions.map((pos) => (
                      <div key={pos.n} className="flex gap-3">
                        <span className="text-sm font-semibold shrink-0 w-6" style={{ color: "var(--ww-gold)" }}>
                          {pos.n}.
                        </span>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--ww-cream)" }}>{pos.label}</p>
                          <p className="text-xs" style={{ color: "var(--ww-muted)" }}>{pos.guidance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
