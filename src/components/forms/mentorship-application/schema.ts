/**
 * Validation schemas for Mentorship Application
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

import { validationRegistry } from "@govtech-bb/forms";
import { z } from "zod";

/**
 * Layer 1: Storage Schema (Permissive)
 * Used for sessionStorage auto-save. All fields optional.
 *
 * ✅ FULLY GENERATED - No manual editing needed
 */
export const mentorshipApplicationStorageSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  employmentStatus: z.string().optional(),
  employmentStatusOther: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  parish: z.string().optional(),
  telephoneNumber: z.string().optional(),
  emailAddress: z.string().optional(),
  whyMentor: z.string().optional(),
  strongestCompetencies: z.string().optional(),
  whatCanMenteeLearn: z.string().optional(),
  preferFormat: z.string().optional(),
  inPersonMentee: z.string().optional(),
  mindsetTraining: z.string().optional(),
  menteeName: z.string().optional(),
  qualificationsExperience: z.string().optional(),
  yearsExperienceMentor: z.string().optional(),
  workExperienceOutside: z.string().optional(),
  professionalReference: z.string().optional(),
  personalReference: z.string().optional(),
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
export const yourDetailsValidation = z.object({
  firstName: validationRegistry.maxLength({ length: 100 }),
  lastName: validationRegistry.maxLength({ length: 100 }),
  dateOfBirth: validationRegistry.pastDate({
    message: "Date of birth must be in the past",
  }),
  employmentStatus: validationRegistry.required({
    message: "Select your employment status",
  }),
  employmentStatusOther: validationRegistry
    .maxLength({ length: 200 })
    .optional(),
});

/**
 * Your contact details validation
 */
export const contactDetailsValidation = z.object({
  addressLine1: validationRegistry.maxLength({ length: 200 }),
  addressLine2: validationRegistry.maxLength({ length: 200 }),
  parish: validationRegistry.required({ message: "Select your parish" }),
  telephoneNumber: validationRegistry.pattern({
    pattern: "^\\+?[0-9\\s\\-()]{7,20}$",
    message: "Enter a valid telephone number",
  }),
  emailAddress: validationRegistry.email({
    message: "Enter a valid email address",
  }),
});

/**
 * Tell us about being a mentor validation
 */
export const aboutMentorshipValidation = z.object({
  whyMentor: validationRegistry.maxLength({ length: 1000 }),
  strongestCompetencies: validationRegistry.maxLength({ length: 1000 }),
  whatCanMenteeLearn: validationRegistry.maxLength({ length: 1000 }),
});

/**
 * Preferences validation
 */
export const preferencesValidation = z.object({
  preferFormat: validationRegistry.required({
    message: "Select your preference",
  }),
  inPersonMentee: validationRegistry.required({ message: "Select an option" }),
  mindsetTraining: validationRegistry.required({ message: "Select an option" }),
  menteeName: validationRegistry.maxLength({ length: 150 }).optional(),
});

/**
 * Experience validation
 */
export const experienceValidation = z.object({
  qualificationsExperience: validationRegistry.maxLength({ length: 1000 }),
  yearsExperienceMentor: validationRegistry.maxValue({
    value: 60,
    message: "Enter a valid number of years",
  }),
  workExperienceOutside: validationRegistry.maxLength({ length: 1000 }),
});

/**
 * References validation
 */
export const referencesValidation = z.object({
  professionalReference: validationRegistry.maxLength({ length: 500 }),
  personalReference: validationRegistry.maxLength({ length: 500 }),
});

/**
 * Layer 3: Final Submission Schema
 * Used for check-answers page to validate all data before submission
 *
 * ✅ FULLY GENERATED - No manual editing needed
 * Using .merge() to automatically combine all step schemas.
 */
export const finalMentorshipApplicationValidation = yourDetailsValidation
  .merge(contactDetailsValidation)
  .merge(aboutMentorshipValidation)
  .merge(preferencesValidation)
  .merge(experienceValidation)
  .merge(referencesValidation);
