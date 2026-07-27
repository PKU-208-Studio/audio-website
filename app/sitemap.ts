import type { MetadataRoute } from "next";
import { stories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://the-reel.example.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/browse`, changeFrequency: "weekly", priority: 0.8 },
    ...stories.map((story) => ({
      url: `${base}/stories/${story.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
