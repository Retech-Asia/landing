"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Discovery section (Hallmark B1: "We start with how your business works").
 *
 * SIMPLIFIED 2026-10-27 (owner creative direction: "prioritize visual
 * elegance, simplicity, and usability over cinematic complexity"; removing
 * the pinned sequence was explicitly sanctioned). The reveal is a one-shot,
 * scroll-triggered masked entrance — no sticky region, no scroll-jacking,
 * no schematic line-work: as the section enters the viewport the AR-1 photo
 * masks out from the whiteboard zone (the same hub the previous transition
 * used) and settles from a slight blur/scale while the scrim rises with it.
 * The copy is in the DOM and readable throughout; it drifts up a few pixels
 * on the same beat.
 *
 * Implementation note: deliberately NOT framer-motion whileInView — in this
 * environment (framer-motion 12.39 + React 19.2) the in-view trigger never
 * fires (probe 2026-10-27: initial styles applied, observer silent). A plain
 * IntersectionObserver + CSS transitions is deterministic and cheaper.
 *
 * Laws preserved: AR-1 renders exactly ONCE on the page (the hero no longer
 * touches it); temporary mobile crop (portrait master not yet approved);
 * black-scrim-only overlay law; one-shot reveal; reduced motion renders the
 * settled state immediately with no transition; photo is lazy (below the
 * LCP frame).
 */
const BACKDROP = {
  src: "/images/studio/ar1-discovery-whiteboard.jpg",
  alt: "Engineering workshop wall with business process, system architecture, and user experience sketches",
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAGABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEC/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQQxAxIh0f/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiZHM1BQikbNb9+TD5JyH6IiimF3oitREmb//2Q==",
};

/** Mask start box: ~30% x 22% centered on the whiteboard zone (52/42). */
const MASK_START = "inset(31% 33% 47% 37% round 20px)";
const MASK_END = "inset(0% 0% 0% 0% round 0px)";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function DiscoverySection() {
  const t = useTranslations("home.discovery");
  const reduced = usePrefersReducedMotion();
  const secRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced) return; // settled immediately via `hold` below
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const hold = !revealed && !reduced;

  return (
    <section
      ref={secRef}
      className="relative flex min-h-[60vh] items-end overflow-hidden bg-black md:min-h-[78vh]"
      aria-label={t("label")}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          clipPath: hold ? MASK_START : MASK_END,
          opacity: hold ? 0 : 1,
          transform: hold ? "scale(1.06)" : "scale(1)",
          filter: hold ? "blur(6px)" : "blur(0px)",
          transition: reduced
            ? "none"
            : `opacity 1.1s ${EASE}, clip-path 1.1s ${EASE}, transform 1.1s ${EASE}, filter 1.1s ${EASE}`,
          willChange: "opacity, clip-path, transform, filter",
        }}
      >
        <div className="absolute inset-0">
          <Image
            src={BACKDROP.src}
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BACKDROP.blurDataURL}
            className="object-cover object-[center_38%]"
          />
        </div>
        {/* Photo overlay law: black scrim only, rising with the reveal.
            Mobile crop lands the headline in the diagram zone, so the scrim
            runs one step deeper there. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 max-md:from-black/90 max-md:via-black/45"
          style={{
            opacity: hold ? 0 : 1,
            transition: reduced ? "none" : `opacity 1.1s ${EASE}`,
          }}
        />
      </div>

      <Container className="relative z-10 pb-16 pt-24 md:pb-24">
        <div
          style={{
            transform: hold ? "translateY(16px)" : "translateY(0)",
            opacity: hold ? 0 : 1,
            transition: reduced
              ? "none"
              : `opacity 0.5s ${EASE}, transform 0.5s ${EASE}`,
          }}
        >
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
