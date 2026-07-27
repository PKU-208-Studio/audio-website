import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Reel — Cinematic Audio Stories",
    short_name: "The Reel",
    description: "Original stories performed in cinematic sound.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0e",
    theme_color: "#0b0b0e",
    orientation: "portrait",
  };
}
