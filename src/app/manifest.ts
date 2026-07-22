import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Retech Solutions",
    short_name: "Retech",
    description:
      "Vietnam-based IT outsourcing company delivering custom CMS, CRM, ERP & AI-powered software solutions.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FAFAF8",
    theme_color: "#208535",
    categories: ["business", "technology", "productivity"],
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/icon?s=32",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon?s=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon?s=512",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon?s=192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon?s=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/og-image.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide",
        label: "Retech Solutions landing page",
      },
    ],
  };
}
