/**
 * Blur placeholder data URL for Next.js Image components.
 *
 * This is a tiny 1x1 pixel PNG (light gray) encoded as base64.
 * It serves as a shimmer placeholder while the actual image loads,
 * providing a smooth loading experience without layout shift.
 *
 * Usage:
 *   <Image
 *     src="/images/photo.png"
 *     placeholder="blur"
 *     blurDataURL={BLUR_DATA_URL}
 *     ...
 *   />
 */
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
