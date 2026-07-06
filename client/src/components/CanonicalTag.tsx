import { useEffect } from "react";
import { useLocation } from "wouter";

const BASE_URL = "https://thesoftheartcollective.com";

export default function CanonicalTag() {
  const [location] = useLocation();

  useEffect(() => {
    const canonical = document.querySelector("link[rel='canonical']");
    const url = `${BASE_URL}${location === "/" ? "/" : location}`;
    if (canonical) {
      canonical.setAttribute("href", url);
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", url);
      document.head.appendChild(link);
    }
  }, [location]);

  return null;
}
