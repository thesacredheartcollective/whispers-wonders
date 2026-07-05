import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Link } from "wouter";

const moonPhases = [
  { phase: "New Moon", energy: "Setting intentions, planting seeds, beginning new projects", spreads: ["new-moon"], ritual: "Write your intentions on paper. Light a candle and read them aloud. Place the paper on your altar until the full moon." },
  { phase: "Waxing Crescent", energy: "Taking first steps, building momentum, courage", spreads: ["three-card"], ritual: "Pull a single card each morning asking: What action supports my intention today?" },
  { phase: "First Quarter", energy: "Overcoming obstacles, making decisions, commitment", spreads: ["decision-making"], ritual: "Identify one obstacle to your new moon intention. Pull three cards for insight on how to move through it." },
  { phase: "Waxing Gibbous", energy: "Refining, adjusting, patience, trust", spreads: ["three-card"], ritual: "Review your progress. Journal on what is working and what needs adjustment. Pull a card for guidance." },
  { phase: "Full Moon", energy: "Celebration, gratitude, release, illumination", spreads: ["full-moon-release"], ritual: "Write what you are releasing on paper. Safely burn it or tear it up. Express gratitude for what the cycle has brought." },
  { phase: "Waning Gibbous", energy: "Sharing wisdom, gratitude, giving back", spreads: ["three-card"], ritual: "Share something you have learned this cycle with someone who might benefit. Pull a card for what to offer." },
  { phase: "Last Quarter", energy: "Letting go, forgiveness, clearing space", spreads: ["shadow-work"], ritual: "Clean your physical space. As you clear clutter, set the intention to release stagnant energy." },
  { phase: "Waning Crescent", energy: "Rest, surrender, dreaming, preparation", spreads: ["one-card-daily"], ritual: "Rest deeply. Avoid starting new projects. Dream, meditate, and prepare for the next new moon." },
];

export default function MoonCalendar() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Moon Calendar", url: "https://www.thesoftheartcollective.com/moon-calendar" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Moon Phase Guide
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-10" style={{ color: "var(--ww-body)" }}>
          Work with the lunar cycle to time your tarot readings, rituals, and intentions. Each phase carries distinct energy — learn to read with the moon.
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {moonPhases.map((mp) => (
            <div
              key={mp.phase}
              className="p-5 rounded-xl"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <h3 className="text-lg mb-1" style={{ color: "var(--ww-cream)" }}>{mp.phase}</h3>
              <p className="text-sm mb-2" style={{ color: "var(--ww-gold)" }}>Energy: {mp.energy}</p>
              <p className="text-sm mb-3" style={{ color: "var(--ww-body)" }}>
                <strong style={{ color: "var(--ww-cream)" }}>Ritual:</strong> {mp.ritual}
              </p>
              <div className="flex gap-2">
                {mp.spreads.map((s) => (
                  <Link
                    key={s}
                    href="/spreads"
                    className="text-xs px-2 py-0.5 rounded-full no-underline"
                    style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
                  >
                    Suggested spread →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
