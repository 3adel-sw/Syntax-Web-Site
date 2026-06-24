import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/index";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Replaces the broken EventSource in LayoutSyntax — backend doesn't support SSE
      // (waiting on /api/events/stream — see docs/BACKEND-SSE-SPEC.md)
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      // Keep data fresh for 60s so tab switches don't trigger a refetch storm
      staleTime: 60_000,
      // Don't auto-retry on transient network errors (faster fail for users)
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);