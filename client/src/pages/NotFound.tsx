import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-5xl mb-4" style={{ color: "var(--ww-cream)" }}>404</h1>
      <p className="text-lg mb-6" style={{ color: "var(--ww-body)" }}>
        This page has wandered beyond the veil.
      </p>
      <Link href="/" className="ww-btn px-6 py-3 rounded-full text-sm no-underline inline-block">
        Return Home
      </Link>
    </div>
  );
}
