import type { ComponentType } from "react";

/**
 * Interactive showcase view components, keyed by showcase id then view id.
 *
 * INTENTIONALLY EMPTY on 2026-10-25 — populated in Wave 1C when the ChatGPT
 * creative handoff provides the flagship CRM design. Components added here
 * must be client components with deterministic synthetic fixtures, no
 * backend/API calls, and responsive down to mobile widths.
 *
 * Contract per view component: `ComponentType` taking no props — fixtures
 * are imported by the view itself. Wrap each component in `next/dynamic`
 * HERE, at module scope (stable component identity, per-view chunk splitting,
 * `react-hooks/static-components`-clean). The shell only looks entries up
 * and Suspense-wraps them.
 */
export const VIEW_COMPONENTS: Record<string, Record<string, ComponentType>> = {};
