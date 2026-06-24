import NavBar from "@/components/layout/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function LayoutSyntax() {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Live event-stream — when backend pushes a new event, invalidate the
    // React Query cache so all event-driven pages refetch in the user's language.
    // In dev, use a relative URL so the Vite dev-sse-plugin handles it
    // (mock stream that returns valid SSE). In production, hit the real backend.
    // See docs/BACKEND-SSE-SPEC.md for the protocol contract.
    const sseUrl = import.meta.env.DEV
      ? '/api/events/stream'
      : `${import.meta.env.VITE_API_URL}/events/stream`;
    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      // Stream connected — no action, the next onmessage will fire on a real event
    };

    eventSource.addEventListener("event-created", () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    });

    eventSource.addEventListener("event-updated", () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    });

    eventSource.addEventListener("ping", () => {
      // Heartbeat — keep-alive, no action needed
    });

    eventSource.onerror = () => {
      // Browser will auto-reconnect. Close only if permanently unreachable.
      // Backend should never return JSON here (that aborts the stream).
      if (eventSource.readyState === EventSource.CLOSED) {
        // Server closed connection; stop trying
        eventSource.close();
      }
    };

    return () => eventSource.close();
  }, [queryClient]);

  // Keep <html dir/lang> in sync with current i18n language
  useEffect(() => {
    const lng = (i18n.language || "ar").split("-")[0] || "ar";
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  }, [i18n.language]);

  return (
    <div>
      <ScrollRestoration />
      <NavBar />
      {/* Re-mount all routed pages on language change so API-backed content re-fetches
          with the new language, instead of showing stale translated strings. */}
      <Outlet key={i18n.language} />
    </div>
  );
}

export default LayoutSyntax;