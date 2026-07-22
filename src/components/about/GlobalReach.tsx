"use client";

import { Globe, MapPin, Building2, Clock, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { CONTACT } from "@/lib/constants";

interface Region {
  name: string;
  description: string;
  markets: string[];
  accent: string;
  accentBg: string;
}

const regions: Region[] = [
  {
    name: "Asia Pacific",
    description:
      "Our home region and primary market, with deep connections across Southeast Asia and growing partnerships in East Asia and Australia.",
    markets: ["Vietnam", "Singapore", "Japan", "Australia"],
    accent: "text-brand",
    accentBg: "bg-brand/10",
  },
  {
    name: "North America",
    description:
      "Delivering software solutions for US and Canadian businesses, with an emphasis on timezone-aligned communication and agile collaboration.",
    markets: ["United States", "Canada"],
    accent: "text-accent-cyan",
    accentBg: "bg-accent-cyan/10",
  },
  {
    name: "Europe",
    description:
      "Supporting European enterprises with scalable development capacity, complying with data standards and multilingual project requirements.",
    markets: ["United Kingdom", "Germany", "Netherlands"],
    accent: "text-accent-violet",
    accentBg: "bg-accent-violet/10",
  },
];

export function GlobalReach() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <Container>
        <AnimatedSection>
          <SectionHeader
            label="Global Reach"
            title="Serving Clients Worldwide"
            description="From our base in Ho Chi Minh City, we collaborate with businesses across three continents — delivering quality software regardless of borders."
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {regions.map((region) => (
            <StaggerItem key={region.name}>
              <div className="group relative h-full rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/15 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 p-6 md:p-8 overflow-hidden">
                {/* Region icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${region.accentBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Globe size={22} className={region.accent} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {region.name}
                </h3>

                <p className="text-sm text-foreground-secondary leading-relaxed mb-5">
                  {region.description}
                </p>

                {/* Market tags */}
                <div className="flex flex-wrap gap-2">
                  {region.markets.map((market) => (
                    <span
                      key={market}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.03] text-xs font-medium text-foreground-muted"
                    >
                      <MapPin size={10} className="shrink-0" />
                      {market}
                    </span>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${region.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                  aria-hidden="true"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Office Location */}
        <AnimatedSection variant="slideUp" delay={0.15}>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Map pin visual */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand/10 shrink-0">
                    <Building2 size={22} className="text-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Our Office
                    </h3>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {CONTACT.address}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-foreground-muted">
                      <Clock size={14} className="shrink-0" />
                      <span>Mon &ndash; Fri, 9:00 AM &ndash; 6:00 PM (ICT / UTC+7)</span>
                    </div>
                  </div>
                </div>

                {/* Contact details */}
                <div className="flex flex-col gap-2 md:border-l md:border-black/[0.06] md:pl-8">
                  <a
                    href={CONTACT.emailHref}
                    className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-brand transition-colors"
                  >
                    <Mail size={14} className="shrink-0" />
                    {CONTACT.email}
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-brand transition-colors"
                  >
                    <Phone size={14} className="shrink-0" />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
