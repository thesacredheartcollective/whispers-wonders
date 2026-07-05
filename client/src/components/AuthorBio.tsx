export default function AuthorBio() {
  return (
    <aside
      className="mt-12 p-6 rounded-xl"
      style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0"
          style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
        >
          KF
        </div>
        <div>
          <h4 className="text-lg mb-1" style={{ color: "var(--ww-cream)" }}>
            Kenya Ferguson
          </h4>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--ww-muted)" }}>
            Founder, The Soft Heart Collective LLC
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--ww-body)" }}>
            Kenya Ferguson is a tarot practitioner, crystal worker, and spiritual wellness advocate based in Tampa Bay, Florida. With over a decade of personal practice and community facilitation, she created Whispers & Wonders to make tarot and metaphysical resources accessible, inclusive, and grounded in genuine experience. Her approach blends traditional card symbolism with intuitive guidance, always emphasizing personal empowerment over prediction.
          </p>
          <div className="flex gap-3 mt-3">
            <a
              href="https://www.instagram.com/thesoftheartcollective"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs no-underline"
              style={{ color: "var(--ww-gold)" }}
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/thesoftheartcollective"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs no-underline"
              style={{ color: "var(--ww-gold)" }}
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
