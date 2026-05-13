export type FeatureFlag =
  | "music"
  | "alcohol"
  | "food"
  | "stage"
  | "tickets"
  | "pyro"
  | "copyright";

export type VenueFlag = "private" | "beach" | "road" | "water";

export type PermitCondition = FeatureFlag | VenueFlag;

export type UrgencyLevel = "urgent" | "amber" | "green" | "normal";

export interface ApplyInPerson {
  address: string;
  tel?: string;
  email?: string;
  note?: string;
}

export interface Permit {
  step: number;
  name: string;
  agency: string;
  link?: string;
  lead: string;
  urgency: UrgencyLevel;
  /** All conditions must be true for permit to appear. Empty = always applies. */
  conditions: PermitCondition[];
  hasFees: boolean;
  applyOnline?: string;
  applyInPerson?: ApplyInPerson;
  docs: string[];
}

export const PERMITS: Permit[] = [
  {
    step: 1,
    name: "Venue permit",
    agency: "National Conservation Commission (NCC)",
    link: "https://ncc.gov.bb",
    lead: "Apply first — 3 weeks minimum",
    urgency: "urgent",
    conditions: ["beach"],
    hasFees: true,
    applyInPerson: {
      address: "NCC, Codrington House, Haggatt Hall, St. Michael",
      tel: "(246) 536-0617",
      email: "specialprojectsoffice@ncc.gov.bb",
    },
    docs: [
      "Written request to the NCC General Manager (at least 3 weeks before the event)",
      "Event details — nature of activity, date, time, expected attendance",
      "BPS loud music and public gathering permits (if applicable)",
      "COSCAP copyright licence (if playing recorded music)",
      "Chemical toilet plan (required if over 200 patrons)",
      "Public liability insurance certificate ($100,000 minimum for 100–1,000 patrons)",
      "Fees apply for commercial structures — stages, tents, bars, stalls",
    ],
  },
  {
    step: 2,
    name: "Place of Public Entertainment licence",
    agency: "Barbados Revenue Authority (BRA) — for the venue owner",
    link: "https://bra.gov.bb",
    lead: "3 weeks (renewed annually)",
    urgency: "amber",
    conditions: [],
    hasFees: true,
    applyOnline: "https://publicentertainment.bra.gov.bb/Place",
    applyInPerson: {
      address:
        "BRA Public Entertainment Unit, Weymouth Corporate Centre, Spring Garden Highway, St. Michael",
      tel: "(246) 232-2045",
      email: "publicentertainment@bra.gov.bb",
    },
    docs: [
      "Certificate from the Chief Town Planner (planning permission)",
      "Certificate from the Commissioner of Police",
      "Fire safety certificate from the Chief Fire Officer (BFS)",
      "Completed BRA Public Entertainment Portal registration",
      "Licence fee ($200 to $5,000 depending on venue type)",
    ],
  },
  {
    step: 2,
    name: "Promoter's Authorisation to Stage Public Entertainment",
    agency: "Barbados Revenue Authority (BRA) — for the event promoter",
    link: "https://bra.gov.bb",
    lead: "3 weeks before tickets go on sale",
    urgency: "amber",
    conditions: ["tickets"],
    hasFees: false,
    applyOnline: "https://publicentertainment.bra.gov.bb/Promotion",
    applyInPerson: {
      address:
        "BRA Public Entertainment Unit, Weymouth Corporate Centre, Spring Garden Highway, St. Michael",
      tel: "(246) 232-2045",
      email: "publicentertainment@bra.gov.bb",
    },
    docs: [
      "BRA Public Entertainment Portal registration",
      "All outstanding tax returns filed with BRA",
      "Outstanding tax debt settled or instalment agreement in place",
      "TAMIS numbers for DJs, security firms, and concessionaires",
      "Withholding tax paid in full for any non-resident performers",
    ],
  },
  {
    step: 3,
    name: "Pyrotechnics and fireworks permit",
    agency:
      "Ministry of Defence and Security · Barbados Defence Force (BDF) · Barbados Fire Service (BFS)",
    link: "https://defence.gov.bb",
    lead: "Start immediately — longest lead time",
    urgency: "urgent",
    conditions: ["pyro"],
    hasFees: false,
    applyInPerson: {
      address:
        "Ministry of Defence and Security, St. Ann's Fort, The Garrison, St. Michael",
      note: "BFS Chief Fire Officer approval also required separately",
    },
    docs: [
      "Application to the Ministry of Defence and Security",
      "Barbados Defence Force (BDF) approval for explosives and pyrotechnics",
      "Customs inspection documents for any imported fireworks",
      "Certified pyrotechnics operator name and credentials",
      "Site plan with safety exclusion zones clearly marked",
      "Separate Chief Fire Officer (BFS) approval for the display",
    ],
  },
  {
    step: 4,
    name: "Loud music permit",
    agency: "Barbados Police Service (BPS)",
    link: "https://police.gov.bb",
    lead: "6 weeks",
    urgency: "amber",
    conditions: ["music"],
    hasFees: false,
    applyInPerson: {
      address: "BPS Headquarters, Lower Roebuck Street, Bridgetown",
      tel: "(246) 430-7100",
      note: "No public online application available",
    },
    docs: [
      "Written application to BPS Headquarters",
      "Event details — date, time, location, expected attendance",
      "NCC venue approval letter (if event is at a beach or park)",
    ],
  },
  {
    step: 4,
    name: "Public gathering licence",
    agency: "Barbados Police Service (BPS)",
    link: "https://police.gov.bb",
    lead: "6 weeks",
    urgency: "amber",
    conditions: [],
    hasFees: false,
    applyInPerson: {
      address: "BPS Headquarters, Lower Roebuck Street, Bridgetown",
      tel: "(246) 430-7100",
      note: "No public online application available",
    },
    docs: [
      "Written application to BPS Headquarters",
      "Event details — date, time, location, expected attendance",
      "Security plan for the event",
    ],
  },
  {
    step: 5,
    name: "Music copyright (public performance) licence",
    agency: "Copyright Society of Composers, Authors and Publishers (COSCAP)",
    link: "https://coscap.org",
    lead: "2 to 3 weeks",
    urgency: "normal",
    conditions: ["copyright"],
    hasFees: true,
    applyOnline: "https://forms.coscap.org/node/11",
    applyInPerson: {
      address: "COSCAP, 11 8th Avenue, Belleville, St. Michael",
      note: "Book an appointment at appointments.coscap.org",
    },
    docs: [
      "Event details — date, expected attendance, and duration",
      "Licence fee payment (based on COSCAP tariff for event size and type)",
    ],
  },
  {
    step: 6,
    name: "Special Occasion Liquor Licence",
    agency:
      "Liquor Licence Authority, Dept. of Commerce and Consumer Affairs (DCCA)",
    link: "https://commerce.gov.bb",
    lead: "4 working days",
    urgency: "green",
    conditions: ["alcohol"],
    hasFees: true,
    applyOnline: "https://liquorlicence.gov.bb/",
    applyInPerson: {
      address: "Liquor Licence Authority, DCCA, Country Road, St. Michael",
      tel: "(246) 535-7011",
    },
    docs: [
      "Online registration at liquorlicence.gov.bb",
      "EZpay+ payment or payment at any post office",
      "Valid email address — certificate is delivered by email",
    ],
  },
  {
    step: 7,
    name: "Food handler's health certificate",
    agency: "Any registered doctor's office in Barbados",
    lead: "Allow a week or two",
    urgency: "amber",
    conditions: ["food"],
    hasFees: true,
    applyInPerson: {
      address: "Any registered doctor's office in Barbados",
      note: "No central application — each food handler must be seen individually",
    },
    docs: [
      "Health certificate required for each person preparing or handling food",
      "Fees apply at the doctor's office — varies by practice",
      "All certificates must be kept on site during the event",
    ],
  },
  {
    step: 8,
    name: "Fire safety inspection and certificate",
    agency: "Barbados Fire Service (BFS)",
    link: "https://bfs.gov.bb",
    lead: "5 weeks",
    urgency: "amber",
    conditions: ["stage"],
    hasFees: true,
    applyInPerson: {
      address:
        "BFS Fire Prevention Unit, CMM Emergency Services Complex, Prince Road, St. Michael",
      tel: "(246) 535-7829",
      note: "Contact to schedule an inspection",
    },
    docs: [
      "Site plan showing exits, extinguisher locations, and generator positions",
      "Details of any stages, tents, or temporary electrical installations",
      "Emergency evacuation plan",
      "Inspection fee applies — see BFS fees schedule",
    ],
  },
];

export const EVENT_TYPE_LABELS: Record<string, string> = {
  fete: "A fete or party",
  concert: "A concert or show",
  vending: "Food or craft vending",
  mas: "A mas band",
  cruise: "A boat cruise",
  market: "A market or fair",
};

export const VENUE_LABELS: Record<VenueFlag, string> = {
  private: "Private venue",
  beach: "Beach or park",
  road: "Public road or open area",
  water: "On the water",
};

export const SIZE_LABELS: Record<string, string> = {
  small: "Under 200 people",
  medium: "200 to 1,000 people",
  large: "Over 1,000 people",
};
