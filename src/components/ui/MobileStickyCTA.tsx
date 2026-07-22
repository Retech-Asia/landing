"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Mobile-only sticky CTA bar at the bottom of the viewport.
 *
 * Premium mobile UX pattern (Stripe, Linear, Vercel all use it): a small
 * "Get Free Consultation" button pinned to the bottom of the screen so the
 * primary conversion is always one tap away, no matter how far the user
 * has scrolled.
 *
 * Behaviour:
 *   - Mobile only (hidden on lg+ via CSS)
 *   - Appears after the user scrolls past the hero (>40vh)
 *   - Hides when the footer enters view (avoids covering footer CTAs)
 *   - Respects prefers-reduced-motion (instant show/hide)
 *   - Does not render on /contact (the CTA destination — pointless there)
 */
export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on the contact page itself — pointless to show a "Get Consultation"
    // button when the user is already there.
    if (window.location.pathname.startsWith("/contact")) return;

    function update() {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.4;
      // Detect footer in view (footer is the last <footer> element)
      const footer = document.querySelector("footer");
      let footerInView = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        footerInView = rect.top < window.innerHeight;
      }
      setVisible(scrolledPastHero && !footerInView);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 px-4 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none"
        >
          <Link
            href="/contact"
            className="pointer-events-auto flex items-center justify-center gap-2 w-full h-12 rounded-full bg-brand text-white font-medium text-base shadow-[0_4px_20px_rgba(32,133,53,0.35)] hover:bg-brand-light active:scale-[0.98] transition-all"
          >
            Get Free Consultation
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
