"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

const labels = {
  en: {
    now: "Now Showing",
    archive: "Archive",
    library: "My Library",
    menu: "Open navigation",
  },
  zh: {
    now: "正在放映",
    archive: "片库",
    library: "我的收藏",
    menu: "打开导航",
  },
};

export function Header() {
  const { locale, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = labels[locale];

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="The Reel home">
        <span className="reel-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{locale === "en" ? "THE REEL" : "胶片剧院"}</span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label={copy.menu}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <div className={`header-actions ${menuOpen ? "open" : ""}`}>
        <nav aria-label="Main navigation">
          <Link href="/#now-showing" onClick={() => setMenuOpen(false)}>
            {copy.now}
          </Link>
          <Link href="/browse" onClick={() => setMenuOpen(false)}>
            {copy.archive}
          </Link>
          <Link href="/library" onClick={() => setMenuOpen(false)}>
            {copy.library}
          </Link>
        </nav>
        {/* <div className="language-switch" aria-label="Language">
          <button
            type="button"
            className={locale === "en" ? "active" : ""}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={locale === "zh" ? "active" : ""}
            aria-pressed={locale === "zh"}
            onClick={() => setLocale("zh")}
          >
            中文
          </button>
        </div> */}
      </div>
    </header>
  );
}
