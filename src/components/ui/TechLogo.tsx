import {
  siDocker,
  siFlutter,
  siGo,
  siGooglemaps,
  siGrafana,
  siGraphql,
  siKubernetes,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siStripe,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

/**
 * Authentic technology logos for capability/stack surfaces (2026-10-27
 * owner direction: plain text pills felt unfinished — real logos are
 * explicitly allowed because they communicate technical information, not
 * decoration; the decorative-icon ban stays in force).
 *
 * Path data: simple-icons (MIT, reliably maintained, official geometry).
 * OpenAI and AWS were removed from simple-icons v10+ for brand-request
 * reasons and are NOT available in react-icons either — they render as a
 * neutral typographic wordmark rather than an unofficial logo copy
 * (official SVGs can replace these per the asset-ownership law).
 *
 * Rendering rules: brand hex per simple-icons; consistent optical sizing
 * via the `size` prop; unknown names render nothing so chips degrade to
 * text without fake icons.
 */

const ICONS: Record<string, SimpleIcon> = {
  React: siReact,
  "React Native": siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Vue.js": siVuedotjs,
  Flutter: siFlutter,
  "Node.js": siNodedotjs,
  Python: siPython,
  Go: siGo,
  GraphQL: siGraphql,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Redis: siRedis,
  TensorFlow: siTensorflow,
  LangChain: siLangchain,
  Vercel: siVercel,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  Nginx: siNginx,
  Grafana: siGrafana,
  Prisma: siPrisma,
  Stripe: siStripe,
  "Google Maps API": siGooglemaps,
};

/** Names rendered as a typographic wordmark (no official SVG available). */
const WORDMARKS: Record<string, string> = {
  AWS: "AWS",
  "AWS IoT": "AWS",
  OpenAI: "OpenAI",
};

/** True when TechLogo renders a mark (logo or wordmark) for this name. */
export function hasTechMark(name: string): boolean {
  return name in ICONS || name in WORDMARKS;
}

export function TechLogo({ name, size = 18 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (icon) {
    return (
      <svg
        role="img"
        aria-label={icon.title}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={`#${icon.hex}`}
        className="shrink-0"
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const wordmark = WORDMARKS[name];
  if (wordmark) {
    return (
      <span
        aria-hidden="true"
        className="shrink-0 font-semibold leading-none tracking-tight text-foreground-secondary"
        style={{ fontSize: Math.max(9, size * 0.58) }}
      >
        {wordmark}
      </span>
    );
  }
  return null;
}
