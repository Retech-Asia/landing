/**
 * Reusable BreadcrumbList JSON-LD Component
 *
 * Generates structured breadcrumb data for search engines from a simple
 * crumbs array. Drop this on any page to get breadcrumb rich results.
 *
 * @example
 * ```tsx
 * <BreadcrumbJsonLd crumbs={[
 *   { name: "Home", url: "https://www.retech.asia" },
 *   { name: "Services", url: "https://www.retech.asia/services" },
 *   { name: "CMS Platforms", url: "https://www.retech.asia/services/cms-platforms" },
 * ]} />
 * ```
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */

import { BreadcrumbJsonLd as BaseBreadcrumbJsonLd } from "@/components/seo/JsonLd";

export interface BreadcrumbItem {
  /** Display name shown in search results */
  name: string;
  /** Absolute URL of this breadcrumb target */
  url: string;
}

export interface BreadcrumbJsonLdProps {
  /** Ordered array of breadcrumb items from root to current page */
  crumbs: BreadcrumbItem[];
}

/**
 * Renders a BreadcrumbList JSON-LD script tag from a crumbs array.
 * This is a convenience wrapper around the base BreadcrumbJsonLd that
 * accepts a `crumbs` prop instead of `items`.
 */
export function BreadcrumbJsonLd({ crumbs }: BreadcrumbJsonLdProps) {
  return <BaseBreadcrumbJsonLd items={crumbs} />;
}

export default BreadcrumbJsonLd;
