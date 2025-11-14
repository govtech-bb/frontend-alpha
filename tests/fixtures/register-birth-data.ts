/**
 * Test data generation and fixtures for Register Birth form tests
 * Uses faker to generate realistic test data for all form flows
 */

import { faker } from "@faker-js/faker";

/**
 * Barbados parishes for birth registration
 */
export const BARBADOS_PARISHES = [
  "Christ Church",
  "Saint Andrew",
  "Saint George",
  "Saint James",
  "Saint John",
  "Saint Joseph",
  "Saint Lucy",
  "Saint Michael",
  "Saint Peter",
  "Saint Philip",
  "Saint Thomas",
] as const;

/**
 * Generate a realistic National Registration Number (NRN)
 * Format: XXXXXX-XXXX (6 digits, dash, 4 digits)
 */
function generateNRN(): string {
  const part1 = String(faker.number.int({ min: 100_000, max: 999_999 }));
  const part2 = String(faker.number.int({ min: 1000, max: 9999 }));
  return `${part1}-${part2}`;
}

/**
 * Generate a valid birth date (between 18-80 years old)
 * Formatted as "DD MMM YYYY"
 */
function generateBirthDate(): string {
  const today = new Date();
  const maxAge = 80;
  const minAge = 18;
  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );
  const randomDate = new Date(
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())
  );
  return randomDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Generate a child's birth date (between 0-18 years old)
 * Formatted as "DD MMM YYYY"
 */
function generateChildBirthDate(): string {
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = today;
  const randomDate = new Date(
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())
  );
  return randomDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Person details (for mother or father)
 */
export type PersonTestData = {
  firstName: string;
  middleName: string;
  lastName: string;
  hadOtherSurname: "yes" | "no";
  otherSurname?: string;
  dateOfBirth: string;
  address: string;
  nationalRegistrationNumber: string;
  passportNumber?: string;
  passportPlaceOfIssue?: string;
  occupation: string;
};

/**
 * Generate realistic person details (for mother or father)
 */
function generatePersonDetails(includePassport = false): PersonTestData {
  const hadOtherSurname = faker.datatype.boolean();

  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    hadOtherSurname: hadOtherSurname ? "yes" : "no",
    otherSurname: hadOtherSurname ? faker.person.lastName() : undefined,
    dateOfBirth: generateBirthDate(),
    address: faker.location.streetAddress(),
    nationalRegistrationNumber: generateNRN(),
    passportNumber: includePassport
      ? faker.string.alphanumeric(9).toUpperCase()
      : undefined,
    passportPlaceOfIssue: includePassport ? "Barbados" : undefined,
    occupation: faker.person.jobTitle(),
  };
}

/**
 * Child details
 */
export type ChildTestData = {
  firstNames: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  sexAtBirth: "Male" | "Female";
  parishOfBirth: string;
};

/**
 * Generate realistic child details
 */
function generateChildDetails(parentLastName: string): ChildTestData {
  return {
    firstNames: faker.person.firstName(),
    middleNames: faker.person.firstName(),
    lastName: parentLastName,
    dateOfBirth: generateChildBirthDate(),
    sexAtBirth: faker.datatype.boolean() ? "Male" : "Female",
    parishOfBirth: faker.helpers.arrayElement(BARBADOS_PARISHES),
  };
}

/**
 * Contact information
 */
export type ContactTestData = {
  email: string;
  phoneNumber: string;
  wantContact: "yes" | "no";
};

/**
 * Generate contact information
 */
function generateContactInfo(): ContactTestData {
  return {
    email: faker.internet.email(),
    phoneNumber: faker.helpers.replaceSymbols("+1-246-###-####"),
    wantContact: faker.datatype.boolean() ? "yes" : "no",
  };
}

/**
 * Test profile for Path A: Married parents
 */
export type MarriedParentsTestProfile = {
  scenario: "married-parents";
  marriageStatus: "yes";
  includeFatherDetails: "";
  father: PersonTestData;
  mother: PersonTestData;
  child: ChildTestData;
  numberOfCertificates: number;
  contact: ContactTestData;
};

/**
 * Test profile for Path B: Unmarried without father details
 */
export type UnmarriedWithoutFatherTestProfile = {
  scenario: "unmarried-without-father";
  marriageStatus: "no";
  includeFatherDetails: "no";
  mother: PersonTestData;
  child: ChildTestData;
  numberOfCertificates: number;
  contact: ContactTestData;
};

/**
 * Test profile for Path C: Unmarried with father details
 */
export type UnmarriedWithFatherTestProfile = {
  scenario: "unmarried-with-father";
  marriageStatus: "no";
  includeFatherDetails: "yes";
  father: PersonTestData;
  mother: PersonTestData;
  child: ChildTestData;
  numberOfCertificates: number;
  contact: ContactTestData;
};

/**
 * Union type of all test profiles
 */
export type RegisterBirthTestProfile =
  | MarriedParentsTestProfile
  | UnmarriedWithoutFatherTestProfile
  | UnmarriedWithFatherTestProfile;

/**
 * Generate a married parents test profile (Path A)
 */
export function generateMarriedParentsProfile(): MarriedParentsTestProfile {
  const fatherLastName = faker.person.lastName();
  return {
    scenario: "married-parents",
    marriageStatus: "yes",
    includeFatherDetails: "",
    father: generatePersonDetails(),
    mother: generatePersonDetails(),
    child: generateChildDetails(fatherLastName),
    numberOfCertificates: faker.number.int({ min: 1, max: 5 }),
    contact: generateContactInfo(),
  };
}

/**
 * Generate an unmarried without father details test profile (Path B)
 */
export function generateUnmarriedWithoutFatherProfile(): UnmarriedWithoutFatherTestProfile {
  const motherLastName = faker.person.lastName();
  return {
    scenario: "unmarried-without-father",
    marriageStatus: "no",
    includeFatherDetails: "no",
    mother: generatePersonDetails(),
    child: generateChildDetails(motherLastName),
    numberOfCertificates: faker.number.int({ min: 1, max: 5 }),
    contact: generateContactInfo(),
  };
}

/**
 * Generate an unmarried with father details test profile (Path C)
 */
export function generateUnmarriedWithFatherProfile(): UnmarriedWithFatherTestProfile {
  const fatherLastName = faker.person.lastName();
  return {
    scenario: "unmarried-with-father",
    marriageStatus: "no",
    includeFatherDetails: "yes",
    father: generatePersonDetails(),
    mother: generatePersonDetails(),
    child: generateChildDetails(fatherLastName),
    numberOfCertificates: faker.number.int({ min: 1, max: 5 }),
    contact: generateContactInfo(),
  };
}

/**
 * Generate all three test profiles
 */
export function generateAllTestProfiles(): [
  MarriedParentsTestProfile,
  UnmarriedWithoutFatherTestProfile,
  UnmarriedWithFatherTestProfile,
] {
  return [
    generateMarriedParentsProfile(),
    generateUnmarriedWithoutFatherProfile(),
    generateUnmarriedWithFatherProfile(),
  ];
}
