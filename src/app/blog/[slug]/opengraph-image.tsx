import { ImageResponse } from "next/og";
import { blogPosts } from "@/lib/blog-data";

export const alt = "Blog post from Retech Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  const title = post?.title ?? "Retech Solutions Blog";
  const category = post?.category ?? "";
  const readTime = post?.readTime ?? "";

  // Pick accent color based on category
  const isTech = category === "Technology";
  const isGuide = category === "Guides";
  const accentColor = isTech ? "#06B6D4" : isGuide ? "#8B5CF6" : "#208535";
  const accentBg = isTech
    ? "rgba(6, 182, 212, 0.1)"
    : isGuide
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
        {/* Subtle gradient accent — top left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
          }}
        />

        {/* Top bar: category badge + read time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {category && (
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
              {category}
            </div>
          )}
          {readTime && (
            <div
              style={{
                fontSize: 15,
                color: "#737373",
              }}
            >
              {readTime}
            </div>
          )}
        </div>

        {/* Blog title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#0A0A0A",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "auto",
            maxWidth: 1000,
          }}
        >
          {title}
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
            background: `linear-gradient(90deg, ${accentColor}, #208535)`,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
