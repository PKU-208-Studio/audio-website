"use client";

import { Clock3, Headphones, LockKeyhole, Play, Star } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { useLanguage } from "@/components/language-provider";
import { usePlayer } from "@/components/player-provider";
import { StoryCard } from "@/components/story-card";
import { StoryPoster } from "@/components/story-poster";
import { stories } from "@/lib/data";
import type { Story } from "@/lib/types";

function formatDuration(seconds: number) {
  return `${Math.round(seconds / 60)} min`;
}

export function StoryDetail({ story }: { story: Story }) {
  const { locale, text } = useLanguage();
  const { play, progress } = usePlayer();
  const related = stories
    .filter((item) => item.id !== story.id)
    .slice(0, 3);

  return (
    <>
      <section
        className="story-detail-hero"
        style={{ "--story-accent": story.accent } as React.CSSProperties}
      >
        <div className="story-detail-art">
          <StoryPoster story={story} />
        </div>
        <div className="story-detail-copy">
          <p className="eyebrow">{text(story.eyebrow)}</p>
          <h1>{text(story.title)}</h1>
          <blockquote>“{text(story.logline)}”</blockquote>
          <div className="story-meta">
            <span>
              <Star size={14} fill="currentColor" /> {story.rating}
            </span>
            <span>{story.year}</span>
            <span>
              {story.episodes.length}{" "}
              {locale === "en" ? "episodes" : "集"}
            </span>
            {story.mature && <span className="rating-badge">18+</span>}
          </div>
          <p className="story-description">{text(story.description)}</p>
          <dl>
            <div>
              <dt>{locale === "en" ? "WRITTEN BY" : "作者"}</dt>
              <dd>{story.author}</dd>
            </div>
            <div>
              <dt>{locale === "en" ? "PERFORMED BY" : "演播"}</dt>
              <dd>{story.narrator}</dd>
            </div>
          </dl>
          <div className="detail-actions">
            <button
              type="button"
              className="primary-cta"
              onClick={() => play(story, story.episodes[0])}
            >
              <Play size={17} fill="currentColor" />
              {locale === "en" ? "Play episode one" : "播放第一集"}
            </button>
            <FavoriteButton storyId={story.id} />
          </div>
        </div>
      </section>

      <section className="episode-section">
        <div className="section-heading">
          <div>
            <span className="section-number">01—{story.episodes.length}</span>
            <p>{locale === "en" ? "SEASON ONE" : "第一季"}</p>
            <h2>{locale === "en" ? "Episodes" : "剧集列表"}</h2>
          </div>
          <span className="headphone-note">
            <Headphones size={17} />
            {locale === "en"
              ? "Headphones recommended"
              : "建议佩戴耳机"}
          </span>
        </div>

        <div className="episode-list">
          {story.episodes.map((episode) => {
            const item = progress[episode.id];
            const percent =
              item?.duration > 0
                ? Math.min(100, (item.seconds / item.duration) * 100)
                : 0;
            return (
              <article key={episode.id} className="episode-row">
                <button
                  type="button"
                  className="episode-play"
                  onClick={() => play(story, episode)}
                  aria-label={`Play ${text(episode.title)}`}
                >
                  <Play size={18} fill="currentColor" />
                </button>
                <span className="episode-number">
                  {episode.number.toString().padStart(2, "0")}
                </span>
                <div className="episode-copy">
                  <h3>{text(episode.title)}</h3>
                  <p>{text(episode.description)}</p>
                  {percent > 0 && (
                    <span className="episode-progress">
                      <i style={{ width: `${percent}%` }} />
                    </span>
                  )}
                </div>
                <span className="episode-duration">
                  {!episode.isFree && <LockKeyhole size={13} />}
                  <Clock3 size={13} />
                  {formatDuration(episode.durationSeconds)}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="related-section">
        <div className="section-heading">
          <div>
            <p>{locale === "en" ? "AFTER THE CREDITS" : "片尾之后"}</p>
            <h2>{locale === "en" ? "Listen Next" : "接着收听"}</h2>
          </div>
        </div>
        <div className="story-grid">
          {related.map((item) => (
            <StoryCard key={item.id} story={item} />
          ))}
        </div>
      </section>
    </>
  );
}
