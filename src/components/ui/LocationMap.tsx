"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, ExternalLink, Navigation } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CONTACT } from "@/lib/constants";

const GOOGLE_MAPS_URL = CONTACT.mapUrl;

export function LocationMap() {
  const [pinHovered, setPinHovered] = useState(false);

  return (
    <div className="space-y-4">
      {/* Map Illustration */}
      <Card hover={false} padding="none" className="overflow-hidden">
        <div className="relative h-64 md:h-72 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1b2838] to-[#0d1b2a]" />

          {/* SVG Map Illustration */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Water body (Saigon River) */}
            <path
              d="M 0 120 Q 60 100, 120 130 T 240 110 T 400 130"
              fill="none"
              stroke="#208535"
              strokeWidth="12"
              opacity="0.08"
            />
            <path
              d="M 0 120 Q 60 100, 120 130 T 240 110 T 400 130"
              fill="none"
              stroke="#208535"
              strokeWidth="4"
              opacity="0.15"
            />
            {/* Small tributary */}
            <path
              d="M 160 130 Q 170 160, 150 200 T 140 280"
              fill="none"
              stroke="#208535"
              strokeWidth="2.5"
              opacity="0.10"
            />

            {/* District grid blocks - District 1 area */}
            <rect x="140" y="70" width="30" height="22" rx="3" fill="#208535" opacity="0.06" />
            <rect x="175" y="70" width="25" height="22" rx="3" fill="#208535" opacity="0.05" />
            <rect x="140" y="96" width="30" height="18" rx="3" fill="#208535" opacity="0.04" />
            <rect x="175" y="96" width="25" height="18" rx="3" fill="#208535" opacity="0.06" />

            {/* District 3 area */}
            <rect x="105" y="75" width="30" height="25" rx="3" fill="#208535" opacity="0.05" />
            <rect x="105" y="104" width="30" height="20" rx="3" fill="#208535" opacity="0.04" />

            {/* Binh Thanh / Vo Thi Sau area */}
            <rect x="175" y="96" width="35" height="25" rx="3" fill="#208535" opacity="0.06" />
            <rect x="175" y="126" width="35" height="20" rx="3" fill="#208535" opacity="0.04" />

            {/* Phu Nhuan area */}
            <rect x="105" y="104" width="30" height="30" rx="3" fill="#208535" opacity="0.04" />

            {/* Major roads */}
            <line x1="80" y1="140" x2="320" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <line x1="80" y1="88" x2="320" y2="88" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <line x1="160" y1="40" x2="160" y2="250" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
            <line x1="230" y1="50" x2="230" y2="240" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1="100" y1="50" x2="100" y2="240" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Nam Ky Khoi Nghia road (where office is) */}
            <line x1="130" y1="60" x2="140" y2="200" stroke="#208535" strokeWidth="1.5" opacity="0.18" />

            {/* Scattered buildings / landmarks */}
            <rect x="200" y="55" width="8" height="12" rx="1" fill="rgba(255,255,255,0.08)" />
            <rect x="250" y="80" width="10" height="15" rx="1" fill="rgba(255,255,255,0.06)" />
            <rect x="280" y="100" width="7" height="10" rx="1" fill="rgba(255,255,255,0.07)" />
            <rect x="90" y="170" width="9" height="14" rx="1" fill="rgba(255,255,255,0.05)" />
            <rect x="300" y="160" width="8" height="11" rx="1" fill="rgba(255,255,255,0.06)" />
            <rect x="200" y="170" width="12" height="8" rx="1" fill="rgba(255,255,255,0.05)" />
            <rect x="60" y="100" width="10" height="12" rx="1" fill="rgba(255,255,255,0.04)" />

            {/* Parks / green spaces */}
            <circle cx="260" cy="180" r="18" fill="#208535" opacity="0.05" />
            <circle cx="85" cy="200" r="14" fill="#208535" opacity="0.04" />
            <circle cx="320" cy="70" r="12" fill="#208535" opacity="0.04" />

            {/* District labels */}
            <text x="155" y="86" fill="rgba(255,255,255,0.18)" fontSize="7" fontFamily="var(--font-mono)">D.1</text>
            <text x="112" y="92" fill="rgba(255,255,255,0.15)" fontSize="6.5" fontFamily="var(--font-mono)">D.3</text>
            <text x="185" y="112" fill="rgba(255,255,255,0.15)" fontSize="6.5" fontFamily="var(--font-mono)">B.Thanh</text>

            {/* Office location marker area */}
            <circle cx="135" cy="118" r="30" fill="#208535" opacity="0.04" />
            <circle cx="135" cy="118" r="50" fill="#208535" opacity="0.02" />
          </svg>

          {/* Animated pin marker */}
          <div
            className="absolute top-[40%] left-[33%] md:left-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setPinHovered(true)}
            onMouseLeave={() => setPinHovered(false)}
            onFocus={() => setPinHovered(true)}
            onBlur={() => setPinHovered(false)}
            tabIndex={0}
            role="button"
            aria-label="Retech Solutions office location"
          >
            <div className="relative">
              {/* Outer pulse ring */}
              <div
                className="absolute -inset-4 rounded-full bg-brand/15 animate-ping"
                style={{ animationDuration: "2.5s" }}
              />
              {/* Mid pulse ring */}
              <div
                className="absolute -inset-2 rounded-full bg-brand/20"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              {/* Pin shadow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-brand/20 blur-sm" />
              {/* Pin body */}
              <div
                className={`relative w-10 h-10 rounded-full bg-brand flex items-center justify-center shadow-[0_0_16px_rgba(32,133,53,0.5)] ring-2 ring-white/20 transition-transform duration-300 ${pinHovered ? "scale-110 shadow-[0_0_24px_rgba(32,133,53,0.7)]" : ""}`}
              >
                <MapPin size={18} className="text-white" strokeWidth={2.5} />
              </div>
              {/* Pin stem */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-brand" />
            </div>
            {/* Label floating above pin — appears on hover */}
            <div
              className={`absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0d1b2a]/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10 shadow-lg transition-all duration-300 ${
                pinHovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <span className="text-[10px] font-medium text-white/90 tracking-wide">Retech Solutions</span>
            </div>
          </div>

          {/* Bottom bar with coordinates + status */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0d1b2a] to-transparent h-16" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#0d1b2a]/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-white/[0.08]">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-medium text-white/80 tracking-wide">Ho Chi Minh City</span>
              </div>
            </div>
            <span className="text-[10px] text-white/25 font-mono">10.7626 N, 106.6601 E</span>
          </div>
        </div>

        {/* Address Details */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand/10 shrink-0" aria-hidden="true">
              <MapPin size={16} className="text-brand" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">Our Office</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">{CONTACT.address}</p>
            </div>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-light transition-colors group"
          >
            <Navigation size={14} className="transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            Get Directions
            <ExternalLink size={12} className="opacity-50 group-hover:opacity-80 transition-opacity" />
          </a>
        </div>
      </Card>

      {/* Office Hours Card */}
      <OfficeHoursCard />
    </div>
  );
}

function OfficeHoursCard() {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [isBusinessHours, setIsBusinessHours] = useState<boolean>(false);

  // Compute time on client only to avoid hydration mismatch.
  // Uses useEffect (not useState initializer) so the interval
  // cleanup function actually runs on unmount.
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(formatter.format(now));

      const hcmcHour = parseInt(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour: "numeric",
          hour12: false,
        }).format(now),
        10,
      );
      const dayFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "short",
      });
      const day = dayFormatter.format(now);
      const isWeekday = !["Sat", "Sun"].includes(day);
      const isSaturday = day === "Sat";

      if (isWeekday && hcmcHour >= 9 && hcmcHour < 18) {
        setIsBusinessHours(true);
      } else if (isSaturday && hcmcHour >= 9 && hcmcHour < 12) {
        setIsBusinessHours(true);
      } else {
        setIsBusinessHours(false);
      }
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card hover={false} padding="md">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-lg bg-brand/10" aria-hidden="true">
          <Clock size={16} className="text-brand" strokeWidth={1.75} />
        </div>
        <h4 className="text-sm font-semibold text-foreground">Office Hours</h4>
        <span className="ml-auto text-[10px] font-mono text-foreground-muted bg-brand/[0.04] px-2 py-0.5 rounded-full">
          ICT (GMT+7)
        </span>
      </div>

      {/* Current time indicator */}
      {currentTime && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg bg-brand/[0.04] border border-brand/10">
          <span className={`w-2 h-2 rounded-full ${isBusinessHours ? "bg-brand animate-pulse" : "bg-foreground-muted/40"}`} />
          <span className="text-xs text-foreground-secondary">
            {isBusinessHours ? (
              <>
                We&apos;re currently open &middot;{" "}
                <span className="font-mono font-medium text-foreground">{currentTime}</span> local time
              </>
            ) : (
              <>
                Currently closed &middot;{" "}
                <span className="font-mono font-medium text-foreground">{currentTime}</span> local time
              </>
            )}
          </span>
        </div>
      )}

      <div className="space-y-2.5">
        {[
          { day: "Monday - Friday", hours: "9:00 - 18:00", active: true },
          { day: "Saturday", hours: "9:00 - 12:00", active: true },
          { day: "Sunday", hours: "Closed", active: false },
        ].map(({ day, hours, active }) => (
          <div
            key={day}
            className="flex items-center justify-between py-1.5 border-b border-card-border last:border-b-0"
          >
            <span className="text-xs font-medium text-foreground">{day}</span>
            <span
              className={`text-xs font-medium ${
                active ? "text-foreground-secondary" : "text-foreground-muted"
              }`}
            >
              {active ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  {hours}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted/40" />
                  {hours}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
