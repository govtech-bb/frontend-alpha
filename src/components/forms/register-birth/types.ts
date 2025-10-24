/**
 * Type definitions for the Register a Birth multi-step form
 * Using discriminated unions to represent the three possible form flows:
 * - Path A: Married parents
 * - Path B: Unmarried, no father details
 * - Path C: Unmarried, with father details
 */

/**
 * Common fields across all form paths
 */
type BaseFields = {
  marriageStatus: "yes" | "no" | "";
  includeFatherDetails: "yes" | "no" | "";
  numberOfCertificates: number;
  email: string;
  wantContact: "yes" | "no" | "";
  phoneNumber: string;
};

/**
 * Complete person details (for father and mother when father is included)
 */
export type PersonDetails = {
  firstName: string;
  middleName: string;
  lastName: string;
  hadOtherSurname: "yes" | "no" | "";
  otherSurname: string;
  dateOfBirth: string;
  address: string;
  nationalRegistrationNumber: string;
  occupation: string;
};

/**
 * Simplified mother details (when father is not included)
 */
export type SimplifiedMotherDetails = {
  firstName: string;
  middleName: string;
  lastName: string;
  hadOtherSurname: "yes" | "no" | "";
  otherSurname: string;
  dateOfBirth: string;
  address: string;
  nationalRegistrationNumber: string;
  occupation: string;
};

/**
 * Child details structure (same for all paths)
 */
export type ChildDetails = {
  firstNames: string;
  middleNames: string;
  lastName: string;
  dateOfBirth: string;
  sexAtBirth: string;
  parishOfBirth: string;
};

/**
 * Path A: Married parents
 * - Marriage status: Yes
 * - Collects father details
 * - Collects full mother details
 * - Child's surname prefilled from father
 */
export interface MarriedFlow extends BaseFields {
  marriageStatus: "yes";
  includeFatherDetails: ""; // Not asked in this flow
  father: PersonDetails;
  mother: PersonDetails;
  child: ChildDetails;
}

/**
 * Path C: Unmarried with father details
 * - Marriage status: No
 * - Include father: Yes
 * - Collects father details
 * - Collects full mother details
 * - Child's surname prefilled from father
 */
export interface UnmarriedWithFatherFlow extends BaseFields {
  marriageStatus: "no";
  includeFatherDetails: "yes";
  father: PersonDetails;
  mother: PersonDetails;
  child: ChildDetails;
}

/**
 * Path B: Unmarried without father details
 * - Marriage status: No
 * - Include father: No
 * - No father details collected
 * - Simplified mother details
 * - Child's surname prefilled from mother
 */
export interface UnmarriedWithoutFatherFlow extends BaseFields {
  marriageStatus: "no";
  includeFatherDetails: "no";
  father: undefined; // Father is not included
  mother: SimplifiedMotherDetails;
  child: ChildDetails;
}

/**
 * Main form data type - discriminated union of all possible flows
 */
export type BirthRegistrationFormData =
  | MarriedFlow
  | UnmarriedWithFatherFlow
  | UnmarriedWithoutFatherFlow;

/**
 * Partial form data used during form filling
 * Allows incomplete states where all fields are optional
 */
export type PartialBirthRegistrationFormData = {
  marriageStatus?: "yes" | "no" | "";
  includeFatherDetails?: "yes" | "no" | "";
  numberOfCertificates?: number;
  email?: string;
  wantContact?: "yes" | "no" | "";
  phoneNumber?: string;
  father?: Partial<PersonDetails>;
  mother?: Partial<PersonDetails> | Partial<SimplifiedMotherDetails>;
  child?: Partial<ChildDetails>;
};

/**
 * Step names for navigation
 */
export type StepName =
  | "marriage-status"
  | "include-father"
  | "father-details"
  | "mother-details"
  | "child-details"
  | "certificates"
  | "contact-info"
  | "check-answers"
  | "confirmation";

/**
 * Variant types for components that render differently based on path
 */
export type DetailsVariant = "with-father" | "without-father";

/**
 * Storage interface for localStorage persistence
 */
export type StoredFormData = {
  data: PartialBirthRegistrationFormData;
  savedAt: string;
  expiresAt: string;
};

/**
 * Error structure for validation
 */
export type FormError = {
  field: string;
  message: string;
};
