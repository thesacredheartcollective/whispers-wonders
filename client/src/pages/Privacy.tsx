import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Privacy() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Privacy Policy", url: "https://www.thesoftheartcollective.com/privacy" },
      ]} />
      <div className="container py-12 max-w-3xl mx-auto prose-ww">
        <h1 className="text-4xl text-center mb-8" style={{ color: "var(--ww-cream)" }}>Privacy Policy</h1>
        <p className="text-sm mb-6" style={{ color: "var(--ww-muted)" }}>Last updated: January 2026</p>

        <h2>Who We Are</h2>
        <p>This website, Whispers & Wonders, is operated by Kenya Ferguson through The Soft Heart Collective LLC, based in Tampa Bay, Florida. Our website address is: https://www.thesoftheartcollective.com</p>

        <h2>Information We Collect</h2>
        <p>We collect minimal personal information. If you use our contact form, we collect your name, email address, and message content solely for the purpose of responding to your inquiry. We do not sell, rent, or share this information with third parties.</p>

        <h2>Cookies and Analytics</h2>
        <p>We use privacy-focused analytics to understand how visitors use our site. This data is aggregated and does not personally identify you. We may use cookies to remember your preferences and improve your experience.</p>

        <h2>Advertising</h2>
        <p>This site may display advertisements through Google AdSense. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google Ad Settings.</p>

        <h2>Affiliate Links</h2>
        <p>Some links on this site are affiliate links (such as Amazon Associates). If you make a purchase through these links, we may earn a small commission at no additional cost to you.</p>

        <h2>Third-Party Services</h2>
        <p>We use the following third-party services: Google AdSense (advertising), Google Analytics or equivalent (traffic analysis), and Google Fonts (typography). Each service has its own privacy policy governing data collection.</p>

        <h2>Your Rights</h2>
        <p>You may request deletion of any personal information we hold about you by contacting us through our contact form. We will respond within 30 days.</p>

        <h2>Contact</h2>
        <p>For privacy-related inquiries, please use our contact form or reach out to Kenya Ferguson at The Soft Heart Collective LLC, Tampa Bay, Florida.</p>
      </div>
    </>
  );
}
