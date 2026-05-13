import type { MdaEntry } from "@/data/mda-types";

export type StateBody = MdaEntry;

export const STATE_BODIES: StateBody[] = [
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
