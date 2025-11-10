/**
 * Tests for Death Certificate Application form validation schemas
 */

import { describe, expect, it } from "vitest";
import {
  applicantDetailsValidation,
  deathCertificateStorageSchema,
  deathDetailsValidation,
  finalDeathCertificateValidation,
  relationshipRequestValidation,
} from "../schema";

describe("deathCertificateStorageSchema", () => {
  it("should accept empty object (all fields optional)", () => {
    const result = deathCertificateStorageSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("should accept partial data", () => {
    const result = deathCertificateStorageSchema.safeParse({
      applicantName: "John Smith",
      deceasedSurname: "Doe",
    });
    expect(result.success).toBe(true);
  });

  it("should accept complete valid data", () => {
    const result = deathCertificateStorageSchema.safeParse({
      applicantName: "John Smith",
      applicantAddress: "123 Main St, Bridgetown",
      applicantNationalRegistrationNo: "123456",
      relationshipToDeceased: "Son",
      reasonForRequest: "Legal purposes",
      numberOfCertificates: 2,
      causeOfDeath: "Natural causes",
      deceasedSurname: "Doe",
      deceasedChristianNames: "Jane Marie",
      dateOfDeath: "2024-01-15",
      deceasedNationalRegistrationNo: "654321",
      placeOfDeath: "QEH Bridgetown",
    });
    expect(result.success).toBe(true);
  });
});

describe("applicantDetailsValidation", () => {
  const validData = {
    applicantName: "John Smith",
    applicantAddress: "123 Main St, Bridgetown, Barbados",
    applicantNationalRegistrationNo: "ABC-123456",
  };

  it("should accept valid applicant details", () => {
    const result = applicantDetailsValidation.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject empty applicant name", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantName: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter your full name");
    }
  });

  it("should reject missing applicant name", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantName: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should reject applicant name over 200 characters", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantName: "a".repeat(201),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Name must be 200 characters or less"
      );
    }
  });

  it("should reject empty applicant address", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantAddress: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter your address");
    }
  });

  it("should reject applicant address over 500 characters", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantAddress: "a".repeat(501),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Address must be 500 characters or less"
      );
    }
  });

  it("should reject empty applicant NRN", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantNationalRegistrationNo: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Enter your National Registration Number"
      );
    }
  });

  it("should reject applicant NRN with invalid characters", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantNationalRegistrationNo: "ABC@123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "must contain only letters, numbers, and hyphens"
      );
    }
  });

  it("should accept applicant NRN with letters, numbers, and hyphens", () => {
    const result = applicantDetailsValidation.safeParse({
      ...validData,
      applicantNationalRegistrationNo: "ABC-123-XYZ",
    });
    expect(result.success).toBe(true);
  });
});

describe("relationshipRequestValidation", () => {
  const validData = {
    relationshipToDeceased: "Son",
    reasonForRequest: "For legal purposes",
    numberOfCertificates: 2,
    causeOfDeath: "Natural causes",
  };

  it("should accept valid relationship and request data", () => {
    const result = relationshipRequestValidation.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject empty relationship", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      relationshipToDeceased: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Enter your relationship to the deceased"
      );
    }
  });

  it("should reject relationship over 200 characters", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      relationshipToDeceased: "a".repeat(201),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Relationship must be 200 characters or less"
      );
    }
  });

  it("should reject empty reason for request", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      reasonForRequest: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Enter the reason for requesting this certificate"
      );
    }
  });

  it("should reject reason over 500 characters", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      reasonForRequest: "a".repeat(501),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Reason must be 500 characters or less"
      );
    }
  });

  it("should reject missing number of certificates", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      numberOfCertificates: undefined,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      // Zod returns a generic error message for missing required number field
      expect(result.error.issues[0].message).toContain("required");
    }
  });

  it("should reject non-integer number of certificates", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      numberOfCertificates: 2.5,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Number of certificates must be a whole number"
      );
    }
  });

  it("should reject number of certificates less than 1", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      numberOfCertificates: 0,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "You must request at least 1 certificate"
      );
    }
  });

  it("should reject number of certificates greater than 10", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      numberOfCertificates: 11,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "You can request a maximum of 10 certificates"
      );
    }
  });

  it("should accept 1 certificate", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      numberOfCertificates: 1,
    });
    expect(result.success).toBe(true);
  });

  it("should accept 10 certificates", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      numberOfCertificates: 10,
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty cause of death", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      causeOfDeath: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter the cause of death");
    }
  });

  it("should reject cause of death over 200 characters", () => {
    const result = relationshipRequestValidation.safeParse({
      ...validData,
      causeOfDeath: "a".repeat(201),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Cause of death must be 200 characters or less"
      );
    }
  });
});

describe("deathDetailsValidation", () => {
  const validData = {
    deceasedSurname: "Doe",
    deceasedChristianNames: "Jane Marie",
    dateOfDeath: "2024-01-15",
    deceasedNationalRegistrationNo: "XYZ-789456",
    placeOfDeath: "Queen Elizabeth Hospital, Bridgetown",
  };

  it("should accept valid death details", () => {
    const result = deathDetailsValidation.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should reject empty deceased surname", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedSurname: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Enter the deceased's surname"
      );
    }
  });

  it("should reject deceased surname over 100 characters", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedSurname: "a".repeat(101),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Surname must be 100 characters or less"
      );
    }
  });

  it("should reject empty deceased Christian names", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedChristianNames: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Enter the deceased's Christian names"
      );
    }
  });

  it("should reject deceased Christian names over 200 characters", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedChristianNames: "a".repeat(201),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Christian names must be 200 characters or less"
      );
    }
  });

  it("should reject invalid date format", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      dateOfDeath: "15/01/2024",
    });
    expect(result.success).toBe(false);
  });

  it("should reject future date of death", () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const futureDateStr = futureDate.toISOString().split("T")[0];

    const result = deathDetailsValidation.safeParse({
      ...validData,
      dateOfDeath: futureDateStr,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      // validateFields returns "Date cannot be in the future" error
      expect(result.error.issues[0].message).toContain("valid");
    }
  });

  it("should accept today as date of death", () => {
    const today = new Date().toISOString().split("T")[0];
    const result = deathDetailsValidation.safeParse({
      ...validData,
      dateOfDeath: today,
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty deceased NRN", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedNationalRegistrationNo: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Enter the deceased's National Registration Number"
      );
    }
  });

  it("should reject deceased NRN with invalid characters", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedNationalRegistrationNo: "XYZ@789",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain(
        "must contain only letters, numbers, and hyphens"
      );
    }
  });

  it("should accept deceased NRN with letters, numbers, and hyphens", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      deceasedNationalRegistrationNo: "XYZ-789-ABC",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty place of death", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      placeOfDeath: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter the place of death");
    }
  });

  it("should reject place of death over 200 characters", () => {
    const result = deathDetailsValidation.safeParse({
      ...validData,
      placeOfDeath: "a".repeat(201),
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Place of death must be 200 characters or less"
      );
    }
  });
});

describe("finalDeathCertificateValidation", () => {
  const validCompleteData = {
    applicantName: "John Smith",
    applicantAddress: "123 Main St, Bridgetown, Barbados",
    applicantNationalRegistrationNo: "ABC-123456",
    relationshipToDeceased: "Son",
    reasonForRequest: "For legal purposes",
    numberOfCertificates: 2,
    causeOfDeath: "Natural causes",
    deceasedSurname: "Doe",
    deceasedChristianNames: "Jane Marie",
    dateOfDeath: "2024-01-15",
    deceasedNationalRegistrationNo: "XYZ-789456",
    placeOfDeath: "Queen Elizabeth Hospital, Bridgetown",
  };

  it("should accept complete valid data", () => {
    const result = finalDeathCertificateValidation.safeParse(validCompleteData);
    expect(result.success).toBe(true);
  });

  it("should reject incomplete data (missing applicant details)", () => {
    const result = finalDeathCertificateValidation.safeParse({
      ...validCompleteData,
      applicantName: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should reject incomplete data (missing relationship details)", () => {
    const result = finalDeathCertificateValidation.safeParse({
      ...validCompleteData,
      relationshipToDeceased: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should reject incomplete data (missing death details)", () => {
    const result = finalDeathCertificateValidation.safeParse({
      ...validCompleteData,
      deceasedSurname: undefined,
    });
    expect(result.success).toBe(false);
  });

  it("should validate all field constraints", () => {
    const result = finalDeathCertificateValidation.safeParse({
      ...validCompleteData,
      numberOfCertificates: 0, // Invalid
    });
    expect(result.success).toBe(false);
  });
});
