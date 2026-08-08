import { ImageResponse } from "next/og";
import { industries } from "@/lib/industries-data";
import { routing, type Locale } from "@/i18n/routing";

export const alt = "Retech Solutions Industry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industries.map((industry) => ({ locale, slug: industry.slug[locale] }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const loc = locale as Locale;
  const industry = industries.find((i) => i.slug[loc] === slug);

  const title = industry?.name[loc] ?? "Industry";
  const rawSubtitle = industry?.longDescription[loc] ?? "Custom software for your industry.";
  const subtitle =
    rawSubtitle.length > 110
      ? rawSubtitle.slice(0, 107).replace(/\s+\S*$/, "") + "..."
      : rawSubtitle;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#FAFAF8",
          padding: "80px",
        }}
      >
        {/* Subtle gradient accent — top right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(32,133,53,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#208535",
              backgroundColor: "rgba(32, 133, 53, 0.1)",
              padding: "6px 16px",
              borderRadius: 6,
            }}
          >
            Industry
          </div>
        </div>

        {/* Industry title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Industry subtitle */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
            marginBottom: "auto",
            maxWidth: 950,
          }}
        >
          {subtitle}
        </div>

        {/* Bottom bar: branding + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 24,
                height: 4,
                backgroundColor: "#208535",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "#525252",
              }}
            >
              Retech Solutions
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#A3A3A3",
              letterSpacing: "0.02em",
            }}
          >
            retech.asia
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #208535, #06B6D4)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
