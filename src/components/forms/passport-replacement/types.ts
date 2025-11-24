/**
 * Types for Passport Replacement Form
 */

export interface PassportReplacementFormData {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;

  // Passport Information
  currentPassportNumber: string;
  reasonForReplacement: "lost" | "stolen" | "damaged" | "expired";

  // Delivery Information
  deliveryAddress: string;
  parish: string;

  // Payment tracking (generated)
  referenceNumber?: string; // UUID generated on submission
}

export type PartialPassportReplacementFormData =
  Partial<PassportReplacementFormData>;
