/**
 * Zod schema for Passport Replacement Form validation
 */

import { z } from "zod";

export const passportReplacementSchema = z.object({
  // Personal Information
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  email: z.string().email("Please enter a valid email address"),

  phoneNumber: z.string().min(10, "Please enter a valid phone number"),

  // Passport Information
  currentPassportNumber: z
    .string()
    .min(6, "Passport number must be at least 6 characters")
    .max(20, "Passport number must not exceed 20 characters")
    .regex(
      /^[A-Z0-9]+$/,
      "Passport number must contain only letters and numbers"
    ),

  reasonForReplacement: z.enum(["lost", "stolen", "damaged", "expired"]),

  // Delivery Information
  deliveryAddress: z
    .string()
    .min(10, "Delivery address must be at least 10 characters")
    .max(200, "Delivery address must not exceed 200 characters"),

  parish: z.enum([
    "Christ Church",
    "St. Andrew",
    "St. George",
    "St. James",
    "St. John",
    "St. Joseph",
    "St. Lucy",
    "St. Michael",
    "St. Peter",
    "St. Philip",
    "St. Thomas",
  ]),

  // Optional reference number (generated server-side)
  referenceNumber: z.string().optional(),
});

export type PassportReplacementFormData = z.infer<
  typeof passportReplacementSchema
>;
