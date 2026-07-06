import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const DEFAULT_TITLE = "Whispers & Wonders | Tarot, Reflection & Spiritual Wellness";
const DEFAULT_DESCRIPTION = "Discover daily tarot guidance, inspiring stories, thoughtful reflection, and spiritual wellness resources designed to help you reconnect with yourself.";
const BASE_URL = "https://thesoftheartcollective.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/manus-storage/og-image_75dbe3d9.png`;

export default function SEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SEOProps) {
  const fullTitle = title ? `${title} | Whispers & Wonders` : DEFAULT_TITLE;
  const fullDescription = description || DEFAULT_DESCRIPTION;
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || fullDescription} />
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:type" content={ogType} />

      <meta name="twitter:title" content={twitterTitle || ogTitle || fullTitle} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || fullDescription} />
      <meta name="twitter:image" content={twitterImage || ogImage || DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}
