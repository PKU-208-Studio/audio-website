"use client";

import { Bookmark } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { usePlayer } from "@/components/player-provider";

export function FavoriteButton({ storyId }: { storyId: string }) {
  const { favorites, toggleFavorite } = usePlayer();
  const { locale } = useLanguage();
  const saved = favorites.includes(storyId);
  return (
    <button
      type="button"
      className={`secondary-cta ${saved ? "saved" : ""}`}
      onClick={() => toggleFavorite(storyId)}
    >
      <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
      {saved
        ? locale === "en"
          ? "In My Library"
          : "已收藏"
        : locale === "en"
          ? "Save"
          : "收藏"}
    </button>
  );
}
