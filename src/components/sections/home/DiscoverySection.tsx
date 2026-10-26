import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";

/**
 * Discovery section (Hallmark B1, approved composition act: "We start with
 * how your business works"). Immersive full-bleed section that the Concept II
 * scroll transition will hand off into (keyframes doc beat 4).
 *
 * BACKDROP is AR-1, the owner-approved ChatGPT-generated discovery master
 * (2026-10-26). Original PNG master: assets/masters/ar1-discovery-whiteboard.png
 * (not web-served, kept for recomposition). Delivery master: q92 sRGB JPEG;
 * next/image derives all responsive sizes. The 4:5 portrait master is NOT yet
 * approved — mobile uses a temporary object-cover crop centered on the
 * whiteboard until it lands (open dependency, do not treat as final).
 *
 * Concept II match-cut anchor: the whiteboard plane is frontal with a
 * vanishing point near 52% x / 42% y (wall center); Beat 2 canvas convergence
 * and the dominant wall lines (whiteboard frame top/bottom) align to it.
 */
const BACKDROP = {
  src: "/images/studio/ar1-discovery-whiteboard.jpg",
  alt: "Engineering workshop wall with business process, system architecture, and user experience sketches",
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAGABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQQxAxIh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiZHM1BQikbNb9+TD5JyH6IiimF3oitREmb//2Q==",
};

export function DiscoverySection() {
  const t = useTranslations("home.discovery");

  return (
    <section
      className="relative flex min-h-[60vh] items-end overflow-hidden bg-black md:min-h-[78vh]"
      aria-label={t("label")}
    >
      <Image
        src={BACKDROP.src}
        alt={BACKDROP.alt}
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BACKDROP.blurDataURL}
        className="object-cover object-[center_38%]"
      />
      {/* Photo overlay law: black scrim only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      <Container className="relative z-10 pb-16 pt-24 md:pb-24">
        <div className="max-w-2xl">
          <p className="font-display text-base text-white/90" aria-hidden="true">
            <span className="font-semibold">{t("number")}</span>
            <span className="text-white/60"> {t("label")}</span>
          </p>
          <h2 className="mt-4 font-display-title text-3xl leading-[1.15] text-white text-balance md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            {t("body")}
          </p>
        </div>
      </Container>
    </section>
  );
}
