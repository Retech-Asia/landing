"use client";

import Link from "next/link";
import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";
import { services } from "@/lib/services-data";
import { Container } from "@/components/ui/Container";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Technologies", href: "/technologies" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

// Social links intentionally omitted — no real profiles to link to yet.
// When Jay provides LinkedIn / GitHub / etc URLs, restore them here with
// real hrefs (do NOT restore as `javascript:void(0)` placeholders).
const socialLinks: { label: string; href: string; hoverColor: string; icon: React.ReactNode }[] = [];

// NewsletterSection removed — we don't do marketing email.
// function NewsletterSection() { ... }

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-brand-dark text-white">
      {/* Gradient top border removed per Hallmark audit (decorative chrome
          that adds nothing the bg-brand-dark surface doesn't already
          communicate). Revert: git checkout 7560c6d -- src/components/sections/Footer.tsx */}

      {/* Newsletter section */}
      {/* Newsletter section removed — we don't do marketing email. */}

      {/* Main footer content */}
      <Container className="pt-16 pb-12">
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12"
          staggerDelay={0.12}
        >
          {/* Column 1 -- Company info (full width on mobile, 4/12 on desktop) */}
          <StaggerItem className="lg:col-span-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block mb-5"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                aria-label="Retech Solutions home"
              >
                <img
                  src="/images/logo.svg"
                  alt="Retech Solutions"
                  width={32}
                  height={32}
                  decoding="async"
                  className="h-7 md:h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-lg md:text-xl font-bold tracking-[-0.04em] text-white whitespace-nowrap">
                  Retech<span className="text-brand-light"> Solutions</span>
                </span>
              </Link>
            </motion.div>
            <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-xs">
              Custom software development, CMS/CRM/ERP solutions, and
              AI-powered digital products from Vietnam.
            </p>
            {/* Vietnam location indicator */}
            <div className="inline-flex items-center gap-1.5 text-sm text-white/80 mb-6">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              <span>Vietnam 🇻🇳</span>
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                >
                  <Mail size={14} className="shrink-0" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                >
                  <Phone size={14} className="shrink-0" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                {/* WhatsApp — styled to match the Mail/Phone contact rows.
                    Uses the WhatsApp green (#25D366) on the icon so it's
                    recognizable as WhatsApp without being a loud CTA in the
                    footer context. */}
                <a
                  href="https://wa.me/84906426802?text=Hi%20Retech%20Solutions%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.94-5.335 11.944-11.893a11.821 11.821 0 00-3.488-8.453" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2 text-sm text-white/80 leading-relaxed">
                  <MapPin size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                  {CONTACT.address}
                </span>
              </li>
            </ul>
          </StaggerItem>

          {/* Columns 2-4 -- Grouped nav sections.
              On mobile these previously stacked vertically (3 sections × 5+
              items each = ~1500px of dead space). Now grouped in a sub-grid:
              2 cols on mobile, 3 cols on sm+, fills the remaining 8/12 on lg. */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
              {/* Quick Links */}
              <StaggerItem>
                <nav aria-label="Quick links">
                  <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
                  <ul className="space-y-2.5">
                    {quickLinks.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </StaggerItem>

              {/* Services */}
              <StaggerItem>
                <nav aria-label="Services links">
                  <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
                  <ul className="space-y-2.5">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </StaggerItem>

              {/* Resources */}
              <StaggerItem className="col-span-2 sm:col-span-1">
                <nav aria-label="Resource links">
                  <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-2.5">
                    {resourceLinks.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </StaggerItem>
            </div>
          </div>
        </StaggerContainer>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col items-center gap-5">
          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon, hoverColor }) => (
              <motion.a
                key={label}
                href={href}
                title={`${label} (coming soon)`}
                aria-label={label}
                whileHover={{ scale: 1.15, color: hoverColor }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-full flex items-center justify-center w-11 h-11"
                style={{ color: undefined }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright + legal links + trust */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="text-xs text-white/80">
              &copy; {new Date().getFullYear()} {CONTACT.businessName}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/80">
              <Link href="/privacy-policy" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm">
                Privacy Policy
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/terms-of-service" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm">
                Terms of Service
              </Link>
            </div>
            <p className="text-xs text-white/80">
              50+ projects delivered across 6 countries
            </p>
            <motion.button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              Back to top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUp size={12} aria-hidden="true" />
              </motion.span>
            </motion.button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
