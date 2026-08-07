/**
 * Root layout — pass-through only.
 *
 * Per next-intl App Router pattern, `<html lang>` and `<body>` live in
 * `src/app/[locale]/layout.tsx` so the `lang` attribute can vary per locale.
 * Next.js requires a root `layout.tsx` to exist, but it must not render
 * `<html>`/`<body>` when a child segment owns them.
 *
 * Do NOT add metadata, providers, fonts, or chrome here — those belong in
 * `[locale]/layout.tsx` so they re-render correctly when the locale changes.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
