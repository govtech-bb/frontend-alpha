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
