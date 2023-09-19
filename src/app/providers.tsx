"use client";

import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
