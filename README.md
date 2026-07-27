# The Reel

A deployable bilingual listening-site MVP based on `style-B-暗黑剧场.html`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run typecheck
npm run build
npm start
```

The project deploys without environment variables on Vercel or any Node host.
Set `NEXT_PUBLIC_SITE_URL` to the public origin before production so sitemap and
canonical metadata use the real domain.

## Included product flows

- Bilingual cinematic home page and genre spotlight
- Searchable/filterable story archive
- Story detail and episode list
- Persistent global audio player with resume progress
- Saved library and continue-listening state
- Mobile responsive layout and installable web-app manifest
- A first-party `/api/events` endpoint for behavioral events

Sample content and local audio live in `lib/data.ts` and `public/audio`.

## Analytics handoff

The browser emits stable events through `lib/analytics.ts`. Configure
`ANALYTICS_WEBHOOK_URL` and the optional `ANALYTICS_WEBHOOK_TOKEN` to forward
them to a warehouse, Supabase Edge Function, PostHog proxy, or another
first-party event collector. Without configuration, the endpoint safely accepts
events and development builds print them to the console.

## Future iOS and Android path

The web UI is intentionally separated from `lib/types.ts`, `lib/data.ts`,
analytics, playback state, and stable IDs. A future Expo app can consume the same
content API and port those domain contracts into a shared `packages/core`
workspace while replacing only web-specific components and CSS.

Recommended evolution:

1. Replace sample story data with a versioned content API.
2. Move types, API client, analytics events, and playback reducers to
   `packages/core`.
3. Add `apps/mobile` with Expo Router and `expo-av`.
4. Replace local favorites/progress with authenticated sync while keeping local
   optimistic persistence.

Do not wrap the full Next.js site in a WebView for the final native apps; share
the product logic and data contracts, then build native presentation and audio
controls.
