"use client"

import { ThemeProvider } from "@emotion/react";
import ErrorBoundary from "./ErrorBoundary";
import { muiTheme } from "../style/theme";


export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ErrorBoundary>
  );
}