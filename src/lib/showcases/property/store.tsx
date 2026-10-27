"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildPropertySeed } from "./fixtures";
import { formatCurrency } from "./format";
import type {
  Appointment,
  Lead,
  LeadStage,
  Offer,
  OfferState,
  PropertyData,
} from "./types";

/**
 * Shared demo state for the five Property Studio views. In-memory only:
 * lead stage moves, appointment check-ins, offer state changes and on-site
 * lead capture all update the connected records and land in the activity
 * history. Reset/reload returns to seed.
 */

const STAGE_ORDER: LeadStage[] = ["new", "qualifying", "viewing", "offer", "closing"];

export function nextStage(stage: LeadStage): LeadStage | null {
  const index = STAGE_ORDER.indexOf(stage);
  if (index < 0 || index >= STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[index + 1];
}

export type PropertyAction =
  | { type: "advance-lead-stage"; leadId: string }
  | { type: "set-offer-state"; offerId: string; state: OfferState }
  | { type: "check-in-appointment"; appointmentId: string }
  | { type: "capture-lead"; name: string; propertyId: string }
  | { type: "reset" };

let eventCounter = 0;
function nextEventId(): string {
  eventCounter += 1;
  return `ev-local-${eventCounter}`;
}

let leadCounter = 0;
function nextLeadId(): string {
  leadCounter += 1;
  return `L-local-${leadCounter}`;
}

function reducer(state: PropertyData, action: PropertyAction): PropertyData {
  switch (action.type) {
    case "advance-lead-stage": {
      const lead = state.leads.find((l) => l.id === action.leadId);
      const stage = lead ? nextStage(lead.stage) : null;
      if (!lead || !stage) return state;
      return {
        ...state,
        leads: state.leads.map((l) => (l.id === lead.id ? { ...l, stage } : l)),
        activity: [
          {
            id: nextEventId(),
            kind: "stage",
            summary: `${lead.name} advanced to ${stage}`,
            daysAgo: 0,
          },
          ...state.activity,
        ],
      };
    }
    case "set-offer-state": {
      const offer = state.offers.find((o) => o.id === action.offerId);
      if (!offer || offer.state === action.state) return state;
      const property = state.properties.find((p) => p.id === offer.propertyId);
      return {
        ...state,
        offers: state.offers.map((o) =>
          o.id === offer.id ? { ...o, state: action.state } : o
        ),
        activity: [
          {
            id: nextEventId(),
            kind: "offer",
            summary: `Offer ${offer.id} on ${property?.address ?? offer.propertyId} marked ${action.state} (${formatCurrency(offer.amount)})`,
            daysAgo: 0,
          },
          ...state.activity,
        ],
      };
    }
    case "check-in-appointment": {
      const appointment = state.appointments.find((a) => a.id === action.appointmentId);
      if (!appointment || appointment.state !== "scheduled") return state;
      const lead = state.leads.find((l) => l.id === appointment.leadId);
      const property = state.properties.find((p) => p.id === appointment.propertyId);
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === appointment.id ? { ...a, state: "checked_in" } : a
        ),
        activity: [
          {
            id: nextEventId(),
            kind: "appointment",
            summary: `${lead?.name ?? appointment.leadId} checked in at ${property?.address ?? appointment.propertyId}`,
            daysAgo: 0,
          },
          ...state.activity,
        ],
      };
    }
    case "capture-lead": {
      const name = action.name.trim();
      if (!name) return state;
      const property = state.properties.find((p) => p.id === action.propertyId);
      if (!property) return state;
      const lead: Lead = {
        id: nextLeadId(),
        name,
        stage: "new",
        propertyIds: [property.id],
        nextAction: "Follow up and qualify",
        ownerId: property.agentId,
        budgetMin: 0,
        budgetMax: 0,
        source: "open_house",
        createdDaysAgo: 0,
      };
      return {
        ...state,
        leads: [lead, ...state.leads],
        activity: [
          {
            id: nextEventId(),
            kind: "lead",
            summary: `${name} captured on site at ${property.address}`,
            daysAgo: 0,
          },
          ...state.activity,
        ],
      };
    }
    case "reset":
      return buildPropertySeed();
  }
}

export interface PropertyStore {
  data: PropertyData;
  advanceLeadStage: (leadId: string) => void;
  setOfferState: (offerId: string, state: OfferState) => void;
  checkInAppointment: (appointmentId: string) => void;
  captureLead: (name: string, propertyId: string) => void;
  reset: () => void;
  agentById: (id: string) => PropertyData["agents"][number] | undefined;
  propertyById: (id: string) => PropertyData["properties"][number] | undefined;
  leadById: (id: string) => Lead | undefined;
  appointmentById: (id: string) => Appointment | undefined;
  offersForProperty: (propertyId: string) => Offer[];
  leadsForProperty: (propertyId: string) => Lead[];
  appointmentsForProperty: (propertyId: string) => Appointment[];
}

const PropertyContext = createContext<PropertyStore | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, buildPropertySeed);

  const advanceLeadStage = useCallback(
    (leadId: string) => dispatch({ type: "advance-lead-stage", leadId }),
    []
  );
  const setOfferState = useCallback(
    (offerId: string, state: OfferState) => dispatch({ type: "set-offer-state", offerId, state }),
    []
  );
  const checkInAppointment = useCallback(
    (appointmentId: string) => dispatch({ type: "check-in-appointment", appointmentId }),
    []
  );
  const captureLead = useCallback(
    (name: string, propertyId: string) =>
      dispatch({ type: "capture-lead", name, propertyId }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const store = useMemo<PropertyStore>(() => {
    const agentById = (id: string) => data.agents.find((a) => a.id === id);
    const propertyById = (id: string) => data.properties.find((p) => p.id === id);
    const leadById = (id: string) => data.leads.find((l) => l.id === id);
    const appointmentById = (id: string) => data.appointments.find((a) => a.id === id);
    const offersForProperty = (propertyId: string) =>
      data.offers.filter((o) => o.propertyId === propertyId);
    const leadsForProperty = (propertyId: string) =>
      data.leads.filter((l) => l.propertyIds.includes(propertyId));
    const appointmentsForProperty = (propertyId: string) =>
      data.appointments.filter((a) => a.propertyId === propertyId);
    return {
      data,
      advanceLeadStage,
      setOfferState,
      checkInAppointment,
      captureLead,
      reset,
      agentById,
      propertyById,
      leadById,
      appointmentById,
      offersForProperty,
      leadsForProperty,
      appointmentsForProperty,
    };
  }, [data, advanceLeadStage, setOfferState, checkInAppointment, captureLead, reset]);

  return <PropertyContext.Provider value={store}>{children}</PropertyContext.Provider>;
}

export function useProperty(): PropertyStore {
  const store = useContext(PropertyContext);
  if (!store) throw new Error("useProperty must be used inside PropertyProvider");
  return store;
}
