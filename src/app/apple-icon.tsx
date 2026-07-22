import { ImageResponse } from "next/og";

// Image metadata
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#208535",
          borderRadius: "22%",
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "white",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
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
