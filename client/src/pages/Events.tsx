import { events } from "@/data";
import { useState } from "react";
import SEO from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Events() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <SEO 
        title="Events & Gatherings"
        description="Discover spiritual events, workshops, and community gatherings in Tampa Bay. Find visitor guides, accessibility info, and practical tips for each event."
        canonical="/events"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://thesoftheartcollective.com/" },
        { name: "Events", url: "https://thesoftheartcollective.com/events" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Events & Gatherings
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-10" style={{ color: "var(--ww-body)" }}>
          Recurring spiritual events, workshops, and community gatherings throughout the Tampa Bay area. All events welcome newcomers.
        </p>

        <div className="max-w-3xl mx-auto space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs uppercase tracking-widest" style={{ color: "var(--ww-muted)" }}>
                      {event.category} · {event.city}
                    </span>
                    <h2 className="text-xl mt-1" style={{ color: "var(--ww-cream)" }}>
                      {event.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm mb-2" style={{ color: "var(--ww-gold)" }}>{event.cadence}</p>
                <p className="text-sm mb-2" style={{ color: "var(--ww-muted)" }}>{event.location}</p>
                <p className="text-sm mb-4" style={{ color: "var(--ww-body)" }}>{event.description}</p>

                <button
                  onClick={() => setExpanded(expanded === event.id ? null : event.id)}
                  className="text-sm no-underline cursor-pointer bg-transparent border-0"
                  style={{ color: "var(--ww-gold)" }}
                >
                  {expanded === event.id ? "Show less ↑" : "Read full guide ↓"}
                </button>
              </div>

              {expanded === event.id && (
                <div className="px-6 pb-6 border-t" style={{ borderColor: "var(--ww-divider)" }}>
                  <div className="pt-4 prose-ww text-sm" style={{ color: "var(--ww-body)" }}>
                    {event.fullDescription.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-3">{para}</p>
                    ))}
                  </div>

                  <h3 className="text-lg mt-6 mb-2" style={{ color: "var(--ww-cream)" }}>What to Bring</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1" style={{ color: "var(--ww-body)" }}>
                    {event.whatToBring.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>

                  <h3 className="text-lg mt-6 mb-2" style={{ color: "var(--ww-cream)" }}>Accessibility</h3>
                  <p className="text-sm" style={{ color: "var(--ww-body)" }}>{event.accessibility}</p>

                  <h3 className="text-lg mt-6 mb-2" style={{ color: "var(--ww-cream)" }}>Practical Tips</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1" style={{ color: "var(--ww-body)" }}>
                    {event.tips.map((tip, i) => <li key={i}>{tip}</li>)}
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
