// Re-export all site data
export { cards } from "./cards";
export { events } from "./events";
export { sacredSpaces } from "./sacredSpaces";
export { directory } from "./directory";
export { spreads } from "./spreads";
export { blogPosts } from "./blog";

export type Card = {
  name: string;
  slug: string;
  arcana: string;
  isMajor?: boolean;
  suit?: string | null;
  icon: string;
  meaning: string;
  reversed?: string;
  affirmation: string;
  journal: string;
  keywords: string[];
  crystalPrimary: { name: string; property: string };
  crystalSecondary: { name: string; property: string };
  related: string[];
  spreads: string[];
};

export type Event = {
  id: string;
  title: string;
  cadence: string;
  location: string;
  city: string;
  category: string;
  description: string;
  fullDescription: string;
  whatToBring: string[];
  accessibility: string;
  tips: string[];
};

export type SacredSpace = {
  id: string;
  name: string;
  city: string;
  county: string;
  lat: number;
  lng: number;
  significance: string;
  bestTime: string;
  ritual: string;
  fullDescription: string;
  accessibility: string;
  tips: string[];
  mapsUrl: string;
};

export type DirectoryEntry = {
  name: string;
  city: string;
  county: string;
  description: string;
  categories: string[];
  featured: boolean;
};

export type Spread = {
  slug: string;
  name: string;
  cardCount: number;
  summary: string;
  bestFor: string;
  positions: { n: number; label: string; guidance: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readMinutes: number;
  tags: string[];
  body: string;
};
