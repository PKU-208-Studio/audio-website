import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/library" },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://the-reel.example.com"}/sitemap.xml`,
  };
}
