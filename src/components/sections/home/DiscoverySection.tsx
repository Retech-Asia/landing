import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useTranslations } from "next-intl";

/**
 * Discovery section (Hallmark B1, approved composition act: "We start with
 * how your business works"). Immersive full-bleed section that the Concept II
 * scroll transition will hand off into (keyframes doc beat 4). AR-1 becomes
 * the permanent backdrop; until the asset is approved by ChatGPT, a registry
 * photo stands in per the asset-ownership law (placeholders never block).
 *
 * AR-1 swap point: replace BACKDROP below with the approved AR-1 landscape
 * master (portrait master swapped in via the `max-md:` variant or a client
 * breakpoint when it arrives), add `placeholder="blur"` + blurDataURL for
 * the beat-3 blur-to-sharp settle. Content stays anchored lower-left so the
 * left third (landscape) / upper third (portrait) of AR-1 remain calm.
 */
const BACKDROP = {
  src: "/images/photo/photo-consulting-workshop.webp",
  alt: "Workshop wall during a working session",
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
        className="object-cover"
      />
      {/* Photo overlay law: black scrim only */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

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
