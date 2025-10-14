import type { ServiceCategoryType } from "@/types/content";

export const SERVICE_CATEGORIES: ServiceCategoryType[] = [
  {
    title: "Family, birth and relationships",
    slug: "family-birth-relationships",
    description:
      "Managing key life events and family responsibilities, from registering a birth to caring for others",
    pages: [
      {
        title: "Register a birth",
        slug: "register-a-birth",
        source_url: "https://www.gov.bb/Citizens/register-birth",
        description:
          "Information on how to register a birth in Barbados, including who can register, the required documents, and any associated fees.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Marriage licences",
        slug: "marriage-licences",
        source_url: "https://www.gov.bb/Citizens/marriage-licence",
        description:
          "Information on the requirements and procedures for obtaining a marriage license in Barbados.",
        extraction_date: "2025-10-13",
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
        filename: "jobseekers.md",
        slug: "jobseekers",
        source_url: "https://www.gov.bb/Citizens/job-seekers",
        description:
          "Information on overseas and public sector employment opportunities in Barbados.",
        extraction_date: "2025-10-13",
      },
      {
        title: "EZPay",
        filename: "ezpay.md",
        slug: "ezpay",
        source_url: "https://www.gov.bb/Citizens/ezpay",
        description:
          "EZpay+ is the Government of Barbados' payments platform for various government services, offering multiple payment options.",
        extraction_date: "2025-10-13",
      },
    ],
  },
  {
    title: "Money and financial support",
    slug: "money-financial-support",
    description: "Get help with money, benefits, taxes or government payments",
    pages: [],
  },
  {
    title: "Education, youth and learning",
    slug: "education-youth-learning",
    description: "Apply for or manage education and youth opportunities",
    pages: [],
  },
  {
    title: "Travel, ID and Citizenship",
    slug: "travel-id-citizenship",
    description: "Travel, drive or prove your identity and status",
    pages: [
      {
        title: "Apply for a passport",
        filename: "apply-for-a-passport.md",
        slug: "apply-for-a-passport",
        source_url: "https://www.gov.bb/Citizens/apply-passport",
        description:
          "Information on how to apply for a passport in Barbados, including forms, fees, and the collection process.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Visa information",
        filename: "visa-information.md",
        slug: "visa-information",
        source_url: "https://www.gov.bb/Visit-Barbados/visa-information",
        description:
          "Information on visa requirements for visiting Barbados, including contact details for the Immigration Department.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Visitor permit application",
        filename: "visitor-permit-application.md",
        slug: "visitor-permit-application",
        source_url:
          "https://www.gov.bb/Visit-Barbados/visitorpermitapplication",
        description:
          "Apply for a visitor's permit online to drive on the roads of Barbados, with options for under or over 2 months stay.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Medical requirements",
        filename: "medical-requirements.md",
        slug: "medical-requirements",
        source_url: "https://www.gov.bb/Visit-Barbados/medical-requirements",
        description:
          "Information on the medical requirements for visiting or immigrating to Barbados, including details on mandatory medical examinations.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Apply for a driver’s license",
        filename: "apply-for-a-drivers-license.md",
        slug: "apply-for-a-drivers-license",
        source_url: "https://www.gov.bb/Citizens/driver-licence",
        description:
          "Information on how to obtain a driver's license in Barbados, including learner's permits, regulations tests, driving tests, and international licenses.",
        extraction_date: "2025-10-13",
      },
      {
        title: "National registration",
        filename: "national-registration.md",
        slug: "national-registration",
        source_url: "https://www.gov.bb/Citizens/national-registration",
        description:
          "Information on how to register as a citizen of Barbados or a non-citizen resident, and obtain a Barbados Identification (ID) card.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Getting around Barbados",
        filename: "getting-around-barbados.md",
        slug: "getting-around-barbados",
        source_url: "https://www.gov.bb/Visit-Barbados/getting-around-barbados",
        description:
          "Information on transportation options and obtaining a driver's permit for visitors in Barbados.",
        extraction_date: "2025-10-13",
      },
      {
        title: "Local information",
        filename: "local-information.md",
        slug: "local-information",
        source_url: "https://www.gov.bb/Visit-Barbados/local-information",
        description:
          "General information for visitors to Barbados, including its rank as a top Caribbean travel destination.",
        extraction_date: "2025-10-13",
      },
    ],
  },
  {
    title: "Community, culure and leisure",
    slug: "community-culture-leisure",
    description:
      "Take part in local and national life including volunteering, sport and culture",
    pages: [],
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
