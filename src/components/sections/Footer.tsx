"use client";

import Link from "next/link";
import Image from "next/image";
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
import { EmailCapture } from "@/components/ui/EmailCapture";

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

function NewsletterSection() {
  return (
    <div className="bg-background-subtle border-b border-card-border">
      <Container className="py-14 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <EmailCapture
            variant="full"
            heading="Stay Updated"
            description="Get the latest insights on software development, AI, and digital transformation delivered to your inbox."
          />
        </div>
      </Container>
    </div>
  );
}

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-foreground text-white">
      {/* Gradient top border */}
      <div
        className="h-[2px]"
        style={{
          background: "linear-gradient(to right, #208535, #34d058, #06b6d4)",
        }}
      />

      {/* Newsletter section */}
      <NewsletterSection />

      {/* Main footer content */}
      <Container className="pt-16 pb-12">
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
          staggerDelay={0.12}
        >
          {/* Column 1 -- Company info */}
          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block mb-5"
            >
              <Link href="/" className="inline-flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">
                <Image
                  src="/images/og-image.png"
                  alt="Retech Solutions"
                  width={220}
                  height={27}
                  sizes="220px"
                  className="h-6 md:h-7 w-auto rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            </motion.div>
            <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-xs">
              Custom software development, CMS/CRM/ERP solutions, and
              AI-powered digital products from Vietnam.
            </p>
            {/* Vietnam location indicator */}
            <div className="inline-flex items-center gap-1.5 text-sm text-white/60 mb-6">
              <MapPin size={14} className="shrink-0" aria-hidden="true" />
              <span>Vietnam 🇻🇳</span>
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                >
                  <Mail size={14} className="shrink-0" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                >
                  <Phone size={14} className="shrink-0" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2 text-sm text-white/50 leading-relaxed">
                  <MapPin size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                  {CONTACT.address}
                </span>
              </li>
            </ul>
          </StaggerItem>

          {/* Column 2 -- Quick Links */}
          <StaggerItem>
            <nav aria-label="Quick links">
              <h4 className="text-sm font-semibold text-white mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </StaggerItem>

          {/* Column 3 -- Services */}
          <StaggerItem>
            <nav aria-label="Services links">
              <h4 className="text-sm font-semibold text-white mb-5">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </StaggerItem>

          {/* Column 4 -- Resources */}
          <StaggerItem>
            <nav aria-label="Resource links">
              <h4 className="text-sm font-semibold text-white mb-5">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </StaggerItem>
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
                title={`${label} — coming soon`}
                aria-label={label}
                whileHover={{ scale: 1.15, color: hoverColor }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full flex items-center justify-center w-11 h-11"
                style={{ color: undefined }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright + legal links + trust */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} {CONTACT.businessName}
            </p>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link href="/privacy-policy" className="hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">
                Privacy Policy
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/terms-of-service" className="hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">
                Terms of Service
              </Link>
            </div>
            <p className="text-xs text-white/30">
              Trusted by businesses worldwide
            </p>
            <motion.button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
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
