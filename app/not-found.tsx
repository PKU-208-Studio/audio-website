import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-state full-page-empty">
      <span>404</span>
      <h1>This reel is missing.</h1>
      <p>The story may have left the program.</p>
      <Link href="/" className="primary-cta">
        Return to the theater
      </Link>
    </section>
  );
}
