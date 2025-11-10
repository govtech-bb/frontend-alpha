/**
 * Type definitions for the Fishing License application form
 *
 * Uses discriminated unions to represent two distinct paths:
 * - River fishing license
 * - Sea fishing license
 */

// Common fields present in all application paths
type BaseFields = {
  // Additional questions (common to both paths)
  fullName: string;
  email: string;
  phone: string;
  licenseDuration: "1" | "3" | "5";
  emergencyContactName: string;
  emergencyContactPhone: string;
};

/**
 * River fishing license path
 */
export interface RiverFishingLicense extends BaseFields {
  licenseType: "river";
  preferredLocation: string;
  equipmentType: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
}

/**
 * Sea fishing license path
 */
export interface SeaFishingLicense extends BaseFields {
  licenseType: "sea";
  hasBoat: "yes" | "no";
  vesselRegistration?: string;
  intendedZone: string;
}

/**
 * Main discriminated union - represents a complete, valid form submission
 */
export type FishingLicenseFormData = RiverFishingLicense | SeaFishingLicense;

/**
 * Partial version for in-progress forms
 * All fields optional to allow incremental completion
 */
export type PartialFishingLicenseFormData = {
  // Discriminator
  licenseType?: "river" | "sea" | "";

  // River-specific fields
  preferredLocation?: string;
  equipmentType?: string;
  experienceLevel?: "beginner" | "intermediate" | "advanced" | "";

  // Sea-specific fields
  hasBoat?: "yes" | "no" | "";
  vesselRegistration?: string;
  intendedZone?: string;

  // Common fields
  fullName?: string;
  email?: string;
  phone?: string;
  licenseDuration?: "1" | "3" | "5" | "";
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

/**
 * Step identifiers for navigation
 */
export type StepName =
  | "license-type"
  | "river-details"
  | "sea-details"
  | "additional-questions"
  | "check-answers"
  | "confirmation";
