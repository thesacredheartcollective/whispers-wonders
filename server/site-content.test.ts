import { describe, expect, it } from "vitest";
import cardsData from "../shared/data/cards_data.json";
import blogData from "../shared/data/blog_data.json";
import eventsData from "../shared/data/events_data.json";
import sacredSpacesData from "../shared/data/sacred_spaces_data.json";
import directoryData from "../shared/data/directory_data.json";
import spreadsData from "../shared/data/spreads_data.json";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Site Content Integrity", () => {
  describe("Tarot Cards", () => {
    it("contains exactly 78 cards", () => {
      expect(cardsData).toHaveLength(78);
    });

    it("each card has required fields", () => {
      for (const card of cardsData) {
        expect(card).toHaveProperty("name");
        expect(card).toHaveProperty("slug");
        expect(card).toHaveProperty("arcana");
        expect(card).toHaveProperty("meaning");
        expect(card).toHaveProperty("keywords");
        expect(card.keywords.length).toBeGreaterThan(0);
      }
    });

    it("no card contains Minnow Pond or YouTube references", () => {
      const json = JSON.stringify(cardsData).toLowerCase();
      expect(json).not.toContain("minnow pond");
      expect(json).not.toContain("youtube");
      expect(json).not.toContain("youtu.be");
    });

    it("all cards have crystal pairings field", () => {
      for (const card of cardsData) {
        expect(card).toHaveProperty("crystalPrimary");
      }
    });
  });

  describe("Blog Posts", () => {
    it("contains exactly 5 posts", () => {
      expect(blogData).toHaveLength(5);
    });

    it("each post has required fields", () => {
      for (const post of blogData) {
        expect(post).toHaveProperty("title");
        expect(post).toHaveProperty("slug");
        expect(post).toHaveProperty("body");
        expect(post).toHaveProperty("date");
        expect(post).toHaveProperty("tags");
      }
    });

    it("each post has substantial content (1000+ words)", () => {
      for (const post of blogData) {
        const wordCount = post.body.split(/\s+/).length;
        expect(wordCount).toBeGreaterThan(1000);
      }
    });
  });

  describe("Events", () => {
    it("contains exactly 7 events", () => {
      expect(eventsData).toHaveLength(7);
    });

    it("each event has required fields", () => {
      for (const event of eventsData) {
        expect(event).toHaveProperty("title");
        expect(event).toHaveProperty("location");
        expect(event).toHaveProperty("description");
        expect(event).toHaveProperty("category");
      }
    });
  });

  describe("Events (expanded content in TypeScript data)", () => {
    it("each event listing has 300+ words of content", () => {
      const eventsTs = readFileSync(
        resolve(__dirname, "../client/src/data/events.ts"),
        "utf-8"
      );
      const descriptions = eventsTs.match(/fullDescription:\s*`([^`]+)`/g) || [];
      expect(descriptions).toHaveLength(7);
      for (const desc of descriptions) {
        const content = desc.replace(/fullDescription:\s*`/, "").replace(/`$/, "");
        const wordCount = content.split(/\s+/).length;
        expect(wordCount).toBeGreaterThanOrEqual(300);
      }
    });
  });

  describe("Sacred Spaces (expanded content in TypeScript data)", () => {
    it("each sacred space has 300+ words of content", () => {
      const spacesTs = readFileSync(
        resolve(__dirname, "../client/src/data/sacredSpaces.ts"),
        "utf-8"
      );
      const descriptions = spacesTs.match(/fullDescription:\s*`([^`]+)`/g) || [];
      expect(descriptions).toHaveLength(6);
      for (const desc of descriptions) {
        const content = desc.replace(/fullDescription:\s*`/, "").replace(/`$/, "");
        const wordCount = content.split(/\s+/).length;
        expect(wordCount).toBeGreaterThanOrEqual(300);
      }
    });

    it("each space has a Google Maps link in the TypeScript data", () => {
      const spacesTs = readFileSync(
        resolve(__dirname, "../client/src/data/sacredSpaces.ts"),
        "utf-8"
      );
      const mapsUrls = spacesTs.match(/mapsUrl:\s*"([^"]+)"/g) || [];
      expect(mapsUrls).toHaveLength(6);
      for (const url of mapsUrls) {
        expect(url).toContain("google.com/maps");
      }
    });
  });

  describe("Directory", () => {
    it("contains directory listings", () => {
      expect(directoryData.length).toBeGreaterThan(0);
    });

    it("each listing has required fields", () => {
      for (const listing of directoryData) {
        expect(listing).toHaveProperty("name");
        expect(listing).toHaveProperty("categories");
        expect(listing).toHaveProperty("description");
      }
    });
  });

  describe("Spreads", () => {
    it("contains exactly 10 spreads", () => {
      expect(spreadsData).toHaveLength(10);
    });

    it("each spread has required fields", () => {
      for (const spread of spreadsData) {
        expect(spread).toHaveProperty("name");
        expect(spread).toHaveProperty("slug");
        expect(spread).toHaveProperty("cardCount");
        expect(spread.cardCount).toBeGreaterThan(0);
      }
    });
  });
});

describe("No Third-Party Video Embeds", () => {
  it("no YouTube or Minnow Pond references in any data file", () => {
    const allData = JSON.stringify([
      cardsData, blogData, eventsData, sacredSpacesData, directoryData, spreadsData,
    ]).toLowerCase();
    expect(allData).not.toContain("youtube.com/embed");
    expect(allData).not.toContain("minnow pond");
  });
});

describe("Security Headers", () => {
  it("server index.ts contains security header middleware", () => {
    const serverIndex = readFileSync(
      resolve(__dirname, "./_core/index.ts"),
      "utf-8"
    );
    expect(serverIndex).toContain("X-Frame-Options");
    expect(serverIndex).toContain("Content-Security-Policy");
    expect(serverIndex).toContain("Referrer-Policy");
    expect(serverIndex).toContain("X-Content-Type-Options");
  });
});

describe("SEO - JSON-LD Schema", () => {
  it("JsonLd component exports WebSiteJsonLd", () => {
    const jsonLd = readFileSync(
      resolve(__dirname, "../client/src/components/JsonLd.tsx"),
      "utf-8"
    );
    expect(jsonLd).toContain("WebSiteJsonLd");
    expect(jsonLd).toContain("BlogPostingJsonLd");
    expect(jsonLd).toContain("BreadcrumbJsonLd");
    expect(jsonLd).toContain("schema.org");
  });
});

describe("E-E-A-T Compliance", () => {
  it("About page identifies Kenya Ferguson and The Soft Heart Collective LLC", () => {
    const about = readFileSync(
      resolve(__dirname, "../client/src/pages/About.tsx"),
      "utf-8"
    );
    expect(about).toContain("Kenya Ferguson");
    expect(about).toContain("The Soft Heart Collective LLC");
    expect(about).toContain("Editorial Policy");
  });

  it("Contact page identifies the site owner", () => {
    const contact = readFileSync(
      resolve(__dirname, "../client/src/pages/Contact.tsx"),
      "utf-8"
    );
    expect(contact).toContain("Kenya Ferguson");
    expect(contact).toContain("The Soft Heart Collective LLC");
  });

  it("AuthorBio component exists and references Kenya Ferguson", () => {
    const bio = readFileSync(
      resolve(__dirname, "../client/src/components/AuthorBio.tsx"),
      "utf-8"
    );
    expect(bio).toContain("Kenya Ferguson");
  });

  it("BlogPost page includes AuthorBio component", () => {
    const blogPost = readFileSync(
      resolve(__dirname, "../client/src/pages/BlogPost.tsx"),
      "utf-8"
    );
    expect(blogPost).toContain("AuthorBio");
  });
});
