import { ImageResponse } from "next/og";

export const alt = "Retech Solutions — Custom Software Development from Vietnam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Real Retech hexagonal-R logo, drawn from the canonical SVG paths.
// Translated + centered in a 612x612 viewBox for consistent geometry.
const RetechLogo = ({ size = 96, color = "#ffffff" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 611 611"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(31.5,0)">
      <path
        fill={color}
        d="M288.226 166C381.006 166 398 212.342 398 254c0 31.159-11 43.5-11 43.5s-5 10-9.5 12l-3.5 4-3.5 4-2 1.5-3.5 3-3 1.5-4.5 3-8.5 5-13 5-15.5 4-16 1.5H266l121 127-51 35.354-144.5-151.051-60-63.803H245c-1.39.13 1.398-.097 0 0h13c80.726 2.873 78-16 81-35-3-19-1.037-41-94-35.585H74V176.5l42.5-10.5z"
      />
      <path
        fill={color}
        d="M311.528 574.341c-12.495 9.477-44.793 18.904-73.062 2.41L56.638 469.628c-29.242-17.061-35.634-41.018-34.186-70.492 0 0 46.47-3.453 53.54-15.572-.377.646.05 24.824.552 26.334.01 5.091 6.968 13.983 11.502 15.998l50.611 28.834c29.25 17.065 130.257 78.093 137.771 82.099 16.038 13.009 35.1 37.512 35.1 37.512"
      />
      <path
        fill={color}
        d="M61.268 471.448c-14.5-5.974-38.986-29.049-39.081-61.778l.28-211.037c-.1-33.856 17.39-50.903 43.539-64.582 0 0 27.295 37.859 41.325 37.818-.748.002-22.232 12.479-23.28 13.677-4.385 2.586-8.528 13.09-7.97 18.02l.77 58.243c.1 33.865-1.366 151.867-1.015 160.375-3.094 20.417-14.568 49.264-14.568 49.264"
      />
      <path
        fill={color}
        d="M23.48 203.354c-2.095-15.541 5.607-48.293 33.883-64.775L240.139 33.082c29.25-17.049 51.927-11.307 76.867 4.468 0 0-18.249 43.444-11.184 55.566-.377-.646-21.939-12.987-23.5-13.294-4.436-2.5-15.602-.822-19.589 2.132l-50.018 29.849c-29.258 17.053-132.114 74.909-139.301 79.476-19.22 7.552-49.933 12.075-49.933 12.075"
      />
      <path
        fill={color}
        d="M237.534 35.327c12.57-9.377 44.942-18.543 73.078-1.823l180.961 108.581c29.105 17.295 35.303 41.303 33.618 70.765 0 0-46.517 3.639-53.685 15.701.382-.643.172-25.383-.318-26.898.032-5.091-6.856-14.039-11.373-16.09l-50.377-29.239c-29.113-17.301-129.626-79.138-137.107-83.205-15.933-13.137-34.797-37.792-34.797-37.792"
      />
      <path
        fill={color}
        d="M485.54 144.117c14.222 5.756 39.781 28.172 39.966 59.933l-1.195 204.711c.191 32.854-17.225 49.44-42.805 62.789 0 0-26.518-36.654-40.264-36.574.733-.004 21.746-12.174 22.77-13.339 4.289-2.523 8.319-12.728 7.757-17.511l-.916-56.52c-.191-32.864.918-147.384.55-155.64 2.975-19.823 14.137-47.849 14.137-47.849"
      />
      <path
        fill={color}
        d="M523.3 400.914c2.433 15.493-4.556 48.404-32.468 65.495L310.389 575.85c-28.872 17.679-53 11.966-78.276-3.264 0 0 18.632-43.365 11.306-55.33.39.638 22.215 12.508 23.783 12.781 4.489 2.402 15.616.482 19.538-2.557l49.358-30.928c28.881-17.684 130.457-77.76 137.543-82.482 19.052-7.967 49.659-13.156 49.659-13.156"
      />
    </g>
  </svg>
);

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Deep charcoal base + brand gradient glow — premium, readable in
          // both light and dark social feed UIs (LinkedIn, Twitter, Slack).
          background:
            "radial-gradient(ellipse 80% 60% at 80% 20%, rgba(32,133,53,0.35) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(6,182,212,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 60%), #0A0F0D",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle noise/grid overlay via SVG pattern (drawn as background-image) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 50%, black 0%, transparent 80%)",
            display: "flex",
          }}
        />

        {/* Top: logo + company name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(32,133,53,0.25), rgba(6,182,212,0.15))",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <RetechLogo size={40} color="#ffffff" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "-0.01em",
                display: "flex",
              }}
            >
              Retech Solutions
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 4,
                display: "flex",
              }}
            >
              Vietnam · Globally Delivered
            </div>
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: -20,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>Turning Ideas</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span
                style={{
                  background:
                    "linear-gradient(95deg, #2EA043 0%, #06B6D4 60%, #8B5CF6 100%)",
                  backgroundClip: "text",
                  color: "#2EA043",
                  WebkitBackgroundClip: "text",
                  display: "flex",
                }}
              >
                Solutions.
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.72)",
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
              marginTop: 28,
              maxWidth: 800,
              display: "flex",
            }}
          >
            Custom software, CMS, CRM, ERP &amp; AI products — engineered for scale.
          </div>
        </div>

        {/* Bottom: stat strip + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 36,
            }}
          >
            <Stat value="50+" label="Projects" />
            <Divider />
            <Stat value="30+" label="Engineers" />
            <Divider />
            <Stat value="5+" label="Years" />
            <Divider />
            <Stat value="98%" label="Satisfaction" />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#2EA043",
                boxShadow: "0 0 12px rgba(46,160,67,0.8)",
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "-0.01em",
                display: "flex",
              }}
            >
              retech.asia
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.03em",
          display: "flex",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginTop: 4,
          display: "flex",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 36,
        backgroundColor: "rgba(255,255,255,0.12)",
        display: "flex",
      }}
    />
  );
}
