"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

/**
 * "Was this article helpful?" feedback widget.
 * Displays thumbs-up / thumbs-down buttons. On click, shows a thank-you
 * message. No actual data is submitted -- this is a UI-only widget.
 */
export function FeedbackWidget() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  if (feedback) {
    return (
      <div className="mt-10 pt-8 border-t border-black/[0.06] text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-medium text-brand">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 8.5L6.5 11L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Thanks for your feedback!
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 pt-8 border-t border-black/[0.06]">
      <p className="text-sm text-foreground-muted text-center mb-3">
        Was this article helpful?
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setFeedback("up")}
          aria-label="Yes, this article was helpful"
          className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-4 py-2 text-sm font-medium text-foreground-secondary hover:border-brand/30 hover:bg-brand/5 hover:text-brand transition-all duration-200 cursor-pointer"
        >
          <ThumbsUp size={15} />
          Yes
        </button>
        <button
          type="button"
          onClick={() => setFeedback("down")}
          aria-label="No, this article was not helpful"
          className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] px-4 py-2 text-sm font-medium text-foreground-secondary hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
        >
          <ThumbsDown size={15} />
          No
        </button>
      </div>
    </div>
  );
}
