import type { Story } from "@/lib/types";

export function StoryPoster({
  story,
  compact = false,
}: {
  story: Story;
  compact?: boolean;
}) {
  return (
    <div
      className={`story-poster poster-${story.posterVariant} ${
        story.posterImageSrc ? "has-poster-image" : ""
      } ${
        compact ? "compact" : ""
      }`}
      style={
        {
          "--poster-accent": story.accent,
          ...(story.posterImageSrc
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(4, 5, 7, 0.02) 0%, rgba(4, 5, 7, 0.16) 42%, rgba(4, 5, 7, 0.92) 100%), url(${story.posterImageSrc})`,
                backgroundPosition: story.posterImagePosition ?? "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : {}),
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="poster-haze" />
      <span className="poster-kicker">THE REEL PRESENTS</span>
      {!story.posterImageSrc && (
        <div className="poster-glyph">
          <i />
          <i />
          <i />
        </div>
      )}
      <strong>{story.title.en}</strong>
      <span className="poster-credit">AN AUDIO ORIGINAL</span>
    </div>
  );
}
