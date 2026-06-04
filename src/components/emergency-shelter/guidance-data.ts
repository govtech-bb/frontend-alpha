/**
 * Static reference content for the shelter guidance page.
 * --------------------------------------------------------------
 * District Emergency Organisation chairpersons, hurricane terminology and the
 * phone directory, from the 2026 Emergency Shelter Booklet. The accessible-
 * shelter list is NOT here — it is derived from EMERGENCY_SHELTERS so there is
 * one source of truth for which shelters have an accessible bathroom.
 */

export interface DistrictChair {
  district: string;
  name: string;
  number: string;
  tel: string;
}

export const DISTRICT_CHAIRS: DistrictChair[] = [
  {
    district: "Christ Church East",
    name: "Mr. Kwame Bradshaw",
    number: "832-0295",
    tel: "tel:+12468320295",
  },
  {
    district: "Christ Church East Central",
    name: "Mr. Jason Griffith",
    number: "825-4346",
    tel: "tel:+12468254346",
  },
  {
    district: "Christ Church West",
    name: "Mr. Ian Smitten",
    number: "245-7606",
    tel: "tel:+12462457606",
  },
  {
    district: "City of Bridgetown",
    name: "Ms. Dorcus Williams",
    number: "261-9792",
    tel: "tel:+12462619792",
  },
  {
    district: "St. Andrew",
    name: "Ms. Corlita Andrews",
    number: "261-6380",
    tel: "tel:+12462616380",
  },
  {
    district: "St. George North",
    name: "Mr. Roderick Yarde",
    number: "252-1944",
    tel: "tel:+12462521944",
  },
  {
    district: "St. George South",
    name: "Mr. Roger Padmore",
    number: "230-6493",
    tel: "tel:+12462306493",
  },
  {
    district: "St. James Central",
    name: "Mrs. Chery Griffith",
    number: "826-7798",
    tel: "tel:+12468267798",
  },
  {
    district: "St. James North",
    name: "Mrs. Joyanne Forde-Craigg",
    number: "824-5935",
    tel: "tel:+12468245935",
  },
  {
    district: "St. James South",
    name: "Mr. John Flemming",
    number: "851-4010",
    tel: "tel:+12468514010",
  },
  {
    district: "St. John",
    name: "Mr. Winston Millington",
    number: "263-3041",
    tel: "tel:+12462633041",
  },
  {
    district: "St. Joseph",
    name: "Mr. Matthew Alleyne",
    number: "237-2674",
    tel: "tel:+12462372674",
  },
  {
    district: "St. Lucy",
    name: "Ms. Rontae Johnson-Annius",
    number: "268-5122",
    tel: "tel:+12462685122",
  },
  {
    district: "St. Michael Central",
    name: "Mrs. Gail Powers-Yard",
    number: "255-2372",
    tel: "tel:+12462552372",
  },
  {
    district: "St. Michael East",
    name: "Mr. Kirt Trotman",
    number: "262-5074",
    tel: "tel:+12462625074",
  },
  {
    district: "St. Michael Northeast",
    name: "Mr. Michael Carrington",
    number: "843-9381",
    tel: "tel:+12468439381",
  },
  {
    district: "St. Michael Northwest",
    name: "Ms. Doriel Gill JP",
    number: "240-8559",
    tel: "tel:+12462408559",
  },
  {
    district: "St. Michael South",
    name: "Ms. Richelle Brathwaite",
    number: "262-1093",
    tel: "tel:+12462621093",
  },
  {
    district: "St. Michael South Central",
    name: "Mrs. Charone Holder-Parris",
    number: "232-7352",
    tel: "tel:+12462327352",
  },
  {
    district: "St. Michael Southeast",
    name: "Ms. Sophia Greaves-Broome",
    number: "832-4130",
    tel: "tel:+12468324130",
  },
  {
    district: "St. Michael West",
    name: "Ms. Kathy Harris",
    number: "240-3189",
    tel: "tel:+12462403189",
  },
  {
    district: "St. Michael West Central",
    name: "Ms. Quostan Peters",
    number: "282-7616",
    tel: "tel:+12462827616",
  },
  {
    district: "St. Peter",
    name: "Mr. Dave Hurley",
    number: "838-8338",
    tel: "tel:+12468388338",
  },
  {
    district: "St. Philip North",
    name: "Ms. Ermenta King",
    number: "236-2220",
    tel: "tel:+12462362220",
  },
  {
    district: "St. Philip South",
    name: "Mrs. Sharon-Rose Gittens",
    number: "230-3641",
    tel: "tel:+12462303641",
  },
  {
    district: "St. Philip West",
    name: "Ms. Natasha Morgan",
    number: "253-1811",
    tel: "tel:+12462531811",
  },
  {
    district: "St. Thomas",
    name: "Mr. Rodney Francis",
    number: "232-9853",
    tel: "tel:+12462329853",
  },
];

export interface HurricaneTerm {
  term: string;
  definition: string;
}

export const HURRICANE_TERMS: HurricaneTerm[] = [
  {
    term: "Tropical wave",
    definition:
      "A bend in the normally straight flow of surface air in the tropics, with showers and thunderstorms. Can develop into a tropical cyclone.",
  },
  {
    term: "Tropical depression",
    definition: "A tropical cyclone with maximum sustained winds below 39 mph.",
  },
  {
    term: "Tropical storm",
    definition: "A tropical cyclone with winds of 39–73 mph.",
  },
  {
    term: "Tropical storm watch",
    definition: "Tropical storm conditions are possible within 48 hours.",
  },
  {
    term: "Tropical storm warning",
    definition: "Tropical storm conditions are expected within 36 hours.",
  },
  {
    term: "Hurricane",
    definition: "A tropical cyclone with winds of 74 mph or more.",
  },
  {
    term: "Hurricane watch",
    definition: "Hurricane conditions are possible within 48 hours.",
  },
  {
    term: "Hurricane warning",
    definition:
      "Hurricane conditions are expected to make landfall within 36 hours.",
  },
  {
    term: "All clear",
    definition:
      "The storm or hurricane has left the area, but you should still be cautious.",
  },
  {
    term: "Storm surge",
    definition:
      "The dome of water that builds up as a hurricane moves over the sea. When it comes ashore it causes flooding — usually a hurricane's biggest killer.",
  },
  {
    term: "Eye",
    definition:
      "The low-pressure centre of a hurricane. Winds are normally calm and the sky can clear. Do not be fooled — the worst part comes after the eye passes and the winds blow from the opposite direction.",
  },
  {
    term: "Eye wall",
    definition:
      "The ring of thunderstorms that surrounds the eye. The heaviest rain, strongest winds and worst turbulence are normally here.",
  },
];

export interface PhoneContact {
  display: string;
  tel: string;
  /** e.g. "in an emergency", "(direct)", "(mobile)". */
  note?: string;
}

export interface PhoneEntry {
  label: string;
  contacts: PhoneContact[];
}

export interface PhoneGroup {
  heading: string;
  entries: PhoneEntry[];
}

export const PHONE_DIRECTORY: PhoneGroup[] = [
  {
    heading: "Emergency services",
    entries: [
      {
        label: "Police",
        contacts: [
          { display: "211", tel: "tel:211", note: "in an emergency" },
          {
            display: "430-7100",
            tel: "tel:+12464307100",
            note: "for non-emergencies",
          },
        ],
      },
      {
        label: "Fire Service",
        contacts: [
          { display: "311", tel: "tel:311", note: "in an emergency" },
          {
            display: "535-7824",
            tel: "tel:+12465357824",
            note: "for non-emergencies",
          },
        ],
      },
      { label: "Ambulance", contacts: [{ display: "511", tel: "tel:511" }] },
      {
        label: "Queen Elizabeth Hospital",
        contacts: [{ display: "436-6450", tel: "tel:+12464366450" }],
      },
      {
        label: "Barbados Defence Force",
        contacts: [{ display: "536-2000", tel: "tel:+12465362000" }],
      },
      {
        label: "Veterinary Services Department",
        contacts: [{ display: "535-0221", tel: "tel:+12465350221" }],
      },
    ],
  },
  {
    heading: "Department of Emergency Management (DEM)",
    entries: [
      {
        label: "DEM main switchboard",
        contacts: [{ display: "438-7575", tel: "tel:+12464387575" }],
      },
      {
        label: "Director — Ms. Kerry Hinds",
        contacts: [
          { display: "535-7153", tel: "tel:+12465357153", note: "(direct)" },
        ],
      },
      {
        label: "Deputy Director — Maj. Robert Harewood",
        contacts: [
          { display: "535-7166", tel: "tel:+12465357166", note: "(direct)" },
        ],
      },
    ],
  },
  {
    heading: "Shelter Wardens (Ministry of Educational Transformation)",
    entries: [
      {
        label:
          "Chief Shelter Warden — Dr. Ramona Archer-Bradshaw, Chief Education Officer",
        contacts: [
          { display: "535-0609", tel: "tel:+12465350609", note: "(work)" },
          { display: "850-7457", tel: "tel:+12468507457", note: "(mobile)" },
        ],
      },
      {
        label: "Deputy Chief Shelter Warden — Rev. Stephen Scott",
        contacts: [
          { display: "535-0614", tel: "tel:+12465350614", note: "(work)" },
          { display: "230-6946", tel: "tel:+12462306946", note: "(mobile)" },
        ],
      },
      {
        label: "Deputy Chief Shelter Warden — Ms. Julia Beckles",
        contacts: [
          { display: "535-0613", tel: "tel:+12465350613", note: "(work)" },
          { display: "233-6023", tel: "tel:+12462336023", note: "(mobile)" },
        ],
      },
    ],
  },
];
