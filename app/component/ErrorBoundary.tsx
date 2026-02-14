"use client";

import React from "react";
import ErrorModal from "./ErrorModal";

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorModal error={this.state.error} onClose={()=>null} onRetry={()=>null} />;
    }
    return this.props.children;
  }
}