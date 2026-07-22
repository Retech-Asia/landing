import { ImageResponse } from "next/og";

// Image metadata
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Image generation — branded favicon using the Retech green gradient
// (matches the hero gradient headline + og-image palette).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #208535 0%, #186B2B 60%, #06b6d4 100%)",
          borderRadius: "22%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft glow accent in the top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
          }}
        />
        <span
          style={{
            fontSize: 320,
            fontWeight: 800,
            color: "white",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            textShadow: "0 4px 24px rgba(0,0,0,0.18)",
          }}
        >
          R
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
