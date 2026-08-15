"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useLocale } from "next-intl";
import { trackEvent } from "@/lib/analytics";

/**
 * "Was this article helpful?" feedback widget.
 * Displays thumbs-up / thumbs-down buttons. On click, records the vote
 * via the consent-aware analytics pipeline and shows a thank-you message.
 */
export function FeedbackWidget() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const isVi = useLocale() === "vi";

  const vote = (value: "up" | "down") => {
    trackEvent("blog_feedback", { helpful: value });
    setFeedback(value);
  };

  if (feedback) {
    return (
      <div className="mt-10 pt-8 border-t border-card-border text-center">
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
          {isVi ? "Cảm ơn phản hồi của bạn!" : "Thanks for your feedback!"}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 pt-8 border-t border-card-border">
      <p className="text-sm text-foreground-muted text-center mb-3">
        {isVi ? "Bài viết này có hữu ích không?" : "Was this article helpful?"}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => vote("up")}
          aria-label={isVi ? "Có, bài viết này hữu ích" : "Yes, this article was helpful"}
          className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:border-brand/30 hover:bg-brand/5 hover:text-brand transition-all duration-200 cursor-pointer"
        >
          <ThumbsUp size={15} />
          {isVi ? "Có" : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => vote("down")}
          aria-label={isVi ? "Không, bài viết này không hữu ích" : "No, this article was not helpful"}
          className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-4 py-2 text-sm font-medium text-foreground-secondary hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-all duration-200 cursor-pointer"
        >
          <ThumbsDown size={15} />
          {isVi ? "Không" : "No"}
        </button>
      </div>
    </div>
  );
}
