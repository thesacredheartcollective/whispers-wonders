import { useParams, Link } from "wouter";
import { cards, spreads } from "@/data";
import SEO from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function CardDetail() {
  const { slug } = useParams<{ slug: string }>();
  const card = cards.find((c) => c.slug === slug);

  if (!card) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl mb-4" style={{ color: "var(--ww-cream)" }}>Card Not Found</h1>
        <Link href="/cards" className="no-underline" style={{ color: "var(--ww-gold)" }}>← Back to all cards</Link>
      </div>
    );
  }

  const relatedCards = cards.filter((c) => card.related.includes(c.slug));
  const suggestedSpreads = spreads.filter((s) => card.spreads.includes(s.slug));

  return (
    <>
      <SEO 
        title={card.name}
        description={`Learn the meaning, keywords, crystal pairings, and journal prompts for ${card.name} tarot card. Explore its significance in upright and reversed positions.`}
        canonical={`/cards/${card.slug}`}
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://thesoftheartcollective.com/" },
        { name: "Tarot Cards", url: "https://thesoftheartcollective.com/cards" },
        { name: card.name, url: `https://thesoftheartcollective.com/cards/${card.slug}` },
      ]} />
      <div className="container py-12 max-w-3xl mx-auto">
        <Link href="/cards" className="text-sm no-underline mb-6 inline-block" style={{ color: "var(--ww-gold)" }}>
          ← All Cards
        </Link>

        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ww-muted)" }}>
          {card.arcana}
        </p>
        <h1 className="text-4xl md:text-5xl mb-4" style={{ color: "var(--ww-cream)" }}>
          {card.name}
        </h1>

        {/* Visual Description */}
        <div className="p-4 rounded-xl mb-8" style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}>
          <p className="text-sm italic" style={{ color: "var(--ww-body)" }}>
            {card.icon}
          </p>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-8">
          {card.keywords.map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 rounded-full text-xs"
              style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
            >
              {kw}
            </span>
          ))}
        </div>

        {/* Upright Meaning */}
        <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Upright Meaning</h2>
        <div className="mb-8 leading-relaxed" style={{ color: "var(--ww-body)" }}>
          {card.meaning.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>

        {/* Reversed Meaning */}
        {card.reversed && (
          <>
            <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Reversed Meaning</h2>
            <div className="mb-8 leading-relaxed" style={{ color: "var(--ww-body)" }}>
              {card.reversed.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </>
        )}

        {/* Deeper Exploration */}
        <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Deeper Exploration</h2>
        <div className="mb-8 leading-relaxed" style={{ color: "var(--ww-body)" }}>
          <p className="mb-3">
            When {card.name} appears in a reading, it invites you to pause and consider the themes of{" "}
            {card.keywords.slice(0, 3).join(", ")} in your current life circumstances. This card does not predict a fixed outcome — rather, it illuminates the energies at play and empowers you to work with them consciously.
          </p>
          <p className="mb-3">
            In its upright position, {card.name} encourages you to lean into its core message. In reversal, it gently asks whether you might be resisting or overexpressing these same qualities. Neither position is inherently good or bad — both offer valuable insight when approached with curiosity rather than fear.
          </p>
          <p>
            Consider pulling this card alongside its related cards for a richer understanding of the narrative your deck is weaving. Journal with the prompt below to deepen your personal relationship with {card.name} over time.
          </p>
        </div>

        {/* Affirmation */}
        <div className="p-5 rounded-xl mb-8" style={{ background: "var(--ww-gold-dim)", borderLeft: "3px solid var(--ww-gold)" }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ww-gold)" }}>Affirmation</p>
          <p className="text-lg italic" style={{ color: "var(--ww-cream)" }}>
            "{card.affirmation}"
          </p>
        </div>

        {/* Journal Prompt */}
        <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Journal Prompt</h2>
        <p className="mb-8 italic leading-relaxed" style={{ color: "var(--ww-body)" }}>
          {card.journal}
        </p>

        {/* Crystal Pairings */}
        <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Crystal Pairings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl" style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--ww-cream)" }}>
              {card.crystalPrimary.name}
            </p>
            <p className="text-xs" style={{ color: "var(--ww-muted)" }}>
              {card.crystalPrimary.property}
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--ww-cream)" }}>
              {card.crystalSecondary.name}
            </p>
            <p className="text-xs" style={{ color: "var(--ww-muted)" }}>
              {card.crystalSecondary.property}
            </p>
          </div>
        </div>

        {/* Suggested Spreads */}
        {suggestedSpreads.length > 0 && (
          <>
            <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Suggested Spreads</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {suggestedSpreads.map((s) => (
                <Link
                  key={s.slug}
                  href="/spreads"
                  className="px-3 py-1.5 rounded-full text-xs no-underline"
                  style={{ background: "var(--ww-card)", color: "var(--ww-body)", border: "1px solid var(--ww-divider)" }}
                >
                  {s.name} ({s.cardCount})
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Related Cards */}
        {relatedCards.length > 0 && (
          <>
            <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Related Cards</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedCards.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/cards/${rc.slug}`}
                  className="p-3 rounded-lg no-underline"
                  style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
                >
                  <p className="text-sm" style={{ color: "var(--ww-cream)" }}>{rc.name}</p>
                  <p className="text-xs" style={{ color: "var(--ww-muted)" }}>{rc.arcana}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
