import { AudioPlayer } from "@/components/audio-player";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ambient-layer" aria-hidden="true" />
      <div className="vignette-layer" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />
      <div className="site-wrap">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <AudioPlayer />
    </>
  );
}
