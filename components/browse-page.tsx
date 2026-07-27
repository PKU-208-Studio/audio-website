"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { StoryCard } from "@/components/story-card";
import { genres, stories } from "@/lib/data";
import type { GenreId } from "@/lib/types";

export function BrowsePage() {
  const { locale, text } = useLanguage();
  const [genre, setGenre] = useState<GenreId | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      stories.filter((story) => {
        const matchesGenre = genre === "all" || story.genre === genre;
        const haystack =
          `${story.title.en} ${story.title.zh} ${story.author} ${story.narrator}`.toLowerCase();
        return matchesGenre && haystack.includes(query.toLowerCase().trim());
      }),
    [genre, query],
  );

  return (
    <section className="archive-page">
      <header className="page-intro">
        <p>{locale === "en" ? "THE FULL PROGRAM" : "完整节目单"}</p>
        <h1>{locale === "en" ? "The Archive" : "声音片库"}</h1>
        <span>
          {locale === "en"
            ? "Every world we’ve put on tape, waiting in the dark."
            : "所有被我们录进磁带的世界，都在暗处等待。"}
        </span>
      </header>

      <div className="archive-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              locale === "en"
                ? "Search title, author, or voice..."
                : "搜索作品、作者或演播者……"
            }
          />
        </label>
        <div className="filter-row">
          <SlidersHorizontal size={16} />
          <button
            type="button"
            className={genre === "all" ? "active" : ""}
            onClick={() => setGenre("all")}
          >
            {locale === "en" ? "All stories" : "全部作品"}
          </button>
          {genres.map((item) => (
            <button
              type="button"
              key={item.id}
              className={genre === item.id ? "active" : ""}
              onClick={() => setGenre(item.id)}
            >
              {text(item.name)}
            </button>
          ))}
        </div>
      </div>

      <div className="archive-count">
        <span>{filtered.length.toString().padStart(2, "0")}</span>
        {locale === "en" ? "titles found" : "部作品"}
      </div>
      {filtered.length ? (
        <div className="story-grid archive-grid">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>∅</span>
          <h2>{locale === "en" ? "No signal found" : "没有找到信号"}</h2>
          <p>
            {locale === "en"
              ? "Try another title or clear the genre filter."
              : "试试其他关键词，或清除题材筛选。"}
          </p>
        </div>
      )}
    </section>
  );
}
