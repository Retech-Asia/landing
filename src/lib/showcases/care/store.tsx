"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { buildCareSeed } from "./fixtures";
import type { LocalePair } from "@/lib/showcases/types";
import { timeToMinutes } from "./format";
import type {
  Appointment,
  CareData,
  CarePlanTask,
  CarePlanTemplate,
  CareState,
  CareTeamMember,
  Medication,
  MedicationDose,
  PendingReply,
  RosterPatient,
} from "./types";

/**
 * Shared demo state for the six Care Companion views. In-memory only: task
 * check-ins and medication toggles update the plan, reschedule requests and
 * the scripted message thread mutate their records, and every action lands
 * in the activity log. Reset/reload returns to seed. State persists across
 * view switches because the provider lives in the demo root.
 */

export type CareAction =
  | { type: "toggle-task"; taskId: string }
  | { type: "toggle-dose"; medicationId: string; doseId: string }
  | { type: "request-reschedule"; appointmentId: string }
  | { type: "cancel-reschedule"; appointmentId: string }
  | { type: "send-message"; text: string; reply: LocalePair }
  | { type: "deliver-reply" }
  | { type: "reset" };

let localIdCounter = 0;
function nextLocalId(prefix: string): string {
  localIdCounter += 1;
  return `${prefix}-local-${localIdCounter}`;
}

function buildInitialState(): CareState {
  return { data: buildCareSeed(), pendingReply: null };
}

function reducer(state: CareState, action: CareAction): CareState {
  switch (action.type) {
    case "toggle-task": {
      const task = state.data.plan.tasks.find((t) => t.id === action.taskId);
      if (!task) return state;
      const checkedToday = !task.checkedToday;
      const verb = checkedToday
        ? { en: "Checked in", vi: "Đã ghi nhận" }
        : { en: "Check-in removed", vi: "Đã bỏ ghi nhận" };
      return {
        ...state,
        data: {
          ...state.data,
          plan: {
            ...state.data.plan,
            tasks: state.data.plan.tasks.map((t) =>
              t.id === task.id ? { ...t, checkedToday } : t
            ),
          },
          activity: [
            {
              id: nextLocalId("act"),
              kind: "task",
              summary: {
                en: `${verb.en}: ${task.title.en}`,
                vi: `${verb.vi}: ${task.title.vi}`,
              },
            },
            ...state.data.activity,
          ],
        },
      };
    }
    case "toggle-dose": {
      const med = state.data.medications.find((m) => m.id === action.medicationId);
      const dose = med?.doses.find((d) => d.id === action.doseId);
      if (!med || !dose) return state;
      const taken = !dose.taken;
      const verb = taken
        ? { en: "Taken", vi: "Đã uống" }
        : { en: "Marked as not taken", vi: "Đã bỏ đánh dấu đã uống" };
      return {
        ...state,
        data: {
          ...state.data,
          medications: state.data.medications.map((m) =>
            m.id === med.id
              ? {
                  ...m,
                  doses: m.doses.map((d) => (d.id === dose.id ? { ...d, taken } : d)),
                }
              : m
          ),
          activity: [
            {
              id: nextLocalId("act"),
              kind: "medication",
              summary: { en: `${verb.en}: ${med.name}`, vi: `${verb.vi}: ${med.name}` },
            },
            ...state.data.activity,
          ],
        },
      };
    }
    case "request-reschedule": {
      const appt = state.data.appointments.find((a) => a.id === action.appointmentId);
      if (!appt || appt.dayOffset < 0 || appt.rescheduleRequest) return state;
      return {
        ...state,
        data: {
          ...state.data,
          appointments: state.data.appointments.map((a) =>
            a.id === appt.id
              ? {
                  ...a,
                  rescheduleRequest: {
                    dayOffset: a.dayOffset + 3,
                    time: a.time,
                    note: {
                      en: "Requested from the app — the clinic will confirm.",
                      vi: "Yêu cầu từ ứng dụng — phòng khám sẽ xác nhận.",
                    },
                  },
                }
              : a
          ),
          activity: [
            {
              id: nextLocalId("act"),
              kind: "reschedule",
              summary: {
                en: `Reschedule requested: ${appt.kind.en}`,
                vi: `Đã yêu cầu đổi lịch: ${appt.kind.vi}`,
              },
            },
            ...state.data.activity,
          ],
        },
      };
    }
    case "cancel-reschedule": {
      const appt = state.data.appointments.find((a) => a.id === action.appointmentId);
      if (!appt || !appt.rescheduleRequest) return state;
      return {
        ...state,
        data: {
          ...state.data,
          appointments: state.data.appointments.map((a) =>
            a.id === appt.id ? { ...a, rescheduleRequest: null } : a
          ),
          activity: [
            {
              id: nextLocalId("act"),
              kind: "reschedule",
              summary: {
                en: `Reschedule request withdrawn: ${appt.kind.en}`,
                vi: `Đã rút lại yêu cầu đổi lịch: ${appt.kind.vi}`,
              },
            },
            ...state.data.activity,
          ],
        },
      };
    }
    case "send-message": {
      const text = action.text.trim();
      if (!text) return state;
      const patientMessageId = nextLocalId("msg");
      const pendingReply: PendingReply = {
        patientMessageId,
        senderId: "ct-mai",
        body: action.reply,
      };
      return {
        ...state,
        pendingReply,
        data: {
          ...state.data,
          thread: [
            ...state.data.thread,
            {
              id: patientMessageId,
              direction: "patient",
              body: { en: text, vi: text },
              dayOffset: 0,
              time: "07:40",
            },
          ],
          activity: [
            {
              id: nextLocalId("act"),
              kind: "message",
              summary: { en: "Message sent to the care team", vi: "Đã gửi tin nhắn đến đội ngũ chăm sóc" },
            },
            ...state.data.activity,
          ],
        },
      };
    }
    case "deliver-reply": {
      const pending = state.pendingReply;
      if (!pending) return state;
      const sender = state.data.team.find((m) => m.id === pending.senderId);
      return {
        ...state,
        pendingReply: null,
        data: {
          ...state.data,
          thread: [
            ...state.data.thread,
            {
              id: nextLocalId("msg"),
              direction: "care-team",
              senderId: pending.senderId,
              body: pending.body,
              dayOffset: 0,
              time: "07:41",
            },
          ],
          activity: [
            {
              id: nextLocalId("act"),
              kind: "message",
              summary: {
                en: `Reply from ${sender?.name ?? "the care team"}`,
                vi: `Phản hồi từ ${sender?.name ?? "đội ngũ chăm sóc"}`,
              },
            },
            ...state.data.activity,
          ],
        },
      };
    }
    case "reset":
      return buildInitialState();
  }
}

/** A single scheduled dose for today, flattened for schedule rows. */
export interface TodayDose {
  medication: Medication;
  dose: MedicationDose;
}

export function doseTakenAll(med: Medication): boolean {
  return med.doses.every((d) => d.taken);
}

export interface CareStore {
  data: CareData;
  pendingReply: PendingReply | null;
  toggleTask: (taskId: string) => void;
  toggleDose: (medicationId: string, doseId: string) => void;
  requestReschedule: (appointmentId: string) => void;
  cancelReschedule: (appointmentId: string) => void;
  sendMessage: (text: string, reply: LocalePair) => void;
  deliverReply: () => void;
  reset: () => void;
  teamMemberById: (id: string) => CareTeamMember | undefined;
  patientById: (id: string) => RosterPatient | undefined;
  medicationById: (id: string) => Medication | undefined;
  taskById: (id: string) => CarePlanTask | undefined;
  templateById: (id: string) => CarePlanTemplate | undefined;
  todayAppointment: () => Appointment | undefined;
  upcomingAppointments: () => Appointment[];
  pastAppointments: () => Appointment[];
  todayDoses: () => TodayDose[];
  /** Plain consecutive-day count: full days before today, plus today if done. */
  streakFor: (med: Medication) => number;
  planWeekDone: () => number;
  planWeekTarget: () => number;
}

const CareContext = createContext<CareStore | null>(null);

export function CareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  const toggleTask = useCallback(
    (taskId: string) => dispatch({ type: "toggle-task", taskId }),
    []
  );
  const toggleDose = useCallback(
    (medicationId: string, doseId: string) =>
      dispatch({ type: "toggle-dose", medicationId, doseId }),
    []
  );
  const requestReschedule = useCallback(
    (appointmentId: string) => dispatch({ type: "request-reschedule", appointmentId }),
    []
  );
  const cancelReschedule = useCallback(
    (appointmentId: string) => dispatch({ type: "cancel-reschedule", appointmentId }),
    []
  );
  const sendMessage = useCallback(
    (text: string, reply: LocalePair) => dispatch({ type: "send-message", text, reply }),
    []
  );
  const deliverReply = useCallback(() => dispatch({ type: "deliver-reply" }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  const store = useMemo<CareStore>(() => {
    const { data } = state;
    const byDay = (a: Appointment, b: Appointment) =>
      a.dayOffset - b.dayOffset || timeToMinutes(a.time) - timeToMinutes(b.time);
    return {
      data,
      pendingReply: state.pendingReply,
      toggleTask,
      toggleDose,
      requestReschedule,
      cancelReschedule,
      sendMessage,
      deliverReply,
      reset,
      teamMemberById: (id) => data.team.find((m) => m.id === id),
      patientById: (id) => data.roster.find((p) => p.id === id),
      medicationById: (id) => data.medications.find((m) => m.id === id),
      taskById: (id) => data.plan.tasks.find((t) => t.id === id),
      templateById: (id) => data.templates.find((t) => t.id === id),
      todayAppointment: () =>
        data.appointments.filter((a) => a.dayOffset >= 0).sort(byDay)[0],
      upcomingAppointments: () =>
        data.appointments.filter((a) => a.dayOffset >= 0).sort(byDay),
      pastAppointments: () =>
        data.appointments.filter((a) => a.dayOffset < 0).sort((a, b) => byDay(b, a)),
      todayDoses: () =>
        data.medications
          .flatMap((medication) =>
            medication.doses.map((dose) => ({ medication, dose }))
          )
          .sort((a, b) => timeToMinutes(a.dose.time) - timeToMinutes(b.dose.time)),
      streakFor: (med) => med.streakBase + (doseTakenAll(med) ? 1 : 0),
      planWeekDone: () =>
        data.plan.tasks.reduce((sum, t) => sum + t.weekBase + (t.checkedToday ? 1 : 0), 0),
      planWeekTarget: () => data.plan.tasks.reduce((sum, t) => sum + t.perWeek, 0),
    };
  }, [state, toggleTask, toggleDose, requestReschedule, cancelReschedule, sendMessage, deliverReply, reset]);

  return <CareContext.Provider value={store}>{children}</CareContext.Provider>;
}

export function useCare(): CareStore {
  const store = useContext(CareContext);
  if (!store) throw new Error("useCare must be used inside CareProvider");
  return store;
}
