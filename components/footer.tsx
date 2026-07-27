"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { locale } = useLanguage();
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-rule" />
        <p>
          {locale === "en"
            ? "ORIGINAL STORIES · SCREENING NIGHTLY"
            : "原创故事 · 每夜放映"}
        </p>
        <span className="footer-rule" />
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/browse">{locale === "en" ? "Archive" : "片库"}</Link>
        <Link href="/library">
          {locale === "en" ? "My Library" : "我的收藏"}
        </Link>
        <Link href="/#about">{locale === "en" ? "About" : "关于"}</Link>
      </nav>
      <small>© {new Date().getFullYear()} THE REEL</small>
    </footer>
  );
}
