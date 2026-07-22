import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { services } from "@/lib/services-data";

const categoryToServices: Record<string, string[]> = {
  "Industry Insights": ["cms-platforms", "dedicated-teams", "crm-systems"],
  Technology: ["web-development", "erp-solutions", "ui-ux-design"],
  Guides: ["web-development", "cms-platforms", "ui-ux-design"],
};

export function RelatedServicesSidebar({ category }: { category: string }) {
  const slugs = categoryToServices[category] ?? categoryToServices["Technology"];

  const related = slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <Card hover={false} padding="md">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">
        Our Services
      </h3>
      <ul className="space-y-4">
        {related.map((service) => {
          if (!service) return null;
          const Icon = service.icon;
          return (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-start gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-black/[0.03]"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand/10 to-accent-cyan/10">
                  <Icon
                    size={16}
                    className="text-brand group-hover:scale-110 transition-transform"
                  />
                </span>
                <span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                    {service.title}
                  </span>
                  <span className="block text-xs text-foreground-muted leading-relaxed mt-0.5">
                    {service.subtitle}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
