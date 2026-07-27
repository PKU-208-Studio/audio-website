import type { Metadata } from "next";
import { LibraryPage } from "@/components/library-page";

export const metadata: Metadata = {
  title: "My Library",
  description: "Saved stories and listening progress.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LibraryPage />;
}
