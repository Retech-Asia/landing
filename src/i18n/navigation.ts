import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Use these INSTEAD of `next/link`,
 * `next/navigation`'s `usePathname`/`redirect`/`useRouter` for any link that
 * should preserve the current locale (or switch it cleanly).
 *
 * `Link` automatically prefixes the active locale; pass `locale="vi"` to swap.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
