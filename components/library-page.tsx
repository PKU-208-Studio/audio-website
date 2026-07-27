"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, History } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { usePlayer } from "@/components/player-provider";
import { StoryCard } from "@/components/story-card";
import { stories } from "@/lib/data";

export function LibraryPage() {
  const { locale } = useLanguage();
  const { favorites, progress } = usePlayer();
  const savedStories = stories.filter((story) => favorites.includes(story.id));
  const recentStories = stories
    .filter((story) =>
      story.episodes.some((episode) => progress[episode.id]?.seconds > 0),
    )
    .slice(0, 4);

  return (
    <section className="library-page">
      <header className="page-intro">
        <p>{locale === "en" ? "YOUR PRIVATE SCREENING ROOM" : "你的私人放映室"}</p>
        <h1>{locale === "en" ? "My Library" : "我的收藏"}</h1>
        <span>
          {locale === "en"
            ? "Saved stories and unfinished nights."
            : "收藏的故事，以及那些尚未听完的夜晚。"}
        </span>
      </header>

      <div className="library-block">
        <div className="subsection-title">
          <Bookmark size={18} />
          <h2>{locale === "en" ? "Saved stories" : "已收藏"}</h2>
          <span>{savedStories.length.toString().padStart(2, "0")}</span>
        </div>
        {savedStories.length ? (
          <div className="story-grid">
            {savedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="empty-state compact-empty">
            <Bookmark size={30} />
            <h2>
              {locale === "en"
                ? "Your shelves are waiting"
                : "你的书架还在等待"}
            </h2>
            <p>
              {locale === "en"
                ? "Save a story and it will appear here."
                : "收藏一部作品，它就会出现在这里。"}
            </p>
            <Link href="/browse" className="text-link">
              {locale === "en" ? "Browse the archive" : "浏览片库"}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {recentStories.length > 0 && (
        <div className="library-block">
          <div className="subsection-title">
            <History size={18} />
            <h2>{locale === "en" ? "Continue listening" : "继续收听"}</h2>
            <span>{recentStories.length.toString().padStart(2, "0")}</span>
          </div>
          <div className="story-grid">
            {recentStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
