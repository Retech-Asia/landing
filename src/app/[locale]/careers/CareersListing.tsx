"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  Mail,
  Search,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { type FlatJobListing } from "@/lib/careers-data";
import type { Locale } from "@/i18n/routing";

/* ------------------------------------------------------------------ */
/*  Department badge color map (keyed on the invariant EN department)  */
/* ------------------------------------------------------------------ */

const departmentStyles: Record<
  string,
  { pill: string; badge: string }
> = {
  Engineering: {
    pill: "bg-brand/10 text-brand border-brand/20",
    badge: "bg-brand/10 text-brand",
  },
  Design: {
    pill: "bg-accent-violet/10 text-accent-violet border-accent-violet/20",
    badge: "bg-accent-violet/10 text-accent-violet",
  },
  Management: {
    pill: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
    badge: "bg-accent-cyan/10 text-accent-cyan",
  },
  Sales: {
    pill: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    badge: "bg-amber-500/10 text-amber-600",
  },
};

const fallbackStyle = {
  pill: "bg-brand/10 text-brand border-brand/20",
  badge: "bg-brand/10 text-brand",
};

/* ------------------------------------------------------------------ */
/*  Props + labels                                                     */
/* ------------------------------------------------------------------ */

interface CareersListingProps {
  /** Pre-flattened via getFlatJobs(locale) / flattenJob(job, locale). */
  jobs: FlatJobListing[];
  email: string;
  locale: Locale;
}

function useLabels(locale: Locale) {
  const isEn = locale === "en";
  return isEn
    ? {
        searchPlaceholder: "Search roles...",
        searchAria: "Search job roles",
        all: "All",
        showing: "Showing",
        positionSingular: "position",
        positionPlural: "positions",
        inWord: "in",
        applyNow: "Apply Now",
        emptyTitle: "No open positions right now",
        emptyBody:
          "We do not have any roles matching your criteria at the moment, but we are always happy to hear from talented people.",
        sendResume: "Send Your Resume",
      }
    : {
        searchPlaceholder: "Tìm vị trí...",
        searchAria: "Tìm kiếm vị trí tuyển dụng",
        all: "Tất cả",
        showing: "Hiển thị",
        positionSingular: "vị trí",
        positionPlural: "vị trí",
        inWord: "trong",
        applyNow: "Ứng tuyển Ngay",
        emptyTitle: "Hiện chưa có vị trí tuyển dụng",
        emptyBody:
          "Hiện tại chúng tôi chưa có vị trí phù hợp với tiêu chí của bạn, nhưng chúng tôi luôn vui lòng được lắng nghe từ những ứng viên tài năng.",
        sendResume: "Gửi CV của bạn",
      };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CareersListing({ jobs, email, locale }: CareersListingProps) {
  const labels = useLabels(locale);

  const departments = useMemo(() => {
    const set = new Set(jobs.map((j) => j.department));
    return [labels.all, ...Array.from(set)];
  }, [jobs, labels.all]);

  const [activeDepartment, setActiveDepartment] = useState(labels.all);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDepartment =
        activeDepartment === labels.all || job.department === activeDepartment;
      const matchesSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }, [jobs, activeDepartment, searchQuery, labels.all]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none"
          />
          <input
            type="text"
            placeholder={labels.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={labels.searchAria}
            className="w-full pl-9 pr-4 py-2.5 text-base rounded-xl border border-card-border bg-card-bg placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/30 transition-shadow"
          />
        </div>

        {/* Department pills */}
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => {
            const isActive = activeDepartment === dept;
            const deptKey = jobs.find((j) => j.department === dept)?.departmentKey;
            const styles =
              deptKey !== undefined
                ? departmentStyles[deptKey] ?? fallbackStyle
                : undefined;
            return (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer",
                  isActive
                    ? dept === labels.all
                      ? "bg-brand-dark text-white border-foreground"
                      : `${styles!.pill} border`
                    : "bg-card-bg text-foreground-secondary border-card-border hover:border-foreground/20 hover:text-foreground"
                )}
              >
                {dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Job count */}
      <p className="text-sm text-foreground-muted mb-6">
        {labels.showing}{" "}
        <span className="font-medium text-foreground">
          {filteredJobs.length}
        </span>{" "}
        {filteredJobs.length === 1
          ? labels.positionSingular
          : labels.positionPlural}
        {activeDepartment !== labels.all && (
          <span>
            {" "}
            {labels.inWord}{" "}
            <span className="font-medium text-foreground">
              {activeDepartment}
            </span>
          </span>
        )}
      </p>

      {/* Job cards grid */}
      <AnimatePresence mode="wait">
        {filteredJobs.length > 0 ? (
          <motion.div
            key={activeDepartment + searchQuery}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.slug}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: "easeOut" },
                  },
                }}
              >
                <Card padding="lg" className="h-full flex flex-col">
                  {/* Department badge */}
                  <span
                    className={cn(
                      "inline-flex self-start px-3 py-1 text-xs font-semibold rounded-full mb-4",
                      (departmentStyles[job.departmentKey] ?? fallbackStyle).badge
                    )}
                  >
                    {job.department}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                    {job.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground-secondary leading-relaxed mb-5 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground-muted mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="shrink-0 text-brand" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} className="shrink-0 text-accent-cyan" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase
                        size={14}
                        className="shrink-0 text-accent-violet"
                      />
                      {job.experience}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-card-border">
                    <a
                      href={`mailto:${email}?subject=Application for ${encodeURIComponent(job.title)} | ${job.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand to-brand-dark px-5 py-2.5 rounded-full hover:shadow-[0_4px_16px_rgba(32,133,53,0.25)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
                    >
                      {labels.applyNow}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty state */
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-background-subtle mb-6">
              <Mail size={28} className="text-foreground-muted" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {labels.emptyTitle}
            </h3>
            <p className="text-foreground-secondary mb-8 max-w-md mx-auto">
              {labels.emptyBody}
            </p>
            <a
              href={`mailto:${email}?subject=General Application`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-brand to-brand-dark px-6 py-3 rounded-full hover:shadow-[0_4px_16px_rgba(32,133,53,0.25)] transition-all duration-200"
            >
              <Mail size={16} />
              {labels.sendResume}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
