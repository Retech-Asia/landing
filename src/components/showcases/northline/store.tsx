"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildNorthlineSeed } from "@/lib/showcases/northline/fixtures";
import type {
  AccountNote,
  ActivityItem,
  Lead,
  LeadStatus,
  NorthlineData,
  Stage,
} from "@/lib/showcases/northline/types";

/**
 * Shared demo state for the five Northline views. Lives entirely in memory:
 * mutations update connected views during the session; reloading or resetting
 * returns to the seed fixtures. No backend, no persistence.
 */

export type NorthlineAction =
  | { type: "move-opportunity"; opportunityId: string; stage: Stage }
  | { type: "assign-lead"; leadId: string; ownerId: string }
  | { type: "set-lead-status"; leadId: string; status: LeadStatus }
  | { type: "add-note"; accountId: string; body: string }
  | { type: "reset" };

let localCounter = 0;
function nextId(prefix: string): string {
  localCounter += 1;
  return `${prefix}-local-${localCounter}`;
}

function reducer(state: NorthlineData, action: NorthlineAction): NorthlineData {
  switch (action.type) {
    case "move-opportunity": {
      const opp = state.opportunities.find((o) => o.id === action.opportunityId);
      if (!opp || opp.stage === action.stage) return state;
      const updated: NorthlineData = {
        ...state,
        opportunities: state.opportunities.map((o) =>
          o.id === action.opportunityId ? { ...o, stage: action.stage } : o
        ),
        activities: [
          {
            id: nextId("act"),
            type: "stage",
            refType: "opportunity",
            refId: action.opportunityId,
            summary: `${opp.title} moved to ${action.stage}`,
            daysAgo: 0,
          },
          ...state.activities,
        ],
      };
      return updated;
    }
    case "assign-lead": {
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId ? { ...l, ownerId: action.ownerId } : l
        ),
      };
    }
    case "set-lead-status": {
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.leadId ? { ...l, status: action.status } : l
        ),
      };
    }
    case "add-note": {
      const body = action.body.trim();
      if (!body) return state;
      const note: AccountNote = {
        id: nextId("nt"),
        accountId: action.accountId,
        authorId: "tm-morgan",
        body,
        daysAgo: 0,
      };
      const activity: ActivityItem = {
        id: nextId("act"),
        type: "note",
        refType: "account",
        refId: action.accountId,
        summary: body.length > 80 ? `${body.slice(0, 77)}…` : body,
        daysAgo: 0,
      };
      return {
        ...state,
        notes: [note, ...state.notes],
        activities: [activity, ...state.activities],
      };
    }
    case "reset":
      return buildNorthlineSeed();
  }
}

export interface NorthlineStore {
  data: NorthlineData;
  moveOpportunity: (opportunityId: string, stage: Stage) => void;
  assignLead: (leadId: string, ownerId: string) => void;
  setLeadStatus: (leadId: string, status: LeadStatus) => void;
  addNote: (accountId: string, body: string) => void;
  reset: () => void;
  /** Lookup helpers shared by views. */
  teamById: (id: string) => NorthlineData["team"][number] | undefined;
  accountById: (id: string) => NorthlineData["accounts"][number] | undefined;
  leadById: (id: string) => Lead | undefined;
}

const NorthlineContext = createContext<NorthlineStore | null>(null);

export function NorthlineProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, buildNorthlineSeed);

  const moveOpportunity = useCallback(
    (opportunityId: string, stage: Stage) =>
      dispatch({ type: "move-opportunity", opportunityId, stage }),
    []
  );
  const assignLead = useCallback(
    (leadId: string, ownerId: string) =>
      dispatch({ type: "assign-lead", leadId, ownerId }),
    []
  );
  const setLeadStatus = useCallback(
    (leadId: string, status: LeadStatus) =>
      dispatch({ type: "set-lead-status", leadId, status }),
    []
  );
  const addNote = useCallback(
    (accountId: string, body: string) =>
      dispatch({ type: "add-note", accountId, body }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const store = useMemo<NorthlineStore>(() => {
    const teamById = (id: string) => data.team.find((t) => t.id === id);
    const accountById = (id: string) => data.accounts.find((a) => a.id === id);
    const leadById = (id: string) => data.leads.find((l) => l.id === id);
    return {
      data,
      moveOpportunity,
      assignLead,
      setLeadStatus,
      addNote,
      reset,
      teamById,
      accountById,
      leadById,
    };
  }, [data, moveOpportunity, assignLead, setLeadStatus, addNote, reset]);

  return <NorthlineContext.Provider value={store}>{children}</NorthlineContext.Provider>;
}

export function useNorthline(): NorthlineStore {
  const store = useContext(NorthlineContext);
  if (!store) {
    throw new Error("useNorthline must be used inside NorthlineProvider");
  }
  return store;
}
