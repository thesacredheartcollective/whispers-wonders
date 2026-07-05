import { directory } from "@/data";
import { useState, useMemo } from "react";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    directory.forEach((d) => d.categories.forEach((c) => cats.add(c)));
    return Array.from(cats).sort();
  }, []);

  const filtered = useMemo(() => {
    return directory.filter((entry) => {
      const matchesSearch = !search.trim() ||
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.city.toLowerCase().includes(search.toLowerCase()) ||
        entry.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || entry.categories.includes(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://www.thesoftheartcollective.com/" },
        { name: "Directory", url: "https://www.thesoftheartcollective.com/directory" },
      ]} />
      <div className="container py-12">
        <h1 className="text-4xl md:text-5xl text-center mb-3" style={{ color: "var(--ww-cream)" }}>
          Metaphysical Directory
        </h1>
        <p className="text-center max-w-2xl mx-auto mb-8" style={{ color: "var(--ww-body)" }}>
          Crystal shops, wellness centers, and metaphysical stores throughout the Tampa Bay area.
        </p>

        {/* Search & Filter */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name, city, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm"
            style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg text-sm"
            style={{ background: "var(--ww-card)", color: "var(--ww-cream)", border: "1px solid var(--ww-divider)" }}
          >
            <option value="all">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filtered.map((entry, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl"
              style={{ background: "var(--ww-card)", border: "1px solid var(--ww-divider)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg" style={{ color: "var(--ww-cream)" }}>{entry.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--ww-muted)" }}>
                    {entry.city}, {entry.county} County
                  </p>
                </div>
                {entry.featured && (
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0" style={{ background: "var(--ww-gold-dim)", color: "var(--ww-gold)" }}>
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm mt-2" style={{ color: "var(--ww-body)" }}>{entry.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {entry.categories.map((cat) => (
                  <span key={cat} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--ww-surface)", color: "var(--ww-muted)" }}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-10" style={{ color: "var(--ww-muted)" }}>
              No listings match your filters. Try broadening your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
