import type { SelectOption } from "@/types";

/**
 * Canonical list of primary schools: name, location (parish), principal email.
 * Source: Data Set - School Names with Emails (Public Schools).csv
 * Slug (stored in form) = email local part, lowercased.
 */
export const schoolsWithEmails: {
  school: string;
  location: string;
  email: string;
}[] = [
  { school: "A Dacosta Edwards", location: "St. Andrew", email: "ADacostaEdwardsPrimary@mes.gov.bb" },
  { school: "All Saints' Primary", location: "St. Peter", email: "AllSaintsPrimary@mes.gov.bb" },
  { school: "Arthur Smith Primary", location: "Christ Church", email: "ArthurSmithPrimary@mes.gov.bb" },
  { school: "Bay Primary School", location: "St. Michael", email: "BayPrimary@mes.gov.bb" },
  { school: "Bayley's Primary", location: "St. Philip", email: "BayleysPrimary@mes.gov.bb" },
  { school: "Belmont Primary", location: "St. Michael", email: "BelmontPrimary@mes.gov.bb" },
  { school: "Blackman/Gollop Primary", location: "Christ Church", email: "BlackmanGollopPrimary@mes.gov.bb" },
  { school: "Charles F Broome", location: "St. Michael", email: "CharlesFBroomeMemorialPrimary@mes.gov.bb" },
  { school: "Christ Church Girls", location: "Christ Church", email: "ChristChurchGirls@mes.gov.bb" },
  { school: "Cuthbert Moore Primary", location: "St. George", email: "CuthbertMoorePrimary@mes.gov.bb" },
  { school: "Deacons Primary", location: "St. Michael", email: "DeaconsPrimary@mes.gov.bb" },
  { school: "Eagle Hall Primary", location: "St. Michael", email: "EagleHallPrimary@mes.gov.bb" },
  { school: "Eden Lodge", location: "St. Michael", email: "EdenLodgePrimary@mes.gov.bb" },
  { school: "Ellerton Primary", location: "St. George", email: "EllertonPrimary@mes.gov.bb" },
  { school: "Elliot Belgrave", location: "St. Peter", email: "BoscobelPrimary@mes.gov.bb" },
  { school: "Good Shepherd Primary", location: "St. James", email: "GoodShepherdPrimary@mes.gov.bb" },
  { school: "Gordon Greenidge Primary", location: "St. James", email: "GordonGreenidgePrimary@mes.gov.bb" },
  { school: "Gordon Walters", location: "Christ Church", email: "GordonWaltersPrimary@mes.gov.bb" },
  { school: "Grantley Prescod Memorial", location: "St. Michael", email: "GrantleyPrescodMemorial@mes.gov.bb" },
  { school: "Grazettes Primary", location: "St. Michael", email: "GrazettesPrimary@mes.gov.bb" },
  { school: "Half Moon Fort", location: "St. Lucy", email: "HalfMoonFortPrimary@mes.gov.bb" },
  { school: "Hilda Skeene Primary", location: "St. Philip", email: "HildaSkeenePrimary@mes.gov.bb" },
  { school: "Hillaby Turner's Hall", location: "St. Thomas", email: "HillabyTurnersHallPrimary@mes.gov.bb" },
  { school: "Hindsbury Primary", location: "St. Michael", email: "HindsburyPrimary@mes.gov.bb" },
  { school: "Holy Innocents' Primary", location: "St. Thomas", email: "HolyInnocentsPrimary@mes.gov.bb" },
  { school: "Ignatius Byer Primary", location: "St. Lucy", email: "IgnatiusByerPrimary@mes.gov.bb" },
  { school: "Lawrence T Gay", location: "St. Michael", email: "LawrenceTGayPrimary@mes.gov.bb" },
  { school: "Luther Thorne Memorial", location: "St. Michael", email: "LutherThorneMemorial@mes.gov.bb" },
  { school: "Milton Lynch primary", location: "Christ Church", email: "MiltonLynchPrimary@mes.gov.bb" },
  { school: "Mount Tabor Primary School", location: "St. John", email: "MountTaborPrimary@mes.gov.bb" },
  { school: "New Horizon Academy", location: "St. Michael", email: "newhorizonsacademy@mes.gov.bb" },
  { school: "Reynold Weekes Primary School", location: "St. Philip", email: "ReynoldWeekesPrimary@mes.gov.bb" },
  { school: "Roland Edwards Primary", location: "St. Peter", email: "RolandEdwardsPrimary@mes.gov.bb" },
  { school: "Selah Primary School", location: "St. Lucy", email: "SelahPrimary@mes.gov.bb" },
  { school: "Sharon Primary", location: "St. Thomas", email: "SharonPrimary@mes.gov.bb" },
  { school: "St. Albans Primary", location: "St. James", email: "StAlbansPrimary@mes.gov.bb" },
  { school: "St. Ambrose Primary", location: "St. Michael", email: "StAmbrosePrimary@mes.gov.bb" },
  { school: "St. Bartholomew Primary", location: "Christ Church", email: "StBartholomewsPrimary@mes.gov.bb" },
  { school: "St. Bernard's Primary", location: "St. Joseph", email: "StBernardsPrimary@mes.gov.bb" },
  { school: "St. Catherine's Primary", location: "St. Philip", email: "StCatherinesPrimary@mes.gov.bb" },
  { school: "St. Christopher Primary", location: "Christ Church", email: "StChristopherPrimary@mes.gov.bb" },
  { school: "St. Elizabeth Primary", location: "St. Joseph", email: "StElizabethPrimary@mes.gov.bb" },
  { school: "St. George Primary", location: "St. George", email: "StGeorgePrimary@mes.gov.bb" },
  { school: "St. Giles Primary", location: "St. Michael", email: "StGilesPrimary@mes.gov.bb" },
  { school: "St. James Primary", location: "St. James", email: "StJamesPrimary@mes.gov.bb" },
  { school: "St. John's Primary", location: "St. John", email: "StJohnsPrimary@mes.gov.bb" },
  { school: "St. Joseph Primary", location: "St. Joseph", email: "StJosephPrimary@mes.gov.bb" },
  { school: "St. Jude's Primary", location: "St. George", email: "StJudesPrimary@mes.gov.bb" },
  { school: "St. Lawrence Primary", location: "Christ Church", email: "StLawrencePrimary@mes.gov.bb" },
  { school: "St. Lucy's Primary", location: "St. Lucy", email: "StLucyPrimary@mes.gov.bb" },
  { school: "St. Lukes/Brighton Primary", location: "St. George", email: "StLukesPrimary@mes.gov.bb" },
  { school: "St. Margaret's Primary School", location: "St. John", email: "StMargaretsPrimary@mes.gov.bb" },
  { school: "St. Marks Primary", location: "St. Philip", email: "StMarksPrimary@mes.gov.bb" },
  { school: "St. Martins Mangrove", location: "St. Philip", email: "StMartinsMangrovePrimary@mes.gov.bb" },
  { school: "St. Mary's Primary", location: "St. Michael", email: "StMarysPrimary@mes.gov.bb" },
  { school: "St. Matthew's Primary", location: "St. Michael", email: "StMatthewsPrimary@mes.gov.bb" },
  { school: "St. Paul Primary", location: "St. Michael", email: "StPaulsPrimary@mes.gov.bb" },
  { school: "St. Philip Primary", location: "St. Philip", email: "StPhilipPrimary@mes.gov.bb" },
  { school: "St. Silas Primary", location: "St. James", email: "StSilasPrimary@mes.gov.bb" },
  { school: "St. Stephen's Primary", location: "St. Michael", email: "StStephensPrimary@mes.gov.bb" },
  { school: "The Ann Hill School", location: "St. Michael", email: "TheAnnHillSchool@mes.gov.bb" },
  { school: "The Irving Wilson School", location: "St. Michael", email: "TheIrvingWilsonSchool@mes.gov.bb" },
  { school: "Vauxhall Primary", location: "Christ Church", email: "VauxhallPrimary@mes.gov.bb" },
  { school: "Welches Primary", location: "St. Thomas", email: "WelchesPrimary@mes.gov.bb" },
  { school: "Wesley Hall Infants", location: "St. Michael", email: "WesleyHallInfantsschool@mes.gov.bb" },
  { school: "Wesley Hall Junior", location: "St. Michael", email: "WesleyHallJunior@mes.gov.bb" },
  { school: "West Terrace", location: "St. James", email: "WestTerracePrimary@mes.gov.bb" },
  { school: "Westbury Primary", location: "St. Michael", email: "WestburyPrimary@mes.gov.bb" },
  { school: "Wilkie Cumberbatch", location: "St. Michael", email: "WilkieCumberbatchPrimary@mes.gov.bb" },
  { school: "Workman's Primary", location: "St. George", email: "WorkmansPrimary@mes.gov.bb" },
];

function emailToSlug(email: string): string {
  return email.split("@")[0].toLowerCase();
}

/** One pass: add slug to each school. Used to derive options and slug→email map. */
const schoolsWithSlugs = schoolsWithEmails.map(({ school, location, email }) => ({
  school,
  location,
  email,
  slug: emailToSlug(email),
}));

/** Dropdown options: first option "Select a school", then one per school. value = slug. */
export const primarySchoolsSelectOptions: SelectOption[] = [
  { label: "Select a school", value: "" },
  ...schoolsWithSlugs.map(({ school, slug }) => ({ label: school, value: slug })),
];

/** Map slug → principal email. Used by backend when sending the application. */
export const primarySchoolEmailBySlug: Record<string, string> = Object.fromEntries(
  schoolsWithSlugs.map(({ slug, email }) => [slug, email])
);

/** Valid school slugs (for tests or other consumers). Single source of truth. */
export const primarySchoolSlugs: string[] = schoolsWithSlugs.map(({ slug }) => slug);
