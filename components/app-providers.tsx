"use client";

import { LanguageProvider } from "@/components/language-provider";
import { PlayerProvider } from "@/components/player-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </LanguageProvider>
  );
}
