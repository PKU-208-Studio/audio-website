"use client";

import Link from "next/link";
import { Bookmark, Play } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { usePlayer } from "@/components/player-provider";
import { StoryPoster } from "@/components/story-poster";
import type { Story } from "@/lib/types";

export function StoryCard({ story }: { story: Story }) {
  const { text, locale } = useLanguage();
  const { favorites, play, toggleFavorite, progress } = usePlayer();
  const saved = favorites.includes(story.id);
  const firstUnfinished =
    story.episodes.find((episode) => {
      const item = progress[episode.id];
      return !item || !item.duration || item.seconds / item.duration < 0.95;
    }) ?? story.episodes[0];

  return (
    <article className="story-card">
      <Link
        className="poster-link"
        href={`/stories/${story.slug}`}
        aria-label={text(story.title)}
      >
        <StoryPoster story={story} />
        <span className="poster-play" aria-hidden="true">
          <Play size={19} fill="currentColor" />
        </span>
      </Link>
      <div className="story-card-copy">
        <div>
          <p>{text(story.eyebrow)}</p>
          <Link href={`/stories/${story.slug}`}>
            <h3>{text(story.title)}</h3>
          </Link>
          <span>
            {story.episodes.length} {locale === "en" ? "episodes" : "集"} ·{" "}
            {story.narrator}
          </span>
        </div>
        <div className="card-actions">
          <button
            className="round-button"
            type="button"
            onClick={() => play(story, firstUnfinished)}
            aria-label={`${locale === "en" ? "Play" : "播放"} ${text(
              story.title,
            )}`}
          >
            <Play size={17} fill="currentColor" />
          </button>
          <button
            className={`save-button ${saved ? "saved" : ""}`}
            type="button"
            onClick={() => toggleFavorite(story.id)}
            aria-label={saved ? "Remove from library" : "Save to library"}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
