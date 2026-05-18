import NavBar from "@/components/layout/NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

function LayoutSyntax() {
  const queryClient = useQueryClient();

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

  return (
    <div>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayoutSyntax;  