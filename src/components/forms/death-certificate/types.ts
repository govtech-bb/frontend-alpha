/**
 * Type definitions for Death Certificate Application form
 */

/**
 * Complete form data representing a death certificate application.
 * All fields are required for final submission.
 */
export type DeathCertificateData = {
  // Applicant Details (Section 1)
  applicantName: string;
  applicantAddress: string;
  applicantNationalRegistrationNo: string;

  // Relationship & Request (Section 2)
  relationshipToDeceased: string;
  reasonForRequest: string;
  numberOfCertificates: number;
  causeOfDeath: string;

  // Death Details (Section 3)
  deceasedSurname: string;
  deceasedChristianNames: string;
  dateOfDeath: string; // YYYY-MM-DD format
  deceasedNationalRegistrationNo: string;
  placeOfDeath: string;
};

/**
 * Partial form data used during form filling.
 * All fields are optional to support progressive data entry and auto-save.
 */
export type PartialDeathCertificateData = {
  // Applicant Details
  applicantName?: string;
  applicantAddress?: string;
  applicantNationalRegistrationNo?: string;

  // Relationship & Request
  relationshipToDeceased?: string;
  reasonForRequest?: string;
  numberOfCertificates?: number;
  causeOfDeath?: string;

  // Death Details
  deceasedSurname?: string;
  deceasedChristianNames?: string;
  dateOfDeath?: string;
  deceasedNationalRegistrationNo?: string;
  placeOfDeath?: string;
};

/**
 * Step identifiers for the death certificate application form.
 * Linear flow - all users follow the same path.
 */
export type StepName =
  | "applicant-details"
  | "relationship-request"
  | "death-details"
  | "check-answers"
  | "confirmation";

/**
 * Form step configuration
 */
export type FormStep = {
  id: StepName;
  title: string;
};
