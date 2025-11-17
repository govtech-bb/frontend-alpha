/**
 * TypeScript type definitions for YDP Community Sports Training Programme
 *
 * GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from form-spec.ts
 */

/**
 * Partial form data (used during form filling)
 * All fields optional to support progressive completion
 */
export type PartialYdpCommunitySportsTrainingData = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  disciplineOfInterest?: string;
  hasExperience?: string;
  experienceLevel?: string;
  experienceOther?: string;
  yearsOfExperience?: string;
  employmentStatus?: string;
  employmentOther?: string;
  institutionName?: string;
  belongsToOrganisation?: string;
  organisationName?: string;
  addressLine1?: string;
  addressLine2?: string;
  parish?: string;
  telephoneNumber?: string;
  emergencyFirstName?: string;
  emergencyLastName?: string;
  emergencyAddressLine1?: string;
  emergencyAddressLine2?: string;
  emergencyParish?: string;
  emergencyTelephoneNumber?: string;
};

/**
 * Complete form data (required for submission)
 */
export type YdpCommunitySportsTrainingData = Required<PartialYdpCommunitySportsTrainingData>;

/**
 * Step identifiers
 */
export type StepName =
  | "personal-details"
  | "sport-interest"
  | "experience-details"
  | "employment-status"
  | "organisations"
  | "contact-details"
  | "emergency-contact"
  | "check-answers"
  | "confirmation";

/**
 * Form step definition
 */
export type FormStep = {
  id: StepName;
  title: string;
  isComplete?: boolean;
};
