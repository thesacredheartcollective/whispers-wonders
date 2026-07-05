import { Link } from "wouter";
import { cards } from "@/data";
import { useMemo } from "react";
import { WebSiteJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";

export default function Home() {
  const randomCard = useMemo(() => cards[Math.floor(Math.random() * cards.length)], []);

  return (
    <>
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      {/* Hero */}
      <section className="py-20 md:py-32 text-center">
        <div className="container">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
            style={{ color: "var(--ww-cream)", fontFamily: "var(--font-sans)" }}
          >
            Whispers & Wonders
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--ww-body)" }}>
            A mystical tarot and spiritual wellness companion for Florida's Tampa Bay area — interactive card readings, a local metaphysical directory, moon phase rituals, and crystal pairings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/cards" className="ww-btn px-6 py-3 rounded-full text-sm no-underline">
              Explore the Cards
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 rounded-full text-sm no-underline border"
              style={{ color: "var(--ww-gold)", borderColor: "var(--ww-gold)" }}
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Card of the Moment */}
      <section className="py-16" style={{ background: "var(--ww-surface)" }}>
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl mb-2" style={{ color: "var(--ww-gold)" }}>
            Card of the Moment
          </h2>
          <p className="mb-6 text-sm" style={{ color: "var(--ww-muted)" }}>
            A card drawn at random to greet you today
          </p>
          <div
            className="max-w-md mx-auto p-6 rounded-xl"
            style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
          >
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ww-muted)" }}>
              {randomCard.arcana}
            </p>
            <h3 className="text-2xl mb-3" style={{ color: "var(--ww-cream)" }}>
              {randomCard.name}
            </h3>
            <p className="text-sm italic mb-4" style={{ color: "var(--ww-body)" }}>
              {randomCard.icon}
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--ww-body)" }}>
              {randomCard.meaning}
            </p>
            <Link
              href={`/cards/${randomCard.slug}`}
              className="text-sm no-underline"
              style={{ color: "var(--ww-gold)" }}
            >
              Read full meaning →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-10" style={{ color: "var(--ww-cream)" }}>
            Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/cards", title: "78 Tarot Cards", desc: "Meanings, crystal pairings, and journal prompts for every card in the deck." },
              { href: "/crystal-guide", title: "Crystal Guide", desc: "Discover which stones pair with each tarot card and amplify your readings." },
              { href: "/spreads", title: "Tarot Spreads", desc: "Ten curated layouts from a simple daily pull to the full Celtic Cross." },
              { href: "/events", title: "Local Events", desc: "Monthly markets, workshops, sound baths, and circles in Tampa Bay." },
              { href: "/sacred-spaces", title: "Sacred Spaces", desc: "Six natural sanctuaries for meditation, ritual, and grounding." },
              { href: "/directory", title: "Shop Directory", desc: "23 metaphysical shops, wellness centers, and crystal stores near you." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-5 rounded-xl no-underline transition-transform hover:scale-[1.02]"
                style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
              >
                <h3 className="text-lg mb-2" style={{ color: "var(--ww-gold)" }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--ww-body)" }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16" style={{ background: "var(--ww-surface)" }}>
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl mb-4" style={{ color: "var(--ww-cream)" }}>
            From the Blog
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--ww-muted)" }}>
            Long-form guides for your tarot and spiritual practice
          </p>
          <Link href="/blog" className="ww-btn px-5 py-2.5 rounded-full text-sm no-underline">
            Read All Posts
          </Link>
        </div>
      </section>
    </>
  );
}
