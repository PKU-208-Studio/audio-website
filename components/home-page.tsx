"use client";

import Link from "next/link";
import { ArrowRight, Headphones, Play, RadioTower } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { usePlayer } from "@/components/player-provider";
import { StoryCard } from "@/components/story-card";
import { StoryPoster } from "@/components/story-poster";
import { featuredStory, genres, stories } from "@/lib/data";
import type { GenreId, Story } from "@/lib/types";

export function HomePage() {
  const { locale, text } = useLanguage();
  const { play } = usePlayer();
  const [activeGenre, setActiveGenre] = useState<GenreId>("noir");
  const active = genres.find((genre) => genre.id === activeGenre) ?? genres[0];
  const nowShowingStories = stories.filter((story) => story.slug !== "off-script");

  return (
    <>
      <section
        className="hero"
        style={{ "--spot": active.color } as React.CSSProperties}
      >
        <div className="hero-spotlight" aria-hidden="true" />
        <div className="hero-copy">
          <div className="marquee">
            <span />
            {locale === "en"
              ? "TONIGHT'S FEATURE PRESENTATION"
              : "今夜首映"}
            <span />
          </div>
          <p className="hero-overline">{text(featuredStory.eyebrow)}</p>
          <h1>
            {locale === "en" ? (
              <>
                Step into the <em>dark,</em>
                <br />
                the story begins
              </>
            ) : (
              <>
                走进<em>黑暗，</em>
                <br />
                故事开场
              </>
            )}
          </h1>
          <p className="hero-tagline">
            {locale === "en"
              ? "Every genre, lit by its own light."
              : "每一种题材，都有属于它的那束光。"}
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-cta"
              onClick={() =>
                play(featuredStory, featuredStory.episodes[0])
              }
            >
              <Play size={17} fill="currentColor" />
              {locale === "en" ? "Listen now" : "立即收听"}
            </button>
            <Link
              className="text-link"
              href={`/stories/${featuredStory.slug}`}
            >
              {locale === "en" ? "View the feature" : "查看本期主打"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <div className="stage-beam" aria-hidden="true" />
          <StoryPoster story={featuredStory} />
          <div className="hero-caption">
            <span>{locale === "en" ? "NOW PLAYING" : "正在播放"}</span>
            <strong>{text(featuredStory.title)}</strong>
            <small>
              {locale === "en" ? "STARRING" : "演播"} {featuredStory.narrator}
            </small>
          </div>
        </div>

        <div className="genre-marquee" aria-label="Genres">
          {genres.map((genre) => (
            <button
              type="button"
              key={genre.id}
              className={genre.id === activeGenre ? "active" : ""}
              style={{ "--genre-color": genre.color } as React.CSSProperties}
              onMouseEnter={() => setActiveGenre(genre.id)}
              onFocus={() => setActiveGenre(genre.id)}
              onClick={() => setActiveGenre(genre.id)}
            >
              <span>NO. {genre.number}</span>
              <strong>{text(genre.name)}</strong>
              {/* <small>{text(genre.description)}</small> */}
            </button>
          ))}
        </div>
      </section>

      <section className="story-section" id="now-showing">
        <div className="section-heading">
          <div>
            <span className="section-number">01</span>
            <p>{locale === "en" ? "CURATED THIS WEEK" : "本周精选"}</p>
            <h2>{locale === "en" ? "Now Showing" : "正在放映"}</h2>
          </div>
          <Link href="/browse" className="text-link">
            {locale === "en" ? "Enter the archive" : "进入片库"}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="story-grid">
          {nowShowingStories.slice(0, 4).map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <section className="editorial-panel" id="about">
        <div className="editorial-number">24</div>
        <div>
          <p className="eyebrow">
            {locale === "en" ? "A DIFFERENT KIND OF SCREEN" : "另一种银幕"}
          </p>
          <h2>
            {locale === "en"
              ? "Close your eyes. We’ll handle the picture."
              : "闭上眼睛，画面交给我们。"}
          </h2>
          <p>
            {locale === "en"
              ? "Original serialized fiction, performed in cinematic sound. Built for late trains, long walks, and rooms with the lights turned low."
              : "以电影级声音演绎的原创连载故事。适合夜班列车、漫长散步，以及那些只留一盏暗灯的房间。"}
          </p>
        </div>
        <div className="editorial-stats">
          <span>
            <Headphones />
            <strong>5</strong>
            {locale === "en" ? "ORIGINAL SERIES" : "部原创剧集"}
          </span>
          <span>
            <RadioTower />
            <strong>15</strong>
            {locale === "en" ? "EPISODES ON AIR" : "集正在播出"}
          </span>
        </div>
      </section>
    </>
  );
}
