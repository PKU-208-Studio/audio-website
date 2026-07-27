import type { Metadata } from "next";
import { BrowsePage } from "@/components/browse-page";

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse every cinematic audio story in The Reel archive.",
};

export default function Page() {
  return <BrowsePage />;
}
