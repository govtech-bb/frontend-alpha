/**
 * TypeScript type definitions for Mentorship Application
 *
 * GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from form-spec.ts
 */

/**
 * Partial form data (used during form filling)
 * All fields optional to support progressive completion
 */
export type PartialMentorshipApplicationData = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  employmentStatus?: string;
  employmentStatusOther?: string;
  addressLine1?: string;
  addressLine2?: string;
  parish?: string;
  telephoneNumber?: string;
  emailAddress?: string;
  whyMentor?: string;
  strongestCompetencies?: string;
  whatCanMenteeLearn?: string;
  preferFormat?: string;
  inPersonMentee?: string;
  mindsetTraining?: string;
  menteeName?: string;
  qualificationsExperience?: string;
  yearsExperienceMentor?: string;
  workExperienceOutside?: string;
  professionalReference?: string;
  personalReference?: string;
};

/**
 * Complete form data (required for submission)
 */
export type MentorshipApplicationData =
  Required<PartialMentorshipApplicationData>;

/**
 * Step identifiers
 */
export type StepName =
  | "your-details"
  | "contact-details"
  | "about-mentorship"
  | "preferences"
  | "experience"
  | "references"
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
