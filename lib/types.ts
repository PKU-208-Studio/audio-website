export type Locale = "en" | "zh";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type GenreId =
  | "noir"
  | "thriller"
  | "sci-fi"
  | "dark-romance"
  | "horror";

export type Episode = {
  id: string;
  storyId: string;
  number: number;
  title: LocalizedText;
  description: LocalizedText;
  durationSeconds: number;
  audioSrc: string;
  isFree: boolean;
};

export type Story = {
  id: string;
  slug: string;
  genre: GenreId;
  title: LocalizedText;
  eyebrow: LocalizedText;
  logline: LocalizedText;
  description: LocalizedText;
  author: string;
  narrator: string;
  year: number;
  rating: number;
  mature: boolean;
  accent: string;
  posterVariant: number;
  posterImageSrc?: string;
  posterImagePosition?: string;
  episodes: Episode[];
};

export type PlaybackProgress = Record<
  string,
  { seconds: number; duration: number; updatedAt: string }
>;
