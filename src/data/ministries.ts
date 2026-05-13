import type { ReactNode } from "react";

import type {
  AssociatedDepartmentGroup,
  ContactItem,
  FeaturedItem,
  Minister,
  MinistryService,
} from "@/data/mda-types";

export type MinistryCategory = "ministerial" | "non-ministerial" | "agency";

export interface Ministry {
  slug: string;
  name: string;
  category: MinistryCategory;
  shortDescription?: string;
  intro?: ReactNode;
  heroImage?: string;
  heroImageAlt?: string;
  featured?: FeaturedItem[];
  services?: MinistryService[];
  onlineServices?: MinistryService[];
  minister?: Minister;
  contact?: ContactItem[];
  associatedDepartments?: AssociatedDepartmentGroup[];
  originalSource?: string;
}

// Source: https://www.gov.bb/ministries (verified)
export const MINISTRIES: Ministry[] = [
  {
    slug: "prime-ministers-office",
    name: "Prime Minister's Office",
    category: "ministerial",
    shortDescription:
      "Strategic policy direction, leadership of the public service, and oversight of national security and economic planning.",
    intro:
      "To provide strategic policy direction, lead the public service, and manage national security and economic planning.",
    minister: {
      name: "The Hon. Mia Amor Mottley, S.C., M.P.",
      role: "Prime Minister, Minister of Economic Affairs and Development, and Minister of National Security",
    },
    contact: [
      { label: "Email", type: "email", value: "pspmo@barbados.gov.bb" },
      { label: "Email", type: "email", value: "psdefence@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-5300" },
      { label: "Fax", type: "phone", value: "(246) 535-5659" },
      { label: "Fax", type: "phone", value: "(246) 535-5357" },
      { label: "Fax", type: "phone", value: "(246) 535-5341" },
      { label: "Fax", type: "phone", value: "(246) 535-5638" },
      {
        label: "Address",
        value:
          "Government Headquarters, Bay Street, St. Michael, Barbados, W.I.",
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/prime-minister-office",
    associatedDepartments: [
      { category: "Cabinet Office", items: ["Electoral Department"] },
      {
        category: "Finance",
        items: [
          "Central Purchasing",
          "The Customs Department",
          "Barbados Revenue Authority",
          "The Treasury Department",
          "The Central Bank of Barbados",
          "Financial Services Commission",
        ],
      },
      {
        category: "Economic Affairs",
        items: ["The Statistical Services Department"],
      },
      {
        category: "Investment",
        items: [
          "The Barbados Tourism Investment Inc.",
          "Kensington Oval Management Inc.",
          "Public Investment Unit",
        ],
      },
      { category: "National Security", items: ["The Barbados Defence Force"] },
      {
        category: "Public Service",
        items: [
          "Directorate, Human Resource Policy and Staffing",
          "Directorate, People Resourcing and Compliance",
          "Directorate, Learning and Development",
        ],
      },
      {
        category: "Social Security",
        items: [
          "National Insurance Department",
          "National Insurance Board",
          "National Insurance - Old Age Pensions",
          "Severance Payments",
        ],
      },
      {
        category: "Culture",
        items: [
          "The Department of Archives",
          "National Library Service",
          "National Cultural Foundation",
          "Barbados Museum and Historical Society",
        ],
      },
    ],
  },
  {
    slug: "office-of-the-attorney-general",
    name: "Office of the Attorney General",
    category: "ministerial",
    minister: {
      name: "The Hon. Wilfred A. Abrahams, S.C., M.P.",
      role: "Attorney-General and Senior Minister coordinating Governance Policy",
    },
    contact: [
      { label: "Email", type: "email", value: "ps@oag.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-0467" },
      { label: "Fax", type: "phone", value: "(246) 535-0559" },
      { label: "Fax", type: "phone", value: "(246) 535-0560" },
      { label: "Fax", type: "phone", value: "(246) 535-0561" },
      { label: "Fax", type: "phone", value: "(246) 535-0562" },
      { label: "Website", type: "website", value: "http://www.oag.gov.bb/" },
      {
        label: "Address",
        value: [
          "Jones Building",
          "Webster's Business Park",
          "Wildey",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/attorney-general",
    associatedDepartments: [
      {
        items: [
          "The Registration Department",
          "The Supreme Court",
          "The Police Department",
          "The Criminal Justice Research and Planning Unit",
        ],
      },
    ],
  },
  {
    slug: "cabinet-office",
    name: "Cabinet Office",
    category: "ministerial",
    contact: [
      { label: "Email", type: "email", value: "cabinetoffice@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-5300" },
      { label: "Fax", type: "phone", value: "(246) 535-5649" },
      { label: "Fax", type: "phone", value: "(246) 535-5650" },
      {
        label: "Address",
        value: [
          "Government Headquarters",
          "Bay Street",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/cabinet-office",
    associatedDepartments: [
      { items: ["The Electoral and Boundaries Commission"] },
    ],
  },
  {
    slug: "ministry-of-agriculture-and-food-and-nutritional-security",
    name: "Ministry of Agriculture and Food and Nutritional Security",
    category: "ministerial",
    shortDescription:
      "National food security and a modern, competitive agricultural sector.",
    intro:
      "To ensure national food security and promote a modern, competitive agricultural sector.",
    minister: {
      name: "The Hon. Shantal M. Munro-Knight, Ph.D.",
      role: "Minister of Agriculture, Food and Nutritional Security",
    },
    contact: [
      { label: "Email", type: "email", value: "minister@agriculture.gov.bb" },
      { label: "Email", type: "email", value: "ps@agriculture.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-5100" },
      { label: "Fax", type: "phone", value: "(246) 535-5257" },
      { label: "Fax", type: "phone", value: "(246) 535-5258" },
      {
        label: "Website",
        type: "website",
        value: "https://agriculture.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "Ministry of Agriculture and Food and Nutritional Security",
          "Graeme Hall",
          "Christ Church",
          "Barbados, W. I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/agriculture",
    associatedDepartments: [
      {
        items: [
          "The Public Markets",
          "Analytical Services",
          "The Barbados Agricultural Management Company",
          "The Barbados Agricultural Development and Marketing Corporation (BADMC)",
          "Veterinary Services",
          "Soil Conservation",
          "Southern Meats Inc.",
          "The Barbados Agricultural Credit Trust Limited",
          "Barbados Medicinal Cannabis Licencing Authority",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-educational-transformation",
    name: "Ministry of Educational Transformation",
    category: "ministerial",
    shortDescription:
      "Transforms primary and secondary education to foster lifelong learning.",
    intro:
      "To create a world-class education system that fosters lifelong learning and skill development.",
    // Note: Educational Transformation minister not in supplied cabinet brief — left blank.
    onlineServices: [
      {
        title: "Apply for a position as a temporary teacher",
        href: "/apply-for-a-position-as-a-temporary-teacher",
        description: "Apply to teach temporarily in a public school.",
      },
      {
        title: "Get a primary school textbook grant",
        href: "/get-a-primary-school-textbook-grant",
        description: "Government grant for primary school textbooks.",
      },
      {
        title: "Apply for a place at a day nursery",
        href: "/apply-for-a-place-at-a-day-nursery",
        description: "Apply for a place at a government day nursery.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "info@mes.gov.bb" },
      { label: "Email", type: "email", value: "ps@mes.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-0600" },
      { label: "Fax", type: "phone", value: "(246) 436-2411" },
      { label: "Website", value: "mes.gov.bb" },
      {
        label: "Address",
        value: [
          "Elsie Payne Complex",
          "Constitution Road",
          "St. Michael",
          "Barbados, W.I",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/education",
    associatedDepartments: [
      {
        items: [
          "The School Meals Department",
          "Media Resource Department",
          "The National Advisory Commission on Education",
          "Schools (Pre-Primary, Primary, Secondary, Special Needs)",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-energy-and-business-development",
    name: "Ministry of Energy and Business Development",
    category: "ministerial",
    minister: {
      name: "The Hon. Kerrie D. Symmonds, M.P.",
      role: "Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector",
    },
    contact: [
      { label: "Email", type: "email", value: "info@energy.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-2500" },
      {
        label: "Website",
        type: "website",
        value: "https://energy.gov.bb / https://smartenergybarbados.com",
      },
      {
        label: "Address",
        value: [
          "Trinity Business Centre",
          "Country Road",
          "St. Michael",
          "Barbados",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/energy-water-resources",
    associatedDepartments: [
      {
        category: "Energy",
        items: [
          "Barbados National Oil Company Limited",
          "Barbados National Terminal Company Limited",
          "National Petroleum Corporation",
        ],
      },
      {
        category: "Small Business",
        items: ["Small Business Development Unit"],
      },
      {
        category: "Commerce",
        items: [
          "Fair Trading Commission",
          "Office of Public Counsel",
          "The Barbados National Standards Institution",
          "Office of Public Counsel",
          "Barbados Coalition of Service Industries",
        ],
      },
      {
        category: "International Business",
        items: [
          "Corporate Affairs and Intellectual Property Office",
          "International Business and Financial Services Unit",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-environment-and-national-beautification",
    name: "Ministry of Environment and National Beautification",
    category: "ministerial",
    shortDescription:
      "Environmental protection, sustainable practices, and national aesthetics.",
    intro:
      "To protect the natural environment, promote sustainable practices, and enhance national aesthetics.",
    minister: {
      name: "The Hon. Santia J. O. Bradshaw, M.P.",
      role: "Deputy Prime Minister, Minister of Environment, National Beautification and Fisheries, and Leader of Government Business in the House of Assembly",
    },
    contact: [
      { label: "Email", type: "email", value: "ps.menb@barbados.gov.bb" },
      {
        label: "Email",
        type: "email",
        value: "cleanandgreenbarbados@gmail.com",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-4350" },
      { label: "Fax", type: "phone", value: "(246) 535-4377" },
      {
        label: "Website",
        type: "website",
        value: "https://biodiversity.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "10th Floor Warrens Tower II",
          "Warrens",
          "St. Michael, BB12001",
          "Barbados,W. I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/environment",
    associatedDepartments: [
      {
        category: "Environment",
        items: [
          "Environmental Protection Department",
          "Sanitation Services Authority",
        ],
      },
      {
        category: "National Beautification",
        items: ["National Conservation Commission"],
      },
      {
        category: "Blue Economy",
        items: ["Fisheries Division", "Coastal Zone Management Unit"],
      },
    ],
  },
  {
    slug: "ministry-of-finance-economic-affairs-and-investment",
    name: "Ministry of Finance, Economic Affairs and Investment",
    category: "ministerial",
    shortDescription:
      "Manages the country's financial resources and leads economic growth through prudent fiscal policy.",
    intro:
      "To manage the country's financial resources and spearhead economic growth through prudent fiscal policy.",
    minister: {
      name: "The Hon. Ryan R. Straughn, M.P.",
      role: "Minister of Finance",
    },
    onlineServices: [
      {
        title: "Pay taxes online",
        href: "/tax-online",
        description: "File and pay your taxes online with the BRA.",
      },
      {
        title: "EZpay",
        href: "/ezpay",
        description: "Pay government bills online via EZpay.",
      },
      {
        title: "Information about business tax",
        href: "/information-about-business-tax",
        description: "Tax obligations for businesses operating in Barbados.",
      },
      {
        title: "Financial services for businesses",
        href: "/financial-services-for-businesses",
        description: "Government financial services for businesses.",
      },
      {
        title: "Apply for financial assistance",
        href: "/apply-financial-assistance",
        description: "Government financial assistance for individuals.",
      },
    ],
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-5300" },
      { label: "Fax", type: "phone", value: "(246) 535-5344" },
      { label: "Fax", type: "phone", value: "(246) 535-1368" },
      {
        label: "Website",
        type: "website",
        value: "https://bdsfinance.gov.bb/",
      },
      {
        label: "Address",
        value:
          "Government Headquarters, Bay Street, St. Michael, Barbados, W.I.",
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/finance-economic-affairs",
    associatedDepartments: [
      {
        items: [
          "Treasury Department",
          "Statistical Services Department",
          "Central Purchasing Department",
          "Special Projects - Financial",
          "Public Investment Unit",
          "Economic and Social Planning Development",
          "The Productivity Council",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-foreign-affairs-and-foreign-trade",
    name: "Ministry of Foreign Affairs and Foreign Trade",
    category: "ministerial",
    shortDescription:
      "Advances Barbados' interests globally through diplomacy, trade advocacy, and protection of citizens abroad.",
    intro:
      "To advance Barbados' interests globally through diplomacy, trade advocacy, and the protection of citizens abroad.",
    minister: {
      name: "Senator The Hon. Christopher P. Sinckler",
      role: "Senior Minister of Foreign Affairs and Foreign Trade",
    },
    onlineServices: [
      {
        title: "Visa information",
        href: "/visa-information",
        description: "Visa requirements for visiting Barbados.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "barbados@foreign.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-6620" },
      { label: "Fax", type: "phone", value: "(246) 429-6652" },
      { label: "Fax", type: "phone", value: "(246) 228-7840" },
      {
        label: "Address",
        value: "1 Culloden Road, St. Michael, Barbados, W. I.",
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/foreign-affairs",
    associatedDepartments: [{ items: ["Consular and Diaspora Division"] }],
  },
  {
    slug: "ministry-of-health-and-wellness",
    name: "Ministry of Health and Wellness",
    category: "ministerial",
    shortDescription:
      "Provides quality, equitable, and accessible health care services to all Barbadians.",
    intro:
      "To provide quality, equitable, and accessible health care services to all Barbadians.",
    minister: {
      name: "The Hon. Davidson I. Ishmael, M.P.",
      role: "Minister of State, Ministry of Health and Wellness",
    },
    onlineServices: [
      {
        title: "Medical requirements",
        href: "/medical-requirements",
        description: "Medical requirements for entering or living in Barbados.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "ps-secretary@health.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 536-3800" },
      { label: "Website", type: "website", value: "http://www.health.gov.bb/" },
      {
        label: "Address",
        value: [
          "Frank Walcott Building, Culloden Road",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/health",
    associatedDepartments: [
      {
        category: "Health",
        items: [
          "Barbados Drug Service",
          "The Queen Elizabeth Hospital",
          "The Psychiatric Hospital",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-home-affairs-and-information",
    name: "Ministry of Home Affairs and Information",
    category: "ministerial",
    shortDescription:
      "Law and order, immigration, and the flow of government information.",
    intro:
      "To maintain law and order, manage immigration, and ensure the effective flow of government information.",
    minister: {
      name: "The Hon. Gregory P. B. Nicholls, M.P.",
      role: "Minister of Home Affairs and Information",
    },
    onlineServices: [
      {
        title: "Apply for a passport",
        href: "/apply-for-a-passport",
        description: "Apply for or renew a Barbados passport.",
      },
      {
        title: "National registration",
        href: "/national-registration",
        description: "Register for a national ID card.",
      },
      {
        title: "Register a birth",
        href: "/register-a-birth",
        description: "Register the birth of a child.",
      },
      {
        title: "Register a death",
        href: "/register-a-death",
        description: "Register a death.",
      },
      {
        title: "Register a marriage",
        href: "/register-a-marriage",
        description: "Register a marriage.",
      },
      {
        title: "Get a birth certificate",
        href: "/get-birth-certificate",
        description: "Order a copy of a birth certificate.",
      },
      {
        title: "Get a death certificate",
        href: "/get-death-certificate",
        description: "Order a copy of a death certificate.",
      },
      {
        title: "Get a marriage certificate",
        href: "/get-marriage-certificate",
        description: "Order a copy of a marriage certificate.",
      },
      {
        title: "Marriage licences",
        href: "/marriage-licences",
        description: "Apply for a marriage licence.",
      },
      {
        title: "Get a document notarised",
        href: "/get-a-document-notarised",
        description: "How to get a document notarised in Barbados.",
      },
      {
        title: "Loud music permit",
        href: "/loud-music-permit",
        description: "Apply for a loud music permit.",
      },
      {
        title: "Sell goods or services in a beach park",
        href: "/sell-goods-services-beach-park",
        description: "Apply to sell at a beach park.",
      },
      {
        title: "Post Office redirection (individual)",
        href: "/post-office-redirection-individual",
        description: "Redirect mail for an individual.",
      },
      {
        title: "Post Office redirection (business)",
        href: "/post-office-redirection-business",
        description: "Redirect mail for a business.",
      },
      {
        title: "Post Office redirection (deceased)",
        href: "/post-office-redirection-deceased",
        description: "Redirect mail for a deceased person.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "homeaffairs@mha.gov.bb" },
      { label: "Email", type: "email", value: "haffairs@mha.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-7260" },
      { label: "Fax", type: "phone", value: "(246) 535-7286" },
      {
        label: "Address",
        value:
          "Ground Floor Jones Building, Webster Business Park, Wildey, St. Michael, Barbados, W.I.",
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/home-affairs",
    associatedDepartments: [
      {
        category: "Home Affairs",
        items: [
          "The Department of Emergency Management",
          "The Meteorological Office",
          "The Fire Service Department",
          "The Post Office",
          "The Probation Department",
          "The Immigration Department",
          "The Government Industrial Schools",
          "Barbados Prison Service",
          "The National Council on Substance Abuse",
        ],
      },
      {
        category: "Information and Public Affairs",
        items: [
          "Caribbean Broadcasting Corporation",
          "The Government Information Service",
          "The Government Printing Department",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-housing-lands-and-maintenance",
    name: "Ministry of Housing, Lands and Maintenance",
    category: "ministerial",
    shortDescription:
      "Affordable housing solutions, state lands management, and infrastructure maintenance.",
    intro:
      "To provide affordable housing solutions and manage state lands and government infrastructure maintenance.",
    minister: {
      name: "The Hon. Christopher D. L. Gibbs, M.P.",
      role: "Minister of Housing, Lands and Maintenance",
    },
    contact: [
      { label: "Email", type: "email", value: "pshousing@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 536-5000" },
      {
        label: "Address",
        value: [
          "National Housing Corporation",
          "Country Road",
          "St. Michael",
          "Barbados, W.I",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/housing",
    associatedDepartments: [
      { category: "Housing", items: ["The National Housing Corporation"] },
      {
        category: "Lands",
        items: [
          "The Land Registration Department",
          "The Lands and Surveys Department",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-industry-innovation-science-and-technology",
    name: "Ministry of Industry, Innovation, Science and Technology",
    category: "ministerial",
    shortDescription:
      "Digital transformation of the public service and a culture of innovation.",
    intro:
      "To drive the digital transformation of the public service and foster a culture of innovation and scientific advancement.",
    minister: {
      name: "Senator The Hon. Jonathan W. D. Reid",
      role: "Minister of Innovation, Industry, Science and Technology",
    },
    onlineServices: [
      {
        title: "Start a business",
        href: "/start-a-business",
        description: "How to start a business in Barbados.",
      },
      {
        title: "Register a business name",
        href: "/registering-a-business-name",
        description:
          "Register a new business name with the Corporate Affairs Office.",
      },
      {
        title: "Business policies and law",
        href: "/business-policies-and-law",
        description: "Policy and legal framework for businesses.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "psmist@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1200" },
      { label: "Fax", type: "phone", value: "(246) 535-1284" },
      {
        label: "Address",
        value: ["3rd and 4th Floor Baobab Tower", "Warrens", "St. Michael"],
      },
    ],
    originalSource:
      "https://www.gov.bb/Ministries/innovation-science-smart-technology",
    associatedDepartments: [
      {
        items: [
          "Corporate Services",
          "Technical Management",
          "Customer Support",
          "Data Protection Commission",
          "Legal Unit",
          "Programme Execution Unit",
        ],
      },
      { category: "Industry", items: ["Industry Unit"] },
      {
        category: "Innovation, Science and Technology",
        items: [
          "Science, Market Research and Innovation",
          "Digital Infrastructure",
          "Digital Solutions",
          "Efficiency Unit",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-labour-social-security-and-third-sector",
    name: "Ministry of Labour, Social Security and Third Sector",
    category: "ministerial",
    shortDescription:
      "Industrial harmony, worker rights, and the national social security net.",
    intro:
      "To facilitate industrial harmony, protect worker rights, and manage the national social security net.",
    minister: {
      name: "The Hon. Colin E. Jordan, M.P.",
      role: "Minister of Labour, Social Security and The Third Sector",
    },
    onlineServices: [
      {
        title: "Jobseekers",
        href: "/jobseekers",
        description: "Information and support for jobseekers.",
      },
      {
        title: "Apply to JobStart Plus Programme",
        href: "/apply-to-jobstart-plus-programme",
        description: "Apply to the JobStart Plus employment programme.",
      },
      {
        title: "Apply to be a Project Protégé Mentor",
        href: "/apply-to-be-a-project-protege-mentor",
        description: "Apply to mentor through Project Protégé.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "ps@labour.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1400" },
      { label: "Fax", type: "phone", value: "(246) 425-0266" },
      { label: "Website", type: "website", value: "https://labour.gov.bb/" },
      {
        label: "Address",
        value: [
          "3rd Floor West Wing",
          "Warrens Office Complex",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/labour-social-security",
    associatedDepartments: [
      { category: "Labour", items: ["The Labour Department"] },
      { category: "Social Security", items: ["National Insurance Department"] },
    ],
  },
  {
    slug: "ministry-of-people-empowerment-and-elder-affairs",
    name: "Ministry of People Empowerment and Elder Affairs",
    category: "ministerial",
    shortDescription:
      "Safety net for the vulnerable and inclusion of the elderly and persons with disabilities.",
    intro:
      "To provide a safety net for the vulnerable and ensure the inclusion of the elderly and persons with disabilities.",
    minister: {
      name: "The Hon. Adrian R. Forde, M.P.",
      role: "Minister of People Empowerment and Elder Affairs",
    },
    onlineServices: [
      {
        title: "Apply for financial assistance",
        href: "/apply-financial-assistance",
        description: "Government financial assistance for individuals.",
      },
      {
        title: "Welfare Department",
        href: "/welfare-department",
        description: "Information about the Welfare Department.",
      },
      {
        title: "Report elderly abuse",
        href: "/report-elderly-abuse",
        description: "Report suspected abuse of an elderly person.",
      },
      {
        title: "Report a concern about a child",
        href: "/report-a-concern-about-a-child",
        description: "Report concerns about a child's safety or welfare.",
      },
      {
        title: "Get support for a victim of domestic abuse",
        href: "/get-support-for-a-victim-of-domestic-abuse",
        description: "Support services for victims of domestic abuse.",
      },
      {
        title: "Get disaster relief assistance",
        href: "/get-disaster-relief-assistance",
        description: "Apply for disaster relief assistance.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "socialcare@barbados.gov.bb" },
      { label: "Email", type: "email", value: "ps.people@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-1600" },
      { label: "Telephone", type: "phone", value: "(246) 535-1601" },
      { label: "Telephone", type: "phone", value: "(246) 535-1602" },
      { label: "Telephone", type: "phone", value: "(246) 535-1603" },
      { label: "Fax", type: "phone", value: "(246) 535-1694" },
      { label: "Fax", type: "phone", value: "(246) 535-1693" },
      {
        label: "Website",
        type: "website",
        value: "http://www.socialcare.gov.bb/",
      },
      {
        label: "Address",
        value: [
          "4th Floor Warrens Office Complex",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/social-care",
    associatedDepartments: [
      {
        items: [
          "[The National Assistance Board",
          "Poverty Alleviation Bureau",
          "The Child Care Board",
          "Bureau of Social Policy, Research and Planning",
          "Bureau of Gender Affairs",
          "Welfare Department",
          "National Disabilities Unit",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-the-public-service-and-talent-development",
    name: "Ministry of the Public Service and Talent Development",
    category: "ministerial",
    shortDescription:
      "Strategic management of the human resource function across the public service.",
    intro:
      "Responsible for the strategic management of the human resource function across the Government of Barbados, including recruitment, selection, placement, promotion, discipline, retirement, and the training and development of public officers.",
    contact: [
      { label: "Email", type: "email", value: "dg@mps.gov.bb" },
      { label: "Email", type: "email", value: "HRPS@mps.gov.bb" },
      { label: "Email", type: "email", value: "PRC@mps.gov.bb" },
      { label: "Email", type: "email", value: "LD@mps.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-4423" },
      { label: "Fax", type: "phone", value: "(246) 535-6728" },
      { label: "Website", type: "website", value: "https://mps.gov.bb" },
      {
        label: "Address",
        value:
          "E. Humphrey Walcott Building, Cnr. Collymore Rock and Culloden Road, St. Michael",
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/public-service",
    associatedDepartments: [
      {
        items: [
          "Directorate, Human Resource Policy and Staffing",
          "Directorate, Learning and Development",
          "Directorate, People Resourcing and Compliance",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-tourism-and-international-transport",
    name: "Ministry of Tourism and International Transport",
    category: "ministerial",
    shortDescription:
      "Sustainable tourism development and oversight of civil aviation and ports.",
    intro:
      "To make Barbados the number one Caribbean destination through sustainable tourism development.",
    minister: {
      name: "The Hon. G. P. Ian Gooding-Edghill, J.P., M.P.",
      role: "Minister of Tourism and International Transport",
    },
    onlineServices: [
      {
        title: "Visa information",
        href: "/visa-information",
        description: "Visa requirements for visiting Barbados.",
      },
      {
        title: "Visitor permit application",
        href: "/visitor-permit-application",
        description: "Apply to extend your stay in Barbados.",
      },
      {
        title: "Ports of entry",
        href: "/ports-of-entry",
        description: "Information on Barbados ports of entry.",
      },
    ],
    contact: [
      { label: "Telephone", type: "phone", value: "(246) 535-7500" },
      { label: "Fax", type: "phone", value: "(246) 436-4828" },
      { label: "Fax", type: "phone", value: "(246) 535-3342" },
      {
        label: "Address",
        value: [
          "Lloyd Erskine Sandiford Center",
          "Two Mile Hill",
          "St. Michael",
          "Barbados, W.I.",
          "8th Floor Baobab Tower",
          "Warrens",
          "St. Michael",
          "Barbados, W.I.",
        ],
      },
    ],
    originalSource: "https://www.gov.bb/Ministries/tourism",
    associatedDepartments: [
      {
        category: "Tourism",
        items: [
          "Barbados Tourism Marketing Inc. (BTMI)",
          "The Barbados Conference Services Limited (BCSL)",
          "Caves of Barbados Limited (CBL)",
        ],
      },
      {
        category: "International Transport",
        items: [
          "Barbados Civil Aviation Department (BCAD)",
          "Grantley Adams International Airport Inc. (GAIA)",
        ],
      },
      { category: "Port Management", items: ["Barbados Port Inc."] },
    ],
  },
  {
    slug: "ministry-of-training-and-tertiary-education",
    name: "Ministry of Training and Tertiary Education",
    category: "ministerial",
    minister: {
      name: "The Hon. Cheryl S. V. Husbands, M.P.",
      role: "Minister of Technological and Vocational Training",
    },
    originalSource: "https://www.gov.bb/Ministries/training-tertiary-education",
    associatedDepartments: [
      {
        items: [
          "Barbados Community College",
          "The Samuel Jackman Prescod Institute of Technology",
          "University of the West Indies",
          "Erdiston Teachers' Training College",
          "Barbados Vocational Training Board",
          "Technical & Vocational Education and Training Council",
          "The Barbados Accreditation Council",
        ],
      },
    ],
  },
  {
    slug: "ministry-of-transport-works-and-water-resources",
    name: "Ministry of Transport, Works and Water Resources",
    category: "ministerial",
    shortDescription:
      "Safe and efficient road network, public transport, and water resources.",
    intro:
      "To provide a safe and efficient road network, public transportation system, and management of water resources.",
    minister: {
      name: "The Hon. Kirk D. M. Humphrey, M.P.",
      role: "Minister of Transport and Works, and Senior Minister coordinating Infrastructure",
    },
    onlineServices: [
      {
        title: "Apply for a driver's licence",
        href: "/apply-for-a-drivers-licence",
        description: "Apply for or renew a Barbados driver's licence.",
      },
      {
        title: "Apply for a conductor licence",
        href: "/apply-for-conductor-licence",
        description: "Apply for a public service vehicle conductor licence.",
      },
      {
        title: "Getting around Barbados",
        href: "/getting-around-barbados",
        description: "Public transport and travel information.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "psmtwm@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 536-0000" },
      { label: "Fax", type: "phone", value: "(246) 536-8133" },
      { label: "Website", type: "website", value: "http://www.mtw.gov.bb" },
      {
        label: "Address",
        value: [
          "Pine East/West Boulevard",
          "The Pine",
          "St. Michael",
          "Barbados, W. I",
        ],
      },
    ],
    originalSource:
      "https://www.gov.bb/Ministries/transport-works-water-resources",
    associatedDepartments: [
      {
        category: "Transport",
        items: ["Barbados Licensing Authority", "Transport Board"],
      },
      { category: "Works", items: ["Electrical Engineering Department"] },
      { category: "Water Resources", items: ["Barbados Water Authority"] },
    ],
  },
  {
    slug: "ministry-of-youth-sports-and-community-empowerment",
    name: "Ministry of Youth, Sports and Community Empowerment",
    category: "ministerial",
    minister: {
      name: "The Hon. Charles McD. Griffith, M.P.",
      role: "Minister of Sports and Community Empowerment",
    },
    onlineServices: [
      {
        title: "Apply to the Barbados YouthAdvance Corps",
        href: "/apply-to-the-barbados-youthadvance-corps",
        description: "Apply to join the YouthAdvance Corps.",
      },
      {
        title: "Apply to volunteer at a sports camp",
        href: "/apply-to-volunteer-at-a-sports-camp",
        description: "Volunteer at a sports camp.",
      },
      {
        title: "Register for community sports training programme",
        href: "/register-for-community-sports-training-programme",
        description: "Register for the community sports training programme.",
      },
      {
        title: "Register for a summer camp",
        href: "/register-summer-camp",
        description: "Register for a government summer camp.",
      },
    ],
    contact: [
      { label: "Email", type: "email", value: "ps.mysce@barbados.gov.bb" },
      { label: "Telephone", type: "phone", value: "(246) 535-3835" },
      { label: "Address", value: "Sky Mall, Haggatt Hall, St. Michael" },
    ],
    originalSource: "https://www.gov.bb/Ministries/culture-sports-youth",
    associatedDepartments: [
      {
        category: "Youth Affairs",
        items: ["Division of Youth Affairs", "Youth Entrepreneurship Scheme"],
      },
      { category: "Sports", items: ["The National Sports Council"] },
      {
        category: "Community Empowerment",
        items: ["Community Development Department"],
      },
    ],
  },
];
export const getMinistryBySlug = (slug: string): Ministry | undefined =>
  MINISTRIES.find((m) => m.slug === slug);

export const getMinistriesByCategory = (
  category: MinistryCategory
): Ministry[] =>
  MINISTRIES.filter((m) => m.category === category).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
