import { z } from "zod";
import { isValidBirthDate } from "@/lib/dates";

/**
 * Zod schema for birth registration form data validation
 *
 * This schema validates the structure of data stored in localStorage.
 * All fields are optional to support partial form completion during auto-save.
 * Runtime validation prevents corrupted or incompatible data from breaking the app.
 */

// National Registration Number format: XXXXXX-XXXX (6 digits, dash, 4 digits)
const NRN_REGEX = /^\d{6}-\d{4}$/;

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
  passportNumber: z.string().optional(),
  occupation: z.string().optional(),
});

// Child details schema
const childDetailsSchema = z.object({
  firstNames: z.string().optional(),
  middleNames: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  sexAtBirth: z.enum(["Male", "Female", "Intersex"]).optional(),
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

/**
 * Shared validation function for person identifiers
 * Applies refinements to ensure at least one identifier is provided and validates format
 */
function applyIdentifierValidation<T extends z.ZodTypeAny>(schema: T) {
  return schema
    .refine(
      // biome-ignore lint/suspicious/noExplicitAny: Zod refine callbacks require any for generic schemas
      (data: any) => {
        // At least one identifier must be provided
        const hasNationalReg =
          data.nationalRegistrationNumber &&
          data.nationalRegistrationNumber.trim().length > 0;
        const hasPassport =
          data.passportNumber && data.passportNumber.trim().length > 0;
        return hasNationalReg || hasPassport;
      },
      {
        message:
          "Enter either a National Registration Number or a Passport Number",
        path: ["nationalRegistrationNumber"],
      }
    )
    .refine(
      // biome-ignore lint/suspicious/noExplicitAny: Zod refine callbacks require any for generic schemas
      (data: any) => {
        // Validate national registration format if provided
        if (
          data.nationalRegistrationNumber &&
          data.nationalRegistrationNumber.trim().length > 0
        ) {
          return NRN_REGEX.test(data.nationalRegistrationNumber);
        }
        return true;
      },
      {
        message:
          "Enter the National Registration Number in the format XXXXXX-XXXX (for example, 123456-7890)",
        path: ["nationalRegistrationNumber"],
      }
    );
}

/**
 * Factory function to create person details validation schema
 * Eliminates duplication between father and mother schemas
 *
 * @param personType - Type of person ("father" or "mother")
 * @returns Zod schema with person-specific error messages
 */
function createPersonDetailsSchema(personType: "father" | "mother") {
  return applyIdentifierValidation(
    z.object({
      firstName: z.preprocess(
        (val) => val ?? "",
        z.string().min(1, `Enter the ${personType}'s first name`)
      ),
      middleName: z.string().optional(),
      lastName: z.preprocess(
        (val) => val ?? "",
        z.string().min(1, `Enter the ${personType}'s last name`)
      ),
      hadOtherSurname: z.enum(["yes", "no", ""]).optional(),
      otherSurname: z.string().optional(),
      dateOfBirth: z.preprocess(
        (val) => val ?? "",
        z
          .string()
          .min(1, `Enter the ${personType}'s date of birth`)
          .refine((val) => isValidBirthDate(val), {
            message:
              "Enter a valid date (for example, 27 3 2007 or 27 Mar 2007)",
          })
      ),
      address: z.preprocess(
        (val) => val ?? "",
        z.string().min(1, `Enter the ${personType}'s current address`)
      ),
      nationalRegistrationNumber: z.string().optional(),
      passportNumber: z.string().optional(),
      occupation: z.preprocess(
        (val) => val ?? "",
        z.string().min(1, `Enter the ${personType}'s occupation`)
      ),
    })
  );
}

// Father's details validation
export const fatherDetailsValidation = createPersonDetailsSchema("father");

// Mother's details validation
export const motherDetailsValidation = createPersonDetailsSchema("mother");

// Child's details validation
export const childDetailsValidation = z.object({
  firstNames: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter the child's first name")
  ),
  middleNames: z.string().optional(),
  lastName: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter the child's last name")
  ),
  dateOfBirth: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(1, "Enter the child's date of birth")
      .refine((val) => isValidBirthDate(val), {
        message:
          "Enter a valid date (for example, 27 3 2007 or 27 Mar 2007). Date cannot be in the future",
      })
  ),
  sexAtBirth: z.enum(["Male", "Female", "Intersex"], {
    message: "Select the child's sex at birth",
  }),
  parishOfBirth: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter the child's place of birth")
  ),
});

// Marriage status validation
export const marriageStatusValidation = z.object({
  marriageStatus: z.enum(["yes", "no"], {
    message:
      "Select yes if the mother and father were married when the child was born",
  }),
});

// Include father details validation
export const includeFatherDetailsValidation = z.object({
  includeFatherDetails: z.enum(["yes", "no"], {
    message: "Select yes if you want to include the father's details",
  }),
});

// Certificates validation
export const certificatesValidation = z.object({
  numberOfCertificates: z
    .number()
    .min(0, "Number of certificates must be at least 0")
    .max(20, "Number of certificates must be 20 or less"),
});

// Contact info validation - simplified to always require both email and phone
export const contactInfoValidation = z.object({
  email: z.preprocess(
    (val) => val ?? "",
    z.string().email("Enter a valid email address")
  ),
  phoneNumber: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter a phone number")
  ),
});

/**
 * Final submission schema for check-answers validation
 * Ensures all required data is present and valid before allowing submission
 */
export const finalSubmissionSchema = z.object({
  // Required: Mother's details
  mother: motherDetailsValidation,

  // Required: Child's details
  child: childDetailsValidation,

  // Required: Email for confirmation
  email: z.preprocess(
    (val) => val ?? "",
    z.string().email("Enter a valid email address")
  ),

  // Optional: Father's details (depends on marriage status or includeFatherDetails)
  father: fatherDetailsValidation.optional(),

  // Optional: Marriage and father inclusion status
  marriageStatus: z.enum(["yes", "no", ""]).optional(),
  includeFatherDetails: z.enum(["yes", "no", ""]).optional(),

  // Optional: Number of certificates (defaults to 0)
  numberOfCertificates: z.number().min(0).max(20).optional(),

  // Optional: Phone contact
  phoneNumber: z.string().optional(),
  wantContact: z.enum(["yes", "no", ""]).optional(),
});
