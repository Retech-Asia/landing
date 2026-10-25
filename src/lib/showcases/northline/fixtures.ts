import type {
  Account,
  AccountNote,
  ActivityItem,
  AutomationRule,
  Contact,
  Lead,
  NorthlineData,
  Opportunity,
  Task,
  TeamMember,
} from "./types";

/**
 * Northline CRM — deterministic synthetic dataset.
 *
 * Shapes fixed by the Wave 1C creative handoff (2026-10-25): 24 leads,
 * 12 customer accounts, 8 active opportunities totalling $346,000 (derived
 * from the records below, never hardcoded into UI), ~30 activity records,
 * 4 automation rules, 3 fictional sales team members.
 *
 * Every person, company, email, and event here is fictional sample data.
 */

export const team: TeamMember[] = [
  { id: "tm-morgan", name: "Morgan Reyes", initials: "MR", role: "Account Executive", hue: 174 },
  { id: "tm-dana", name: "Dana Whitfield", initials: "DW", role: "Senior Account Executive", hue: 254 },
  { id: "tm-alex", name: "Alex Osei", initials: "AO", role: "Account Manager", hue: 24 },
];

export const accounts: Account[] = [
  { id: "ac-harborline", company: "Harborline Logistics", industry: "Logistics", size: "200-500 staff", location: "Portland, OR", ownerId: "tm-morgan", status: "active", website: "harborline.example" },
  { id: "ac-stonebridge", company: "Stonebridge Manufacturing", industry: "Manufacturing", size: "500+ staff", location: "Cleveland, OH", ownerId: "tm-dana", status: "active", website: "stonebridge.example" },
  { id: "ac-whitepeak", company: "Whitepeak Retail", industry: "Retail", size: "50-200 staff", location: "Denver, CO", ownerId: "tm-alex", status: "active", website: "whitepeak.example" },
  { id: "ac-beaconfield", company: "Beaconfield Services", industry: "Professional Services", size: "50-200 staff", location: "Austin, TX", ownerId: "tm-morgan", status: "active", website: "beaconfield.example" },
  { id: "ac-eastwood", company: "Eastwood Learning", industry: "Education", size: "50-200 staff", location: "Madison, WI", ownerId: "tm-dana", status: "active", website: "eastwood.example" },
  { id: "ac-greyrock", company: "Greyrock Consulting", industry: "Consulting", size: "10-50 staff", location: "Chicago, IL", ownerId: "tm-alex", status: "active", website: "greyrock.example" },
  { id: "ac-waymark", company: "Waymark Operations", industry: "Facilities", size: "200-500 staff", location: "Phoenix, AZ", ownerId: "tm-morgan", status: "active", website: "waymark.example" },
  { id: "ac-solstice", company: "Solstice Partners", industry: "Financial Services", size: "10-50 staff", location: "Boston, MA", ownerId: "tm-dana", status: "active", website: "solstice.example" },
  { id: "ac-aldervane", company: "Aldervane Group", industry: "Legal Services", size: "10-50 staff", location: "Atlanta, GA", ownerId: "tm-alex", status: "onboarding", website: "aldervane.example" },
  { id: "ac-foxglove", company: "Foxglove Media", industry: "Media", size: "50-200 staff", location: "Los Angeles, CA", ownerId: "tm-morgan", status: "active", website: "foxglove.example" },
  { id: "ac-brightmoor", company: "Brightmoor Labs", industry: "Scientific", size: "10-50 staff", location: "Cambridge, MA", ownerId: "tm-dana", status: "onboarding", website: "brightmoor.example" },
  { id: "ac-quillon", company: "Quillon Freight", industry: "Logistics", size: "200-500 staff", location: "Memphis, TN", ownerId: "tm-alex", status: "active", website: "quillon.example" },
];

export const contacts: Contact[] = [
  { id: "ct-avery", name: "Avery Chen", title: "VP Operations", email: "avery.chen@harborline.example", accountId: "ac-harborline", primary: true },
  { id: "ct-elena", name: "Elena Brooks", title: "Director of IT", email: "elena.brooks@stonebridge.example", accountId: "ac-stonebridge", primary: true },
  { id: "ct-jordan", name: "Jordan Bell", title: "Head of E-commerce", email: "jordan.bell@whitepeak.example", accountId: "ac-whitepeak", primary: true },
  { id: "ct-maya", name: "Maya Torres", title: "COO", email: "maya.torres@beaconfield.example", accountId: "ac-beaconfield", primary: true },
  { id: "ct-priya", name: "Priya Nair", title: "Program Director", email: "priya.nair@eastwood.example", accountId: "ac-eastwood", primary: true },
  { id: "ct-diego", name: "Diego Rivera", title: "Managing Partner", email: "diego.rivera@greyrock.example", accountId: "ac-greyrock", primary: true },
  { id: "ct-samira", name: "Samira Hassan", title: "Operations Lead", email: "samira.hassan@waymark.example", accountId: "ac-waymark", primary: true },
  { id: "ct-noah", name: "Noah Kim", title: "CFO", email: "noah.kim@solstice.example", accountId: "ac-solstice", primary: true },
  { id: "ct-ruth", name: "Ruth Adebayo", title: "General Counsel", email: "ruth.adebayo@aldervane.example", accountId: "ac-aldervane", primary: true },
  { id: "ct-felix", name: "Felix Grant", title: "Producer", email: "felix.grant@foxglove.example", accountId: "ac-foxglove", primary: true },
  { id: "ct-lena", name: "Lena Fischer", title: "Lab Director", email: "lena.fischer@brightmoor.example", accountId: "ac-brightmoor", primary: true },
  { id: "ct-omar", name: "Omar Haddad", title: "Dispatch Manager", email: "omar.haddad@quillon.example", accountId: "ac-quillon", primary: true },
  { id: "ct-tessa", name: "Tessa Lang", title: "Warehouse Supervisor", email: "tessa.lang@harborline.example", accountId: "ac-harborline", primary: false },
  { id: "ct-marcus", name: "Marcus Webb", title: "Plant Manager", email: "marcus.webb@stonebridge.example", accountId: "ac-stonebridge", primary: false },
];

export const opportunities: Opportunity[] = [
  { id: "op-01", title: "Fleet scheduling platform", accountId: "ac-harborline", value: 48000, stage: "qualified", ownerId: "tm-morgan", nextAction: "Technical scoping call" },
  { id: "op-02", title: "Production analytics rollout", accountId: "ac-stonebridge", value: 76000, stage: "proposal", ownerId: "tm-dana", nextAction: "Proposal review workshop" },
  { id: "op-03", title: "Store operations dashboard", accountId: "ac-whitepeak", value: 24000, stage: "prospecting", ownerId: "tm-alex", nextAction: "Qualify budget owner" },
  { id: "op-04", title: "Client portal modernization", accountId: "ac-beaconfield", value: 62000, stage: "negotiation", ownerId: "tm-morgan", nextAction: "Contract redlines" },
  { id: "op-05", title: "Course operations system", accountId: "ac-eastwood", value: 36000, stage: "qualified", ownerId: "tm-dana", nextAction: "Integration inventory" },
  { id: "op-06", title: "Knowledge base revamp", accountId: "ac-greyrock", value: 19000, stage: "prospecting", ownerId: "tm-alex", nextAction: "Send use-case summary" },
  { id: "op-07", title: "Work order automation", accountId: "ac-waymark", value: 54000, stage: "proposal", ownerId: "tm-morgan", nextAction: "Pricing follow-up" },
  { id: "op-08", title: "Reporting consolidation", accountId: "ac-solstice", value: 27000, stage: "qualified", ownerId: "tm-dana", nextAction: "Data source audit" },
];

export const leads: Lead[] = [
  // The eight handoff opportunity-linked leads (values match their opportunities).
  { id: "ld-01", name: "Avery Chen", company: "Harborline Logistics", email: "avery.chen@harborline.example", source: "referral", status: "qualified", ownerId: "tm-morgan", estimatedValue: 48000, lastActivityDaysAgo: 1, nextStep: "Technical scoping call", opportunityId: "op-01" },
  { id: "ld-02", name: "Elena Brooks", company: "Stonebridge Manufacturing", email: "elena.brooks@stonebridge.example", source: "event", status: "qualified", ownerId: "tm-dana", estimatedValue: 76000, lastActivityDaysAgo: 2, nextStep: "Proposal review workshop", opportunityId: "op-02" },
  { id: "ld-03", name: "Jordan Bell", company: "Whitepeak Retail", email: "jordan.bell@whitepeak.example", source: "website", status: "contacted", ownerId: "tm-alex", estimatedValue: 24000, lastActivityDaysAgo: 4, nextStep: "Qualify budget owner", opportunityId: "op-03" },
  { id: "ld-04", name: "Maya Torres", company: "Beaconfield Services", email: "maya.torres@beaconfield.example", source: "referral", status: "qualified", ownerId: "tm-morgan", estimatedValue: 62000, lastActivityDaysAgo: 1, nextStep: "Contract redlines", opportunityId: "op-04" },
  { id: "ld-05", name: "Priya Nair", company: "Eastwood Learning", email: "priya.nair@eastwood.example", source: "linkedin", status: "qualified", ownerId: "tm-dana", estimatedValue: 36000, lastActivityDaysAgo: 3, nextStep: "Integration inventory", opportunityId: "op-05" },
  { id: "ld-06", name: "Diego Rivera", company: "Greyrock Consulting", email: "diego.rivera@greyrock.example", source: "outreach", status: "contacted", ownerId: "tm-alex", estimatedValue: 19000, lastActivityDaysAgo: 6, nextStep: "Send use-case summary", opportunityId: "op-06" },
  { id: "ld-07", name: "Samira Hassan", company: "Waymark Operations", email: "samira.hassan@waymark.example", source: "partner", status: "qualified", ownerId: "tm-morgan", estimatedValue: 54000, lastActivityDaysAgo: 2, nextStep: "Pricing follow-up", opportunityId: "op-07" },
  { id: "ld-08", name: "Noah Kim", company: "Solstice Partners", email: "noah.kim@solstice.example", source: "event", status: "qualified", ownerId: "tm-dana", estimatedValue: 27000, lastActivityDaysAgo: 3, nextStep: "Data source audit", opportunityId: "op-08" },
  // Additional pipeline-depth leads (16) — fictional inquiries.
  { id: "ld-09", name: "Ruth Adebayo", company: "Aldervane Group", email: "ruth.adebayo@aldervane.example", source: "referral", status: "qualified", ownerId: "tm-alex", estimatedValue: 31000, lastActivityDaysAgo: 5, nextStep: "Onboarding kickoff" },
  { id: "ld-10", name: "Felix Grant", company: "Foxglove Media", email: "felix.grant@foxglove.example", source: "website", status: "contacted", ownerId: "tm-morgan", estimatedValue: 22000, lastActivityDaysAgo: 7, nextStep: "Discovery call" },
  { id: "ld-11", name: "Lena Fischer", company: "Brightmoor Labs", email: "lena.fischer@brightmoor.example", source: "linkedin", status: "qualified", ownerId: "tm-dana", estimatedValue: 42000, lastActivityDaysAgo: 4, nextStep: "Sample-data walkthrough" },
  { id: "ld-12", name: "Omar Haddad", company: "Quillon Freight", email: "omar.haddad@quillon.example", source: "outreach", status: "new", ownerId: "tm-alex", estimatedValue: 38000, lastActivityDaysAgo: 1, nextStep: "First response" },
  { id: "ld-13", name: "Ingrid Sorel", company: "Vantage Print Co.", email: "ingrid.sorel@vantageprint.example", source: "website", status: "new", ownerId: "tm-morgan", estimatedValue: 15000, lastActivityDaysAgo: 1, nextStep: "Qualify scope" },
  { id: "ld-14", name: "Theo Marchetti", company: "Corvus Analytics", email: "theo.marchetti@corvus.example", source: "linkedin", status: "new", ownerId: "tm-dana", estimatedValue: 29000, lastActivityDaysAgo: 2, nextStep: "Connect on call" },
  { id: "ld-15", name: "Hana Sato", company: "Marrowfield Foods", email: "hana.sato@marrowfield.example", source: "event", status: "contacted", ownerId: "tm-alex", estimatedValue: 26000, lastActivityDaysAgo: 8, nextStep: "Send capabilities deck" },
  { id: "ld-16", name: "Colin Draith", company: "Percheron Builders", email: "colin.draith@percheron.example", source: "partner", status: "new", ownerId: "tm-morgan", estimatedValue: 33000, lastActivityDaysAgo: 3, nextStep: "Site visit follow-up" },
  { id: "ld-17", name: "Amara Diallo", company: "Linden Health Supplies", email: "amara.diallo@linden.example", source: "outreach", status: "unqualified", ownerId: "tm-dana", estimatedValue: 8000, lastActivityDaysAgo: 21, nextStep: "Archive pending review" },
  { id: "ld-18", name: "Pieter Vos", company: "Delftline Tooling", email: "pieter.vos@delftline.example", source: "website", status: "contacted", ownerId: "tm-alex", estimatedValue: 21000, lastActivityDaysAgo: 9, nextStep: "Schedule demo" },
  { id: "ld-19", name: "Rosa Quintero", company: "Salterra Interiors", email: "rosa.quintero@salterra.example", source: "referral", status: "new", ownerId: "tm-morgan", estimatedValue: 17000, lastActivityDaysAgo: 2, nextStep: "Intro email" },
  { id: "ld-20", name: "Bram Osterhuis", company: "Kestrel Avionics", email: "bram.osterhuis@kestrel.example", source: "event", status: "qualified", ownerId: "tm-dana", estimatedValue: 58000, lastActivityDaysAgo: 6, nextStep: "Compliance questionnaire" },
  { id: "ld-21", name: "Nadia Rahimi", company: "Copperline Energy", email: "nadia.rahimi@copperline.example", source: "linkedin", status: "contacted", ownerId: "tm-alex", estimatedValue: 45000, lastActivityDaysAgo: 5, nextStep: "Stakeholder mapping" },
  { id: "ld-22", name: "Gideon Marsh", company: "Tessellate Studio", email: "gideon.marsh@tessellate.example", source: "website", status: "unqualified", ownerId: "tm-morgan", estimatedValue: 5000, lastActivityDaysAgo: 30, nextStep: "Close-out note" },
  { id: "ld-23", name: "Yuki Tanabe", company: "Aster & Pine Retail", email: "yuki.tanabe@asterpine.example", source: "partner", status: "new", ownerId: "tm-dana", estimatedValue: 19000, lastActivityDaysAgo: 1, nextStep: "Qualify channels" },
  { id: "ld-24", name: "Silas Onyango", company: "Redbarn Provisions", email: "silas.onyango@redbarn.example", source: "outreach", status: "contacted", ownerId: "tm-alex", estimatedValue: 23000, lastActivityDaysAgo: 11, nextStep: "Re-engage decision maker" },
];

export const activities: ActivityItem[] = [
  { id: "act-01", type: "call", refType: "lead", refId: "ld-01", summary: "Scoping call with Avery Chen — scheduling platform walk-through", daysAgo: 0.25 },
  { id: "act-02", type: "email", refType: "lead", refId: "ld-04", summary: "Sent contract draft to Maya Torres", daysAgo: 1 },
  { id: "act-03", type: "stage", refType: "opportunity", refId: "op-04", summary: "Client portal modernization moved to Negotiation", daysAgo: 1.1 },
  { id: "act-04", type: "meeting", refType: "opportunity", refId: "op-02", summary: "Proposal workshop prep with Stonebridge IT", daysAgo: 1.6 },
  { id: "act-05", type: "email", refType: "lead", refId: "ld-12", summary: "Auto-response sent to Omar Haddad after inbound inquiry", daysAgo: 1.2 },
  { id: "act-06", type: "call", refType: "lead", refId: "ld-07", summary: "Pricing follow-up with Samira Hassan", daysAgo: 2 },
  { id: "act-07", type: "meeting", refType: "opportunity", refId: "op-05", summary: "Eastwood Learning integrations review", daysAgo: 2.4 },
  { id: "act-08", type: "note", refType: "account", refId: "ac-solstice", summary: "Noah Kim prefers written summaries before calls", daysAgo: 2.7 },
  { id: "act-09", type: "email", refType: "lead", refId: "ld-05", summary: "Integration checklist sent to Priya Nair", daysAgo: 3 },
  { id: "act-10", type: "stage", refType: "opportunity", refId: "op-07", summary: "Work order automation moved to Proposal", daysAgo: 3.2 },
  { id: "act-11", type: "call", refType: "lead", refId: "ld-11", summary: "Intro call with Lena Fischer", daysAgo: 3.8 },
  { id: "act-12", type: "email", refType: "lead", refId: "ld-03", summary: "Budget-owner question sent to Jordan Bell", daysAgo: 4.1 },
  { id: "act-13", type: "meeting", refType: "account", refId: "ac-aldervane", summary: "Aldervane onboarding planning session", daysAgo: 4.5 },
  { id: "act-14", type: "call", refType: "lead", refId: "ld-20", summary: "Compliance questionnaire walk-through with Bram Osterhuis", daysAgo: 5 },
  { id: "act-15", type: "email", refType: "lead", refId: "ld-21", summary: "Stakeholder map requested from Nadia Rahimi", daysAgo: 5.3 },
  { id: "act-16", type: "stage", refType: "opportunity", refId: "op-01", summary: "Fleet scheduling platform moved to Qualified", daysAgo: 5.6 },
  { id: "act-17", type: "note", refType: "account", refId: "ac-waymark", summary: "Waymark wants phased rollout by region", daysAgo: 6 },
  { id: "act-18", type: "call", refType: "lead", refId: "ld-06", summary: "Use-case discovery with Diego Rivera", daysAgo: 6.4 },
  { id: "act-19", type: "email", refType: "lead", refId: "ld-18", summary: "Demo invitation sent to Pieter Vos", daysAgo: 6.9 },
  { id: "act-20", type: "meeting", refType: "opportunity", refId: "op-08", summary: "Solstice reporting sources review", daysAgo: 7.2 },
  { id: "act-21", type: "call", refType: "lead", refId: "ld-10", summary: "Discovery call with Felix Grant", daysAgo: 7.8 },
  { id: "act-22", type: "stage", refType: "opportunity", refId: "op-05", summary: "Course operations system moved to Qualified", daysAgo: 8.1 },
  { id: "act-23", type: "email", refType: "lead", refId: "ld-15", summary: "Capabilities deck sent to Hana Sato", daysAgo: 8.6 },
  { id: "act-24", type: "note", refType: "account", refId: "ac-harborline", summary: "Harborline fleet team uses shift-based dispatch", daysAgo: 9.1 },
  { id: "act-25", type: "call", refType: "lead", refId: "ld-16", summary: "Site visit debrief with Colin Draith", daysAgo: 9.7 },
  { id: "act-26", type: "email", refType: "lead", refId: "ld-24", summary: "Re-engagement note sent to Silas Onyango", daysAgo: 10.4 },
  { id: "act-27", type: "meeting", refType: "account", refId: "ac-brightmoor", summary: "Brightmoor onboarding checklist review", daysAgo: 11 },
  { id: "act-28", type: "stage", refType: "opportunity", refId: "op-02", summary: "Production analytics rollout moved to Proposal", daysAgo: 11.8 },
  { id: "act-29", type: "call", refType: "lead", refId: "ld-09", summary: "Kickoff scheduling call with Ruth Adebayo", daysAgo: 12.5 },
  { id: "act-30", type: "email", refType: "lead", refId: "ld-02", summary: "Workshop agenda confirmed with Elena Brooks", daysAgo: 13.2 },
];

export const tasks: Task[] = [
  { id: "tk-01", title: "Send contract redlines to Beaconfield", dueInDays: 0, refType: "opportunity", refId: "op-04", ownerId: "tm-morgan", done: false },
  { id: "tk-02", title: "Confirm workshop attendees with Stonebridge", dueInDays: 0, refType: "opportunity", refId: "op-02", ownerId: "tm-dana", done: false },
  { id: "tk-03", title: "First response to Quillon Freight inquiry", dueInDays: -1, refType: "lead", refId: "ld-12", ownerId: "tm-alex", done: false },
  { id: "tk-04", title: "Pricing follow-up call — Waymark", dueInDays: 1, refType: "opportunity", refId: "op-07", ownerId: "tm-morgan", done: false },
  { id: "tk-05", title: "Integration inventory for Eastwood", dueInDays: 2, refType: "opportunity", refId: "op-05", ownerId: "tm-dana", done: false },
  { id: "tk-06", title: "Qualify Whitepeak budget owner", dueInDays: 2, refType: "opportunity", refId: "op-03", ownerId: "tm-alex", done: false },
  { id: "tk-07", title: "Data source audit for Solstice", dueInDays: 3, refType: "opportunity", refId: "op-08", ownerId: "tm-dana", done: false },
  { id: "tk-08", title: "Use-case summary to Greyrock", dueInDays: 4, refType: "opportunity", refId: "op-06", ownerId: "tm-alex", done: false },
  { id: "tk-09", title: "Onboarding kickoff — Aldervane", dueInDays: 5, refType: "account", refId: "ac-aldervane", ownerId: "tm-alex", done: false },
  { id: "tk-10", title: "Archive review — Linden Health Supplies", dueInDays: 6, refType: "lead", refId: "ld-17", ownerId: "tm-dana", done: false },
];

export const rules: AutomationRule[] = [
  {
    id: "rl-01",
    name: "New lead assignment",
    description: "Routes each inbound lead to the account executive with the lightest active load for that region.",
    trigger: "Lead created",
    action: "Assign owner + send introduction email",
    status: "active",
    runsPerMonth: 42,
    lastRunDaysAgo: 0.2,
    preview: {
      title: "If Omar Haddad (Quillon Freight) submitted the inquiry form…",
      steps: [
        "Lead created from website form — source: outreach",
        "Round-robin picks Alex Osei (3 active leads, West region)",
        "Introduction email queued with response-time expectation",
        "Owner notified in Northline — task 'First response' created",
      ],
    },
  },
  {
    id: "rl-02",
    name: "Inactive proposal reminder",
    description: "Nudges the owner when a proposal sits without a client touchpoint for ten days.",
    trigger: "Opportunity in Proposal, no activity for 10 days",
    action: "Create follow-up task + notify owner",
    status: "active",
    runsPerMonth: 7,
    lastRunDaysAgo: 1.4,
    preview: {
      title: "If the Work order automation deal stays untouched until Nov 5…",
      steps: [
        "Proposal stage detected — last client touch 10 days ago",
        "Follow-up task assigned to Morgan Reyes, due next morning",
        "Owner notified with one-click call and email links",
      ],
    },
  },
  {
    id: "rl-03",
    name: "Won-deal onboarding tasks",
    description: "When a deal is marked Won, generates the standard onboarding checklist for the account team.",
    trigger: "Opportunity stage changes to Won",
    action: "Create onboarding task set + invite account team",
    status: "active",
    runsPerMonth: 3,
    lastRunDaysAgo: 6.2,
    preview: {
      title: "If Beaconfield's client portal deal is marked Won…",
      steps: [
        "Stage change to Won detected",
        "Five onboarding tasks created (kickoff, access, data, plan, review)",
        "Account team invited; kickoff drafted for next Monday",
      ],
    },
  },
  {
    id: "rl-04",
    name: "High-value opportunity review",
    description: "Flags opportunities above $50,000 for a weekly pipeline review with the sales lead.",
    trigger: "Opportunity value above $50,000",
    action: "Add to weekly review list",
    status: "paused",
    runsPerMonth: 0,
    lastRunDaysAgo: 9,
    preview: {
      title: "If Eastwood Learning's estimate rises to $52,000…",
      steps: [
        "Value threshold crossed ($52,000 > $50,000)",
        "Deal added to Monday review list for Dana Whitfield",
        "Summary prepared: stage, age, last touch, next action",
      ],
    },
  },
];

export const notes: AccountNote[] = [
  { id: "nt-01", accountId: "ac-beaconfield", authorId: "tm-morgan", body: "Maya wants the portal launched before their March client conference. Legal reviews contracts on Thursdays only.", daysAgo: 1.5 },
  { id: "nt-02", accountId: "ac-stonebridge", authorId: "tm-dana", body: "Plant managers will need shop-floor tablets supported. Marcus Webb is the operational sign-off.", daysAgo: 2.2 },
  { id: "nt-03", accountId: "ac-harborline", authorId: "tm-morgan", body: "Dispatch runs on shift patterns — ask for Tessa Lang's checklist before scoping the scheduler.", daysAgo: 4 },
];

/** The full seed dataset. Store resets to this on demo reset/reload. */
export function buildNorthlineSeed(): NorthlineData {
  return {
    team: structuredClone(team),
    accounts: structuredClone(accounts),
    contacts: structuredClone(contacts),
    leads: structuredClone(leads),
    opportunities: structuredClone(opportunities),
    activities: structuredClone(activities),
    tasks: structuredClone(tasks),
    rules: structuredClone(rules),
    notes: structuredClone(notes),
  };
}
