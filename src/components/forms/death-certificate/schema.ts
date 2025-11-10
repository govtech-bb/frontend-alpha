/**
 * Validation schemas for Death Certificate Application form
 *
 * Two-layer validation strategy:
 * 1. Storage schema (permissive) - for auto-save functionality
 * 2. Per-step schemas (strict) - for form progression validation
 */

import { z } from "zod";
import { validateFields } from "@/lib/dates";

/**
 * Layer 1: Storage Schema (Permissive)
 * Used for sessionStorage auto-save. All fields optional.
 */
export const deathCertificateStorageSchema = z.object({
  // Applicant Details
  applicantName: z.string().optional(),
  applicantAddress: z.string().optional(),
  applicantNationalRegistrationNo: z.string().optional(),

  // Relationship & Request
  relationshipToDeceased: z.string().optional(),
  reasonForRequest: z.string().optional(),
  numberOfCertificates: z.number().optional(),
  causeOfDeath: z.string().optional(),

  // Death Details
  deceasedSurname: z.string().optional(),
  deceasedChristianNames: z.string().optional(),
  dateOfDeath: z.string().optional(),
  deceasedNationalRegistrationNo: z.string().optional(),
  placeOfDeath: z.string().optional(),
});

/**
 * Layer 2: Per-Step Validation Schemas (Strict)
 */

/**
 * Step 1: Applicant Details validation
 */
export const applicantDetailsValidation = z.object({
  applicantName: z
    .string()
    .min(1, "Enter your full name")
    .max(200, "Name must be 200 characters or less"),
  applicantAddress: z
    .string()
    .min(1, "Enter your address")
    .max(500, "Address must be 500 characters or less"),
  applicantNationalRegistrationNo: z
    .string()
    .min(1, "Enter your National Registration Number")
    .regex(
      /^[A-Z0-9-]+$/i,
      "National Registration Number must contain only letters, numbers, and hyphens"
    )
    .max(50, "National Registration Number must be 50 characters or less"),
});

/**
 * Step 2: Relationship & Request validation
 */
export const relationshipRequestValidation = z.object({
  relationshipToDeceased: z
    .string()
    .min(1, "Enter your relationship to the deceased")
    .max(200, "Relationship must be 200 characters or less"),
  reasonForRequest: z
    .string()
    .min(1, "Enter the reason for requesting this certificate")
    .max(500, "Reason must be 500 characters or less"),
  numberOfCertificates: z
    .number({
      required_error: "Enter the number of certificates required",
      invalid_type_error: "Enter a valid number",
    })
    .int("Number of certificates must be a whole number")
    .min(1, "You must request at least 1 certificate")
    .max(10, "You can request a maximum of 10 certificates"),
  causeOfDeath: z
    .string()
    .min(1, "Enter the cause of death")
    .max(200, "Cause of death must be 200 characters or less"),
});

/**
 * Step 3: Death Details validation
 */
export const deathDetailsValidation = z.object({
  deceasedSurname: z
    .string()
    .min(1, "Enter the deceased's surname")
    .max(100, "Surname must be 100 characters or less"),
  deceasedChristianNames: z
    .string()
    .min(1, "Enter the deceased's Christian names")
    .max(200, "Christian names must be 200 characters or less"),
  dateOfDeath: z
    .string()
    .min(1, "Enter the date of death")
    .refine(
      (val) => {
        if (!val) return false;
        const errors = validateFields(val);
        return errors === null;
      },
      { message: "Enter a valid date of death" }
    ),
  deceasedNationalRegistrationNo: z
    .string()
    .min(1, "Enter the deceased's National Registration Number")
    .regex(
      /^[A-Z0-9-]+$/i,
      "National Registration Number must contain only letters, numbers, and hyphens"
    )
    .max(50, "National Registration Number must be 50 characters or less"),
  placeOfDeath: z
    .string()
    .min(1, "Enter the place of death")
    .max(200, "Place of death must be 200 characters or less"),
});

/**
 * Layer 3: Final Submission Schema
 * Used for check-answers page to validate all data before submission
 */
export const finalDeathCertificateValidation = z.object({
  // Applicant Details
  applicantName: applicantDetailsValidation.shape.applicantName,
  applicantAddress: applicantDetailsValidation.shape.applicantAddress,
  applicantNationalRegistrationNo:
    applicantDetailsValidation.shape.applicantNationalRegistrationNo,

  // Relationship & Request
  relationshipToDeceased:
    relationshipRequestValidation.shape.relationshipToDeceased,
  reasonForRequest: relationshipRequestValidation.shape.reasonForRequest,
  numberOfCertificates:
    relationshipRequestValidation.shape.numberOfCertificates,
  causeOfDeath: relationshipRequestValidation.shape.causeOfDeath,

  // Death Details
  deceasedSurname: deathDetailsValidation.shape.deceasedSurname,
  deceasedChristianNames: deathDetailsValidation.shape.deceasedChristianNames,
  dateOfDeath: deathDetailsValidation.shape.dateOfDeath,
  deceasedNationalRegistrationNo:
    deathDetailsValidation.shape.deceasedNationalRegistrationNo,
  placeOfDeath: deathDetailsValidation.shape.placeOfDeath,
});
