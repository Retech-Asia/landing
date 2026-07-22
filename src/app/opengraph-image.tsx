import { ImageResponse } from "next/og";

export const alt = "Retech Solutions — Custom Software Development from Vietnam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAFAF8",
          padding: "80px",
        }}
      >
        {/* Top bar: logo placeholder + company name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#208535",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 22V6h3.5l2.5 8 2.5-8H20v16h-3V12l-2 10h-2l-2-10v10H8z"
                fill="white"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#0A0A0A",
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            Retech Solutions
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex" }}>Turning Ideas</span>
          <span style={{ display: "flex" }}>
            into{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #208535 0%, #06B6D4 50%, #8B5CF6 100%)",
                backgroundClip: "text",
                color: "#208535",
              }}
            >
              Solutions
            </span>
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            marginTop: 24,
            maxWidth: 750,
            display: "flex",
          }}
        >
          Custom Software Development from Vietnam
        </div>

        {/* Bottom section: services pills + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
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
                fontSize: 15,
                fontWeight: 500,
                color: "#208535",
                backgroundColor: "rgba(32, 133, 53, 0.08)",
                padding: "8px 16px",
                borderRadius: 8,
                display: "flex",
              }}
            >
              CMS
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#06B6D4",
                backgroundColor: "rgba(6, 182, 212, 0.08)",
                padding: "8px 16px",
                borderRadius: 8,
                display: "flex",
              }}
            >
              CRM
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#8B5CF6",
                backgroundColor: "rgba(139, 92, 246, 0.08)",
                padding: "8px 16px",
                borderRadius: 8,
                display: "flex",
              }}
            >
              ERP
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#208535",
                backgroundColor: "rgba(32, 133, 53, 0.08)",
                padding: "8px 16px",
                borderRadius: 8,
                display: "flex",
              }}
            >
              AI Solutions
            </div>
          </div>

          <div
            style={{
              fontSize: 16,
              color: "#A3A3A3",
              letterSpacing: "0.02em",
              display: "flex",
            }}
          >
            retech.asia
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            marginTop: 32,
            width: "100%",
            height: 4,
            borderRadius: 2,
            display: "flex",
            background: "linear-gradient(90deg, #208535, #06B6D4, #8B5CF6)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
