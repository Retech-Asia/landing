"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildCitewellSeed } from "./fixtures";
import type { CitewellData, CitewellState, ReviewStatus } from "./types";

/**
 * Shared demo state for the four Citewell views. In-memory only: human-review
 * decisions are simulated on local synthetic data (approve/reject are
 * confirm-gated in the views), every decision lands in the event history, and
 * reload returns to seed. No LLM API, embeddings provider or network call —
 * answers are predefined demonstrations (handoff §2C).
 */

export type CitewellAction =
  | { type: "review-decision"; qaId: string; status: Exclude<ReviewStatus, "pending"> }
  | { type: "reset" };

let eventCounter = 0;
function nextEventId(): string {
  eventCounter += 1;
  return `ev-local-${eventCounter}`;
}

const DECISION_EVENT = {
  approved: { en: "approved by human review", vi: "được kiểm duyệt của con người phê duyệt" },
  rejected: { en: "rejected by human review", vi: "bị kiểm duyệt của con người từ chối" },
} as const;

function reducer(state: CitewellState, action: CitewellAction): CitewellState {
  switch (action.type) {
    case "review-decision": {
      const qa = state.qaPairs.find((q) => q.id === action.qaId);
      if (!qa) return state;
      return {
        ...state,
        reviewDecisions: {
          ...state.reviewDecisions,
          [action.qaId]: { status: action.status, daysAgo: 0 },
        },
        events: [
          {
            id: nextEventId(),
            summary: {
              en: `"${qa.question.en}" ${DECISION_EVENT[action.status].en}`,
              vi: `"${qa.question.vi}" ${DECISION_EVENT[action.status].vi}`,
            },
            daysAgo: 0,
          },
          ...state.events,
        ],
      };
    }
    case "reset":
      return buildCitewellState();
  }
}

function buildCitewellState(): CitewellState {
  return { ...buildCitewellSeed(), reviewDecisions: seedDecisions() };
}

/** Seeded history: one earlier approval, one earlier rejection. */
function seedDecisions(): CitewellState["reviewDecisions"] {
  return {
    "qa-escalation-clock": { status: "approved", daysAgo: 6 },
    "qa-vendor-checks": { status: "rejected", daysAgo: 9 },
  };
}

export interface CitewellStore {
  state: CitewellState;
  reviewDecide: (qaId: string, status: Exclude<ReviewStatus, "pending">) => void;
  reset: () => void;
  docById: (id: string) => CitewellData["docs"][number] | undefined;
  sectionById: (docId: string, sectionId: string) => CitewellData["docs"][number]["sections"][number] | undefined;
  qaById: (id: string) => CitewellData["qaPairs"][number] | undefined;
}

const CitewellContext = createContext<CitewellStore | null>(null);

export function CitewellProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildCitewellState);

  const reviewDecide = useCallback(
    (qaId: string, status: Exclude<ReviewStatus, "pending">) =>
      dispatch({ type: "review-decision", qaId, status }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const docById = useCallback(
    (id: string) => state.docs.find((d) => d.id === id),
    [state.docs]
  );
  const sectionById = useCallback(
    (docId: string, sectionId: string) =>
      state.docs.find((d) => d.id === docId)?.sections.find((s) => s.id === sectionId),
    [state.docs]
  );
  const qaById = useCallback(
    (id: string) => state.qaPairs.find((q) => q.id === id),
    [state.qaPairs]
  );

  const value = useMemo(
    () => ({ state, reviewDecide, reset, docById, sectionById, qaById }),
    [state, reviewDecide, reset, docById, sectionById, qaById]
  );

  return <CitewellContext.Provider value={value}>{children}</CitewellContext.Provider>;
}

export function useCitewell(): CitewellStore {
  const ctx = useContext(CitewellContext);
  if (!ctx) throw new Error("useCitewell must be used inside CitewellProvider");
  return ctx;
}

/** Effective review status: simulated decisions override the seeded queue. */
export function reviewStatus(
  state: CitewellState,
  qaId: string
): ReviewStatus {
  return state.reviewDecisions[qaId]?.status ?? "pending";
}
