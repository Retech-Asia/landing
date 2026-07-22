"use client";

import { useState, useCallback } from "react";
import { X, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} by @RetechSolutions`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: create a temporary input element
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
        Share this article
      </p>
      <div className="flex items-center gap-2">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/[0.08] text-foreground-secondary hover:text-foreground hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200"
        >
          <X size={15} />
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/[0.08] text-foreground-secondary hover:text-foreground hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <button
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-black/[0.08] text-foreground-secondary hover:text-foreground hover:border-black/20 hover:bg-black/[0.03] transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <Check size={15} className="text-brand" />
          ) : (
            <Link2 size={15} />
          )}
        </button>
        {copied && (
          <span className="text-xs text-brand font-medium">Copied!</span>
        )}
      </div>
    </div>
  );
}
