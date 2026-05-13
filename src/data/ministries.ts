import type { ReactNode } from "react";

import type {
  ContactItem,
  FeaturedItem,
  Minister,
  MinistryService,
} from "@/components/ministry/ministry-page";

export type MinistryCategory = "ministerial" | "non-ministerial" | "agency";

export type Ministry = {
  slug: string;
  name: string;
  category: MinistryCategory;
  shortDescription?: string;
  intro: ReactNode;
  heroImage?: string;
  heroImageAlt?: string;
  featured?: FeaturedItem[];
  services?: MinistryService[];
  onlineServices?: MinistryService[];
  minister?: Minister;
  contact?: ContactItem[];
};

const PLACEHOLDER_HERO =
  "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=70";

const PLACEHOLDER_INTRO =
  "Page content coming soon. This page is in alpha and is being developed.";

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
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Mia Amor Mottley, S.C., M.P.",
      role: "Prime Minister, Minister of Economic Affairs and Development, and Minister of National Security",
      slug: "mia-amor-mottley",
    },
  },
  {
    slug: "office-of-the-attorney-general",
    name: "Office of the Attorney General",
    category: "ministerial",
    intro: PLACEHOLDER_INTRO,
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Wilfred A. Abrahams, S.C., M.P.",
      role: "Attorney-General and Senior Minister coordinating Governance Policy",
      slug: "wilfred-abrahams",
    },
  },
  {
    slug: "cabinet-office",
    name: "Cabinet Office",
    category: "ministerial",
    intro: PLACEHOLDER_INTRO,
  },
  {
    slug: "ministry-of-agriculture-and-food-and-nutritional-security",
    name: "Ministry of Agriculture and Food and Nutritional Security",
    category: "ministerial",
    shortDescription:
      "National food security and a modern, competitive agricultural sector.",
    intro:
      "To ensure national food security and promote a modern, competitive agricultural sector.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Shantal M. Munro-Knight, Ph.D.",
      role: "Minister of Agriculture, Food and Nutritional Security",
      slug: "shantal-munro-knight",
    },
  },
  {
    slug: "ministry-of-educational-transformation",
    name: "Ministry of Educational Transformation",
    category: "ministerial",
    shortDescription:
      "Transforms primary and secondary education to foster lifelong learning.",
    intro:
      "To create a world-class education system that fosters lifelong learning and skill development.",
    heroImage: PLACEHOLDER_HERO,
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
  },
  {
    slug: "ministry-of-energy-and-business-development",
    name: "Ministry of Energy and Business Development",
    category: "ministerial",
    intro: PLACEHOLDER_INTRO,
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Kerrie D. Symmonds, M.P.",
      role: "Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector",
      slug: "kerrie-symmonds",
    },
  },
  {
    slug: "ministry-of-environment-and-national-beautification",
    name: "Ministry of Environment and National Beautification",
    category: "ministerial",
    shortDescription:
      "Environmental protection, sustainable practices, and national aesthetics.",
    intro:
      "To protect the natural environment, promote sustainable practices, and enhance national aesthetics.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Santia J. O. Bradshaw, M.P.",
      role: "Deputy Prime Minister, Minister of Environment, National Beautification and Fisheries, and Leader of Government Business in the House of Assembly",
      slug: "santia-bradshaw",
    },
  },
  {
    slug: "ministry-of-finance-economic-affairs-and-investment",
    name: "Ministry of Finance, Economic Affairs and Investment",
    category: "ministerial",
    shortDescription:
      "Manages the country's financial resources and leads economic growth through prudent fiscal policy.",
    intro:
      "To manage the country's financial resources and spearhead economic growth through prudent fiscal policy.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Ryan R. Straughn, M.P.",
      role: "Minister of Finance",
      slug: "ryan-straughn",
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
  },
  {
    slug: "ministry-of-foreign-affairs-and-foreign-trade",
    name: "Ministry of Foreign Affairs and Foreign Trade",
    category: "ministerial",
    shortDescription:
      "Advances Barbados' interests globally through diplomacy, trade advocacy, and protection of citizens abroad.",
    intro:
      "To advance Barbados' interests globally through diplomacy, trade advocacy, and the protection of citizens abroad.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "Senator The Hon. Christopher P. Sinckler",
      role: "Senior Minister of Foreign Affairs and Foreign Trade",
      slug: "christopher-sinckler",
    },
    onlineServices: [
      {
        title: "Visa information",
        href: "/visa-information",
        description: "Visa requirements for visiting Barbados.",
      },
    ],
  },
  {
    slug: "ministry-of-health-and-wellness",
    name: "Ministry of Health and Wellness",
    category: "ministerial",
    shortDescription:
      "Provides quality, equitable, and accessible health care services to all Barbadians.",
    intro:
      "To provide quality, equitable, and accessible health care services to all Barbadians.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Davidson I. Ishmael, M.P.",
      role: "Minister of State, Ministry of Health and Wellness",
      slug: "davidson-ishmael",
    },
    onlineServices: [
      {
        title: "Medical requirements",
        href: "/medical-requirements",
        description: "Medical requirements for entering or living in Barbados.",
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
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Gregory P. B. Nicholls, M.P.",
      role: "Minister of Home Affairs and Information",
      slug: "gregory-nicholls",
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
  },
  {
    slug: "ministry-of-housing-lands-and-maintenance",
    name: "Ministry of Housing, Lands and Maintenance",
    category: "ministerial",
    shortDescription:
      "Affordable housing solutions, state lands management, and infrastructure maintenance.",
    intro:
      "To provide affordable housing solutions and manage state lands and government infrastructure maintenance.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Christopher D. L. Gibbs, M.P.",
      role: "Minister of Housing, Lands and Maintenance",
      slug: "christopher-gibbs",
    },
  },
  {
    slug: "ministry-of-industry-innovation-science-and-technology",
    name: "Ministry of Industry, Innovation, Science and Technology",
    category: "ministerial",
    shortDescription:
      "Digital transformation of the public service and a culture of innovation.",
    intro:
      "To drive the digital transformation of the public service and foster a culture of innovation and scientific advancement.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "Senator The Hon. Jonathan W. D. Reid",
      role: "Minister of Innovation, Industry, Science and Technology",
      slug: "jonathan-reid",
    },
    contact: [
      {
        label: "Address",
        value: "3rd and 4th Floor, Baobab Tower, Warrens, St. Michael",
      },
      { label: "Telephone", type: "phone", value: "(246) 535-1201" },
      { label: "Fax", type: "phone", value: "(246) 535-1284" },
    ],
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
  },
  {
    slug: "ministry-of-labour-social-security-and-third-sector",
    name: "Ministry of Labour, Social Security and Third Sector",
    category: "ministerial",
    shortDescription:
      "Industrial harmony, worker rights, and the national social security net.",
    intro:
      "To facilitate industrial harmony, protect worker rights, and manage the national social security net.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Colin E. Jordan, M.P.",
      role: "Minister of Labour, Social Security and The Third Sector",
      slug: "colin-jordan",
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
  },
  {
    slug: "ministry-of-people-empowerment-and-elder-affairs",
    name: "Ministry of People Empowerment and Elder Affairs",
    category: "ministerial",
    shortDescription:
      "Safety net for the vulnerable and inclusion of the elderly and persons with disabilities.",
    intro:
      "To provide a safety net for the vulnerable and ensure the inclusion of the elderly and persons with disabilities.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Adrian R. Forde, M.P.",
      role: "Minister of People Empowerment and Elder Affairs",
      slug: "adrian-forde",
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
  },
  {
    slug: "ministry-of-the-public-service-and-talent-development",
    name: "Ministry of the Public Service and Talent Development",
    category: "ministerial",
    shortDescription:
      "Strategic management of the human resource function across the public service.",
    intro:
      "Responsible for the strategic management of the human resource function across the Government of Barbados, including recruitment, selection, placement, promotion, discipline, retirement, and the training and development of public officers.",
    heroImage: PLACEHOLDER_HERO,
  },
  {
    slug: "ministry-of-tourism-and-international-transport",
    name: "Ministry of Tourism and International Transport",
    category: "ministerial",
    shortDescription:
      "Sustainable tourism development and oversight of civil aviation and ports.",
    intro:
      "To make Barbados the number one Caribbean destination through sustainable tourism development.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. G. P. Ian Gooding-Edghill, J.P., M.P.",
      role: "Minister of Tourism and International Transport",
      slug: "ian-gooding-edghill",
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
  },
  {
    slug: "ministry-of-training-and-tertiary-education",
    name: "Ministry of Training and Tertiary Education",
    category: "ministerial",
    intro: PLACEHOLDER_INTRO,
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Cheryl S. V. Husbands, M.P.",
      role: "Minister of Technological and Vocational Training",
      slug: "cheryl-husbands",
    },
  },
  {
    slug: "ministry-of-transport-works-and-water-resources",
    name: "Ministry of Transport, Works and Water Resources",
    category: "ministerial",
    shortDescription:
      "Safe and efficient road network, public transport, and water resources.",
    intro:
      "To provide a safe and efficient road network, public transportation system, and management of water resources.",
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Kirk D. M. Humphrey, M.P.",
      role: "Minister of Transport and Works, and Senior Minister coordinating Infrastructure",
      slug: "kirk-humphrey",
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
  },
  {
    slug: "ministry-of-youth-sports-and-community-empowerment",
    name: "Ministry of Youth, Sports and Community Empowerment",
    category: "ministerial",
    intro: PLACEHOLDER_INTRO,
    heroImage: PLACEHOLDER_HERO,
    minister: {
      name: "The Hon. Charles McD. Griffith, M.P.",
      role: "Minister of Sports and Community Empowerment",
      slug: "charles-griffith",
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
