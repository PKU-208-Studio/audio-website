"use client";

type EventProperties = Record<string, string | number | boolean | null>;

export function track(event: string, properties: EventProperties = {}) {
  const payload = {
    event,
    properties,
    occurredAt: new Date().toISOString(),
    sessionId: getSessionId(),
  };

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", payload);
  }

  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/events",
      new Blob([body], { type: "application/json" }),
    );
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}

function getSessionId() {
  if (typeof window === "undefined") return "server";
  const key = "reel-session-id";
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  sessionStorage.setItem(key, next);
  return next;
}
