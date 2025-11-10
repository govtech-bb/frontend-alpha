import { describe, expect, it } from "vitest";
import {
  additionalQuestionsValidation,
  finalSubmissionSchema,
  licenseTypeValidation,
  riverDetailsValidation,
  seaDetailsValidation,
} from "../schema";

describe("licenseTypeValidation", () => {
  it("should accept 'river' as valid", () => {
    const result = licenseTypeValidation.safeParse({ licenseType: "river" });
    expect(result.success).toBe(true);
  });

  it("should accept 'sea' as valid", () => {
    const result = licenseTypeValidation.safeParse({ licenseType: "sea" });
    expect(result.success).toBe(true);
  });

  it("should reject empty string with message", () => {
    const result = licenseTypeValidation.safeParse({ licenseType: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Select the type of fishing license you need"
      );
    }
  });

  it("should reject undefined", () => {
    const result = licenseTypeValidation.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("riverDetailsValidation", () => {
  it("should accept valid river details", () => {
    const result = riverDetailsValidation.safeParse({
      preferredLocation: "Codrington River",
      equipmentType: "rod-and-reel",
      experienceLevel: "intermediate",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty preferred location", () => {
    const result = riverDetailsValidation.safeParse({
      preferredLocation: "",
      equipmentType: "rod-and-reel",
      experienceLevel: "beginner",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty equipment type", () => {
    const result = riverDetailsValidation.safeParse({
      preferredLocation: "Constitution River",
      equipmentType: "",
      experienceLevel: "beginner",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid experience level", () => {
    const result = riverDetailsValidation.safeParse({
      preferredLocation: "Constitution River",
      equipmentType: "net",
      experienceLevel: "expert",
    });
    expect(result.success).toBe(false);
  });
});

describe("seaDetailsValidation", () => {
  it("should accept valid sea details without vessel registration", () => {
    const result = seaDetailsValidation.safeParse({
      hasBoat: "no",
      intendedZone: "coastal-waters",
    });
    expect(result.success).toBe(true);
  });

  it("should accept valid sea details with vessel registration", () => {
    const result = seaDetailsValidation.safeParse({
      hasBoat: "yes",
      vesselRegistration: "BB-12345",
      intendedZone: "offshore",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid hasBoat value", () => {
    const result = seaDetailsValidation.safeParse({
      hasBoat: "maybe",
      intendedZone: "coastal-waters",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty intended zone", () => {
    const result = seaDetailsValidation.safeParse({
      hasBoat: "no",
      intendedZone: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("additionalQuestionsValidation", () => {
  const validData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 246 123 4567",
    licenseDuration: "3",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 246 987 6543",
  };

  it("should accept valid additional questions data", () => {
    const result = additionalQuestionsValidation.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject empty full name", () => {
    const result = additionalQuestionsValidation.safeParse({
      ...validData,
      fullName: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email format", () => {
    const result = additionalQuestionsValidation.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid phone format", () => {
    const result = additionalQuestionsValidation.safeParse({
      ...validData,
      phone: "abc123",
    });
    expect(result.success).toBe(false);
  });

  it("should accept valid phone formats", () => {
    const validPhones = [
      "+1 246 123 4567",
      "246-123-4567",
      "(246) 123-4567",
      "2461234567",
    ];

    for (const phone of validPhones) {
      const result = additionalQuestionsValidation.safeParse({
        ...validData,
        phone,
      });
      expect(result.success).toBe(true);
    }
  });

  it("should reject invalid license duration", () => {
    const result = additionalQuestionsValidation.safeParse({
      ...validData,
      licenseDuration: "10",
    });
    expect(result.success).toBe(false);
  });
});

describe("finalSubmissionSchema", () => {
  const baseRiverData = {
    licenseType: "river" as const,
    preferredLocation: "Codrington River",
    equipmentType: "rod-and-reel",
    experienceLevel: "intermediate" as const,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 246 123 4567",
    licenseDuration: "3" as const,
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 246 987 6543",
  };

  const baseSeaData = {
    licenseType: "sea" as const,
    hasBoat: "yes" as const,
    vesselRegistration: "BB-12345",
    intendedZone: "offshore",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 246 123 4567",
    licenseDuration: "3" as const,
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 246 987 6543",
  };

  it("should accept complete river fishing data", () => {
    const result = finalSubmissionSchema.safeParse(baseRiverData);
    expect(result.success).toBe(true);
  });

  it("should accept complete sea fishing data", () => {
    const result = finalSubmissionSchema.safeParse(baseSeaData);
    expect(result.success).toBe(true);
  });

  it("should reject river data missing river-specific fields", () => {
    const result = finalSubmissionSchema.safeParse({
      ...baseRiverData,
      preferredLocation: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should reject sea data missing sea-specific fields", () => {
    const result = finalSubmissionSchema.safeParse({
      ...baseSeaData,
      intendedZone: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should require vessel registration when hasBoat is yes", () => {
    const result = finalSubmissionSchema.safeParse({
      ...baseSeaData,
      vesselRegistration: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should not require vessel registration when hasBoat is no", () => {
    const result = finalSubmissionSchema.safeParse({
      ...baseSeaData,
      hasBoat: "no" as const,
      vesselRegistration: undefined,
    });
    expect(result.success).toBe(true);
  });
});
