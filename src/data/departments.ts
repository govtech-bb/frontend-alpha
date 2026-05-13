import type {
  ContactItem,
  Minister,
} from "@/components/ministry/ministry-page";

export interface Department {
  slug: string;
  name: string;
  shortDescription?: string;
  intro?: string;
  head?: Minister;
  contact?: ContactItem[];
  originalSource?: string;
}

// Source: https://www.gov.bb/Departments (verified)
export const DEPARTMENTS: Department[] = [
  {
    slug: "air-navigation",
    name: "Air Navigation Services Department",
    shortDescription:
      "Provides air navigation services at Grantley Adams International Airport, including air traffic control, terminal control, and aeronautical information services.",
    intro:
      "The department provides air navigation services at Grantley Adams International Airport, including air traffic control, terminal control, and aeronautical information services.",
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 536-3601" },
      { label: "Fax", type: "phone", value: "(246) 536-3615" },
      {
        label: "Address",
        value: [
          "Bldg #4 Grantley Adams Industrial Estate",
          "Christ Church",
          "Grantley Adams International Airport",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/air-navigation",
  },
  {
    slug: "analytical-services",
    name: "Analytical Services",
    shortDescription:
      "Provides timely and reliable analytical services through a commitment to quality.",
    intro:
      "To provide, through a commitment to quality, a timely and reliable analytical service.",
    head: {
      name: "Dr. Beverley P. Wood",
      role: "Director",
    },
    contact: [
      { label: "Email", type: "email", value: "director@gas.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1711" },
      { label: "Fax", type: "phone", value: "(246) 436-7682" },
      {
        label: "Website",
        type: "website",
        value:
          "https://agriculture.gov.bb/Departments/Government-Analytical-Services/",
      },
      {
        label: "Address",
        value: ["Culloden Road", "St. Michael"],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/analytical-services",
  },
  {
    slug: "building-standards",
    name: "Barbados Building Standards Authority",
    shortDescription:
      "Enforces the Barbados National Building Code and the Building Act to facilitate cost-effective construction.",
    intro:
      "To enforce the provision of the Barbados National Building Code and the Building Act so as to facilitate the cost-effective construction of buildings.",
    originalSource: "https://www.gov.bb/Departments/building-standards",
  },
  {
    slug: "drug-service",
    name: "Barbados Drug Service",
    shortDescription:
      "Provides quality pharmaceuticals to Barbados residents at affordable prices, serving beneficiaries courteously and efficiently.",
    intro:
      "To provide quality pharmaceuticals for our residents of Barbados at an affordable price and to serve the beneficiaries in a courteous and efficient manner.",
    head: {
      name: "Ms. Delores Mascoll",
      role: "Director (A.g.)",
    },
    contact: [
      { label: "Email", type: "email", value: "director@drugservice.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-4300" },
      { label: "Fax", type: "phone", value: "(246) 535-4342" },
      {
        label: "Website",
        type: "website",
        value: "http://drugservice.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "6th & 7th Floors Warrens Towers II",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/drug-service",
  },
  {
    slug: "gov-information-service",
    name: "Barbados Government Information Service",
    shortDescription:
      "The official communications arm of the Barbados Government, responsible for disseminating public information to news media and the general public.",
    intro:
      "The official communications arm of the Barbados Government. This Department is responsible for the dissemination of public information to the various news media and the general public.",
    contact: [
      { label: "Email", type: "email", value: "webbgis@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1900" },
      {
        label: "Website",
        type: "website",
        value: "https://gisbarbados.gov.bb",
      },
      {
        label: "Address",
        value: ["Old Town Hall", "Cheapside", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/gov-information-service",
  },
  {
    slug: "prison",
    name: "Barbados Prison Service",
    shortDescription:
      "Serves the public by keeping those committed by the courts safely in custody, treating them humanely and helping them lead law-abiding lives during and after release.",
    intro:
      "The Barbados Prison Service serves the public by keeping safely in custody those committed by the courts. Our duty is to look after them with humanity and help them to live law-abiding and useful lives in custody and after release, achieved through the deployment of dedicated, professional, highly trained and well-motivated staff, sound regimes, and focused rehabilitative programmes.",
    head: {
      name: "Lt. Col. John Nurse",
      role: "Superintendent",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "secretary@prisonservice.gov.bb",
      },
      { label: "Email", type: "email", value: "info@prisonservice.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-7300" },
      { label: "Fax", type: "phone", value: "(246) 535-7401" },
      { label: "Fax", type: "phone", value: "(246) 535-7402" },
      {
        label: "Address",
        value: ["HMP Dodds", "St. Philip", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/prison",
  },
  {
    slug: "gender-affairs",
    name: "Bureau of Gender Affairs",
    shortDescription:
      "Ensures the integration of gender in all national development plans and policies to achieve gender equity and equality.",
    intro:
      "To ensure the integration of gender in all national development plans and policies to achieve gender equity and equality.",
    contact: [
      { label: "Email", type: "email", value: "genderbureau@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-0102" },
      { label: "Fax", type: "phone", value: "(246) 271-2203" },
      {
        label: "Address",
        value: [
          "6th Floor Baobab Towers",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/gender-affairs",
  },
  {
    slug: "central-purchasing",
    name: "Central Purchasing Department",
    shortDescription:
      "Provides quality goods from competent, reliable sources at the most economical prices, ensuring availability to ministries and departments when required.",
    intro:
      "To provide quality goods from competent reliable sources at the most economical prices. To ensure that goods are available to ministries and departments when required and that are ideally suited for the purpose intended.",
    contact: [
      { label: "Email", type: "email", value: "worrellja@gob.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-4903" },
      { label: "Fax", type: "phone", value: "(246) 535-4951" },
      {
        label: "Address",
        value: ["Fontabelle", "St.Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/central-purchasing",
  },
  {
    slug: "childrens-development",
    name: "Children's Development Centre",
    shortDescription:
      "Protects the rights and enhances the quality of life for persons in Barbados who are physically and mentally challenged.",
    intro:
      "To protect the rights and enhance the quality of life for persons in Barbados who are physically and mentally challenged.",
    head: {
      name: "Ms. Yvette Cumberbatch",
      role: "Coordinator Ag.",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "childrensdevcentre@caribsurf.com",
      },
      { label: "Telephone", type: "phone", value: "(246) 436-9027" },
      { label: "Fax", type: "phone", value: "(246) 427-7448" },
      {
        label: "Address",
        value: [
          "Ladymeade Gardens",
          "Jemmotts Lane",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/childrens-development",
  },
  {
    slug: "cooperatives",
    name: "Co-operatives Department",
    shortDescription:
      "Encourages economic development and improved quality of life through the facilitation of commerce, entrepreneurship, and consumer protection.",
    intro:
      "To encourage economic development and the improvement of the quality of life of the people of Barbados through the facilitation of commerce, entrepreneurship and the protection of consumers.",
    head: {
      name: "Ms. Sharon Drayton",
      role: "Registrar of Co-operatives and Friendly Societies",
    },
    contact: [
      { label: "Email", type: "email", value: "coops@barbados.gov.bb" },
      {
        label: "Email",
        type: "email",
        value: "sharon.drayton@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-0150" },
      { label: "Fax", type: "phone", value: "(246) 535-0166" },
      {
        label: "Address",
        value: [
          "2nd Floor Baobab Towers",
          "Warrens",
          "St.Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/cooperatives",
  },
  {
    slug: "coastal-zone",
    name: "Coastal Zone Management Unit",
    shortDescription:
      "Performs coastal management functions including coral reef monitoring, beach erosion control, regulation of marine research, and public education on integrated coastal zone management.",
    intro:
      "Performs a variety of coastal management functions including coral reef monitoring, updating the inventory of coastal resources, beach erosion and accretion monitoring and control, regulation of marine research, public education on ICZM, coastal conservation project designs and management, and the review of any coastal projects.",
    contact: [
      { label: "Email", type: "email", value: "director@coastal.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-5700" },
      { label: "Fax", type: "phone", value: "(246) 535-5741" },
      {
        label: "Website",
        type: "website",
        value: "http://www.coastal.gov.bb/",
      },
      {
        label: "Address",
        value: ["8th Floor Warrens Tower 11", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/coastal-zone",
  },
  {
    slug: "community-development",
    name: "Community Development Department",
    shortDescription:
      "Provides professional social work and community development services to build strong, cohesive communities and transform the social, physical, and economic landscape of Barbados.",
    intro:
      "To provide the highest quality professional social work in community development services, achieving strong, cohesive communities and in so doing transform the physical, social and economic landscape of Barbados into one that is sustainable, fully developed and socially just.",
    head: {
      name: "Mrs. Sandra Greenidge",
      role: "Chief Community Development Officer",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "comdev.barbados@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-1650" },
      { label: "Fax", type: "phone", value: "(246) 535-1693" },
      {
        label: "Address",
        value: [
          "4th Floor East Wing",
          "Warrens Office Complex",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/community-development",
  },
  {
    slug: "consular-diaspora",
    name: "Consular and Diaspora Division",
    shortDescription:
      "Manages consular functions including assistance for Barbadians abroad, visa agreements, government travel, and diaspora engagement.",
    intro:
      "The Consular function has historically been linked to the development of international trade (commercial diplomacy), and to promoting the economic interests of nation states. The division handles assistance for Barbadians abroad, manages Honorary Consul recruitment, facilitates visa agreements, supports government travel, and coordinates deportation and extradition matters.",
    contact: [
      {
        label: "Website",
        type: "website",
        value: "https://www.foreign.gov.bb/consular-and-diaspora-division/",
      },
    ],
    originalSource: "https://www.gov.bb/Departments/consular-diaspora",
  },
  {
    slug: "corporate-affairs-intellectual-property",
    name: "Corporate Affairs and Intellectual Property Office",
    shortDescription:
      "Provides and maintains a reliable system of public records and an efficient registry service to support commercial activities and trade development in Barbados.",
    intro:
      "To provide and maintain within the framework of the law and the available resources, a reliable system of public records and an efficient registry service supporting commercial activities and trade development in Barbados.",
    head: {
      name: "Ms. Tamiesha Rochester",
      role: "Registrar Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "general@caipo.gov.bb" },
      {
        label: "Email",
        type: "email",
        value: "caipo.registrar@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-2401" },
      {
        label: "Website",
        type: "website",
        value: "http://www.caipo.gov.bb/site/index.php",
      },
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
    ],
    originalSource:
      "https://www.gov.bb/Departments/corporate-affairs-intellectual-property",
  },
  {
    slug: "criminal-justice",
    name: "Criminal Justice Research and Planning Unit",
    shortDescription:
      "Leads criminal justice research and crime statistics development, delivering professional and quality service through systematic collection and analysis to inform crime prevention policy.",
    intro:
      "To be the leader in criminal justice research and the development of up-to-date relevant crime statistics while delivering professional and quality service to members of the public. The unit executes systematic collection, analysis, and research on crime and criminal justice matters to inform policy decisions regarding crime prevention and reduction.",
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 536-0800" },
      { label: "Telephone", type: "phone", value: "(246) 536-0808" },
      {
        label: "Website",
        type: "website",
        value: "http://oag.gov.bb/Departments/Criminal-Justice/",
      },
    ],
    originalSource: "https://www.gov.bb/Departments/criminal-justice",
  },
  {
    slug: "customs",
    name: "Customs and Excise Department",
    shortDescription:
      "Oversees the collection of duties and excise taxes at Barbados's borders, facilitating trade while enforcing customs and immigration controls.",
    intro:
      "The department is responsible for border control, revenue collection, and trade facilitation under the leadership of the Comptroller of Customs.",
    head: {
      name: "Mr. Owen Holder",
      role: "Comptroller of Customs",
    },
    contact: [
      { label: "Email", type: "email", value: "owen.holder@customs.gov.bb" },
      { label: "Email", type: "email", value: "comptroller@customs.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-8700" },
      { label: "Fax", type: "phone", value: "(246) 421-2029" },
      {
        label: "Website",
        type: "website",
        value: "http://www.customs.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "2nd Floor West Wing",
          "Warrens Office Complex",
          "Warrens",
          "St.Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/customs",
  },
  {
    slug: "archives",
    name: "Department of Archives",
    shortDescription:
      "Identifies, collects, processes, and preserves public and private records of enduring legal, cultural, and historical significance for Barbados.",
    intro:
      "The department ensures organisational efficiency and accountability by collecting and preserving records of enduring legal, cultural, and historical significance, and makes information available within legal parameters.",
    head: {
      name: "Ms. Ingrid Thompson",
      role: "Chief Archivist Ag.",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "ingrid.cumberbatch@barbados.gov.bb",
      },
      { label: "Email", type: "email", value: "bda@caribsurf.com" },
      { label: "Email", type: "email", value: "archives@sunbeach.net" },
      { label: "Telephone", type: "phone", value: "(246) 535-0050" },
      { label: "Fax", type: "phone", value: "(246) 425-5911" },
      {
        label: "Address",
        value: ["Black Rock", "St. James", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/archives",
  },
  {
    slug: "commerce",
    name: "Department of Commerce and Consumer Affairs",
    shortDescription:
      "Facilitates the development of commerce, enforces trading standards, and protects consumers to ensure goods and services are safe and legal.",
    intro:
      "The department administers the Miscellaneous Controls Act, the Control Standards Act, and the Weights and Measures Act, ensuring fair trade and consumer protection across Barbados.",
    contact: [
      { label: "Email", type: "email", value: "MCT.commerce@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-7001" },
      { label: "Telephone", type: "phone", value: "(246) 535-7019" },
      { label: "Fax", type: "phone", value: "(246) 535-7021" },
      {
        label: "Website",
        type: "website",
        value:
          "https://commerce.gov.bb/department-of-commerce-and-consumer-affairs/",
      },
      {
        label: "Address",
        value: [
          "First Floor, Warrens Office Complex",
          "Warrens",
          "St. Michael",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/commerce",
  },
  {
    slug: "constituency",
    name: "Department of Constituency Empowerment",
    shortDescription:
      "Works to improve and sustain the quality of life of Barbadians by building capacity at the constituency level and providing mechanisms for meaningful change.",
    intro:
      "The department's mission is to improve and sustain the quality of life of Barbadians by building capacity at their constituency and providing the mechanisms needed to effect meaningful change in their everyday lives and environment.",
    head: {
      name: "Ms. Sandra Greenidge",
      role: "Director Ag.",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "sandra.greenidge@barbados.gov.bb",
      },
      {
        label: "Email",
        type: "email",
        value: "dce.empowerment@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 310-1637" },
      { label: "Fax", type: "phone", value: "(246) 417-1317" },
      {
        label: "Address",
        value: ["4th Floor Warrens Office Complex", "Warrens", "St. Michael"],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/constituency",
  },
  {
    slug: "emergency-management",
    name: "Department of Emergency Management",
    shortDescription:
      "Develops and maintains a comprehensive National Disaster Management Programme to educate citizens and create disaster preparedness mechanisms across all societal levels.",
    intro:
      "The department's mission is to develop, promote, and maintain a comprehensive National Disaster Management Programme that educates citizens about disaster management and creates mechanisms to advance these activities across all levels of society.",
    head: {
      name: "Ms. Kerry Hinds",
      role: "Director Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "kerry.hinds@barbados.gov.bb" },
      { label: "Email", type: "email", value: "deminfo@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 438-7575" },
      { label: "Fax", type: "phone", value: "(246) 421-8612" },
      { label: "Website", type: "website", value: "http://dem.gov.bb/" },
      {
        label: "Address",
        value: [
          "The George Greaves Building",
          "#24 Warrens Industrial Park",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/emergency-management",
  },
  {
    slug: "youth-affairs",
    name: "Division of Youth Affairs",
    shortDescription:
      "Supports the development and empowerment of young people in Barbados through programmes and initiatives.",
    intro:
      "The division promotes youth development and operates as part of the Division of Youth, Sports and Community Empowerment.",
    contact: [
      {
        label: "Email",
        type: "email",
        value: "division.youth@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-3835" },
      { label: "Fax", type: "phone", value: "(246) 228-0180" },
      {
        label: "Address",
        value: ["Sky Mall", "Haggatt Hall", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/youth-affairs",
  },
  {
    slug: "electoral",
    name: "Electoral & Boundaries Commission",
    shortDescription:
      "Maintains accurate registers for the national and electoral registration systems and ensures the conduct of free, fair, and transparent elections in Barbados.",
    intro:
      "The commission's mission is to maintain accurate registers for the national and electoral registration systems and to ensure the conduct of free, fair, and transparent elections.",
    head: {
      name: "Mrs. Shurland Turton",
      role: "Chief Electoral Officer",
    },
    contact: [
      { label: "Email", type: "email", value: "electoral@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-4800" },
      { label: "Fax", type: "phone", value: "(246) 535-4863" },
      {
        label: "Website",
        type: "website",
        value: "https://www.electoral.barbados.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "Ground Floor & 4th Floor Warrens Tower II",
          "Warrens",
          "St. Michael",
          "Barbados, W.I",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/electoral",
  },
  {
    slug: "environmental-protection",
    name: "Environmental Protection Department",
    shortDescription:
      "Protects and improves Barbados's quality of life and its natural and built environment through sustainable practices, education, partnerships, and legislation enforcement.",
    intro:
      "The department's mission is to protect and improve Barbados's quality of life and its natural and built environment through the promotion of sustainable practices, education, partnerships, and the enforcement of legislation.",
    head: {
      name: "Mr. Anthony Headley",
      role: "Director",
    },
    contact: [
      { label: "Email", type: "email", value: "epd.secretary@epd.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-4600" },
      {
        label: "Address",
        value: [
          "L.V. Harcourt Lewis Building",
          "Dalkeith",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/environmental-protection",
  },
  {
    slug: "fire-service",
    name: "Fire Service Department",
    shortDescription:
      "Efficiently protects the lives, property, and environment of those who live, work, visit, or invest in Barbados through fire safety, emergency response, and hazard reduction services.",
    intro:
      "The department's mission is to efficiently protect the lives, property, and environment of those who live, work, visit, or invest in Barbados through fire safety initiatives, code enforcement, hazard reduction, suppression services, emergency response, and customer service excellence.",
    head: {
      name: "Mr. Errol Maynard",
      role: "Chief Fire Officer Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "errol.maynard@barbados.gov.bb" },
      { label: "Emergency", value: "311" },
      { label: "Telephone", type: "phone", value: "(246) 535-7824" },
      { label: "Fax", type: "phone", value: "(246) 435-0794" },
      {
        label: "Website",
        type: "website",
        value: "http://www.fireservice.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "Level 5 General Post Office Bldg.",
          "Cheapside",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/fire-service",
  },
  {
    slug: "fisheries",
    name: "Fisheries Division",
    shortDescription:
      "Ensures the optimum utilisation of fisheries resources in Barbadian waters for the benefit of the people of Barbados through management and development.",
    intro:
      "The division's mission is to ensure the optimum utilisation of the fisheries resources in the waters of Barbados for the benefit of the people of Barbados through management and development.",
    head: {
      name: "Dr. Shelly-Ann Cox",
      role: "Chief Fisheries Officer",
    },
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-5800" },
      {
        label: "Website",
        type: "website",
        value: "http://www.fisheries.gov.bb",
      },
      {
        label: "Address",
        value: ["Princess Alice Highway", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/fisheries",
  },
  {
    slug: "forensic-sciences",
    name: "Forensic Sciences Centre",
    shortDescription:
      "Assists in enhancing the judicial system through greater use of forensic science in both civil and criminal proceedings.",
    intro:
      "The centre's aim is to assist in providing an enhanced judicial system through the greater use of forensic science in both civil and criminal proceedings, and to encourage regional adoption of similar forensic capabilities.",
    head: {
      name: "Ms. Cheryl Corbin",
      role: "Director",
    },
    contact: [
      { label: "Email", type: "email", value: "ccorbin@forensics.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-6400" },
      { label: "Fax", type: "phone", value: "(246) 535-6504" },
      {
        label: "Address",
        value: [
          "Francis Godson Drive",
          "Culloden Road",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/forensic-sciences",
  },
  {
    slug: "electrical-engineering",
    name: "Government Electrical Engineering Department",
    shortDescription:
      "Provides electrical engineering services to the Government of Barbados.",
    head: {
      name: "Mr. Tyrone White",
      role: "Chief Electrical Officer Ag.",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "tyrone.white@publicworks.gov.bb",
      },
      { label: "Email", type: "email", value: "GEED@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-7100" },
      { label: "Fax", type: "phone", value: "(246) 429-9238" },
      {
        label: "Address",
        value: [
          "Verona House",
          "Bank Hall Main Road",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/electrical-engineering",
  },
  {
    slug: "industrial-school",
    name: "Government Industrial School",
    shortDescription:
      "A secure residential facility for court-ordered child placements, focused on providing a safe, caring environment that supports rehabilitation and family reintegration.",
    intro:
      "The facility aims to accommodate children ordered to be resident therein in a safe, secure, and caring environment, while addressing rehabilitation needs and supporting family reintegration into the community.",
    head: {
      name: "Mr. Ronald Brathwaite",
      role: "Principal (Ag.)",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "ronald.brathwaite@barbados.gov.bb",
      },
      {
        label: "Email",
        type: "email",
        value: "seilest.bradshaw@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-9503" },
      {
        label: "Address",
        value: ["Dodds", "St. Philip", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/industrial-school",
  },
  {
    slug: "printing-dept",
    name: "Government Printing Department",
    shortDescription:
      "Provides printing and related services to Ministries, Departments, and specified statutory agencies in an efficient and cost-effective manner.",
    intro:
      "The department's mission is to provide printing and related services for Ministries, Departments, and other specified statutory agencies in an efficient and cost-effective manner.",
    head: {
      name: "Ms. Joan Griffith",
      role: "Government Printer Ag.",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "government.printery@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-6301" },
      { label: "Fax", type: "phone", value: "(246) 535-6328" },
      {
        label: "Website",
        type: "website",
        value: "http://governmentprintery.gov.bb",
      },
      {
        label: "Address",
        value: ["Bay Street", "Bridgetown", "St.Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/printing-dept",
  },
  {
    slug: "immigration",
    name: "Immigration Department",
    shortDescription:
      "Enforces Barbados's immigration and citizenship laws while providing reliable, professional, and humanitarian service to both national and non-national clientele.",
    intro:
      "The department enforces Immigration and Citizenship Laws while providing reliable, professional, and humanitarian service to its clientele, both national and non-national, operating within a framework supporting national security and promoting sustainable social and economic development.",
    contact: [
      { label: "Email", type: "email", value: "immigration@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-4100" },
      { label: "Fax", type: "phone", value: "(246) 535-4183" },
      {
        label: "Address",
        value: [
          "BTI Corporate Centre",
          "Princess Alice Highway",
          "Bridgetown BB11093",
          "BARBADOS",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/immigration",
  },
  {
    slug: "international-business-financial-services",
    name: "International Business & Financial Services Unit",
    shortDescription:
      "Supports international business and financial services for Barbados under the Ministry of Industry, Innovation, Science and Technology.",
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-7200" },
      { label: "Fax", type: "phone", value: "(246) 535-7245" },
      { label: "Fax", type: "phone", value: "(246) 535-7244" },
      {
        label: "Website",
        type: "website",
        value: "https://internationalbusiness.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "8th Floor Baobab Tower",
          "Warrens",
          "St. Michael",
          "Barbados",
          "West Indies",
        ],
      },
    ],
    originalSource:
      "https://www.gov.bb/Departments/international-business-financial-services",
  },
  {
    slug: "labour",
    name: "Labour Department",
    shortDescription:
      "Promotes and maintains a stable and harmonious industrial relations climate and provides employment services to the community.",
    intro:
      "To promote and maintain a stable and harmonious industrial relations climate and provide employment services to the community.",
    head: {
      name: "Mr. Vincent Burnett",
      role: "Chief Labour Officer",
    },
    contact: [
      { label: "Email", type: "email", value: "labour@labour.gov.bb" },
      { label: "Email", type: "email", value: "vburnett@labour.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1500" },
      { label: "Fax", type: "phone", value: "(246) 424-2589" },
      {
        label: "Address",
        value: [
          "2nd Floor East Warrens Complex",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/labour",
  },
  {
    slug: "land-registry",
    name: "Land Registration Department",
    shortDescription:
      "Manages land title registration and related administrative functions for Barbados.",
    head: {
      name: "Ms. Michelle Johnson",
      role: "Registrar of Titles Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "mjohnson@landregistry.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 310-1100" },
      { label: "Fax", type: "phone", value: "(246) 425-1115" },
      {
        label: "Address",
        value: [
          "Ground Floor Warrens Office Complex",
          "Warrens",
          "St. Michael",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/land-registry",
  },
  {
    slug: "land-surveys",
    name: "Lands and Surveys Department",
    shortDescription:
      "Provides up-to-date mapping, geographical information systems, and surveying services to clients across Barbados.",
    intro:
      "To provide up-to-date and reliable mapping and geographical information systems services appropriate to all our clients' needs and request, as well as excellent and timely surveying services to our customers.",
    head: {
      name: "Mr. David McCollin",
      role: "Chief Surveyor",
    },
    contact: [
      { label: "Email", type: "email", value: "LSDept@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 536-5200" },
      { label: "Fax", type: "phone", value: "(246) 424-2310" },
      {
        label: "Website",
        type: "website",
        value: "https://www.landsandsurveys.gov.bb",
      },
      {
        label: "Address",
        value: [
          "Ground Floor Warrens Office Complex",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/land-surveys",
  },
  {
    slug: "licensing-authority",
    name: "Licensing Authority",
    shortDescription:
      "Oversees driver licensing, vehicle inspections, and transport-related regulatory functions in Barbados.",
    intro:
      "The Licensing Authority administers driver licensing, vehicle examinations, and transport regulation across Barbados.",
    head: {
      name: "Mrs. Treca McCarthy-Broomes",
      role: "Chief Licensing Officer Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "CLO@publicworks.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 536-0264" },
      { label: "Website", type: "website", value: "http://bla.gov.bb" },
      {
        label: "Address",
        value: ["The Pine", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/licensing-authority",
  },
  {
    slug: "media-resource",
    name: "Media Resource Department",
    shortDescription:
      "Contributes to the highest standards in education through training and provision of educational media resources.",
    intro:
      "To contribute to the attainment of the highest standards in education, through training in and the provision of educational media resources, consistent with the goals and policies of the Ministry of Education.",
    head: {
      name: "Mr. C. Walter Harper",
      role: "Chief Media Resource Officer",
    },
    contact: [
      { label: "Email", type: "email", value: "cwharper@mes.gov.bb" },
      { label: "Email", type: "email", value: "mrd@mes.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 430-2848" },
      { label: "Fax", type: "phone", value: "(246) 228-5078" },
      { label: "Website", type: "website", value: "http://mrd.gov.bb/" },
      {
        label: "Address",
        value: [
          "Elsie Payne Complex",
          "Constitution Road",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/media-resource",
  },
  {
    slug: "meteorological-department",
    name: "Meteorological Office",
    shortDescription:
      "Observes and understands the weather and climate of Barbados and the region, providing meteorological, hydrological, and marine services.",
    intro:
      "To observe and understand the weather and climate of Barbados and the region, and provide meteorological, hydrological and marine services in support of the national needs and international obligations.",
    head: {
      name: "Mr. Hampden Lovell",
      role: "Director",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "hampden.lovell@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-0020" },
      { label: "Fax", type: "phone", value: "(246) 535-0029" },
      {
        label: "Address",
        value: [
          "Building #4 Grantley Adams",
          "Industrial Park",
          "Christ Church",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/meteorological-department",
  },
  {
    slug: "disabilities-unit",
    name: "National Disabilities Unit",
    shortDescription:
      "Facilitates, advocates, and promotes the advancement and empowerment of persons with disabilities to ensure equal opportunities for integration in all aspects of community living.",
    intro:
      "To facilitate, advocate, and promote the advancement and empowerment of persons with disabilities in order to ensure equal opportunities for integration and participation in all aspects of community living.",
    head: {
      name: "Mr. John Hollingsworth",
      role: "Director",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "disabilities.unit@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-3600" },
      { label: "Fax", type: "phone", value: "(246) 535-3618" },
      {
        label: "Address",
        value: [
          "National Disabilities Unit",
          '"Maxwelton"',
          "Collymore Rock",
          "St. Michael",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/disabilities-unit",
  },
  {
    slug: "hiv-aids-commission",
    name: "National HIV/AIDS Commission",
    shortDescription:
      "Advises the government on plans and policies and builds strategic partnerships to effectively manage, control, and reduce the spread of HIV in Barbados.",
    intro:
      "To advise the government on plans and policies and to build strategic partnerships to effectively manage, control and reduce the spread of HIV in Barbados.",
    contact: [
      { label: "Email", type: "email", value: "info@hiv-aids.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1682" },
      { label: "Fax", type: "phone", value: "(246) 421-8499" },
      {
        label: "Address",
        value: [
          "Warrens Office Complex",
          "2nd Floor East",
          "Warrens, St. Michael",
          "BB12001",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/hiv-aids-commission",
  },
  {
    slug: "national-insurance",
    name: "National Insurance Department",
    shortDescription:
      "Provides timely social security services through efficient collection and management of funds by customer-oriented staff.",
    intro:
      "To provide timely social security services through the efficient collection and management of funds by highly motivated caring and reliable customer oriented staff.",
    head: {
      name: "Mr. Ian Carrington",
      role: "Director",
    },
    contact: [
      { label: "Email", type: "email", value: "Ian.carrington@bginis.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 431-7400" },
      { label: "Fax", type: "phone", value: "(246) 431-7408" },
      {
        label: "Address",
        value: [
          "Frank Walcott Building",
          "Culloden Rd.",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/national-insurance",
  },
  {
    slug: "library-service",
    name: "National Library Service",
    shortDescription:
      "Serves as a ready source of dynamic information products and services to satisfy the educational, recreational, and informational needs of the community.",
    intro:
      "To be a ready source of dynamic information products and services to satisfy the educational, recreational and informational needs of the community.",
    head: {
      name: "Mrs. Grace Haynes",
      role: "Director (Ag.)",
    },
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-2900" },
      { label: "Fax", type: "phone", value: "(246) 535-2954" },
      {
        label: "Address",
        value: [
          "Fairchild Street",
          "Bridgetown",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/library-service",
  },
  {
    slug: "national-nutrition",
    name: "National Nutrition Centre",
    shortDescription:
      "Promotes and maintains a standard of good nutrition in Barbados through education and research.",
    intro:
      "To promote and maintain a standard of good nutrition in Barbados through education and research.",
    head: {
      name: "Dr. Mark Alleyne",
      role: "Director",
    },
    contact: [
      { label: "Email", type: "email", value: "mark.alleyne@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 536-3852" },
      {
        label: "Website",
        type: "website",
        value: "https://www.health.gov.bb/",
      },
      {
        label: "Address",
        value:
          "Ladymeade No. 1 Centre, Ladymeade Gardens, St. Michael, Barbados, W.I.",
      },
    ],
    originalSource: "https://www.gov.bb/Departments/national-nutrition",
  },
  {
    slug: "natural-heritage",
    name: "Natural Heritage Department",
    shortDescription:
      "Promotes the conservation of unique biomes through effective management of a network of terrestrial and marine protected areas while supporting sustainable development.",
    intro:
      "To promote the conservation of special and unique biomes of Barbados through effective management of a network of terrestrial and marine protected areas and to support sustainable development in those regions for local communities.",
    head: {
      name: "Mr. Steve Devonish",
      role: "Director",
    },
    contact: [
      { label: "Email", type: "email", value: "heritage@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 438-7761" },
      {
        label: "Address",
        value: ["#1 Sturges", "St. Thomas", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/natural-heritage",
  },
  {
    slug: "public-sector-reform",
    name: "Office of Public Sector Reform",
    shortDescription:
      "Facilitates transformational change across the public service by assisting Ministries, Departments, and Agencies in improving their performance.",
    intro:
      "The role of the Efficiency Unit is to facilitate transformational change across the public service by assisting Ministries, Departments and Agencies in improving their performance and results in alignment with the government's strategic priorities and best practices.",
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-1200" },
      { label: "Fax", type: "phone", value: "(246) 535-1284" },
      {
        label: "Address",
        value: ["3rd and 4th Floor, Baobab Tower", "Warrens", "St. Michael"],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/public-sector-reform",
  },
  {
    slug: "auditor-general",
    name: "Office of the Auditor General",
    shortDescription:
      "Provides independent audit oversight of government financial operations in Barbados.",
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-4254" },
      { label: "Telephone", type: "phone", value: "(246) 535-4255" },
      { label: "Telephone", type: "phone", value: "(246) 535-4256" },
      { label: "Website", type: "website", value: "https://bao.gov.bb" },
      {
        label: "Address",
        value: ["Weymouth Corporate Centre", "Roebuck Street", "St. Michael"],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/auditor-general",
  },
  {
    slug: "ombudsman",
    name: "Office of the Ombudsman",
    shortDescription:
      "Investigates complaints about government conduct deemed unreasonable or unjust, protecting citizens' rights against bureaucratic wrongdoing.",
    intro:
      "To provide quality service in an impartial, timely and expeditious manner while investigating complaints about government conduct, serving to protect citizens' rights against bureaucratic wrongdoing.",
    head: {
      name: "Mr. Valton Bend",
      role: "Ombudsman",
    },
    contact: [
      { label: "Email", type: "email", value: "ombudsman@caribsurf.com" },
      { label: "Telephone", type: "phone", value: "(246) 536-0851" },
      { label: "Fax", type: "phone", value: "(246) 536-0857" },
      {
        label: "Address",
        value: [
          "2nd Floor Trident House",
          "Bridgetown",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/ombudsman",
  },
  {
    slug: "post-office",
    name: "Post Office",
    shortDescription:
      "Processes and delivers communications, goods, and financial services locally and internationally in a secure, reliable, and economical manner.",
    intro:
      "To process and deliver communications, goods and financial services locally and internationally in a secure, reliable, timely and economical manner.",
    head: {
      name: "Mr. Nigel Cobham",
      role: "Postmaster General Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "barbadospost@caribsurf.com" },
      { label: "Telephone", type: "phone", value: "(246) 535-3900" },
      {
        label: "Address",
        value: ["Cheapside", "Bridgetown", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/post-office",
  },
  {
    slug: "probation",
    name: "Probation Department",
    shortDescription:
      "Provides social advice to the justice system and assists in the rehabilitation of offenders and community education to reduce delinquency and crime.",
    intro:
      "To provide reliable social advice to the Justice System; assist in the rehabilitation of offenders and educate communities through programs designed to reduce delinquency and crime.",
    head: {
      name: "Ms. Denise Agard",
      role: "Chief Probation Officer (Ag.)",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "probation.department@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 536-0400" },
      { label: "Fax", type: "phone", value: "(246) 228-4521" },
      {
        label: "Address",
        value: [
          "33 Roebuck Street",
          "Bridgetown",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/probation",
  },
  {
    slug: "psychiatric-hospital",
    name: "Psychiatric Hospital",
    shortDescription:
      "Provides high-quality mental health services with emphasis on community-based education, prevention, and treatment to reduce the need for institutionalised care.",
    intro:
      "We aim to provide for the Barbadian public a mix of high-quality mental health services, with special emphasis on community-based education, prevention and treatment of mental illness, in order to reduce the need for institutionalized care.",
    head: {
      name: "Mr. David Leacock",
      role: "Hospital Director Ag.",
    },
    contact: [
      {
        label: "Email",
        type: "email",
        value: "psychiatrichospital@caribsurf.com",
      },
      { label: "Telephone", type: "phone", value: "(246) 536-3001" },
      {
        label: "Address",
        value: ["Black Rock", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/psychiatric-hospital",
  },
  {
    slug: "registration",
    name: "Registration Department",
    shortDescription:
      "Ensures the administration of justice functions speedily and efficiently while recording vital occurrences such as births, deaths, and marriages.",
    intro:
      "The department aims to ensure that the administration of justice functions speedily, efficiently and effectively while recording vital occurrences and delivering essential services to the population per Barbadian law.",
    head: {
      name: "Ms. Barbara Cooke-Alleyne",
      role: "Registrar Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "registrar@lawcourts.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-9700" },
      { label: "Fax", type: "phone", value: "(246) 427-8917" },
      {
        label: "Address",
        value: [
          "Supreme Court Complex",
          "Whitepark Road",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/registration",
  },
  {
    slug: "statistical-services",
    name: "Statistical Services Department",
    shortDescription:
      "Provides reliable and timely economic and social statistics to support decision-makers and other users across government and the public.",
    intro:
      "The goal of the Barbados Statistical Service is to provide reliable and timely key economic and social statistics which decision makers and other users need.",
    contact: [
      { label: "Email", type: "email", value: "barstats@caribsurf.com" },
      { label: "Telephone", type: "phone", value: "(246) 535-2699" },
      { label: "Fax", type: "phone", value: "(246) 421-8294" },
      {
        label: "Website",
        type: "website",
        value: "http://www.barstats.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "5th Floor Baobab Tower Building",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/statistical-services",
  },
  {
    slug: "sports-council",
    name: "The National Sports Council",
    shortDescription:
      "Dedicated to developing sports in Barbados and responsible for sports development programmes at the national level.",
    intro:
      "Dedicated to developing sports in Barbados and responsible for sports development programmes at the national level.",
    contact: [
      { label: "Email", type: "email", value: "nsc.bdos@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-9601" },
      { label: "Telephone", type: "phone", value: "(246) 535-9602" },
      { label: "Fax", type: "phone", value: "(246) 535-9659" },
      { label: "Website", type: "website", value: "http://www.nsc.gov.bb" },
      {
        label: "Address",
        value: [
          "The National Sports Complex",
          "Wildey Gymnasium",
          "Garfield Sobers Sports Complex",
          "Wildey",
          "St Michael",
          "BB 22026",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/sports-council",
  },
  {
    slug: "police-department",
    name: "The Police Department",
    shortDescription:
      "Responsible for local law enforcement, established under the Police Act of 1961 and structured across Operations, Administrative, and Criminal Investigations divisions.",
    intro:
      "The Barbados Police Service, as established under the Police Act of 1961 and the Constitution of Barbados, is the government body responsible for local law enforcement. Modelled after London's Metropolitan Police Service, the force was established in 1835 and received its Royal designation in 1966.",
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 430-7100" },
      {
        label: "Website",
        type: "website",
        value: "http://oag.gov.bb/Departments/Police/",
      },
      {
        label: "Address",
        value: ["Lower Roebuck Street", "Bridgetown", "Saint Michael"],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/police-department",
  },
  {
    slug: "public-markets",
    name: "The Public Markets",
    shortDescription:
      "Maintains attractive marketing infrastructure to promote vending and entrepreneurship while ensuring vendors operate under proper sanitary conditions.",
    intro:
      "The department aims to maintain attractive marketing infrastructure in an effort to promote vending, entrepreneurship and encourage patronage, while ensuring vendors operate under proper sanitary conditions to protect public health.",
    head: {
      name: "Mr. Sherlock King",
      role: "Manager Ag.",
    },
    contact: [
      { label: "Email", type: "email", value: "piu.gob@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-5133" },
      {
        label: "Address",
        value: [
          "3rd  Floor East Wing",
          "Warrens Office Complex",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/public-markets",
  },
  {
    slug: "samuel-jackson-prescod-polytechnic",
    name: "The Samuel Jackman Prescod Institute of Technology",
    shortDescription:
      "Leads in preparing a highly trained workforce by providing competency-based technical and vocational training to respond to employment needs and lifelong learning.",
    intro:
      "To be the leader in the preparation of a highly trained workforce by providing qualified persons with quality competency-based technical and vocational training, responding to employment needs and offering lifelong learning.",
    contact: [
      { label: "Email", type: "email", value: "hbelle@sjpp.edu.bb" },
      { label: "Email", type: "email", value: "info@sjpp.edu.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-2200" },
      { label: "Fax", type: "phone", value: "(246) 426-0843" },
      { label: "Fax", type: "phone", value: "(246) 435-0829" },
      {
        label: "Address",
        value: ["Wildey", "St. Michael", "Barbados, W.I."],
      },
    ],
    originalSource:
      "https://www.gov.bb/Departments/samuel-jackson-prescod-polytechnic",
  },
  {
    slug: "school-meals",
    name: "The School Meals Department",
    shortDescription:
      "Provides nutritious lunches at low cost to school children across Barbados, maintaining high health standards through a network of service locations.",
    intro:
      "To provide a lunch which is of high nutritional value at a low cost to school children while maintaining proper health standards and work ethics.",
    head: {
      name: "Dr. Marcilia Nelson",
      role: "Manager",
    },
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-6801" },
      { label: "Fax", type: "phone", value: "(246) 228-5221" },
      {
        label: "Address",
        value: [
          "Coles Building",
          "Lower Bay Street",
          "Bridgetown",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/school-meals",
  },
  {
    slug: "treasury",
    name: "Treasury Department",
    shortDescription:
      "Ensures efficient and effective management and reporting of the Government of Barbados's financial operations.",
    intro:
      "To ensure the efficient and effective management and reporting of Government's Financial Operations supported by a well-trained and competent staff and smart use of information technology.",
    contact: [
      { label: "Email", type: "email", value: "coppind@gob.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-0900" },
      { label: "Fax", type: "phone", value: "(246) 535-0994" },
      {
        label: "Address",
        value: [
          "1st Floor Treasury Dept.",
          "Bridge Street",
          "Bridgetown",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/treasury",
  },
  {
    slug: "welfare",
    name: "Welfare Department",
    shortDescription:
      "Provides professional social work services focused on resolving individual and family problems, poverty alleviation, and support for disabled and disadvantaged populations.",
    intro:
      "The department provides professional social work services geared towards the resolution of individual and family problems, with key focus areas including personal and social development, poverty alleviation, and support for disabled and disadvantaged populations.",
    contact: [
      {
        label: "Email",
        type: "email",
        value: "welfare.department@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-1000" },
      { label: "Fax", type: "phone", value: "(246) 535-1006" },
      {
        label: "Address",
        value: [
          "Weymouth Corporate Center",
          "Roebuck St. Bridgetown",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Departments/welfare",
  },
];

export const getDepartmentBySlug = (slug: string): Department | undefined =>
  DEPARTMENTS.find((d) => d.slug === slug);
