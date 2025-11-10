/**
 * Validation schemas for the Fishing License application form
 *
 * Two-layer validation strategy:
 * 1. Storage schema (permissive) - for auto-save to sessionStorage
 * 2. Per-step schemas (strict) - for step-by-step validation
 */

import { z } from "zod";

/**
 * Storage schema - all fields optional for partial saves
 * Used by useFormStorage for auto-saving progress
 */
export const fishingLicenseStorageSchema = z.object({
  licenseType: z.enum(["river", "sea", ""]).optional(),

  // River-specific fields
  preferredLocation: z.string().optional(),
  equipmentType: z.string().optional(),
  experienceLevel: z
    .enum(["beginner", "intermediate", "advanced", ""])
    .optional(),

  // Sea-specific fields
  hasBoat: z.enum(["yes", "no", ""]).optional(),
  vesselRegistration: z.string().optional(),
  intendedZone: z.string().optional(),

  // Common fields
  fullName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  licenseDuration: z.enum(["1", "3", "5", ""]).optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

/**
 * Step 1: License Type validation
 */
export const licenseTypeValidation = z.object({
  licenseType: z.enum(["river", "sea"], {
    message: "Select the type of fishing license you need",
  }),
});

/**
 * Step 2a: River Details validation
 */
export const riverDetailsValidation = z.object({
  preferredLocation: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter your preferred river or location")
  ),
  equipmentType: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Select your fishing equipment type")
  ),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Select your experience level",
  }),
});

/**
 * Step 2b: Sea Details validation
 */
export const seaDetailsValidation = z.object({
  hasBoat: z.enum(["yes", "no"], {
    message: "Select whether you own a boat",
  }),
  intendedZone: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Select your intended fishing zone")
  ),
  vesselRegistration: z.string().optional(),
});

/**
 * Step 3: Additional Questions validation
 */
export const additionalQuestionsValidation = z.object({
  fullName: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter your full name")
  ),
  email: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(1, "Enter your email address")
      .email("Enter a valid email address")
  ),
  phone: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(1, "Enter your phone number")
      .regex(/^[0-9\s\-+()]+$/, "Enter a valid phone number")
  ),
  licenseDuration: z.enum(["1", "3", "5"], {
    message: "Select the license duration",
  }),
  emergencyContactName: z.preprocess(
    (val) => val ?? "",
    z.string().min(1, "Enter emergency contact name")
  ),
  emergencyContactPhone: z.preprocess(
    (val) => val ?? "",
    z
      .string()
      .min(1, "Enter emergency contact phone number")
      .regex(/^[0-9\s\-+()]+$/, "Enter a valid phone number")
  ),
});

/**
 * Final submission schema with conditional validation
 * Validates complete form data based on license type path
 */
export const finalSubmissionSchema = z
  .object({
    licenseType: z.enum(["river", "sea"]),

    // River fields
    preferredLocation: z.string().optional(),
    equipmentType: z.string().optional(),
    experienceLevel: z
      .enum(["beginner", "intermediate", "advanced"])
      .optional(),

    // Sea fields
    hasBoat: z.enum(["yes", "no"]).optional(),
    vesselRegistration: z.string().optional(),
    intendedZone: z.string().optional(),

    // Common required fields
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    licenseDuration: z.enum(["1", "3", "5"]),
    emergencyContactName: z.string().min(1),
    emergencyContactPhone: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    // Conditional validation for river path
    if (data.licenseType === "river") {
      const riverResult = riverDetailsValidation.safeParse({
        preferredLocation: data.preferredLocation,
        equipmentType: data.equipmentType,
        experienceLevel: data.experienceLevel,
      });

      if (!riverResult.success) {
        for (const issue of riverResult.error.issues) {
          ctx.addIssue(issue);
        }
      }
    }

    // Conditional validation for sea path
    if (data.licenseType === "sea") {
      const seaResult = seaDetailsValidation.safeParse({
        hasBoat: data.hasBoat,
        intendedZone: data.intendedZone,
        vesselRegistration: data.vesselRegistration,
      });

      if (!seaResult.success) {
        for (const issue of seaResult.error.issues) {
          ctx.addIssue(issue);
        }
      }

      // Additional validation: vessel registration required if hasBoat === "yes"
      if (data.hasBoat === "yes" && !data.vesselRegistration) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter your vessel registration number",
          path: ["vesselRegistration"],
        });
      }
    }
  });
