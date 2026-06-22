import NavBar from "@/components/layout/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function LayoutSyntax() {
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/events`
    );

    eventSource.onmessage = () => {
      queryClient.invalidateQueries();
    };

    eventSource.onerror = () => {
      eventSource.close();
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