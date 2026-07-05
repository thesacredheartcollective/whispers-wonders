import { sacredSpaces } from "@/data";
import { useState } from "react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function SacredSpaces() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Sacred Spaces", url: "https://www.thesoftheartcollective.com/sacred-spaces" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Sacred Spaces
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-10" style={{ color: "var(--ww-body)" }}>
          Six natural sanctuaries in the Tampa Bay area for meditation, ritual, grounding, and spiritual renewal.
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {sacredSpaces.map((space) => (
            <div
              key={space.id}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <div className="p-6">
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--ww-muted)" }}>
                  {space.city}, {space.county} County
                </span>
                <h2 className="text-xl mt-1 mb-3" style={{ color: "var(--ww-cream)" }}>
                  {space.name}
                </h2>
                <p className="text-sm mb-3" style={{ color: "var(--ww-body)" }}>
                  {space.significance}
                </p>
                <p className="text-sm mb-2" style={{ color: "var(--ww-gold)" }}>
                  Best time: {space.bestTime}
                </p>
                <p className="text-sm italic mb-4" style={{ color: "var(--ww-muted)" }}>
                  Ritual: {space.ritual}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setExpanded(expanded === space.id ? null : space.id)}
                    className="text-sm cursor-pointer bg-transparent border-0"
                    style={{ color: "var(--ww-gold)" }}
                  >
                    {expanded === space.id ? "Show less ↑" : "Full visitor guide ↓"}
                  </button>
                  <a
                    href={space.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm no-underline"
                    style={{ color: "var(--ww-sage)" }}
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>

              {expanded === space.id && (
                <div className="px-6 pb-6 border-t" style={{ borderColor: "var(--ww-divider)" }}>
                  <div className="pt-4 prose-ww text-sm" style={{ color: "var(--ww-body)" }}>
                    {space.fullDescription.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-3">{para}</p>
                    ))}
                  </div>

                  <h3 className="text-lg mt-6 mb-2" style={{ color: "var(--ww-cream)" }}>Accessibility</h3>
                  <p className="text-sm" style={{ color: "var(--ww-body)" }}>{space.accessibility}</p>

                  <h3 className="text-lg mt-6 mb-2" style={{ color: "var(--ww-cream)" }}>Practical Tips</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1" style={{ color: "var(--ww-body)" }}>
                    {space.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
