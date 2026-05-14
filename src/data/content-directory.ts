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
        keywords: ["birth registration", "baby reg", "newborn"],
        source_url: "",
        description:
          "Information on how to register a birth in Barbados, including who can register, the required documents, and any associated fees.",
        subPages: [
          { slug: "start", type: "markdown" },
          // {
          //   slug: "form",
          //   title: "Register a Birth form",
          //   type: "component",
          // },
        ],
      },
      {
        title: "Get a copy of a birth certificate",
        slug: "get-birth-certificate",
        keywords: ["birth cert", "birth certificate", "BC"],
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
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Register for Training Form",
            type: "component",
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
        title: "Apply to the Job Start Plus programme",
        slug: "apply-to-jobstart-plus-programme",
        keywords: ["jobstart", "job start", "JSP"],
        description: "Apply to the Job Start Plus Programme",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Registering for JobStart Plus",
            type: "component",
          },
        ],
      },
      {
        title: "Apply for conductor licence",
        slug: "apply-for-conductor-licence",
        description: "",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Conductor Licence Application",
            type: "component",
          },
        ],
      },
      {
        title: "Check bank holiday dates",
        slug: "bank-holiday-calendar",
        keywords: [
          "bank holiday",
          "public holiday",
          "calendar",
          "bank holidays",
          "public holidays",
          "holidays",
        ],
        source_url: "",
        description:
          "Check statutory bank holiday dates for Barbados for any year, set out under the Public Holidays Act, Cap. 352, including substitution days where a holiday falls on a weekend.",
        type: "component",
        href: "/bank-holiday-calendar",
      },
    ],
    crossLinks: [
      {
        title: "Find out how much severance payment you are owed",
        href: "/money-financial-support/calculate-severance-pay",
      },
    ],
  },
  {
    title: "Money and financial support",
    slug: "money-financial-support",
    description: "Get help with money, benefits, taxes or government payments",
    pages: [
      {
        title: "Find out how much severance payment you are owed",
        slug: "calculate-severance-pay",
        keywords: ["severance", "severance pay", "redundancy", "layoff"],
        description:
          "Estimate the severance payment you may be owed under the Severance Payments Act if you were made redundant, your workplace was damaged by a disaster, you were laid off, or your employer died.",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Find out how much severance payment you are owed",
            type: "component",
          },
        ],
      },
      {
        title: "Apply for financial assistance",
        slug: "apply-financial-assistance",
        keywords: ["welfare", "benefits", "SSA", "poverty", "support"],
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
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Get a Primary School Textbook Grant",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    title: "Pensions and Gratuities",
    slug: "pensions-and-gratuities",
    description:
      "Estimate your public sector pension and find out about retirement ages and pensionable service",
    pages: [
      {
        title: "Calculate your pension",
        slug: "calculate-your-pension",
        description:
          "Estimate your public sector pension and gratuity (lump sum) based on your pensionable service and last annual salary.",
        subPages: [
          {
            slug: "form",
            title: "Pension calculator",
            type: "component",
          },
        ],
      },
    ],
  },
  {
    title: "Youth and Community Programmes",
    slug: "youth-and-community",
    description:
      "Programmes, training, workshops and volunteering opportunities for young people in Barbados",
    pages: [
      {
        title: "Youth development and leadership",
        slug: "youth-development-leadership",
        description:
          "Long-term training, mentorship and leadership pathways for young people.",
        pages: [
          {
            title: "Apply to the Barbados Youth Advance Corps",
            slug: "byac",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/barbados-youthadvance-corps-2/",
            description:
              "Two-year developmental training. Year 1: 10 weeks residential technical/vocational training. Year 2: job attachments, apprenticeships, internships, community service.",
          },
          {
            title: "Join the Youth Development Programme",
            slug: "ydp",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/youth-development-programme/",
            description:
              "Programming channel of the Division of Youth Affairs to engage and empower youth across communities through initiatives like Bridge to the Future, YAR, Web Design for Entrepreneurs, Cyber Security Training, and Bright Sparks.",
          },
          {
            title: "Apply for the Pathways Employability Programme",
            slug: "pathways",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/pathways/",
            description:
              "Job attachment and mentorship programme for unemployed youth not in full-time education. Life and job skills, work ethic, and psycho-social support from social workers and counsellors.",
          },
          {
            title: "Join Bright Sparks Educational Project 2.0",
            slug: "bright-sparks-2",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/youth-development-programme/",
            description:
              "Educational project under the Youth Development Programme.",
          },
          {
            title: "Register for the Bridge to the Future Workshop",
            slug: "bridge-to-future-2025",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/youth-development-programme/",
            description:
              "Career and skills workshop under the Youth Development Programme.",
          },
        ],
      },
      {
        title: "Skills, trades and vocational training",
        slug: "skills-trades-vocational-training",
        description:
          "Practical courses and workshops in trades, technology and creative skills.",
        pages: [
          {
            title: "Register for the Community Impact Programme (CIP)",
            slug: "cip",
            source_url: "https://comdev.gov.bb/programmes/cip/",
            description:
              "Practical demand-driven skill training in 25+ courses across trades, creative services, and wellness. Two sessions/week at community and resource centres island-wide.",
          },
          {
            title: "Apply for the Block Transformation Unit (Project Dawn)",
            slug: "btu",
            source_url:
              "https://youthaffairs.gov.bb/about/about-the-block-transformation-unit/",
            description:
              "Free vocational training in 20+ courses including Motor Vehicle Engineering, Professional Housekeeping, Basic Trade Cookery, Bar Operations, hospitality, beauty, construction and healthcare.",
          },
          {
            title: "Join the Cyber Security Training Workshop",
            slug: "cyber-security-training",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/youth-development-programme/",
            description:
              "Cyber security training under the Youth Development Programme.",
          },
          {
            title: "Join Web Page Design and Maintenance for Entrepreneurs",
            slug: "web-design-entrepreneurs",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/youth-development-programme/",
            description:
              "Workshop teaching young entrepreneurs to design and maintain their own websites.",
          },
          {
            title: "Apply for the Community Arts Programme (CAP)",
            slug: "cap",
            source_url: "https://comdev.gov.bb/programmes/cap/",
            description:
              "Structured instruction in airbrushing, animation, automotive painting, basic bodywork, computer graphics, drawing & illustration, painting & colour theory, sign making and technical drawing.",
          },
        ],
      },
      {
        title: "Entrepreneurship and business",
        slug: "entrepreneurship-business",
        description:
          "Support for young people starting and growing their own ventures.",
        pages: [
          {
            title:
              "Make first contact with the Youth Entrepreneurship Scheme (YES)",
            slug: "yes",
            source_url: "https://youthaffairs.gov.bb/programme-channels/yes-2/",
            description:
              "From idea to enterprise. Direct technical assistance from Youth Enterprise Officers and consultants, plus access to financial assistance via partnerships.",
          },
        ],
      },
      {
        title: "Arts and culture",
        slug: "arts-culture",
        description:
          "Creative programmes, performances and content celebrating Barbadian culture.",
        pages: [
          {
            title: "Register for Youth Achieving Results (YAR)",
            slug: "yar",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/youth-development-programme/",
            description:
              "Arts-focused initiative under the Youth Development Programme.",
          },
          {
            title: "Watch Community Canvas episodes",
            slug: "community-canvas",
            source_url: "https://comdev.gov.bb/canvas/",
            description:
              "Video/TV series on YouTube featuring activities and programs at Resource Centres island-wide. 10 episodes covering balloon artistry, senior fitness, vocational training and more.",
          },
        ],
      },
      {
        title: "Children, families and the wider community",
        slug: "children-families-community",
        description:
          "Programmes, volunteering opportunities and services for children, families and neighbourhoods.",
        pages: [
          {
            title: "Register a child for the National Summer Camp Programme",
            slug: "national-summer-camp",
            source_url:
              "https://youthaffairs.gov.bb/programme-channels/national-summer-camp-2/",
            description:
              "Summer camps across 46 locations island-wide. Hosted by the Ministry of Youth, Sports and Community Empowerment.",
          },
          {
            title:
              "Register for the Community Engagement and Educational Programme (CEEP)",
            slug: "ceep",
            source_url: "https://comdev.gov.bb/programmes/ceep/",
            description:
              "Education and assistance with tax, NIS/social security, and financial services. Partners: Barbados Revenue Authority, NISSS, Sagicor, BPWCCUL.",
          },
          {
            title: "Join Mission Barbados",
            slug: "mission-barbados",
            source_url: "https://comdev.gov.bb/programmes/mission-barbados/",
            description:
              "National initiative around six 2030 missions: sustainability, social cohesion, food/water security, public health & safety, worker empowerment and digital transformation. Open to individuals and organisations.",
          },
          {
            title: "Donate books to Barbados is Blooming (Little Libraries)",
            slug: "barbados-blooming-libraries",
            source_url: "https://comdev.gov.bb/programmes/libraries/",
            description:
              "Free little libraries placed across the island. Donate new or lightly used children's books at Massy Stores (Sunset Crest, Holetown, Warrens) and Farm and Garden in Salters, St. George.",
          },
          {
            title: "Volunteer for a Centre Management Committee (CMC)",
            slug: "cmc",
            source_url: "https://comdev.gov.bb/programmes/cmc/",
            description:
              "Volunteer to review requests for use of community centres, review programme proposals and facilitate extended centre access.",
          },
          {
            title: "Find a Spreading Joy at Christmas motorcade near you",
            slug: "spreading-joy-2025",
            source_url: "https://comdev.gov.bb/programmes/spreading-joy/",
            description:
              "Festive motorcades visit communities with staff, cultural characters and gift distribution to vulnerable children in designated parishes.",
          },
          {
            title: "Book a community centre for an event",
            slug: "centre-access",
            source_url: "https://comdev.gov.bb/programmes/centre-access/",
            description: "Access community centres for events and activities.",
          },
        ],
      },
    ],
  },
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
        keywords: [
          "driver license",
          "drivers license",
          "driving licence",
          "driving license",
        ],
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
        title: "Redirect my personal mail",
        slug: "post-office-redirection-individual",
        description: "Redirect my personal mail",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Redirect my personal mail form",
            type: "component",
          },
        ],
      },
      {
        title: "Tell the Post Office someone has died",
        slug: "post-office-redirection-deceased",
        description: "Tell the Post Office someone has died",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Form to tell the Post Office someone has died",
            type: "component",
          },
        ],
      },
      {
        title: "Redirect my business mail",
        slug: "post-office-redirection-business",
        description: "Redirect my business mail",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title: "Redirect my business mail form",
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
        slug: "sell-goods-services-beach-park",
        description: "",
        subPages: [
          { slug: "start", type: "markdown" },
          {
            slug: "form",
            title:
              "Apply for a licence to sell goods or services at a beach or park",
            type: "component",
          },
        ],
      },
      {
        title: "Find the permits you need for a Crop Over event",
        slug: "crop-over-permits",
        source_url: "",
        description:
          "Answer a few questions about your Crop Over event and get a tailored checklist of permits, lead times, and the agencies to contact.",
        subPages: [
          {
            slug: "form",
            title: "Find the permits you need for a Crop Over event",
            type: "component",
          },
        ],
      },
      // {
      //   title:
      //     "Apply for a licence to sell goods or services at a beach or park",
      //   slug: "apply-for-a-licence-to-sell-goods-or-services-at-a-beach-or-park",
      //   source_url: "",
      //   description:
      //     "Apply for a licence to sell goods or services at a beach or park",
      //   subPages: [{ slug: "start", type: "markdown" }],
      // },
      // {
      //   title: "Request for name search and name reservation",
      //   slug: "reserve-society-name",
      //   description: "Request for name search and name reservation",
      //   subPages: [
      //     { slug: "start", type: "markdown" },
      //     {
      //       slug: "form",
      //       title: "Request to reserve a society name form",
      //       type: "component",
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Public safety",
    slug: "public-safety",
    description: "Reporting crime, raising a concern and safeguarding",
    pages: [
      // {
      //   title: "Request a fire service inspection",
      //   slug: "request-a-fire-service-inspection",
      //   description:
      //     "Request an inspection from the Barbados Fire Service for hotels, daycares, and places of entertainment.",
      //   subPages: [
      //     { slug: "start", type: "markdown", protected: true },
      //     {
      //       slug: "form",
      //       title: "Request a Fire Service Inspection form",
      //       type: "component",
      //       protected: true,
      //     },
      //   ],
      // },
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
