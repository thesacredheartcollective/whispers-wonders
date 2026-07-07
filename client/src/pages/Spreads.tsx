import { spreads, cards } from "@/data";
import type { Card, Spread } from "@/data";
import { useState, useCallback, useMemo } from "react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

type DrawnCard = {
  card: Card;
  reversed: boolean;
  position: { n: number; label: string; guidance: string };
};

type ReadingState = "select" | "drawing" | "reveal";

/** Fisher-Yates shuffle — returns a new shuffled array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Spreads() {
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [readingState, setReadingState] = useState<ReadingState>("select");
  const [revealedCount, setRevealedCount] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleSelectSpread = useCallback((spread: Spread) => {
    setSelectedSpread(spread);
    setDrawnCards([]);
    setReadingState("drawing");
    setRevealedCount(0);
    setExpandedCard(null);
    window.scrollTo(0, 0);
  }, []);

  const handleDrawCards = useCallback(() => {
    if (!selectedSpread) return;

    const shuffled = shuffle(cards);
    const drawn: DrawnCard[] = selectedSpread.positions.map((pos, i) => ({
      card: shuffled[i],
      reversed: Math.random() < 0.3, // ~30% chance of reversal
      position: pos,
    }));

    setDrawnCards(drawn);
    setReadingState("reveal");
    setRevealedCount(0);

    // Animate card reveals one by one
    drawn.forEach((_, idx) => {
      setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, 400 * (idx + 1));
    });
  }, [selectedSpread]);

  const handleReset = useCallback(() => {
    setSelectedSpread(null);
    setDrawnCards([]);
    setReadingState("select");
    setRevealedCount(0);
    setExpandedCard(null);
    window.scrollTo(0, 0);
  }, []);

  const handleNewReading = useCallback(() => {
    if (selectedSpread) {
      setDrawnCards([]);
      setReadingState("drawing");
      setRevealedCount(0);
      setExpandedCard(null);
      window.scrollTo(0, 0);
    }
  }, [selectedSpread]);

  return (
    <>
      <SEO
        title="Tarot Spreads — Interactive Readings"
        description="Draw cards for ten curated tarot spreads. From a simple daily pull to the full Celtic Cross — receive personalized interpretations for each position."
        canonical="/spreads"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thesoftheartcollective.com/" },
          { name: "Spreads", url: "https://thesoftheartcollective.com/spreads" },
        ]}
      />

      <div className="container py-12">
        {/* SPREAD SELECTION STATE */}
        {readingState === "select" && (
          <SpreadSelector spreads={spreads} onSelect={handleSelectSpread} />
        )}

        {/* DRAWING STATE — ready to pull cards */}
        {readingState === "drawing" && selectedSpread && (
          <DrawingScreen
            spread={selectedSpread}
            onDraw={handleDrawCards}
            onBack={handleReset}
          />
        )}

        {/* REVEAL STATE — cards are drawn */}
        {readingState === "reveal" && selectedSpread && drawnCards.length > 0 && (
          <ReadingResult
            spread={selectedSpread}
            drawnCards={drawnCards}
            revealedCount={revealedCount}
            expandedCard={expandedCard}
            onToggleCard={setExpandedCard}
            onNewReading={handleNewReading}
            onBack={handleReset}
          />
        )}
      </div>
    </>
  );
}

/* ─── SPREAD SELECTOR ─── */
function SpreadSelector({
  spreads,
  onSelect,
}: {
  spreads: Spread[];
  onSelect: (s: Spread) => void;
}) {
  return (
    <>
      <h1
        className="text-4xl md:text-5xl text-center mb-3"
        style={{ color: "var(--ww-cream)" }}
      >
        Tarot Spreads
      </h1>
      <p
        className="text-center max-w-2xl mx-auto mb-4"
        style={{ color: "var(--ww-body)" }}
      >
        Choose a spread to begin your reading. Each spread offers a unique lens
        through which to explore your question or intention.
      </p>
      <p
        className="text-center max-w-xl mx-auto mb-10 text-sm"
        style={{ color: "var(--ww-muted)" }}
      >
        Select a spread below, focus on your question, then draw your cards.
      </p>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {spreads.map((spread) => (
          <button
            key={spread.slug}
            onClick={() => onSelect(spread)}
            className="text-left p-5 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] border-0"
            style={{
              background: "var(--ww-card)",
              border: "1px solid var(--ww-divider)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ww-gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--ww-divider)";
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-medium" style={{ color: "var(--ww-cream)" }}>
                {spread.name}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full shrink-0 ml-2"
                style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
              >
                {spread.cardCount} {spread.cardCount === 1 ? "card" : "cards"}
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: "var(--ww-body)" }}>
              {spread.summary}
            </p>
            <p className="text-xs" style={{ color: "var(--ww-muted)" }}>
              Best for: {spread.bestFor}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}

/* ─── DRAWING SCREEN ─── */
function DrawingScreen({
  spread,
  onDraw,
  onBack,
}: {
  spread: Spread;
  onDraw: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <button
        onClick={onBack}
        className="text-sm mb-8 inline-block cursor-pointer bg-transparent border-0"
        style={{ color: "var(--ww-gold)" }}
      >
        ← Back to all spreads
      </button>

      <h1 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--ww-cream)" }}>
        {spread.name}
      </h1>
      <p className="mb-2" style={{ color: "var(--ww-body)" }}>
        {spread.summary}
      </p>
      <p className="text-sm mb-8" style={{ color: "var(--ww-muted)" }}>
        {spread.cardCount} {spread.cardCount === 1 ? "card" : "cards"} · {spread.bestFor}
      </p>

      {/* Position preview */}
      <div className="mb-10">
        <h2 className="text-lg mb-4" style={{ color: "var(--ww-gold)" }}>
          Positions in this spread:
        </h2>
        <div className="space-y-2 text-left max-w-md mx-auto">
          {spread.positions.map((pos) => (
            <div key={pos.n} className="flex gap-3 items-start">
              <span
                className="text-sm font-semibold shrink-0 w-6"
                style={{ color: "var(--ww-gold)" }}
              >
                {pos.n}.
              </span>
              <div>
                <span className="text-sm" style={{ color: "var(--ww-cream)" }}>
                  {pos.label}
                </span>
                <span className="text-xs ml-2" style={{ color: "var(--ww-muted)" }}>
                  — {pos.guidance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Draw instruction */}
      <div
        className="p-6 rounded-xl mb-8"
        style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
      >
        <p className="text-sm italic mb-4" style={{ color: "var(--ww-body)" }}>
          Take a deep breath. Focus on your question or intention. When you feel
          ready, draw your cards.
        </p>
        <button
          onClick={onDraw}
          className="ww-btn px-8 py-3 rounded-full text-base cursor-pointer border-0"
        >
          Draw Cards
        </button>
      </div>
    </div>
  );
}

/* ─── READING RESULT ─── */
function ReadingResult({
  spread,
  drawnCards,
  revealedCount,
  expandedCard,
  onToggleCard,
  onNewReading,
  onBack,
}: {
  spread: Spread;
  drawnCards: DrawnCard[];
  revealedCount: number;
  expandedCard: number | null;
  onToggleCard: (idx: number | null) => void;
  onNewReading: () => void;
  onBack: () => void;
}) {
  const allRevealed = revealedCount >= drawnCards.length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl mb-2" style={{ color: "var(--ww-cream)" }}>
          {spread.name}
        </h1>
        <p className="text-sm" style={{ color: "var(--ww-muted)" }}>
          Your reading · {spread.cardCount} {spread.cardCount === 1 ? "card" : "cards"} drawn
        </p>
      </div>

      {/* Cards Grid */}
      <div className="space-y-4 mb-10">
        {drawnCards.map((drawn, idx) => {
          const isRevealed = idx < revealedCount;
          const isExpanded = expandedCard === idx;

          return (
            <div
              key={idx}
              className="rounded-xl overflow-hidden transition-all duration-500"
              style={{
                background: "var(--ww-card)",
                border: `1px solid ${isRevealed ? "var(--ww-divider)" : "transparent"}`,
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {isRevealed && (
                <>
                  {/* Card header - always visible */}
                  <button
                    onClick={() => onToggleCard(isExpanded ? null : idx)}
                    className="w-full text-left p-5 cursor-pointer bg-transparent border-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
                          >
                            {drawn.position.n}. {drawn.position.label}
                          </span>
                          {drawn.reversed && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(212, 160, 160, 0.15)", color: "var(--ww-rose)" }}
                            >
                              Reversed
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg mt-1" style={{ color: "var(--ww-cream)" }}>
                          {drawn.card.name}
                          {drawn.reversed ? " (Reversed)" : ""}
                        </h3>
                        <p className="text-xs mt-1" style={{ color: "var(--ww-muted)" }}>
                          {drawn.card.arcana}
                        </p>
                      </div>
                      <span
                        className="text-sm shrink-0 mt-1"
                        style={{ color: "var(--ww-gold)" }}
                      >
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </div>
                  </button>

                  {/* Expanded card details */}
                  {isExpanded && (
                    <div
                      className="px-5 pb-5 border-t"
                      style={{ borderColor: "var(--ww-divider)" }}
                    >
                      <div className="pt-4">
                        {/* Position guidance */}
                        <div
                          className="p-3 rounded-lg mb-4"
                          style={{ background: "var(--ww-gold-dim)" }}
                        >
                          <p className="text-xs font-semibold mb-1" style={{ color: "var(--ww-gold)" }}>
                            Position: {drawn.position.label}
                          </p>
                          <p className="text-sm" style={{ color: "var(--ww-body)" }}>
                            {drawn.position.guidance}
                          </p>
                        </div>

                        {/* Card imagery */}
                        <div
                          className="p-3 rounded-lg mb-4"
                          style={{ background: "var(--ww-surface)" }}
                        >
                          <p className="text-sm italic" style={{ color: "var(--ww-body)" }}>
                            {drawn.card.icon}
                          </p>
                        </div>

                        {/* Keywords */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {drawn.card.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>

                        {/* Interpretation */}
                        <h4 className="text-base mb-2" style={{ color: "var(--ww-gold)" }}>
                          {drawn.reversed ? "Reversed Interpretation" : "Upright Interpretation"}
                        </h4>
                        <div className="mb-4 leading-relaxed" style={{ color: "var(--ww-body)" }}>
                          {drawn.reversed && drawn.card.reversed ? (
                            drawn.card.reversed.split("\n\n").map((para, i) => (
                              <p key={i} className="mb-3 text-sm">
                                {para}
                              </p>
                            ))
                          ) : (
                            drawn.card.meaning.split("\n\n").slice(0, 2).map((para, i) => (
                              <p key={i} className="mb-3 text-sm">
                                {para}
                              </p>
                            ))
                          )}
                        </div>

                        {/* Affirmation */}
                        <div
                          className="p-3 rounded-lg mb-4"
                          style={{ background: "var(--ww-gold-dim)", borderLeft: "3px solid var(--ww-gold)" }}
                        >
                          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--ww-gold)" }}>
                            Affirmation
                          </p>
                          <p className="text-sm italic" style={{ color: "var(--ww-cream)" }}>
                            "{drawn.card.affirmation}"
                          </p>
                        </div>

                        {/* Journal prompt */}
                        <div className="mb-4">
                          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--ww-gold)" }}>
                            Journal Prompt
                          </p>
                          <p className="text-sm italic" style={{ color: "var(--ww-body)" }}>
                            {drawn.card.journal}
                          </p>
                        </div>

                        {/* Crystal pairings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <div
                            className="p-3 rounded-lg"
                            style={{ background: "var(--ww-surface)" }}
                          >
                            <p className="text-xs font-semibold" style={{ color: "var(--ww-cream)" }}>
                              {drawn.card.crystalPrimary.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--ww-muted)" }}>
                              {drawn.card.crystalPrimary.property}
                            </p>
                          </div>
                          <div
                            className="p-3 rounded-lg"
                            style={{ background: "var(--ww-surface)" }}
                          >
                            <p className="text-xs font-semibold" style={{ color: "var(--ww-cream)" }}>
                              {drawn.card.crystalSecondary.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--ww-muted)" }}>
                              {drawn.card.crystalSecondary.property}
                            </p>
                          </div>
                        </div>

                        {/* Link to full card page */}
                        <Link
                          href={`/cards/${drawn.card.slug}`}
                          className="text-sm no-underline"
                          style={{ color: "var(--ww-gold)" }}
                        >
                          View full card meaning →
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary & Actions */}
      {allRevealed && (
        <div className="text-center">
          {/* Reading summary */}
          <div
            className="p-6 rounded-xl mb-6"
            style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
          >
            <h2 className="text-xl mb-3" style={{ color: "var(--ww-gold)" }}>
              Reading Complete
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--ww-body)" }}>
              Take a moment to reflect on the cards drawn for your {spread.name} reading.
              Click on any card above to expand its full interpretation. Consider how
              each position's message connects to your question or intention.
            </p>
            <p className="text-xs italic" style={{ color: "var(--ww-muted)" }}>
              Remember: tarot is a mirror for your intuition. The cards illuminate
              possibilities — you choose the path.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={onNewReading}
              className="ww-btn px-6 py-3 rounded-full text-sm cursor-pointer border-0"
            >
              Draw Again
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full text-sm cursor-pointer border-0"
              style={{
                color: "var(--ww-gold)",
                background: "transparent",
                border: "1px solid var(--ww-gold)",
              }}
            >
              Choose Different Spread
            </button>
          </div>
        </div>
      )}

      {/* Loading indicator while cards are revealing */}
      {!allRevealed && (
        <div className="text-center">
          <p className="text-sm animate-pulse" style={{ color: "var(--ww-muted)" }}>
            Revealing your cards... ({revealedCount} of {drawnCards.length})
          </p>
        </div>
      )}
    </div>
  );
}
