import type { MdaEntry } from "@/data/mda-types";

export type StateBody = MdaEntry;

export const STATE_BODIES: StateBody[] = [
  {
    slug: "accreditation-council",
    name: "Barbados Accreditation Council",
    contact: [
      {
        label: "Address",
        value: [
          "First Floor",
          "The Phoenix Centre",
          "George Street",
          "St. Michael",
          "BB11114",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 535-6740" },
      { label: "Fax", type: "phone", value: "(246) 622-1089" },
      { label: "Email", type: "email", value: "info@bac.gov.bb" },
      { label: "Website", type: "website", value: "https://bac.gov.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/accreditation-council",
  },
  {
    slug: "cane-industry",
    name: "Barbados Cane Industry Corporation",
    contact: [
      {
        label: "Address",
        value: ["Warrens House", "Warrens", "St Michael", "BB22026"],
      },
      { label: "Telephone", type: "phone", value: "(246) 421-4141" },
      { label: "Fax", type: "phone", value: "(246) 438-9217" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/cane-industry",
  },
  {
    slug: "coalition-services",
    name: "Barbados Coalition of Service Industries",
    contact: [
      {
        label: "Address",
        value: [
          "Building #3",
          "Harbour Industrial Estate",
          "Harbour Road",
          "Bridgetown",
          "St. Michael",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 429-5357" },
      { label: "Fax", type: "phone", value: "(246) 429-5352" },
      { label: "Email", type: "email", value: "info@bcsi.org.bb" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/coalition-services",
  },
  {
    slug: "community-college",
    name: "Barbados Community College",
    contact: [
      {
        label: "Address",
        value: ["Howells' Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 426-2858" },
      { label: "Telephone", type: "phone", value: "(246) 429-5935" },
      { label: "Email", type: "email", value: "eyrie@bcc.edu.bb" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/community-college",
  },
  {
    slug: "conference-services",
    name: "Barbados Conference Services Limited (BCSL)",
    contact: [
      {
        label: "Address",
        value: [
          "Lloyd Erskine Sandiford Centre",
          "Two Mile Hill",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 467-8200" },
      { label: "Telephone", type: "phone", value: "(246) 431-9795" },
      { label: "Website", type: "website", value: "https://lescbarbados.com/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/conference-services",
  },
  {
    slug: "defence-force",
    name: "Barbados Defence Force",
    contact: [
      {
        label: "Address",
        value: ["St. Anns Fort", "Garrison", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 536-2500" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/defence-force",
  },
  {
    slug: "investment-development-corp",
    name: "Barbados Investment & Development Corporation (Export Barbados)",
    contact: [
      {
        label: "Address",
        value: [
          "Pelican House",
          "Princess Alice Highway",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 427-5350" },
      { label: "Telephone", type: "phone", value: "(246) 426-7802" },
      {
        label: "Website",
        type: "website",
        value: "https://exportbarbados.org",
        display: "exportbarbados.org",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/investment-development-corp",
  },
  {
    slug: "medicinal-cannabis",
    name: "Barbados Medicinal Cannabis Licencing Authority (BMCLA)",
    contact: [
      {
        label: "Address",
        value: ["Warrens House", "Warrens", "St Michael BB 22026"],
      },
      { label: "Telephone", type: "phone", value: "(246) 421-4141" },
      { label: "Telephone", type: "phone", value: "(246) 421-2197" },
      { label: "Email", type: "email", value: "clo@bmcla.bb" },
      { label: "Website", type: "website", value: "https://www.bmcla.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/medicinal-cannabis",
  },
  {
    slug: "museum-historical-society",
    name: "Barbados Museum & Historical Society Council",
    contact: [
      {
        label: "Address",
        value: ["St. Ann's Garrison", "St. Michael", "Barbados, W.I."],
      },
      { label: "Telephone", type: "phone", value: "(246) 538-0201" },
      { label: "Telephone", type: "phone", value: "(246) 537-1956" },
      {
        label: "Website",
        type: "website",
        value: "https://www.barbmuse.org.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/museum-historical-society",
  },
  {
    slug: "water-authority",
    name: "Barbados Water Authority",
    shortDescription:
      "The Barbados Water Authority (BWA) is a Statutory Body established by an act of Legislature on 8th October, 1980 to replace the Waterworks Department of Government.",
    intro:
      "The Barbados Water Authority (BWA) is a Statutory Body established by an act of Legislature on 8th October, 1980 to replace the Waterworks Department of Government.",
    contact: [
      { label: "Email", type: "email", value: "customercare@bwa.bb" },
      { label: "Telephone", type: "phone", value: "(246) 434-4200" },
      { label: "Telephone", type: "phone", value: "(246) 434-4292" },
      { label: "Telephone", type: "phone", value: "(246) 228-0155" },
      {
        label: "Website",
        type: "website",
        value: "http://barbadoswaterauthority.com/",
      },
      {
        label: "Address",
        value: [
          "Pine Commercial Estate",
          "The Pine",
          "St. Michael",
          "P.O. Box 1260",
          "Bridgetown",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/water-authority",
  },
];

export function getStateBodyBySlug(slug: string): StateBody | undefined {
  return STATE_BODIES.find((s) => s.slug === slug);
}
