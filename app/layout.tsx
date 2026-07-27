import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/app-providers";
import { AppShell } from "@/components/app-shell";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://the-reel.example.com",
  ),
  title: {
    default: "The Reel — Cinematic Audio Stories",
    template: "%s · The Reel",
  },
  description:
    "Original serialized fiction performed in cinematic sound. Mystery, thriller, science fiction, dark romance, and horror.",
  applicationName: "The Reel",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Reel",
  },
  openGraph: {
    title: "The Reel — Cinematic Audio Stories",
    description: "Close your eyes. We’ll handle the picture.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
