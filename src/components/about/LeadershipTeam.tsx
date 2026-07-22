"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  gradient: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jay Pham",
    role: "Founder & CEO",
    initials: "JP",
    bio: "Over a decade in software development and IT outsourcing across Southeast Asia and Australia. Jay founded Retech Solutions to connect global businesses with Vietnam's strongest engineering talent, combining local cost advantages with international delivery standards.",
    gradient: "from-brand via-brand-light to-accent-cyan",
  },
  {
    name: "Minh Tran",
    role: "CTO",
    initials: "MT",
    bio: "Systems architect with deep experience in enterprise platforms — from multi-tenant SaaS to real-time financial systems. Minh defines technical strategy, leads architecture reviews, and ensures every project meets production-grade standards for security and performance.",
    gradient: "from-accent-cyan via-brand to-accent-violet",
  },
  {
    name: "Linh Nguyen",
    role: "Head of Design",
    initials: "LN",
    bio: "UX designer focused on research-driven product design for web and mobile applications. Linh leads the design practice at Retech, building scalable design systems and ensuring every interface is grounded in user research, not assumptions.",
    gradient: "from-accent-violet via-brand to-accent-cyan",
  },
  {
    name: "Tuan Le",
    role: "VP of Engineering",
    initials: "TL",
    bio: "Engineering leader who has managed distributed teams of 20+ developers across multiple concurrent projects. Tuan oversees delivery operations, mentors senior engineers, and drives the agile processes that keep Retech's projects on schedule.",
    gradient: "from-brand via-accent-violet to-accent-cyan",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export function LeadershipTeam() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          title="Leadership Team"
          description="Meet the experienced leaders driving innovation at Retech Solutions and delivering results for our global clients."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <motion.article
              key={member.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative rounded-2xl bg-white border border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:border-brand/30 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden"
            >
              {/* Top gradient accent bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${member.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="p-6 pb-5">
                {/* Initials circle */}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Subtle ring animation on hover */}
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border-2 border-brand/0 group-hover:border-brand/30"
                      transition={{ duration: 0.4 }}
                    />
                    <span className="text-lg font-bold text-white tracking-wide">
                      {member.initials}
                    </span>
                  </motion.div>

                  <h3 className="text-lg font-bold text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-brand mb-3">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Hover reveal bio overlay */}
              <motion.div
                className="absolute inset-0 top-[76px] bg-white/95 backdrop-blur-sm flex flex-col justify-center px-6"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ pointerEvents: "none" }}
              >
                <p className="text-sm text-foreground-secondary leading-relaxed text-center">
                  {member.bio}
                </p>
              </motion.div>

              {/* Always-visible quick link at bottom */}
              <div className="px-6 pb-4">
                <div className="pt-3 border-t border-black/[0.04] flex items-center justify-center">
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-muted group-hover:text-brand transition-colors duration-200">
                    <ExternalLink size={12} />
                    <span>View profile</span>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
