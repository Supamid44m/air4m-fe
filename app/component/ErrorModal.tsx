"use client";

import React from "react";

type Props = {
  error?: (Error & { digest?: string }) | null  ;
  onClose: () => void;
  onRetry: () => void;
};

export default function ErrorModal({ error, onClose, onRetry }: Props) {
  React.useEffect(() => {
    if (error) {
      console.error("ErrorModal received error:", error);
    }
  }, [error]);

  if (!error) return null;

  return (
    <div className="modal">

    <div className="w-1/2 bg-red-500 p-4 rounded absolute z-1000">
      <button onClick={onClose}>Close</button>

      <h2 className="font-bold">Something went wrong</h2>
      <p>{error.message}</p>

      {error.digest && <small>digest: {error.digest}</small>}

      <div className="mt-4 flex gap-2">
        <button onClick={onRetry}>Retry</button>
      </div>
    </div>
    </div>
  );
}