import type { ReactNode } from "react";

import type { ContactItem } from "@/components/ministry/ministry-page";
import { getMinistryBySlug } from "@/data/ministries";

export type PersonRole =
  | "prime-minister"
  | "deputy-prime-minister"
  | "senior-minister"
  | "minister"
  | "minister-of-state"
  | "mp"
  | "senator"
  | "official";

export type Person = {
  slug: string;
  name: string;
  role?: string;
  roles?: PersonRole[];
  party?: string;
  constituency?: string;
  photo?: string;
  bio?: ReactNode;
  contact?: ContactItem[];
  relatedMinistrySlugs?: string[];
};

// Source: gov.bb/cabinet.php (user-supplied 2026-05 cabinet brief)
export const PEOPLE: Person[] = [
  {
    slug: "mia-amor-mottley",
    name: "The Hon. Mia Amor Mottley, S.C., M.P.",
    role: "Prime Minister, Minister of Economic Affairs and Development, and Minister of National Security",
    roles: ["prime-minister", "minister", "mp"],
    party: "Barbados Labour Party",
    constituency: "St Michael North East",
    photo:
      "https://www.barbadosparliament.com/uploads/member/752b630c7e53d45a3cc0d8b08ab7a89a.jpg",
    bio: "Head of Government, presiding over the Cabinet of Ministers, with portfolio responsibility for the Prime Minister's Office, Economic Affairs and Development, and National Security. Lead architect of the Bridgetown Initiative for global financial reform.",
    contact: [
      {
        label: "Email",
        type: "email",
        value: "mia.amor.mottley@barbados.gov.bb",
      },
      { label: "Telephone", type: "phone", value: "+1 (246) 535-5349" },
      { label: "Fax", type: "phone", value: "+1 (246) 535-5350" },
      { label: "Constituency", value: "St Michael North East" },
      {
        label: "Party",
        type: "website",
        value: "http://www.blp.org.bb/",
        display: "Barbados Labour Party",
      },
      {
        label: "Address",
        value: (
          <>
            Government Headquarters
            <br />
            Bay Street
            <br />
            St. Michael
            <br />
            Barbados, W.I.
          </>
        ),
      },
    ],
    relatedMinistrySlugs: ["prime-ministers-office"],
  },
  {
    slug: "santia-bradshaw",
    name: "The Hon. Santia J. O. Bradshaw, M.P.",
    role: "Deputy Prime Minister, Minister of Environment, National Beautification and Fisheries, and Leader of Government Business in the House of Assembly",
    roles: ["deputy-prime-minister", "minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Deputy Prime Minister responsible for the Ministry of Environment, National Beautification and Fisheries, and Leader of Government Business in the House of Assembly. Previously served as Minister of Education, Technological and Vocational Training.",
    relatedMinistrySlugs: [
      "ministry-of-environment-and-national-beautification",
    ],
  },
  {
    slug: "wilfred-abrahams",
    name: "The Hon. Wilfred A. Abrahams, S.C., M.P.",
    role: "Attorney-General and Senior Minister coordinating Governance Policy",
    roles: ["senior-minister", "minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Chief legal advisor to the government, responsible for the drafting of legislation, public prosecutions, and the rule of law. As Senior Minister coordinating Governance Policy, ensures ministries and state-owned enterprises adhere to constitutional, anti-corruption, and international legal standards.",
    relatedMinistrySlugs: ["office-of-the-attorney-general"],
  },
  {
    slug: "jerome-walcott",
    name: "Senator Dr. The Most Hon. Jerome X. Walcott, FB, J.P.",
    role: "Senior Minister coordinating Social and Environmental Policy with responsibility for reform of the Social Sector",
    roles: ["senior-minister", "senator"],
    party: "Barbados Labour Party",
    bio: "Senior Minister at the nexus of human development and ecological sustainability, with a sweeping mandate to overhaul welfare, public health, and community empowerment systems.",
  },
  {
    slug: "christopher-sinckler",
    name: "Senator The Hon. Christopher P. Sinckler",
    role: "Senior Minister of Foreign Affairs and Foreign Trade",
    roles: ["senior-minister", "minister", "senator"],
    party: "Barbados Labour Party",
    bio: "Chief diplomat and international representative for Barbados, responsible for diplomacy, multilateral and bilateral trade negotiations, foreign direct investment, and Barbados' representation at the UN, WTO and CARICOM.",
    relatedMinistrySlugs: ["ministry-of-foreign-affairs-and-foreign-trade"],
  },
  {
    slug: "kerrie-symmonds",
    name: "The Hon. Kerrie D. Symmonds, M.P.",
    role: "Minister of Energy, Business Development and Commerce, and Senior Minister coordinating Productive Sector",
    roles: ["senior-minister", "minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Leads the national transition to renewable energy, the facilitation of domestic enterprise, and the regulation of commercial activity. As Senior Minister coordinating the Productive Sector, harmonises agriculture, manufacturing and local industry to lift national productivity.",
    relatedMinistrySlugs: ["ministry-of-energy-and-business-development"],
  },
  {
    slug: "kirk-humphrey",
    name: "The Hon. Kirk D. M. Humphrey, M.P.",
    role: "Minister of Transport and Works, and Senior Minister coordinating Infrastructure",
    roles: ["senior-minister", "minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Leads the construction and maintenance of the national road network, bridges and public transit. As Senior Minister coordinating Infrastructure, synchronises physical development across housing, water resources and tourism, with an emphasis on climate-resilient design.",
    relatedMinistrySlugs: ["ministry-of-transport-works-and-water-resources"],
  },
  {
    slug: "ian-gooding-edghill",
    name: "The Hon. G. P. Ian Gooding-Edghill, J.P., M.P.",
    role: "Minister of Tourism and International Transport",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Leads sustainable development of the tourism and international transport sectors. Brings a private-sector hospitality background, including instrumental roles in the AIM listing of Elegant Hotels Group PLC and chairmanships of the Transport Board and the National Insurance Board.",
    relatedMinistrySlugs: ["ministry-of-tourism-and-international-transport"],
  },
  {
    slug: "ryan-straughn",
    name: "The Hon. Ryan R. Straughn, M.P.",
    role: "Minister of Finance",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Leads the Ministry of Finance with daily oversight of public expenditure, revenue collection, sovereign debt management, and formulation of the national budget.",
    relatedMinistrySlugs: [
      "ministry-of-finance-economic-affairs-and-investment",
    ],
  },
  {
    slug: "marsha-caddle",
    name: "The Hon. Marsha K. Caddle, M.P.",
    role: "Minister in the Prime Minister's Office with day-to-day responsibility for Economic Affairs and Planning",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Manages the technical execution of economic policy from within the Prime Minister's Office, including national statistical analysis, medium-to-long-term macroeconomic planning, and engagement with international financial institutions.",
    relatedMinistrySlugs: ["prime-ministers-office"],
  },
  {
    slug: "jonathan-reid",
    name: "Senator The Hon. Jonathan W. D. Reid",
    role: "Minister of Innovation, Industry, Science and Technology",
    roles: ["minister", "senator"],
    party: "Barbados Labour Party",
    bio: "Leads the Ministry of Innovation, Industry, Science and Technology (MIST) headquartered at Baobab Tower, Warrens. Responsible for digital transformation of the public sector (e-Government), the domestic tech start-up ecosystem, and integration of scientific research into industrial policy.",
    relatedMinistrySlugs: [
      "ministry-of-industry-innovation-science-and-technology",
    ],
  },
  {
    slug: "colin-jordan",
    name: "The Hon. Colin E. Jordan, M.P.",
    role: "Minister of Labour, Social Security and The Third Sector",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Oversees industrial relations, workers' rights, the National Insurance Scheme, and formal partnership with NGOs, charities and grassroots community groups under the Third Sector mandate.",
    relatedMinistrySlugs: [
      "ministry-of-labour-social-security-and-third-sector",
    ],
  },
  {
    slug: "adrian-forde",
    name: "The Hon. Adrian R. Forde, M.P.",
    role: "Minister of People Empowerment and Elder Affairs",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Leads structural poverty alleviation, welfare delivery and social integration, with a specific mandate for protecting the rights of senior citizens and ensuring access to specialised healthcare.",
    relatedMinistrySlugs: ["ministry-of-people-empowerment-and-elder-affairs"],
  },
  {
    slug: "charles-griffith",
    name: "The Hon. Charles McD. Griffith, M.P.",
    role: "Minister of Sports and Community Empowerment",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Treats sport as a mechanism for youth engagement, public health and community cohesion, coordinating with the Third Sector and Education ministries on localised, research-driven youth programmes.",
    relatedMinistrySlugs: [
      "ministry-of-youth-sports-and-community-empowerment",
    ],
  },
  {
    slug: "gregory-nicholls",
    name: "The Hon. Gregory P. B. Nicholls, M.P.",
    role: "Minister of Home Affairs and Information",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Manages internal administrative security, immigration, civil registries, the postal service, the fire service and correctional facilities, plus the government's public broadcasting and information apparatus.",
    relatedMinistrySlugs: ["ministry-of-home-affairs-and-information"],
  },
  {
    slug: "christopher-gibbs",
    name: "The Hon. Christopher D. L. Gibbs, M.P.",
    role: "Minister of Housing, Lands and Maintenance",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Responsible for affordable housing, distribution and management of Crown lands, and regulation of private property development. The 'Maintenance' mandate commits to long-term upkeep of state-owned housing and government infrastructure.",
    relatedMinistrySlugs: ["ministry-of-housing-lands-and-maintenance"],
  },
  {
    slug: "shantal-munro-knight",
    name: "The Hon. Shantal M. Munro-Knight, Ph.D.",
    role: "Minister of Agriculture, Food and Nutritional Security",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Leads the rebranded Ministry of Agriculture, Food and Nutritional Security — pivoting agricultural output toward national sovereignty and preventative public health by reducing the food import bill, promoting climate-smart agriculture and supporting local fisheries.",
    relatedMinistrySlugs: [
      "ministry-of-agriculture-and-food-and-nutritional-security",
    ],
  },
  {
    slug: "cheryl-husbands",
    name: "The Hon. Cheryl S. V. Husbands, M.P.",
    role: "Minister of Technological and Vocational Training",
    roles: ["minister", "mp"],
    party: "Barbados Labour Party",
    bio: "Equips citizens with market-ready skills across Industrial Arts Technology, Metal Work, Woodwork, Plumbing, Cosmetology, Crop Production, and Commercial Food Preparation. Active in regional educational governance including the 2025 Regional Symposium on Transforming Education.",
    relatedMinistrySlugs: ["ministry-of-training-and-tertiary-education"],
  },
  {
    slug: "davidson-ishmael",
    name: "The Hon. Davidson I. Ishmael, M.P.",
    role: "Minister of State, Ministry of Health and Wellness",
    roles: ["minister-of-state", "mp"],
    party: "Barbados Labour Party",
    bio: "Provides dedicated executive oversight of the day-to-day administration of public health — including the Queen Elizabeth Hospital, the polyclinic network, public health laboratories and ongoing epidemic response — alongside the principal Minister.",
    relatedMinistrySlugs: ["ministry-of-health-and-wellness"],
  },
  {
    slug: "romel-springer",
    name: "The Hon. Romel O. Springer, J.P., M.P., Ph.D.",
    role: "Minister of State in the Ministry of Transport and Works",
    roles: ["minister-of-state", "mp"],
    party: "Barbados Labour Party",
    bio: "Provides localised, granular oversight of road, bridge and public transit projects, complementing the macro-strategic direction of Senior Minister Kirk Humphrey.",
    relatedMinistrySlugs: ["ministry-of-transport-works-and-water-resources"],
  },
];

export const getPersonBySlug = (slug: string): Person | undefined =>
  PEOPLE.find((p) => p.slug === slug);

export const getRelatedMinistries = (person: Person) =>
  (person.relatedMinistrySlugs ?? [])
    .map((slug) => {
      const m = getMinistryBySlug(slug);
      return m ? { slug: m.slug, name: m.name } : null;
    })
    .filter((m): m is { slug: string; name: string } => m !== null);
