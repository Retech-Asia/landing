import { ImageResponse } from "next/og";
import { caseStudies } from "@/lib/case-studies-data";

export const alt = "Case Study from Retech Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  const title = study?.title ?? "Case Study";
  const tagline = study?.tagline ?? "Retech Solutions";
  const industry = study?.industry ?? "";

  // Pick accent color based on industry
  const isFinance = industry.toLowerCase().includes("finance");
  const accentColor = isFinance ? "#8B5CF6" : "#208535";
  const accentBg = isFinance
    ? "rgba(139, 92, 246, 0.1)"
    : "rgba(32, 133, 53, 0.1)";

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
            background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
          }}
        />

        {/* Top row: industry badge + "Case Study" label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {industry && (
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: accentColor,
                backgroundColor: accentBg,
                padding: "6px 16px",
                borderRadius: 6,
              }}
            >
              {industry}
            </div>
          )}
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#737373",
            }}
          >
            Case Study
          </div>
        </div>

        {/* Project title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            marginBottom: "auto",
          }}
        >
          {tagline}
        </div>

        {/* Bottom bar: branding + accent line */}
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
                width: 32,
                height: 4,
                backgroundColor: accentColor,
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
            background: `linear-gradient(90deg, ${accentColor}, #06B6D4)`,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
