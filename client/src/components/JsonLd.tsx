export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Whispers & Wonders",
    alternateName: "The Soft Heart Collective",
    url: "https://thesoftheartcollective.com",
    description: "A tarot, crystal, and spiritual wellness resource by Kenya Ferguson and The Soft Heart Collective LLC. Explore all 78 tarot cards, crystal guides, events, sacred spaces, and more.",
    publisher: {
      "@type": "Organization",
      name: "The Soft Heart Collective LLC",
      url: "https://thesoftheartcollective.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://thesoftheartcollective.com/cards/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  return <JsonLd data={data} />;
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  wordCount,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `https://thesoftheartcollective.com/blog/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Kenya Ferguson",
      url: "https://thesoftheartcollective.com/about",
      jobTitle: "Tarot Practitioner & Spiritual Wellness Advocate",
    },
    publisher: {
      "@type": "Organization",
      name: "The Soft Heart Collective LLC",
      url: "https://thesoftheartcollective.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thesoftheartcollective.com/blog/${slug}`,
    },
  };
  if (wordCount) {
    data.wordCount = wordCount;
  }
  return <JsonLd data={data} />;
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Soft Heart Collective LLC",
    alternateName: "Whispers & Wonders",
    url: "https://thesoftheartcollective.com",
    founder: {
      "@type": "Person",
      name: "Kenya Ferguson",
    },
    description: "A tarot, crystal, and spiritual wellness resource serving the Tampa Bay area and beyond.",
  };
  return <JsonLd data={data} />;
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "The Soft Heart Collective LLC",
    description: "Tarot readings, crystal guidance, and spiritual wellness resources serving the Tampa Bay area.",
    url: "https://thesoftheartcollective.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tampa Bay",
      addressRegion: "FL",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Kenya Ferguson",
    },
  };
  return <JsonLd data={data} />;
}
