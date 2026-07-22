import { ImageResponse } from "next/og";
import { services } from "@/lib/services-data";

export const alt = "Retech Solutions Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  const title = service?.title ?? "Our Services";
  const subtitle = service?.subtitle ?? "Retech Solutions";

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
            Service
          </div>
        </div>

        {/* Service title */}
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

        {/* Service subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            marginBottom: "auto",
            maxWidth: 800,
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
