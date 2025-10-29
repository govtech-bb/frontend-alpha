import { z } from "zod";

/**
 * Zod schema for birth registration form data validation
 *
 * This schema validates the structure of data stored in localStorage.
 * All fields are optional to support partial form completion during auto-save.
 * Runtime validation prevents corrupted or incompatible data from breaking the app.
 */

// Person details schema (father and mother when father is included)
const personDetailsSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  hadOtherSurname: z.enum(["yes", "no", ""]).optional(),
  otherSurname: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  nationalRegistrationNumber: z.string().optional(),
  occupation: z.string().optional(),
});

// Child details schema
const childDetailsSchema = z.object({
  firstNames: z.string().optional(),
  middleNames: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  sexAtBirth: z.string().optional(),
  parishOfBirth: z.string().optional(),
});

/**
 * Main schema for partial birth registration form data
 * Used by useFormStorage for runtime validation
 */
export const birthRegistrationSchema = z.object({
  // Marriage status and father inclusion
  marriageStatus: z.enum(["yes", "no", ""]).optional(),
  includeFatherDetails: z.enum(["yes", "no", ""]).optional(),

  // Parent details (optional because not all paths collect them)
  father: personDetailsSchema.optional(),
  mother: personDetailsSchema.optional(),

  // Child details
  child: childDetailsSchema.optional(),

  // Certificates
  numberOfCertificates: z.number().optional(),

  // Contact information
  email: z.string().optional(),
  wantContact: z.enum(["yes", "no", ""]).optional(),
  phoneNumber: z.string().optional(),
});

/**
 * Type inferred from schema - ensures type safety
 * This should match PartialBirthRegistrationFormData from types.ts
 */
export type BirthRegistrationFormData = z.infer<typeof birthRegistrationSchema>;

/**
 * Per-step validation schemas
 * These enforce required fields for each form step
 */

// Father's details validation
export const fatherDetailsValidation = z.object({
  firstName: z.string().min(1, "Enter the father's first name"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Enter the father's last name"),
  hadOtherSurname: z.enum(["yes", "no", ""]).optional(),
  otherSurname: z.string().optional(),
  dateOfBirth: z.string().min(1, "Enter the father's date of birth"),
  address: z.string().min(1, "Enter the father's current address"),
  nationalRegistrationNumber: z
    .string()
    .min(1, "Enter the father's national registration number"),
  occupation: z.string().optional(),
});

// Mother's details validation
export const motherDetailsValidation = z.object({
  firstName: z.string().min(1, "Enter the mother's first name"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Enter the mother's last name"),
  hadOtherSurname: z.enum(["yes", "no", ""]).optional(),
  otherSurname: z.string().optional(),
  dateOfBirth: z.string().min(1, "Enter the mother's date of birth"),
  address: z.string().min(1, "Enter the mother's current address"),
  nationalRegistrationNumber: z
    .string()
    .min(1, "Enter the mother's national registration number"),
  occupation: z.string().optional(),
});

// Child's details validation
export const childDetailsValidation = z.object({
  firstNames: z.string().min(1, "Enter the child's first name"),
  middleNames: z.string().optional(),
  lastName: z.string().min(1, "Enter the child's last name"),
  dateOfBirth: z.string().min(1, "Enter the child's date of birth"),
  sexAtBirth: z.string().min(1, "Enter the child's sex at birth"),
  parishOfBirth: z.string().min(1, "Enter the child's place of birth"),
});

// Certificates validation
export const certificatesValidation = z.object({
  numberOfCertificates: z
    .number()
    .min(0, "Number of certificates must be at least 0")
    .max(20, "Number of certificates must be 20 or less"),
});

// Contact info validation
export const contactInfoValidation = z.object({
  email: z.string().email("Enter a valid email address"),
  wantContact: z
    .enum(["yes", "no"])
    .or(z.literal(""))
    .refine((val) => val === "yes" || val === "no", {
      message: "Select whether you want to be contacted",
    }),
  phoneNumber: z.string().optional(),
});

// Contact info with conditional phone validation
export const contactInfoValidationWithPhone = z.object({
  email: z.string().email("Enter a valid email address"),
  wantContact: z.literal("yes"),
  phoneNumber: z.string().min(1, "Enter a phone number"),
});
