import { Link, useLocation } from "wouter";
import { useState } from "react";

const navLinks = [
  { href: "/cards", label: "Cards" },
  { href: "/blog", label: "Blog" },
  { href: "/crystal-guide", label: "Crystals" },
  { href: "/events", label: "Events" },
  { href: "/sacred-spaces", label: "Sacred Spaces" },
  { href: "/directory", label: "Directory" },
  { href: "/moon-calendar", label: "Moon" },
  { href: "/spreads", label: "Spreads" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--ww-deep)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(26,26,28,0.92)", borderBottom: "1px solid var(--ww-divider)" }}
      >
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span
              className="text-2xl md:text-3xl font-semibold tracking-tight"
              style={{ color: "var(--ww-gold)", fontFamily: "var(--font-sans)" }}
            >
              Whispers & Wonders
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors no-underline ${
                  location === link.href || location.startsWith(link.href + "/")
                    ? "text-[var(--ww-gold)]"
                    : "text-[var(--ww-body)] hover:text-[var(--ww-cream)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="ml-2 px-3 py-1.5 rounded-full text-sm no-underline text-[var(--ww-body)] hover:text-[var(--ww-cream)] transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: "var(--ww-cream)" }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav
            className="lg:hidden border-t px-4 py-4 flex flex-col gap-2"
            style={{ borderColor: "var(--ww-divider)", background: "var(--ww-surface)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm no-underline ${
                  location === link.href
                    ? "text-[var(--ww-gold)]"
                    : "text-[var(--ww-body)]"
                }`}
                style={location === link.href ? { background: "var(--ww-gold-dim)" } : {}}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm no-underline text-[var(--ww-body)]"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm no-underline text-[var(--ww-body)]"
            >
              Contact
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="border-t mt-16 py-10"
        style={{ borderColor: "var(--ww-divider)", background: "var(--ww-surface)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4
                className="text-lg mb-3"
                style={{ color: "var(--ww-gold)", fontFamily: "var(--font-sans)" }}
              >
                Whispers & Wonders
              </h4>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ww-muted)" }}>
                A mystical tarot and spiritual wellness companion for Florida's Tampa Bay area.
                Created by Kenya Ferguson and The Soft Heart Collective LLC.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/thesoftheartcollective" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs no-underline hover:text-[var(--ww-gold)] transition-colors"
                  style={{ color: "var(--ww-muted)" }}
                >
                  Instagram
                </a>
                <a 
                  href="https://facebook.com/thesoftheartcollective" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs no-underline hover:text-[var(--ww-gold)] transition-colors"
                  style={{ color: "var(--ww-muted)" }}
                >
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--ww-cream)" }}>
                Explore
              </h4>
              <div className="flex flex-col gap-1.5">
                <Link href="/cards" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Tarot Cards</Link>
                <Link href="/blog" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Blog</Link>
                <Link href="/crystal-guide" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Crystal Guide</Link>
                <Link href="/events" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Events</Link>
                <Link href="/sacred-spaces" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Sacred Spaces</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-3" style={{ color: "var(--ww-cream)" }}>
                Legal & Info
              </h4>
              <div className="flex flex-col gap-1.5">
                <Link href="/about" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>About</Link>
                <Link href="/contact" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Contact</Link>
                <Link href="/privacy" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Privacy Policy</Link>
                <Link href="/terms" className="text-sm no-underline" style={{ color: "var(--ww-body)" }}>Terms of Service</Link>
              </div>
            </div>
          </div>
          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "var(--ww-divider)" }}
          >
            <p className="text-xs" style={{ color: "var(--ww-muted)" }}>
              © {new Date().getFullYear()} Kenya Ferguson & The Soft Heart Collective LLC. All rights reserved.
            </p>
            <p className="text-xs italic" style={{ color: "var(--ww-muted)" }}>
              For entertainment and reflection purposes only. Tarot readings are not a substitute for professional advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
