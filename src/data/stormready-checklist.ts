/**
 * StormReady Barbados — household preparation checklist data
 * --------------------------------------------------------------
 * Single source of truth for the checklist rendered at
 * /health-and-emergency-services/stormready/checklist and for the
 * "Highlights from the checklist" cards on the landing page.
 *
 * Content is drawn from the Department of Emergency Management (DEM)
 * 2026 guidance and the Barbados Water Authority's storm advice.
 */

export interface ChecklistItem {
  /** Stable id — used as the localStorage key for this item's state. */
  id: string;
  label: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  /** Optional guidance shown beneath the section heading. */
  hint?: string;
  items: ChecklistItem[];
}

/** ISO date — formatted for display the same way as markdown page freshness. */
export const STORMREADY_LAST_UPDATED = "2026-06-04";

/** Hurricane season runs 1 June to 30 November. */
export const HURRICANE_SEASON_LABEL = "1 June to 30 November 2026";

export const STORMREADY_CHECKLIST: ChecklistSection[] = [
  {
    id: "water",
    title: "Water",
    hint: "After the storm, do not drink tap water until BWA says it is safe. Boil all drinking water for at least 1 minute.",
    items: [
      {
        id: "w1",
        label: "At least 3 gallons of drinking water per person, for 3 days",
      },
      { id: "w2", label: "1 gallon of water per pet per day" },
      {
        id: "w3",
        label:
          "Filled bathtubs and large buckets before the storm (BWA advice)",
      },
      {
        id: "w4",
        label: "Water purification tablets or bleach (for emergencies)",
      },
    ],
  },
  {
    id: "food",
    title: "Food",
    items: [
      {
        id: "f1",
        label:
          "At least 3 days of non-perishable food (tinned goods, dry crackers, peanut butter)",
      },
      { id: "f2", label: "Manual can opener" },
      { id: "f3", label: "Disposable plates, cups, and forks" },
      { id: "f4", label: "Baby formula and food (if you have an infant)" },
    ],
  },
  {
    id: "documents",
    title: "Important documents",
    hint: "Keep these in a waterproof bag or container.",
    items: [
      { id: "d1", label: "National ID card or passport" },
      { id: "d2", label: "Insurance documents (home, health, vehicle)" },
      { id: "d3", label: "Birth certificates for everyone in your household" },
      { id: "d4", label: "Prescription details and medical records" },
      {
        id: "d5",
        label: "Cash in small bills (ATMs may not work after the storm)",
      },
    ],
  },
  {
    id: "health",
    title: "Health and first aid",
    items: [
      { id: "h1", label: "First aid kit (plasters, bandages, antiseptic)" },
      { id: "h2", label: "7-day supply of prescription medicines" },
      { id: "h3", label: "Hearing aids with spare batteries" },
      { id: "h4", label: "Glasses or contact lenses with enough solution" },
      { id: "h5", label: "Nappies, wipes, and formula (if you have a baby)" },
      { id: "h6", label: "Hand sanitiser and face masks" },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    items: [
      {
        id: "c1",
        label: "Battery-powered or wind-up radio (to hear DEM updates)",
      },
      { id: "c2", label: "Fully charged mobile phone and portable power bank" },
      {
        id: "c3",
        label:
          "Emergency contact list written on paper (not just on your phone)",
      },
      { id: "c4", label: "Whistle to signal for help if you get trapped" },
    ],
  },
  {
    id: "shelter",
    title: "Shelter, tools, and safety",
    items: [
      { id: "s1", label: "Torches with spare batteries" },
      { id: "s2", label: "Candles and waterproof matches or a lighter" },
      { id: "s3", label: "Sturdy shoes or boots for every family member" },
      { id: "s4", label: "Rain gear (waterproof jackets or ponchos)" },
      { id: "s5", label: "Bedding or sleeping bag for each person" },
      { id: "s6", label: "Change of clothes for 3 days" },
      { id: "s7", label: "Tools to turn off gas and water at the mains" },
      { id: "s8", label: "Heavy-duty rubbish bags" },
    ],
  },
  {
    id: "before",
    title: "Before the storm hits",
    items: [
      { id: "b1", label: "Board up or shutter windows and glass doors" },
      {
        id: "b2",
        label: "Bring in outdoor furniture, plants, and loose items",
      },
      { id: "b3", label: "Topped up vehicle with petrol" },
      { id: "b4", label: "Charged all devices (phones, tablets, power banks)" },
      { id: "b5", label: "Let friends or family know your shelter plan" },
      {
        id: "b6",
        label: "Arranged help for any elderly or disabled neighbours",
      },
      { id: "b7", label: "Made a plan for your pets" },
    ],
  },
];

export const STORMREADY_CHECKLIST_TOTAL = STORMREADY_CHECKLIST.reduce(
  (sum, section) => sum + section.items.length,
  0
);
