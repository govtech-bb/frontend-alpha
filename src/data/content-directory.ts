import type { InformationContent } from "@/types/content";

export const INFORMATION_ARCHITECTURE: InformationContent[] = [
  {
    title: "Family, birth and relationships",
    slug: "family-birth-relationships",
    description:
      "Managing key life events and family responsibilities, from registering a birth to caring for others",
    pages: [
      {
        title: "Register a birth",
        slug: "register-a-birth",
        source_url: "",
        description:
          "Information on how to register a birth in Barbados, including who can register, the required documents, and any associated fees.",
        subPages: [
          { slug: "start", type: "markdown" },
          { slug: "form", title: "Register a Birth form", type: "component" },
        ],
      },
      {
        title: "Get a copy of a birth certificate",
        slug: "get-birth-certificate",
        source_url: "",
        description:
          "Information on how to obtain a birth certificate in Barbados, including required documents and contact details for the Registration Department.",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Get a Birth Certificate form",
            type: "component",
          },
        ],
      },
      {
        title: "Get a copy of a death certificate",
        slug: "get-death-certificate",
        source_url: "",
        description:
          "Information on how to obtain a copy of a death certificate in Barbados.",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Get a Death Certificate form",
            type: "component",
          },
        ],
      },
      {
        title: "Get a copy of a marriage certificate",
        slug: "get-marriage-certificate",
        source_url: "",
        description:
          "Information on how to obtain a copy of a marriage certificate in Barbados.",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Get a Marriage Certificate form",
            type: "component",
          },
        ],
      },
      {
        title: "Register a death",
        slug: "register-a-death",
        source_url: "https://www.gov.bb/Citizens/register-death",
        description:
          "Information on how to register a death and obtain a death certificate in Barbados.",
      },
      {
        title: "Register a marriage",
        slug: "register-a-marriage",
        source_url: "https://www.gov.bb/Citizens/register-marriage",
        description:
          "Information on how to register a marriage certificate in Barbados, including required documents and contact details for the Registration Department.",
      },
      {
        title: "Marriage licences",
        slug: "marriage-licences",
        source_url: "https://www.gov.bb/Citizens/marriage-licence",
        description:
          "Information on the requirements and procedures for obtaining a marriage license in Barbados.",
      },
      {
        title: "Apply for a place at a day nursery",
        slug: "apply-for-a-place-at-a-day-nursery",
        source_url: "",
        description: "",
      },
    ],
  },
  {
    title: "Work and employment",
    slug: "work-employment",
    description: "Find a job, develop skills, or manage employment changes",
    pages: [
      {
        title: "Jobseekers",
        slug: "jobseekers",
        source_url: "https://www.gov.bb/Citizens/job-seekers",
        description:
          "Information on overseas and public sector employment opportunities in Barbados.",
      },
      {
        title: "Apply to be a Project Protégé mentor",
        slug: "apply-to-be-a-project-protege-mentor",
        description: "Apply to be a Project Protégé mentor",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Apply to be a Project Protégé mentor",
            type: "component",
          },
        ],
      },
      {
        title: "Apply to the Barbados YouthADVANCE Corps (BYAC)",
        slug: "apply-to-the-barbados-youthadvance-corps",
        description: "Apply to the Barbados YouthADVANCE Corps (BYAC)",
      },
      {
        title:
          "Register for a Youth Development Programme (YDP) Community Sports Training programme",
        slug: "register-for-community-sports-training-programme",
        description:
          "Register for a Youth Development Programme (YDP) Community Sports Training programme",
        subPages: [
          { slug: "start", type: "markdown", protected: true },
          {
            slug: "form",
            title: "Register for Training Form",
            type: "component",
            protected: true,
          },
        ],
      },
      {
        title: "Register for a summer camp",
        slug: "register-summer-camp",
        description: "Register for a summer camp",
      },
      {
        title: "Apply to volunteer at a sports camp",
        slug: "apply-to-volunteer-at-a-sports-camp",
        description: "Apply to volunteer at a sports camp",
      },
      {
        title: "Apply for a position as a temporary teacher",
        slug: "apply-for-a-position-as-a-temporary-teacher",
        description: "Apply for a position as a temporary teacher",
      },
      {
        title: "Apply to the JobSTART Plus programme",
        slug: "apply-to-jobstart-plus-programme",
        description: "Apply to the JobSTART Plus Programme",
        subPages: [
          { slug: "start", type: "markdown", protected: true },
          {
            slug: "form",
            title: "Registering for JobStart Plus",
            type: "component",
            protected: true,
          },
        ],
      },
      {
        title: "Apply for conductor licence",
        slug: "apply-for-conductor-licence",
        description: "",
        subPages: [
          { slug: "start", type: "markdown", protected: true },
          {
            slug: "form",
            title: "Conductor Licence Application",
            type: "component",
            protected: true,
          },
        ],
      },
      {
        title:
          "Apply for the Rausing Public Service Fellowship for Barbados (2026–2027)",
        slug: "rausing-public-service-fellowship",
        description:
          "Apply for the Rausing Public Service Fellowship for Barbados (2026–2027)",
        subPages: [
          { slug: "start", type: "markdown", protected: true },
          {
            slug: "form",
            title:
              "Apply for the Rausing Public Service Fellowship for Barbados (2026–2027)",
            type: "component",
            protected: true,
          },
        ],
      },
    ],
  },
  {
    title: "Money and financial support",
    slug: "money-financial-support",
    description: "Get help with money, benefits, taxes or government payments",
    pages: [
      {
        title: "Apply for financial assistance",
        slug: "apply-financial-assistance",
        description: "Apply for financial assistance",
      },
      {
        title: "EZPay",
        slug: "ezpay",
        source_url: "https://www.gov.bb/Citizens/ezpay",
        description:
          "EZpay+ is the Government of Barbados' payments platform for various government services, offering multiple payment options.",
      },
      {
        title: "Tax online",
        slug: "tax-online",
        source_url: "https://www.gov.bb/Citizens/tax-online",
        description:
          "TAMIS is an electronic platform that allows you to manage your taxes online, with features for viewing account information, filing returns, viewing statements, making online payments, and submitting inquiries.",
      },
      {
        title: "Get disaster relief assistance",
        slug: "get-disaster-relief-assistance",
        source_url: "",
        description:
          "Information on how to apply for disaster relief assistance in Barbados, including eligibility criteria and required documentation.",
      },
      {
        title: "Get a Primary School Textbook Grant",
        slug: "get-a-primary-school-textbook-grant",
        source_url: "",
        description:
          "Each year, every child is entitled to a BDS $100 textbook grant while they are a student at a public or private primary school.",
        subPages: [
          { slug: "start", type: "markdown", protected: true },
          {
            slug: "form",
            title: "Get a Primary School Textbook Grant",
            type: "component",
            protected: true,
          },
        ],
      },
    ],
  },
  // {
  //   title: "Education, youth and learning",
  //   slug: "education-youth-learning",
  //   description: "Apply for or manage education and youth opportunities",
  //   pages: [],
  // },
  {
    title: "Travel, ID and citizenship",
    slug: "travel-id-citizenship",
    description: "Travel, drive or prove your identity and status",
    pages: [
      {
        title: "Apply for a passport",
        slug: "apply-for-a-passport",
        source_url: "https://www.gov.bb/Citizens/apply-passport",
        description:
          "Information on how to apply for a passport in Barbados, including forms, fees, and the collection process.",
      },
      {
        title: "Visa information",
        slug: "visa-information",
        source_url: "https://www.gov.bb/Visit-Barbados/visa-information",
        description:
          "Information on visa requirements for visiting Barbados, including contact details for the Immigration Department.",
      },
      {
        title: "Visitor permit application",
        slug: "visitor-permit-application",
        source_url:
          "https://www.gov.bb/Visit-Barbados/visitorpermitapplication",
        description:
          "Apply for a visitor's permit online to drive on the roads of Barbados, with options for under or over 2 months stay.",
      },
      {
        title: "Medical requirements",
        slug: "medical-requirements",
        source_url: "https://www.gov.bb/Visit-Barbados/medical-requirements",
        description:
          "Information on the medical requirements for visiting or immigrating to Barbados, including details on mandatory medical examinations.",
      },
      {
        title: "Apply for a driver’s licence",
        slug: "apply-for-a-drivers-licence",
        source_url: "https://www.gov.bb/Citizens/driver-licence",
        description:
          "Information on how to obtain a driver's license in Barbados, including learner's permits, regulations tests, driving tests, and international licenses.",
      },
      {
        title: "National registration",
        slug: "national-registration",
        source_url: "https://www.gov.bb/Citizens/national-registration",
        description:
          "Information on how to register as a citizen of Barbados or a non-citizen resident, and obtain a Barbados Identification (ID) card.",
      },
      {
        title: "Getting around Barbados",
        slug: "getting-around-barbados",
        source_url: "https://www.gov.bb/Visit-Barbados/getting-around-barbados",
        description:
          "Information on transportation options and obtaining a driver's permit for visitors in Barbados.",
      },
      {
        title: "Local information",
        slug: "local-information",
        source_url: "https://www.gov.bb/Visit-Barbados/local-information",
        description:
          "General information for visitors to Barbados, including its rank as a top Caribbean travel destination.",
      },
      {
        title: "Ports of Entry",
        slug: "ports-of-entry",
        source_url: "https://www.gov.bb/Visit-Barbados/ports-of-entry",
        description:
          "Information on the various ports of entry into Barbados, including the Bridgetown Port, Grantley Adams International Airport, and Port Saint Charles.",
      },
      {
        title: "Get a document notarised",
        slug: "get-a-document-notarised",
        source_url: "https://www.gov.bb/Citizens/notarize-document",
        description:
          "Information on how to get a document notarised in Barbados, including the role of Notary Publics and contact details.",
      },
      {
        title: "Redirect My Mail (Individual)",
        slug: "post-office-redirection-individual",
        description: "Redirect mail for an individual",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Redirect My Mail (Individual) form",
            type: "component",
          },
        ],
      },
      {
        title: "Redirect My Mail (Deceased)",
        slug: "post-office-redirection-deceased",
        description: "Redirect mail for a deceased person",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Redirect My Mail (Deceased) form",
            type: "component",
          },
        ],
      },
      {
        title: "Redirect My Mail (Business)",
        slug: "post-office-redirection-business",
        description: "Redirect mail for a Business",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Redirect My Mail (Business) form",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    title: "Business and trade",
    slug: "business-trade",
    description:
      "Start, manage or grow a business, and understand legal and tax obligations",
    pages: [
      {
        title: "Start a business",
        slug: "start-a-business",
        source_url: "https://www.gov.bb/Business/start-business",
        description:
          "Information from Invest Barbados to facilitate starting or expanding business operations in Barbados.",
      },
      {
        title: "Registering a business name",
        slug: "registering-a-business-name",
        source_url: "https://www.gov.bb/Business/registering-business-name",
        description:
          "Information on registering a business name in Barbados, including requirements and procedures, with a link to the CAIPO website for more details.",
      },
      {
        title: "Business policies and law",
        slug: "business-policies-and-law",
        source_url: "https://www.gov.bb/Business/policies-laws",
        description:
          "Information on Labour Laws and Regulations in Barbados, including the Ministry of Labour's role in promoting decent work and workforce development.",
      },
      {
        title: "Financial services for businesses",
        slug: "financial-services-for-businesses",
        source_url:
          "https://www.gov.bb/State-Bodies/financial-services-commission",
        description:
          "The Financial Services Commission supervises and regulates non-bank financial institutions in Barbados under various Acts of Parliament, providing contact information and a link to their official website.",
      },
      {
        title: "Government requirements",
        slug: "government-requirements",
        source_url: "https://www.gov.bb/Business/government-requirements",
        description:
          "Information on the government requirements for businesses operating in Barbados, particularly International Financial Services Companies (IFSCs).",
      },
      {
        title: "Information about business tax",
        slug: "information-about-business-tax",
        source_url: "https://www.gov.bb/tax-information",
        description:
          "Information on corporation tax in Barbados, including rates, allowances, and loss considerations.",
      },
      {
        title: "Get a permit to play loud music",
        slug: "loud-music-permit",
        source_url: "",
        description: "",
      },
      {
        title:
          "Apply for a licence to sell goods or services at a beach or park",
        slug: "apply-for-a-licence-to-sell-goods-or-services-at-a-beach-or-park",
        source_url: "",
        description:
          "Apply for a licence to sell goods or services at a beach or park",
        subPages: [{ slug: "start", type: "markdown" }],
      },
      {
        title: "Request for name search and name reservation",
        slug: "reserve-society-name",
        description: "Request for name search and name reservation",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Request to reserve a society name form",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    title: "Public safety",
    slug: "public-safety",
    description: "Reporting crime, raising a concern and safeguarding",
    pages: [
      {
        title: "Request a fire service inspection",
        slug: "request-a-fire-service-inspection",
        description:
          "Request an inspection from the Barbados Fire Service for hotels, daycares, and places of entertainment.",
        subPages: [
          { slug: "start", type: "markdown", protected: true },
          {
            slug: "form",
            title: "Request a Fire Service Inspection form",
            type: "component",
            protected: true,
          },
        ],
      },
      {
        title: "Report a concern about a child",
        slug: "report-a-concern-about-a-child",
        source_url: "",
        description: "",
      },
      {
        title: "Report elderly abuse",
        slug: "report-elderly-abuse",
        source_url: "",
        description: "",
      },
      {
        title: "Get support for a victim of domestic abuse",
        slug: "get-support-for-a-victim-of-domestic-abuse",
        source_url: "",
        description: "",
      },
    ],
  },
];

export const INFORMATION_SECTIONS = [
  {
    title: "Paying corporation tax",
    link: "https://www.gov.bb/tax-information",
    description:
      "Find out how company tax is worked out, including what income is taxed and the rates that apply",
  },
  {
    title: "Finding a job",
    link: "https://www.gov.bb/job-seekers",
    description:
      "Get help with applying for jobs, preparing for interviews, and exploring public and overseas opportunities",
  },
];
