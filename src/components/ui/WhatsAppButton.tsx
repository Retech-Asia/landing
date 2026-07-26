import { cn } from "@/lib/cn";

/**
 * WhatsApp CTA — reusable across navbar, footer, contact page.
 *
 * Replaces the old floating ChatWidget which:
 *   1. Overlapped other CTAs ("Get Free Consultation" hidden behind it)
 *   2. Was annoying on mobile (covered content, hard to dismiss)
 *   3. Provided zero context about what it does
 *
 * New approach: place this button where users expect contact options
 * (navbar CTA row, footer contact list, contact page), instead of
 * floating over the viewport.
 *
 * Number format for wa.me: country code + number, no "+" prefix,
 * no spaces, no leading 0 in the national portion.
 * +84 90 6426 802 → 84906426802
 */
const WHATSAPP_NUMBER = "84906426802";
const WHATSAPP_MESSAGE =
  "Hi Retech Solutions, I'd like to discuss a project.";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const WHATSAPP_GLYPH = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.94-5.335 11.944-11.893a11.821 11.821 0 00-3.488-8.453" />
  </svg>
);

type Variant = "navbar" | "footer" | "card" | "inline";

interface WhatsAppButtonProps {
  /** Visual placement context. Controls styling — same href everywhere. */
  variant?: Variant;
  className?: string;
  /** Override default label text ("WhatsApp" / "Chat on WhatsApp"). */
  label?: string;
  /** Hide the text label (icon-only button, e.g. compact navbar slot). */
  iconOnly?: boolean;
}

export function WhatsAppButton({
  variant = "inline",
  className,
  label,
  iconOnly = false,
}: WhatsAppButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variantClasses: Record<Variant, string> = {
    // Navbar slot — pairs with "Get Free Consultation" CTA. Icon-only on
    // mobile, icon+label on sm+. White-on-green pill, smaller than the
    // primary CTA so it reads as the secondary option.
    navbar:
      "bg-[#25D366] text-white hover:bg-[#1da851] hover:shadow-[0_4px_14px_rgba(37,211,102,0.35)] text-sm font-semibold px-4 py-2.5",
    // Footer — sits in the contact list next to email/phone. Ghost-style
    // green text on transparent bg so it harmonizes with footer chrome.
    footer:
      "text-[#25D366] hover:text-white hover:bg-[#25D366] text-sm py-1",
    // Contact-page card — larger, prominent CTA. Filled green pill.
    card:
      "bg-[#25D366] text-white hover:bg-[#1da851] shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] text-base font-semibold px-6 py-3",
    // Inline — default. Ghost-style green text for use in body copy.
    inline: "text-[#25D366] hover:text-[#1da851] text-sm",
  };

  const defaultLabels: Record<Variant, string> = {
    navbar: "WhatsApp",
    footer: "Chat on WhatsApp",
    card: "Chat on WhatsApp",
    inline: "WhatsApp",
  };

  const text = label ?? defaultLabels[variant];

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(base, variantClasses[variant], iconOnly && "px-3", className)}
    >
      {WHATSAPP_GLYPH}
      {!iconOnly && <span>{text}</span>}
    </a>
  );
}
