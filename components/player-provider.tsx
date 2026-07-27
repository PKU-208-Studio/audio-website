"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { episodeById } from "@/lib/data";
import { track } from "@/lib/analytics";
import type { Episode, PlaybackProgress, Story } from "@/lib/types";

type Playable = { story: Story; episode: Episode };

type PlayerContextValue = {
  current: Playable | null;
  isPlaying: boolean;
  progress: PlaybackProgress;
  favorites: string[];
  play: (story: Story, episode: Episode) => void;
  setIsPlaying: (playing: boolean) => void;
  setProgress: (episodeId: string, seconds: number, duration: number) => void;
  playAdjacent: (direction: -1 | 1) => void;
  toggleFavorite: (storyId: string) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Playable | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState<PlaybackProgress>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      setProgressState(
        JSON.parse(localStorage.getItem("reel-progress") || "{}"),
      );
      setFavorites(
        JSON.parse(localStorage.getItem("reel-favorites") || "[]"),
      );
      const lastEpisodeId = localStorage.getItem("reel-last-episode");
      if (lastEpisodeId) {
        const found = episodeById(lastEpisodeId);
        if (found) setCurrent(found);
      }
    } catch {
      localStorage.removeItem("reel-progress");
      localStorage.removeItem("reel-favorites");
    }
  }, []);

  const play = useCallback((story: Story, episode: Episode) => {
    setCurrent({ story, episode });
    setIsPlaying(true);
    localStorage.setItem("reel-last-episode", episode.id);
    track("episode_play", {
      storyId: story.id,
      episodeId: episode.id,
      episodeNumber: episode.number,
    });
  }, []);

  const setProgress = useCallback(
    (episodeId: string, seconds: number, duration: number) => {
      setProgressState((existing) => {
        const next = {
          ...existing,
          [episodeId]: {
            seconds,
            duration,
            updatedAt: new Date().toISOString(),
          },
        };
        localStorage.setItem("reel-progress", JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const playAdjacent = useCallback(
    (direction: -1 | 1) => {
      if (!current) return;
      const index = current.story.episodes.findIndex(
        (episode) => episode.id === current.episode.id,
      );
      const next = current.story.episodes[index + direction];
      if (next) play(current.story, next);
    },
    [current, play],
  );

  const toggleFavorite = useCallback((storyId: string) => {
    setFavorites((existing) => {
      const isSaved = existing.includes(storyId);
      const next = isSaved
        ? existing.filter((id) => id !== storyId)
        : [...existing, storyId];
      localStorage.setItem("reel-favorites", JSON.stringify(next));
      track(isSaved ? "story_unfavorited" : "story_favorited", { storyId });
      return next;
    });
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      current,
      isPlaying,
      progress,
      favorites,
      play,
      setIsPlaying,
      setProgress,
      playAdjacent,
      toggleFavorite,
    }),
    [
      current,
      favorites,
      isPlaying,
      play,
      playAdjacent,
      progress,
      setProgress,
      toggleFavorite,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}
