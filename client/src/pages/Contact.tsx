import { useState } from "react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setError("");
    },
    onError: (err) => {
      setError(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    submitMutation.mutate(formData);
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Kenya Ferguson and The Soft Heart Collective. We'd love to hear your questions, suggestions, or feedback about Whispers & Wonders."
        canonical="/contact"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://thesoftheartcollective.com/" },
        { name: "Contact", url: "https://thesoftheartcollective.com/contact" },
      ]} />
      <div className="container py-12 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Contact Us
        </h1>
        <p className="text-center mb-10" style={{ color: "var(--ww-body)" }}>
          Have a question, suggestion, or want to connect? Reach out below.
        </p>

        {/* Site Owner Info */}
        <div className="p-5 rounded-xl mb-8" style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}>
          <h2 className="text-lg mb-2" style={{ color: "var(--ww-cream)" }}>Site Owner</h2>
          <p className="text-sm" style={{ color: "var(--ww-body)" }}>
            <strong style={{ color: "var(--ww-cream)" }}>Kenya Ferguson</strong>
          </p>
          <p className="text-sm" style={{ color: "var(--ww-body)" }}>
            The Soft Heart Collective LLC
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--ww-muted)" }}>
            Tampa Bay, Florida
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl text-center" style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}>
            <h2 className="text-2xl mb-3" style={{ color: "var(--ww-gold)" }}>Message Sent</h2>
            <p style={{ color: "var(--ww-body)" }}>
              Thank you for reaching out. We will respond within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: "#3a1a1a", border: "1px solid #6b2020", color: "#f87171" }}>
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--ww-cream)" }}>Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--ww-cream)" }}>Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--ww-cream)" }}>Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm"
                style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--ww-cream)" }}>Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm resize-y"
                style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
              />
            </div>
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="ww-btn px-6 py-3 rounded-full text-sm w-full sm:w-auto disabled:opacity-50"
            >
              {submitMutation.isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
