"use client";

import { motion, AnimatePresence, useMotionValueEvent, useScroll, type Variants } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { navigation } from "@/lib/navigation";
import { localizeServiceHref } from "@/lib/services-data";

const SCROLL_THRESHOLD = 5;

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.06,
      duration: 0.35,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 16,
    transition: {
      delay: i * 0.03,
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const mobileOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const mobilePanelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const mobileServiceVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.96,
    transition: {
      duration: 0.15,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const isHomePage = pathname === "/";

  // Locale-aware translations for nav labels + CTA strings.
  const tNav = useTranslations("nav.main");
  const tCta = useTranslations("nav.cta");
  const tServices = useTranslations("nav.services");
  const locale = useLocale() as "en" | "vi";

  const { scrollY, scrollYProgress } = useScroll();

  // --- Scroll progress tracking ---
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(Math.min(1, Math.max(0, latest)));
  });

  // --- Scroll-driven state (consolidated to reduce re-renders) ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Scrolled state + progressive blur
    setIsScrolled(latest > 20);
    setBlurAmount(Math.min(20, Math.max(0, (latest / 200) * 20)));
    // Navbar scroll-hide removed entirely — was causing the mobile hamburger
    // to disappear on scroll. Not worth the complexity for a marketing site.
  });

  // --- Active section highlighting (homepage only) ---
  useEffect(() => {
    if (!isHomePage) {
      // Reset active section when navigating away from homepage.
      // This is intentional — activeSection tracks in-page sections
      // which are only present on the homepage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null);
      return;
    }

    let observer: IntersectionObserver | undefined;

    const setupObserver = () => {
      const sections = document.querySelectorAll("section");
      if (!sections.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target;
              const sectionId = section.id || section.querySelector("[id]")?.id;
              if (sectionId) {
                setActiveSection(sectionId);
              }
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      sections.forEach((s) => observer!.observe(s));
    };

    // Small delay to let page render
    const timer = setTimeout(setupObserver, 200);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isHomePage]);

  // --- Close menus on route change ---
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    if (pathname !== pathnameRef.current) {
      pathnameRef.current = pathname;
      setIsMobileOpen(false);
      setServicesOpen(false);
    }
  }, [pathname]);

  // --- Lock body scroll when mobile menu is open ---
  // We use a data attribute + CSS instead of directly setting
  // document.body.style.overflow, because directly mutating overflow
  // conflicts with Lenis smooth scroll and can leave the page stuck.
  useEffect(() => {
    if (isMobileOpen) {
      document.documentElement.dataset.scrollLocked = "true";
    } else {
      delete document.documentElement.dataset.scrollLocked;
    }
    return () => {
      delete document.documentElement.dataset.scrollLocked;
    };
  }, [isMobileOpen]);

  // --- Focus trap for mobile menu ---
  const handleMobileKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        mobileToggleRef.current?.focus();
      }

      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 200);
  };

  // --- Close desktop services dropdown on Escape ---
  useEffect(() => {
    if (!servicesOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [servicesOpen]);

  // Check if a nav item is active (considering pathname and active section for homepage)
  const isItemActive = (href: string) => {
    if (href === "/services" && pathname.startsWith("/services")) return true;
    if (pathname === href) return true;
    if (isHomePage && activeSection && `#${activeSection}` === href) return true;
    return false;
  };

  return (
    <>
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-[var(--z-navbar)] transition-[border-color,box-shadow,background-color] duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-card-border shadow-sm"
          : "bg-transparent"
      )}
      style={{
        backgroundColor: isScrolled
          ? "color-mix(in srgb, var(--background) 85%, transparent)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Scroll progress indicator */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            scaleX: scrollProgress,
            background: "linear-gradient(90deg, #208535, #06b6d4)",
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand lockup — composed icon + wordmark as a single designed
              asset. Source: public/images/og-image.webp (the canonical
              banner), trimmed to content bounds via scripts/crop-logo-lockup.js
              so the lockup fills its image box cleanly at small navbar sizes. */}
          <Link
            href="/"
            className="flex items-center group shrink-0"
            aria-label="Retech Solutions home"
          >
            <Image
              src="/images/logo-lockup.webp"
              alt="Retech Solutions"
              width={284}
              height={33}
              priority
              decoding="async"
              className="h-7 sm:h-8 md:h-9 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.main.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className={cn(
                      "group/dropdown flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors duration-200 cursor-pointer",
                      isItemActive(item.href)
                        ? "text-brand font-medium nav-active-text"
                        : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                    )}
                    onClick={() => setServicesOpen((prev) => !prev)}
                    onBlur={handleServicesLeave}
                  >
                    {tNav(item.labelKey)}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )}
                    />
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-brand origin-left transition-transform duration-300",
                        isItemActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover/dropdown:scale-x-100"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        role="menu"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-1 w-[520px] p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-card-border shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {item.children.map((child) => {
                            const Icon = child.icon;
                            return (
                              <Link
                                key={child.href}
                                href={localizeServiceHref(child.href, locale)}
                                role="menuitem"
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.04] transition-colors group"
                              >
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg text-brand shrink-0">
                                  <Icon size={18} aria-hidden="true" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground group-hover:text-brand nav-active-text transition-colors">
                                    {tServices(child.labelKey)}
                                  </p>
                                  <p className="text-xs text-foreground-muted leading-relaxed mt-0.5">
                                    {tServices(child.descriptionKey)}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isItemActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group/link relative px-4 py-2 text-sm rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2",
                    isItemActive(item.href)
                      ? "text-brand font-medium nav-active-text"
                      : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                  )}
                >
                  {tNav(item.labelKey)}
                  <span
                    className={cn(
                      "absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-brand origin-left transition-transform duration-300",
                      isItemActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100"
                    )}
                  />
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA + locale switcher + theme toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            {/* WhatsApp as secondary CTA — paired with primary "Get Free
                Consultation". Replaces the old floating button that
                overlapped other CTAs and annoyed mobile users. Icon-only
                here so it doesn't compete with the primary CTA visually. */}
            <WhatsAppButton variant="navbar" iconOnly aria-label="Chat on WhatsApp" />
            <Button href="/contact" size="sm">
              {tCta("consultation")}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={mobileToggleRef}
            aria-label={isMobileOpen ? tCta("closeMenu") : tCta("openMenu")}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-[var(--z-dropdown)] p-3 text-foreground-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 rounded-lg"
          >
            {/* Simple icon swap — no AnimatePresence (was causing zero-size button) */}
            {isMobileOpen ? (
              <X size={22} className="shrink-0" />
            ) : (
              <Menu size={22} className="shrink-0" />
            )}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Menu — rendered OUTSIDE <nav> as a sibling.
          When isScrolled is true, the nav gets `backdrop-filter: blur(12px)`,
          which per CSS spec establishes a containing block for descendant
          position:fixed elements. That was collapsing the slide-in panel
          (fixed top-16 bottom-0) down to 0px tall because its containing
          block became the 64px-tall nav instead of the viewport. Moving
          the panel (and its backdrop overlay) out from under the filtered
          nav restores viewport-relative positioning. */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-[var(--z-dropdown)]"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              ref={mobileMenuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              variants={mobilePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed top-16 right-0 bottom-0 w-full max-w-sm bg-background/[0.98] backdrop-blur-xl z-[var(--z-dropdown)] overflow-y-auto border-l border-card-border"
              onKeyDown={handleMobileKeyDown}
            >
              <div className="px-6 py-6 space-y-1">
                {navigation.main.map((item, index) =>
                  item.children ? (
                    <motion.div
                      key={item.href}
                      variants={mobileLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                    >
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-expanded={mobileServicesOpen}
                        className="flex items-center justify-between w-full px-4 py-3 text-base text-foreground-secondary hover:text-foreground transition-colors rounded-lg hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 cursor-pointer"
                      >
                        <span>{tNav(item.labelKey)}</span>
                        <motion.span
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            variants={mobileServiceVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="overflow-hidden pl-4"
                          >
                            <Link
                              href="/services"
                              onClick={() => setIsMobileOpen(false)}
                              className="block px-4 py-2.5 text-sm font-medium text-brand nav-active-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg"
                            >
                              {tCta("allServices")}
                            </Link>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={localizeServiceHref(child.href, locale)}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg"
                              >
                                <child.icon size={16} className="text-foreground-muted" aria-hidden="true" />
                                {tServices(child.labelKey)}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.href}
                      variants={mobileLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "block px-4 py-3 text-base rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2",
                          isItemActive(item.href)
                            ? "text-brand font-medium nav-active-text border-l-2 border-brand bg-brand/[0.03]"
                            : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                        )}
                      >
                        {tNav(item.labelKey)}
                      </Link>
                    </motion.div>
                  )
                )}

                {/* CTA button + mobile locale switcher */}
                <motion.div
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={navigation.main.length}
                  className="pt-4 space-y-3"
                >
                  <Button href="/contact" size="md" className="w-full" onClick={() => setIsMobileOpen(false)}>
                    {tCta("quote")}
                  </Button>
                  {/* WhatsApp as a secondary mobile CTA — replaces the old
                      floating button that overlapped content. Full-width
                      pill in the mobile menu, discoverable without being
                      intrusive. */}
                  <WhatsAppButton variant="navbar" className="w-full justify-center" />
                  <div className="flex justify-center pt-2">
                    <ThemeToggle />
                  </div>
                  <LocaleSwitcher variant="mobile" />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
