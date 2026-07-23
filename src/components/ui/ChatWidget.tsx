"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp contact button.
 *
 * Previously this was a fake chat bot with canned regex-matched responses
 * — felt deceptive to B2B buyers who engaged expecting a real conversation.
 * Now it's a single link to WhatsApp, which is where actual customer
 * support happens (owner's verified business number).
 *
 * Number format for wa.me: country code + number, no "+" prefix,
 * no spaces, no leading 0 in the national portion.
 * +84 90 6426 802 → 84906426802
 */
const WHATSAPP_NUMBER = "84906426802";
const WHATSAPP_MESSAGE =
  "Hi Retech Solutions, I'd like to discuss a project.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export function ChatWidget() {
  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-shadow hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      {/* Official WhatsApp glyph (simplified path) */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.94-5.335 11.944-11.893a11.821 11.821 0 00-3.488-8.453" />
      </svg>
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
