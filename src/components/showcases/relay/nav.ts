"use client";

import { createContext, useContext } from "react";

export type RelayViewId = "today" | "job" | "notes" | "sync";

/**
 * Screen navigation shared by the bottom nav, the desktop screen rail and
 * in-screen links (Today → Job, Job → Notes). The app embed overrides it with
 * local state; the showcase demo root binds it to ?view= updates.
 */
export const RelayNavContext = createContext<(id: RelayViewId) => void>(() => {});

export function useRelayNav() {
  return useContext(RelayNavContext);
}
