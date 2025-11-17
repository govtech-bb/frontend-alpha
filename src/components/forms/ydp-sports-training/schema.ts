/**
 * Validation schemas for YDP Community Sports Training Programme
 *
 * GENERATED FILE - Maps JSON validation rules to Zod schemas
 *
 * ✅ Auto-generated from JSON spec:
 * - Storage schema (all fields optional)
 * - Step validation schemas (from validation registry)
 * - Final combined schema (using .merge())
 *
 * Validation strategy:
 * 1. Storage schema (permissive) - for auto-save functionality
 * 2. Per-step schemas (strict) - for form progression validation
 */

import { z } from "zod";
import { validateFields } from "@govtech-bb/forms";
import { validationRegistry } from "@govtech-bb/forms";

/**
 * Layer 1: Storage Schema (Permissive)
 * Used for sessionStorage auto-save. All fields optional.
 *
 * ✅ FULLY GENERATED - No manual editing needed
 */
export const ydpCommunitySportsTrainingStorageSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  disciplineOfInterest: z.string().optional(),
  hasExperience: z.string().optional(),
  experienceLevel: z.string().optional(),
  experienceOther: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  employmentStatus: z.string().optional(),
  employmentOther: z.string().optional(),
  institutionName: z.string().optional(),
  belongsToOrganisation: z.string().optional(),
  organisationName: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  parish: z.string().optional(),
  telephoneNumber: z.string().optional(),
  emergencyFirstName: z.string().optional(),
  emergencyLastName: z.string().optional(),
  emergencyAddressLine1: z.string().optional(),
  emergencyAddressLine2: z.string().optional(),
  emergencyParish: z.string().optional(),
  emergencyTelephoneNumber: z.string().optional(),
});

/**
 * Layer 2: Per-Step Validation Schemas (Strict)
 *
 * ✅ Auto-generated from validation registry
 * Uses predefined validation rules from @govtech-bb/forms
 */

/**
 * Tell us about yourself validation
 */
export const personalDetailsValidation = z.object({
  firstName: validationRegistry.maxLength({ length: 200 }),
  lastName: validationRegistry.maxLength({ length: 200 }),
  dateOfBirth: validationRegistry.pastDate({ message: "Date of birth must be in the past" }),
  gender: validationRegistry.required({ message: "Select your gender" }),
});

/**
 * What sport discipline are you interested in? validation
 */
export const sportInterestValidation = z.object({
  disciplineOfInterest: validationRegistry.maxLength({ length: 200 }),
  hasExperience: validationRegistry.required({ message: "Select whether you have experience" }),
});

/**
 * Tell us about your experience validation
 */
export const experienceDetailsValidation = z.object({
  experienceLevel: validationRegistry.required({ message: "Select your experience level" }),
  experienceOther: validationRegistry.maxLength({ length: 200 }).optional(),
  yearsOfExperience: validationRegistry.maxValue({ value: 100, message: "Years must be less than 100" }),
});

/**
 * What is your employment status? validation
 */
export const employmentStatusValidation = z.object({
  employmentStatus: validationRegistry.required({ message: "Select your employment status" }),
  employmentOther: validationRegistry.maxLength({ length: 200 }).optional(),
  institutionName: validationRegistry.maxLength({ length: 200 }).optional(),
});

/**
 * Do you belong to any organisations? validation
 */
export const organisationsValidation = z.object({
  belongsToOrganisation: validationRegistry.required({ message: "Select whether you belong to any organisations" }),
  organisationName: validationRegistry.maxLength({ length: 200 }).optional(),
});

/**
 * Your contact details validation
 */
export const contactDetailsValidation = z.object({
  addressLine1: validationRegistry.maxLength({ length: 200 }),
  addressLine2: validationRegistry.maxLength({ length: 200 }),
  parish: validationRegistry.required({ message: "Select your parish" }),
  telephoneNumber: validationRegistry.maxLength({ length: 20 }),
});

/**
 * Emergency contact validation
 */
export const emergencyContactValidation = z.object({
  emergencyFirstName: validationRegistry.maxLength({ length: 200 }),
  emergencyLastName: validationRegistry.maxLength({ length: 200 }),
  emergencyAddressLine1: validationRegistry.maxLength({ length: 200 }),
  emergencyAddressLine2: validationRegistry.maxLength({ length: 200 }),
  emergencyParish: validationRegistry.required({ message: "Select emergency contact's parish" }),
  emergencyTelephoneNumber: validationRegistry.maxLength({ length: 20 }),
});

/**
 * Layer 3: Final Submission Schema
 * Used for check-answers page to validate all data before submission
 *
 * ✅ FULLY GENERATED - No manual editing needed
 * Using .merge() to automatically combine all step schemas.
 */
export const finalYdpCommunitySportsTrainingValidation = personalDetailsValidation
  .merge(sportInterestValidation)
  .merge(employmentStatusValidation)
  .merge(organisationsValidation)
  .merge(contactDetailsValidation)
  .merge(emergencyContactValidation)
  .merge(experienceDetailsValidation.partial());
