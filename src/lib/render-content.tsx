import { Link } from "@/i18n/navigation";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";
import type { Locale } from "@/i18n/routing";

/**
 * Localize in-content route slugs.
 *
 * Article bodies are written with EN slugs for service/case-study links,
 * but those URLs are locale-specific (e.g. /en/services/erp-solutions vs
 * /vi/services/giai-phap-erp). The locale-aware <Link> only prefixes the
 * locale — it does not translate the slug — so under /vi an EN-slug path
 * 404s. Blog slugs are NOT localized here: VI bodies already link
 * translated targets by VI slug, and untranslated posts resolve at their
 * EN slug under /vi by design.
 */
function localizeHref(href: string, locale: Locale): string {
  if (locale === "en") return href;
  const m = href.match(/^\/(services|case-studies)\/([a-z0-9-]+)\/?$/);
  if (!m) return href;
  const [, base, enSlug] = m;
  if (base === "services") {
    const svc = services.find((s) => s.slug.en === enSlug);
    return svc ? `/${base}/${svc.slug[locale]}` : href;
  }
  const cs = caseStudies.find((c) => c.slug.en === enSlug);
  return cs ? `/${base}/${cs.slug[locale]}` : href;
}

/**
 * Parse markdown-style inline links [text](url) in a string and return
 * an array of React nodes (strings and <Link> elements).
 * Internal links (starting with /) use the locale-aware Link; external links open in a new tab.
 */
export function renderContent(text: string, locale: Locale): React.ReactNode[] {
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
          href={localizeHref(href, locale)}
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
