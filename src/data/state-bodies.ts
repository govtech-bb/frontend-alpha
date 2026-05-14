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
    slug: "national-oil-company",
    name: "Barbados National Oil Company",
    contact: [
      {
        label: "Address",
        value: ["Woodbourne", "St. Philip"],
      },
      { label: "PBX", type: "phone", value: "(246) 418-5200" },
      { label: "CEO", type: "phone", value: "(246) 418-5201" },
      { label: "Fax", type: "phone", value: "(246) 420-1818" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/national-oil-company",
  },
  {
    slug: "national-standards",
    name: "Barbados National Standards Institution",
    contact: [
      {
        label: "Address",
        value: ["Flodden Culloden Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 426-3870" },
      { label: "Telephone", type: "phone", value: "(246) 436-1495" },
      { label: "Email", type: "email", value: "office@bnsi.com.bb" },
      {
        label: "Website",
        type: "website",
        value:
          "https://commerce.gov.bb/barbados-national-standards-institution-bnsi/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/national-standards",
  },
  {
    slug: "national-terminal-co",
    name: "Barbados National Terminal Co. Ltd.",
    contact: [
      {
        label: "Address",
        value: ["Fair Valley", "Christ Church", "Barbados, W.I."],
      },
      { label: "Telephone", type: "phone", value: "(246) 228-4811" },
      { label: "Telephone", type: "phone", value: "(246) 428-1056" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/national-terminal-co",
  },
  {
    slug: "barbados-port",
    name: "Barbados Port Inc.",
    contact: [
      {
        label: "Address",
        value: ["Cheapside", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 434-6100" },
      { label: "Telephone", type: "phone", value: "(246) 429-5348" },
      {
        label: "Email",
        type: "email",
        value: "administrator@barbadosport.com",
      },
      {
        label: "Website",
        type: "website",
        value: "http://www.barbadosport.com/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/barbados-port",
  },
  {
    slug: "revenue-authority",
    name: "Barbados Revenue Authority",
    head: { name: "Jason King", role: "Revenue Commissioner" },
    contact: [
      {
        label: "Address",
        value: [
          "4th Floor Weymouth Corporate Centre",
          "Roebuck Street",
          "St. Michael",
          "Barbados",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 535-8663" },
      {
        label: "Email",
        type: "email",
        value: "louisa.lewis-ward@bra.gov.bb",
      },
      { label: "Website", type: "website", value: "https://bra.gov.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/revenue-authority",
  },
  {
    slug: "tourism-investment",
    name: "Barbados Tourism Investment Incorporated",
    contact: [
      {
        label: "Address",
        value: ["Ground Floor, Old Town Hall Building", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 426-7085" },
      { label: "Telephone", type: "phone", value: "(246) 426-7086" },
      {
        label: "Email",
        type: "email",
        value: "btii@tourisminvest.com.bb",
      },
      {
        label: "Website",
        type: "website",
        value: "http://www.barbadostourisminvestment.com/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/tourism-investment",
  },
  {
    slug: "btmi",
    name: "Barbados Tourism Marketing Inc.",
    contact: [
      {
        label: "Address",
        value: [
          "One Barbados Place",
          "Warrens",
          "St. Michael",
          "Barbados",
          "BB12001",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 535-3700" },
      { label: "Fax", type: "phone", value: "(246) 535-3799" },
      { label: "Email", type: "email", value: "btmiinfo@visitbarbados.org" },
      {
        label: "Website",
        type: "website",
        value: "https://corporate.visitbarbados.org/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/btmi",
  },
  {
    slug: "vocational-training-board",
    name: "Barbados Vocational Training Board",
    contact: [
      {
        label: "Address",
        value: ["Lawrence Green House", "Culloden Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 621-2882" },
      { label: "Telephone", type: "phone", value: "(246) 621-2908" },
      { label: "Email", type: "email", value: "info@bvtb.gov.bb" },
      { label: "Website", type: "website", value: "https://www.bvtb.gov.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/vocational-training-board",
  },
  {
    slug: "barbados-youth-advance-corps",
    name: "Barbados Youth Advance Corps.",
    head: { name: "Mr. Hally Haynes", role: "Director" },
    contact: [
      {
        label: "Address",
        value: [
          "Division of Youth, Sports and Community Empowerment",
          "#33 Warren's Industrial Park",
          "St. Michael",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 535-0180" },
      { label: "Telephone", type: "phone", value: "(246) 535-3835" },
      { label: "Fax", type: "phone", value: "(246) 425-1296" },
      {
        label: "Email",
        type: "email",
        value: "youth.service@barbados.gov.bb",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/barbados-youth-advance-corps",
  },
  {
    slug: "barbados-youth-business-trust",
    name: "Barbados Youth Business Trust",
    contact: [
      {
        label: "Address",
        value: ["1st Floor, Equity House", "Pinfold Street", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 228-2772" },
      { label: "Fax", type: "phone", value: "(246) 228-2773" },
      { label: "Email", type: "email", value: "info@youthbusiness.bb" },
      {
        label: "Website",
        type: "website",
        value: "https://www.youthbusiness.bb",
        display: "www.youthbusiness.bb",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/barbados-youth-business-trust",
  },
  {
    slug: "social-policy-research-planning",
    name: "Bureau of Social Policy, Research and Planning",
    contact: [
      {
        label: "Address",
        value: ["4th Floor Warrens Office Complex", "Warrens", "St. Michael"],
      },
      { label: "PBX", type: "phone", value: "(246) 535-1600" },
      { label: "Fax", type: "phone", value: "(246) 535-1694" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/social-policy-research-planning",
  },
  {
    slug: "caribbean-broadcasting-corporation",
    name: "Caribbean Broadcasting Corporation",
    contact: [
      {
        label: "Address",
        value: ["The Pine", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 467-5400" },
      { label: "Fax", type: "phone", value: "(246) 429-4795" },
      { label: "Email", type: "email", value: "rlondon@cbc.bb" },
      {
        label: "Website",
        type: "website",
        value: "https://www.cbc.bb",
        display: "www.cbc.bb",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/caribbean-broadcasting-corporation",
  },
  {
    slug: "caves-of-barbados",
    name: "Caves of Barbados Limited (CBL)",
    contact: [
      {
        label: "Address",
        value: ["Allen View", "St. Thomas", "Barbados, W.I."],
      },
      { label: "Telephone", type: "phone", value: "(246) 417-3700" },
      { label: "Telephone", type: "phone", value: "(246) 417-3709" },
      {
        label: "Email",
        type: "email",
        value: "reservations@harrisonscave.com",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/caves-of-barbados",
  },
  {
    slug: "central-bank",
    name: "Central Bank of Barbados",
    contact: [
      {
        label: "Address",
        value: [
          "Tom Adams Financial Centre",
          "Spry Street",
          "Bridgetown",
          "St. Michael",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 436-6870" },
      { label: "Email", type: "email", value: "info@centralbank.org.bb" },
      {
        label: "Website",
        type: "website",
        value: "https://www.centralbank.org.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/central-bank",
  },
  {
    slug: "consular-affairs",
    name: "Consular Affairs",
    contact: [
      {
        label: "Address",
        value: ["No. 1 Culloden Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 431-2200" },
      { label: "Fax", type: "phone", value: "(246) 429-6652" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/consular-affairs",
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
