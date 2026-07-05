import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Terms() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Terms of Service", url: "https://www.thesoftheartcollective.com/terms" },
      ]} />
      <div className="container py-12 max-w-3xl mx-auto prose-ww">
        <h1 className="text-4xl text-center mb-8" style={{ color: "var(--ww-cream)" }}>Terms of Service</h1>
        <p className="text-sm mb-6" style={{ color: "var(--ww-muted)" }}>Last updated: January 2026</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing and using Whispers & Wonders (https://www.thesoftheartcollective.com), you accept and agree to be bound by these terms. If you do not agree, please do not use the site.</p>

        <h2>Nature of Content</h2>
        <p>All tarot readings, spiritual guidance, crystal information, and related content on this site are provided for entertainment, personal reflection, and general wellness purposes only. Nothing on this site constitutes professional medical, psychological, legal, or financial advice. Always consult qualified professionals for matters requiring expert guidance.</p>

        <h2>Intellectual Property</h2>
        <p>All original content on this site — including text, graphics, layout, and design — is the property of Kenya Ferguson and The Soft Heart Collective LLC. You may not reproduce, distribute, or create derivative works without written permission.</p>

        <h2>User Conduct</h2>
        <p>When using our contact form or any interactive features, you agree not to submit content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.</p>

        <h2>Disclaimer of Warranties</h2>
        <p>This site is provided "as is" without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information on the site.</p>

        <h2>Limitation of Liability</h2>
        <p>Kenya Ferguson and The Soft Heart Collective LLC shall not be liable for any damages arising from the use of this site or reliance on its content.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of the State of Florida, United States.</p>

        <h2>Contact</h2>
        <p>Questions about these terms may be directed to Kenya Ferguson at The Soft Heart Collective LLC through our contact page.</p>
      </div>
    </>
  );
}
