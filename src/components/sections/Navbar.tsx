"use client";

import { motion, AnimatePresence, useMotionValueEvent, useScroll, type Variants } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { navigation } from "@/lib/navigation";

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

    // Hide on scroll down, show on scroll up
    const delta = latest - lastScrollY.current;
    if (Math.abs(delta) >= SCROLL_THRESHOLD) {
      if (delta > 0 && latest > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = latest;
    }
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
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: hidden ? -80 : 0,
        opacity: 1,
      }}
      transition={{
        y: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
      style={{
        backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        WebkitBackdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        backgroundColor: blurAmount > 0
          ? `color-mix(in srgb, var(--background) ${Math.min(92, Math.round(blurAmount / 20 * 92))}%, transparent)`
          : "transparent",
      }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[border-color,box-shadow] duration-500",
        blurAmount > 8 && "border-b border-black/[0.06] shadow-sm"
      )}
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
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Retech Solutions home">
            <Image
              src="/images/og-image.png"
              alt="Retech Solutions"
              width={328}
              height={40}
              priority
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 328px"
              className="h-6 sm:h-9 md:h-10 w-auto opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-[1.03]"
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
                        ? "text-brand font-medium"
                        : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                    )}
                    onClick={() => setServicesOpen((prev) => !prev)}
                    onBlur={handleServicesLeave}
                  >
                    {item.label}
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
                        className="absolute top-full left-0 mt-1 w-[520px] p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-black/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {item.children.map((child) => {
                            const Icon = child.icon;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/[0.04] transition-colors group"
                              >
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg text-brand shrink-0">
                                  <Icon size={18} aria-hidden="true" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                                    {child.label}
                                  </p>
                                  <p className="text-xs text-foreground-muted leading-relaxed mt-0.5">
                                    {child.description}
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
                  className={cn(
                    "group/link relative px-4 py-2 text-sm rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2",
                    isItemActive(item.href)
                      ? "text-brand font-medium"
                      : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                  )}
                >
                  {item.label}
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

          {/* Desktop CTA */}
          {/* ThemeToggle intentionally NOT mounted here — dark mode CSS exists
              but 129 components use hardcoded bg-white, so the toggle would
              produce inconsistent theming. Restore once components are
              refactored to use bg-background / tokens instead. */}
          <div className="hidden lg:flex items-center gap-3">
            <Button href="/contact" size="sm">
              Request Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={mobileToggleRef}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-50 p-3 text-foreground-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 rounded-lg"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={mobileOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40"
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
              className="lg:hidden fixed top-16 right-0 bottom-0 w-full max-w-sm bg-background/[0.98] backdrop-blur-xl z-40 overflow-y-auto border-l border-black/[0.06]"
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
                        <span>{item.label}</span>
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
                              className="block px-4 py-2.5 text-sm font-medium text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg"
                            >
                              All Services
                            </Link>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-lg"
                              >
                                <child.icon size={16} className="text-foreground-muted" aria-hidden="true" />
                                {child.label}
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
                            ? "text-brand font-medium bg-brand/5"
                            : "text-foreground-secondary hover:text-foreground hover:bg-black/[0.04]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}

                {/* CTA button */}
                <motion.div
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={navigation.main.length}
                  className="pt-4"
                >
                  <Button href="/contact" size="md" className="w-full" onClick={() => setIsMobileOpen(false)}>
                    Request Quote
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
