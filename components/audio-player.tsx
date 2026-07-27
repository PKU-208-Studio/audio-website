"use client";

import {
  ListMusic,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { usePlayer } from "@/components/player-provider";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const {
    current,
    isPlaying,
    progress,
    setIsPlaying,
    setProgress,
    playAdjacent,
    play,
  } = usePlayer();
  const { text, locale } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const restoredEpisodeRef = useRef<string | null>(null);
  const lastPersistedSecondRef = useRef(-1);
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const currentId = current?.episode.id;

  useEffect(() => {
    if (!currentId || !audioRef.current) return;
    if (restoredEpisodeRef.current === currentId) return;
    const saved = progress[currentId]?.seconds ?? 0;
    audioRef.current.currentTime = saved;
    setPosition(saved);
    restoredEpisodeRef.current = currentId;
    lastPersistedSecondRef.current = Math.floor(saved);
  }, [currentId, progress]);

  useEffect(() => {
    if (!audioRef.current || !current) return;
    if (isPlaying) {
      void audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [current, isPlaying, setIsPlaying]);

  if (!current) return null;

  const episodeIndex = current.story.episodes.findIndex(
    (episode) => episode.id === current.episode.id,
  );
  const canGoBack = episodeIndex > 0;
  const canGoNext = episodeIndex < current.story.episodes.length - 1;
  const percent = duration > 0 ? (position / duration) * 100 : 0;

  const seek = (seconds: number) => {
    if (!audioRef.current) return;
    const next = Math.max(0, Math.min(duration || 0, seconds));
    audioRef.current.currentTime = next;
    setPosition(next);
  };

  return (
    <aside className={`audio-player ${expanded ? "expanded" : ""}`}>
      <audio
        ref={audioRef}
        src={current.episode.audioSrc}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          event.currentTarget.volume = volume;
        }}
        onTimeUpdate={(event) => {
          const next = event.currentTarget.currentTime;
          setPosition(next);
          const wholeSecond = Math.floor(next);
          if (
            wholeSecond % 5 === 0 &&
            wholeSecond !== lastPersistedSecondRef.current
          ) {
            lastPersistedSecondRef.current = wholeSecond;
            setProgress(
              current.episode.id,
              next,
              event.currentTarget.duration,
            );
          }
        }}
        onPause={() =>
          setProgress(current.episode.id, position, duration || position)
        }
        onEnded={() => {
          setProgress(current.episode.id, duration, duration);
          if (canGoNext) playAdjacent(1);
          else setIsPlaying(false);
        }}
      />

      <div className="player-progress">
        <span style={{ width: `${percent}%` }} />
        <input
          aria-label={locale === "en" ? "Playback position" : "播放进度"}
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={position}
          onChange={(event) => seek(Number(event.target.value))}
        />
      </div>

      <div className="player-inner">
        <Link
          href={`/stories/${current.story.slug}`}
          className="now-playing"
        >
          <span className="mini-art" style={{ background: current.story.accent }}>
            <i />
          </span>
          <span>
            <small>
              {locale === "en"
                ? `EPISODE ${current.episode.number}`
                : `第 ${current.episode.number} 集`}
            </small>
            <strong>{text(current.episode.title)}</strong>
            <em>{text(current.story.title)}</em>
          </span>
        </Link>

        <div className="transport">
          <button
            type="button"
            onClick={() => playAdjacent(-1)}
            disabled={!canGoBack}
            aria-label="Previous episode"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={() => seek(position - 15)}
            aria-label="Back 15 seconds"
          >
            <RotateCcw size={20} />
            <small>15</small>
          </button>
          <button
            className="main-play"
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>
          <button
            type="button"
            onClick={() => seek(position + 15)}
            aria-label="Forward 15 seconds"
          >
            <RotateCw size={20} />
            <small>15</small>
          </button>
          <button
            type="button"
            onClick={() => playAdjacent(1)}
            disabled={!canGoNext}
            aria-label="Next episode"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>

        <div className="player-tools">
          <span className="timecode">
            {formatTime(position)} / {formatTime(duration)}
          </span>
          <label className="volume">
            <Volume2 size={17} />
            <input
              aria-label="Volume"
              type="range"
              min="0"
              max="1"
              step=".05"
              value={volume}
              onChange={(event) => {
                const next = Number(event.target.value);
                setVolume(next);
                if (audioRef.current) audioRef.current.volume = next;
              }}
            />
          </label>
          <button
            type="button"
            className="queue-toggle"
            onClick={() => setExpanded((value) => !value)}
            aria-label="Show episode queue"
          >
            {expanded ? <X size={19} /> : <ListMusic size={19} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="player-queue">
          <p>{locale === "en" ? "UP NEXT" : "接下来播放"}</p>
          {current.story.episodes.map((episode) => (
            <button
              type="button"
              key={episode.id}
              className={episode.id === current.episode.id ? "active" : ""}
              onClick={() => play(current.story, episode)}
            >
              <span>{episode.number.toString().padStart(2, "0")}</span>
              <strong>{text(episode.title)}</strong>
              <small>{formatTime(episode.durationSeconds)}</small>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
