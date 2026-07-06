import { BreadcrumbJsonLd } from "@/components/JsonLd";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function About() {
  return (
    <>
      <SEO 
        title="About Kenya Ferguson"
        description="Learn about Kenya Ferguson, the founder of The Soft Heart Collective and Whispers & Wonders. Discover our mission to provide accessible spiritual wellness resources in Tampa Bay."
        canonical="/about"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://thesoftheartcollective.com/" },
        { name: "About", url: "https://thesoftheartcollective.com/about" },
      ]} />
      <div className="container py-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-center mb-8" style={{ color: "var(--ww-cream)" }}>
          About Whispers & Wonders
        </h1>

        {/* Founder Bio */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shrink-0"
              style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}
            >
              KF
            </div>
            <div>
              <h2 className="text-2xl mb-1" style={{ color: "var(--ww-gold)" }}>Kenya Ferguson</h2>
              <p className="text-sm" style={{ color: "var(--ww-muted)" }}>
                Founder & Lead Practitioner · The Soft Heart Collective LLC
              </p>
            </div>
          </div>

          <div className="prose-ww">
            <p>
              Kenya Ferguson is a tarot practitioner, crystal worker, and spiritual wellness advocate based in Tampa Bay, Florida. With over a decade of dedicated personal practice and community facilitation, she founded The Soft Heart Collective LLC to create accessible, inclusive spaces for spiritual exploration and self-discovery.
            </p>
            <p>
              Her journey with tarot began as a personal tool for navigating life transitions and deepened into a calling to help others develop their own intuitive relationship with the cards. Kenya's approach blends traditional Rider-Waite-Smith symbolism with intuitive guidance, always emphasizing personal empowerment over prediction. She believes tarot is a mirror — not a crystal ball — and that every reader already holds the wisdom they seek.
            </p>
            <p>
              Beyond individual practice, Kenya is deeply committed to building community. She facilitates local workshops, contributes to Tampa Bay's spiritual events scene, and created Whispers & Wonders as a free resource to make tarot, crystal work, and metaphysical knowledge accessible to anyone drawn to explore.
            </p>
          </div>
        </section>

        {/* About the Site */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={{ color: "var(--ww-gold)" }}>About This Site</h2>
          <div className="prose-ww">
            <p>
              Whispers & Wonders is a free spiritual wellness resource focused on the Tampa Bay area of Florida. The site provides tarot card meanings, crystal pairing guides, local event listings, a directory of metaphysical shops, moon phase rituals, and long-form educational blog content — all written from genuine practice and community experience.
            </p>
            <p>
              This site is owned and operated by <strong>Kenya Ferguson</strong> through <strong>The Soft Heart Collective LLC</strong>, a Florida-registered limited liability company dedicated to spiritual wellness education and community building.
            </p>
          </div>
        </section>

        {/* Editorial Policy */}
        <section className="mb-12 p-6 rounded-xl" style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}>
          <h2 className="text-2xl mb-4" style={{ color: "var(--ww-gold)" }}>Editorial Policy</h2>
          <div className="prose-ww text-sm">
            <p>
              All content on Whispers & Wonders is original, written by Kenya Ferguson from personal practice and research. We do not publish AI-generated content, guest posts from unverified sources, or sponsored content disguised as editorial.
            </p>
            <p>
              <strong>Accuracy:</strong> Tarot interpretations draw from established traditions (primarily Rider-Waite-Smith) while acknowledging that card meanings are not fixed — personal intuition always takes precedence over memorized definitions.
            </p>
            <p>
              <strong>Local listings:</strong> Event and directory information is gathered from public sources and community contacts. We update listings regularly but recommend confirming details directly with venues before visiting.
            </p>
            <p>
              <strong>Affiliate links:</strong> Some links on this site (such as crystal purchase links) may be affiliate links. This means we may earn a small commission if you make a purchase, at no additional cost to you. Affiliate relationships never influence our recommendations.
            </p>
            <p>
              <strong>Disclaimer:</strong> Tarot readings and spiritual practices described on this site are for entertainment, personal reflection, and wellness purposes only. They are not a substitute for professional medical, psychological, legal, or financial advice.
            </p>
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={{ color: "var(--ww-gold)" }}>Connect</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.instagram.com/thesoftheartcollective"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm no-underline"
              style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/thesoftheartcollective"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm no-underline"
              style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
            >
              Facebook
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-sm no-underline"
              style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
