"use client";

import React from "react";

type Props = {
  error?: (Error & { digest?: string }) | null;
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
    <div className="modal-card absolute bg-gray-500/50 flex flex-row justify-center items-center">
      <div className="bg-slate-50 w-80 flex flex-col p-5">
        <h2 className="font-bold">Something went wrong! </h2>
        <span>
          <p>{error.message ?? "No message"}</p>
          {error.digest && <small>digest: {error.digest}</small>}
        </span>

        <div className="mt-4 flex gap-2 justify-end">
          <button onClick={onRetry}>Retry</button>
          <button onClick={onClose} className="flex ">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
