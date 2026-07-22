import Link from "next/link";

/**
 * Parse markdown-style inline links [text](url) in a string and return
 * an array of React nodes (strings and <Link> elements).
 * Internal links (starting with /) use next/link; external links open in a new tab.
 */
export function renderContent(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match [text](url) — non-greedy text, non-whitespace url
  const linkRegex = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    // Push text before this link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const linkText = match[1];
    const href = match[2];
    const isInternal = href.startsWith("/");

    if (isInternal) {
      parts.push(
        <Link
          key={`link-${match.index}`}
          href={href}
          className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors"
        >
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`link-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors"
        >
          {linkText}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no links were found, return the original string
  if (parts.length === 0) {
    return [text];
  }

  return parts;
}
