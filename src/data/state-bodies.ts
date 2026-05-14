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
    slug: "corporate-affairs",
    name: "Corporate Affairs and Intellectual Property Office",
    head: { name: "Ms. Tamiesha Rochester", role: "Registrar (Acting)" },
    contact: [
      {
        label: "Address",
        value: [
          "Ground Floor",
          "Baobab Towers",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
      { label: "PBX", type: "phone", value: "1-2546-535-2401" },
      { label: "Fax", type: "phone", value: "(246) 424-2366" },
      { label: "Email", type: "email", value: "general@caipo.gov.bb" },
      {
        label: "Website",
        type: "website",
        value: "https://www.caipo.gov.bb/site/index.php",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/corporate-affairs",
  },
  {
    slug: "directorate-human-resource",
    name: "Directorate, Human Resource Policy and Staffing",
    contact: [
      {
        label: "Address",
        value: [
          "E Humphrey Walcott Building",
          "Cnr. Culloden Road & Collymore Rock",
          "St Michael, Barbados",
        ],
      },
      { label: "Main Office", type: "phone", value: "(246) 535-4400" },
      {
        label: "Director, HR Policy and Staffing",
        type: "phone",
        value: "(246) 535-4426",
      },
      { label: "Fax", type: "phone", value: "(246) 228-0093" },
      { label: "Email", type: "email", value: "hrps@mps.gov.bb" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/directorate-human-resource",
  },
  {
    slug: "directorate-learning-development",
    name: "Directorate, Learning and Development",
    contact: [
      {
        label: "Address",
        value: ["Level 5, Warrens Towers II", "Warrens, St Michael, Barbados"],
      },
      { label: "Main Office", type: "phone", value: "(246) 535-6700" },
      {
        label: "Director, Learning and Development",
        type: "phone",
        value: "(246) 535-6726",
      },
      { label: "Fax", type: "phone", value: "(246) 535-6728" },
      { label: "Email", type: "email", value: "LD@mps.gov.bb" },
      {
        label: "Website",
        type: "website",
        value: "http://training.gov.bb/",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/directorate-learning-development",
  },
  {
    slug: "directorate-people-resourcing-and-compliance",
    name: "Directorate, People Resourcing and Compliance",
    contact: [
      {
        label: "Address",
        value: [
          "E Humphrey Walcott Building",
          "Corner Culloden Road & Collymore Rock",
          "St. Michael",
        ],
      },
      { label: "Main Office", type: "phone", value: "(246) 535-4500" },
      {
        label: "Director, People Resourcing and Compliance",
        type: "phone",
        value: "(246) 535-4564",
      },
      { label: "Fax", type: "phone", value: "(246) 429-5169" },
      { label: "Email", type: "email", value: "prc@mps.gov.bb" },
      {
        label: "Website",
        type: "website",
        value: "https://www.secai-ceti-summerschool.de/",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/directorate-people-resourcing-and-compliance",
  },
  {
    slug: "erdiston-teacher-training",
    name: "Erdiston Teachers' Training College",
    contact: [
      {
        label: "Address",
        value: ["Government Hill", "St. Michael"],
      },
      { label: "PBX", type: "phone", value: "(246) 535-3247" },
      { label: "Library", type: "phone", value: "(246) 535-3239" },
      { label: "Principal", type: "phone", value: "(246) 535-3223" },
      { label: "Telephone", type: "phone", value: "(246) 427-2776" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/erdiston-teacher-training",
  },
  {
    slug: "fair-trading-commission",
    name: "Fair Trading Commission",
    contact: [
      {
        label: "Address",
        value: ["Good Hope", "Green Hill", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 424-0260" },
      { label: "Telephone", type: "phone", value: "(246) 424-0300" },
      { label: "Email", type: "email", value: "info@ftc.gov.bb" },
      { label: "Website", type: "website", value: "https://www.ftc.gov.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/fair-trading-commission",
  },
  {
    slug: "financial-services-commission",
    name: "Financial Services Commission",
    contact: [
      {
        label: "Address",
        value: [
          "Bay Corporate Building",
          "Bay Street",
          "St. Michael",
          "BB14038",
        ],
      },
      { label: "Telephone", type: "phone", value: "(246) 421-2142" },
      { label: "Telephone", type: "phone", value: "(246) 421-2146" },
      { label: "Email", type: "email", value: "info@fsc.gov.bb" },
      { label: "Website", type: "website", value: "https://www.fsc.gov.bb/" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/financial-services-commission",
  },
  {
    slug: "foreign-trade",
    name: "Foreign Trade",
    contact: [
      {
        label: "Address",
        value: ["Culloden Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 431-2200" },
      { label: "Telephone", type: "phone", value: "(246) 429-6652" },
      {
        label: "Website",
        type: "website",
        value: "https://www.foreign.gov.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/foreign-trade",
  },
  {
    slug: "glebe-polyclinic",
    name: "Glebe Polyclinic",
    contact: [
      { label: "PBX", type: "phone", value: "(246) 536-3940" },
      { label: "Records Department", type: "phone", value: "(246) 536-3945" },
      {
        label: "Senior Health Sister",
        type: "phone",
        value: "(246) 536-3950",
      },
      { label: "Senior Clerk", type: "phone", value: "(246) 536-3961" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/glebe-polyclinic",
  },
  {
    slug: "grantley-adams-international",
    name: "Grantley Adams International Airport",
    contact: [
      {
        label: "Address",
        value: ["Seawell", "Christ Church"],
      },
      { label: "GAIA PBX", type: "phone", value: "(246) 536-1300" },
      { label: "GAIA Inc. Reception", type: "phone", value: "(246) 536-1302" },
      { label: "Airport Duty Manager", type: "phone", value: "(246) 536-1336" },
      { label: "Telephone", type: "phone", value: "(246) 536-1356" },
      { label: "Email", type: "email", value: "office@gaiainc.bb" },
      { label: "Website", type: "website", value: "http://www.gaia.bb/" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/grantley-adams-international",
  },
  {
    slug: "health-promotion-unit",
    name: "Health Promotion Unit",
    contact: [
      {
        label: "Address",
        value: ["Frank Walcott Building", "Culloden Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 426-5080" },
      { label: "Telephone", type: "phone", value: "(246) 467-9300" },
      { label: "Telephone", type: "phone", value: "(246) 426-5570" },
      { label: "Email", type: "email", value: "Ps-secretary@health.gov.bb" },
      {
        label: "Website",
        type: "website",
        value: "https://www.health.gov.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/health-promotion-unit",
  },
  {
    slug: "higher-education-development-unit",
    name: "Higher Education Development Unit",
    contact: [
      {
        label: "Address",
        value: ['"Anselm House"', "Government Hill", "St. Michael"],
      },
      { label: "PBX", type: "phone", value: "(246) 535-4050" },
      { label: "Director", type: "phone", value: "(246) 535-4051" },
      { label: "Project Officer", type: "phone", value: "(246) 535-4053" },
      {
        label: "Information Technology",
        type: "phone",
        value: "(246) 535-4056",
      },
      { label: "Email", type: "email", value: "info@hedu.edu.bb" },
      { label: "Website", type: "website", value: "http://www.hedu.edu.bb/" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/higher-education-development-unit",
  },
  {
    slug: "hiv-aids-programme",
    name: "HIV/AIDS Programme Office",
    contact: [
      {
        label: "Address",
        value: ["Jemmotts Lane", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 426-5080" },
      { label: "Telephone", type: "phone", value: "(246) 436-3415" },
      {
        label: "Email",
        type: "email",
        value: "anton.best@barbados.gov.bb",
      },
      { label: "Website", type: "website", value: "http://www.nhacbb.org/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/hiv-aids-programme",
  },
  {
    slug: "invest-barbados",
    name: "Invest Barbados",
    contact: [
      {
        label: "Address",
        value: ["Trident Financial Centre", "Hastings", "Christ Church"],
      },
      { label: "Telephone", type: "phone", value: "(246) 626-2000" },
      { label: "Telephone", type: "phone", value: "(246) 626-2099" },
      { label: "Email", type: "email", value: "info@investbarbados.org" },
      {
        label: "Website",
        type: "website",
        value: "http://www.investbarbados.org/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/invest-barbados",
  },
  {
    slug: "judiciary-judges",
    name: "Judiciary - Judges",
    contact: [
      {
        label: "Address",
        value: ["White Park Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 434-9970" },
      { label: "Telephone", type: "phone", value: "(246) 427-8917" },
      { label: "Email", type: "email", value: "registrar@lawcourts.gov.bb" },
      {
        label: "Website",
        type: "website",
        value: "http://www.barbadoslawcourts.gov.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/judiciary-judges",
  },
  {
    slug: "kensington-oval",
    name: "Kensington Oval Management Inc.",
    contact: [
      {
        label: "Address",
        value: ["Kensington Oval", "Fontabelle", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 274-1200" },
      { label: "Telephone", type: "phone", value: "(246) 227-2503" },
      { label: "Email", type: "email", value: "info@kensingtonoval.com.bb" },
      {
        label: "Website",
        type: "website",
        value: "http://kensingtonoval.org/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/kensington-oval",
  },
  {
    slug: "meteorology",
    name: "Meteorology",
    contact: [
      {
        label: "Address",
        value: ["Husbands", "St. James"],
      },
      { label: "Telephone", type: "phone", value: "(246) 425-1362 / 1363" },
      { label: "Fax", type: "phone", value: "(246) 424-4733" },
      {
        label: "Website",
        type: "website",
        value: "http://www.cimh.edu.bb/?p=home",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/meteorology",
  },
  {
    slug: "national-conservation-commission",
    name: "National Conservation Commission",
    contact: [
      {
        label: "Address",
        value: ["Codrington House", "St. Michael"],
      },
      { label: "PBX", type: "phone", value: "(246) 536-0600 / 0617" },
      { label: "Fax", type: "phone", value: "(246) 536-0681" },
      {
        label: "Security Desk (Ranger/Warden)",
        type: "phone",
        value: "(246) 536-0665",
      },
      {
        label: "Folkestone Park & Marine Reserve",
        type: "phone",
        value: "(246) 536-0648",
      },
      {
        label: "Folkestone Fax",
        type: "phone",
        value: "(246) 536-0649",
      },
      {
        label: "Codrington Nursery & Garden Centre",
        type: "phone",
        value: "(246) 536-0641",
      },
      { label: "Email", type: "email", value: "ncc@caribsurf.com" },
      {
        label: "Website",
        type: "website",
        value: "http://nccbarbados.gov.bb/",
      },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/national-conservation-commission",
  },
  {
    slug: "council-substance-abuse",
    name: "National Council on Substance Abuse (NCSA)",
    contact: [
      {
        label: "Address",
        value: [
          '"The Armaira Building"',
          "Corner 1st Avenue",
          "Belleville & Pine Road",
          "St. Michael",
          "Barbados",
        ],
      },
      { label: "PBX", type: "phone", value: "(246) 535-6272" },
      { label: "Fax", type: "phone", value: "(246) 535-6279" },
      {
        label: "Email",
        type: "email",
        value: "ncsa.info@barbados.gov.bb",
      },
      { label: "Website", type: "website", value: "http://www.ncsa.gov.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/council-substance-abuse",
  },
  {
    slug: "national-cultural-foundation",
    name: "National Cultural Foundation",
    contact: [
      {
        label: "Address",
        value: ["West Terrace", "St. James"],
      },
      { label: "Telephone", type: "phone", value: "(246) 424-0909" },
      { label: "Telephone", type: "phone", value: "(246) 424-0916" },
      { label: "Website", type: "website", value: "http://www.ncf.bb/" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/national-cultural-foundation",
  },
  {
    slug: "national-housing-corporation",
    name: "National Housing Corporation",
    contact: [
      {
        label: "Address",
        value: ["Country Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 467-6200" },
      { label: "Telephone", type: "phone", value: "(246) 437-8297" },
      { label: "Email", type: "email", value: "nhc@nhc.gov.bb" },
      { label: "Website", type: "website", value: "http://www.nhc.gov.bb/" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/national-housing-corporation",
  },
  {
    slug: "national-petroleum",
    name: "National Petroleum Corporation",
    contact: [
      {
        label: "Address",
        value: ["Wildey", "St. Michael BB11000"],
      },
      { label: "Telephone", type: "phone", value: "(246) 430-4000" },
      { label: "Fax", type: "phone", value: "(246) 426-4326" },
      {
        label: "Billing Queries / Customer Service",
        type: "phone",
        value: "(246) 430-4051",
      },
      {
        label: "Emergency After Hours",
        type: "phone",
        value: "(246) 430-4099 / (246) 430-4036",
      },
      {
        label: "Corporate Email",
        type: "email",
        value: "bimgas@caribsurf.com",
      },
      {
        label: "Customer Queries",
        type: "email",
        value: "customerserv@npc.com.bb",
      },
      { label: "Website", type: "website", value: "http://www.npc.bb/" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/national-petroleum",
  },
  {
    slug: "natural-resources-division",
    name: "Natural Resources Unit",
    contact: [
      {
        label: "Address",
        value: ["Trinity Business Centre Inc.", "Country Road", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 535-2507" },
      { label: "Fax", type: "phone", value: "(246) 429-7489" },
    ],
    originalSource:
      "https://www.gov.bb/State-Bodies/natural-resources-division",
  },
  {
    slug: "public-counsel",
    name: "Office of Public Counsel",
    contact: [
      {
        label: "Address",
        value: ["Warrens Office Complex", "Warrens", "St. Michael"],
      },
      { label: "General Office", type: "phone", value: "(246) 535-2758" },
      { label: "General Office", type: "phone", value: "(246) 535-2762" },
      { label: "Public Counsel", type: "phone", value: "(246) 535-2756" },
      { label: "Fax", type: "phone", value: "(246) 421-6439" },
      {
        label: "Email",
        type: "email",
        value: "commerce.ps@barbados.gov.bb",
      },
      {
        label: "Website",
        type: "website",
        value: "http://www.commerce.gov.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/public-counsel",
  },
  {
    slug: "supervisor-insolvency",
    name: "Office of Supervisor of Insolvency",
    contact: [
      {
        label: "Address",
        value: ["Warrens Office Complex", "Warrens", "St. Michael"],
      },
      { label: "General Office", type: "phone", value: "(246) 535-2752/3" },
      {
        label: "Supervisor of Insolvency",
        type: "phone",
        value: "(246) 535-2751",
      },
      { label: "Fax", type: "phone", value: "(246) 535-2767" },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/supervisor-insolvency",
  },
  {
    slug: "poverty-alleviation",
    name: "Poverty Alleviation Bureau",
    contact: [
      {
        label: "Address",
        value: ["4th Floor Warrens Office Complex", "St. Michael"],
      },
      { label: "Telephone", type: "phone", value: "(246) 310-1803" },
      { label: "Telephone", type: "phone", value: "(246) 310-1807" },
      {
        label: "Website",
        type: "website",
        value: "http://www.socialcare.gov.bb/",
      },
    ],
    originalSource: "https://www.gov.bb/State-Bodies/poverty-alleviation",
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
