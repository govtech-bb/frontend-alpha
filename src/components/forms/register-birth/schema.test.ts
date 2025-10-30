import { describe, expect, it } from "vitest";
import { fatherDetailsValidation, motherDetailsValidation } from "./schema";

describe("fatherDetailsValidation", () => {
  const validBaseData = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Smith",
    hadOtherSurname: "no" as const,
    otherSurname: "",
    dateOfBirth: "07/30/1986",
    address: "123 Main St",
    occupation: "Engineer",
  };

  describe("identifier requirements", () => {
    it("should accept valid national registration number", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "123456-7890",
        passportNumber: "",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept valid passport number", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "",
        passportNumber: "P1234567",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept both identifiers", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "123456-7890",
        passportNumber: "P1234567",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject when neither identifier is provided", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "",
        passportNumber: "",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Enter either a National Registration Number or a Passport Number"
        );
      }
    });

    it("should reject when both identifiers are missing", () => {
      const data = {
        ...validBaseData,
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Enter either a National Registration Number or a Passport Number"
        );
      }
    });
  });

  describe("national registration number format", () => {
    it("should accept valid format XXXXXX-XXXX", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "123456-7890",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept valid format with different digits", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "987654-3210",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid format without dash", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "1234567890",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain(
          "Enter the National Registration Number in the format XXXXXX-XXXX"
        );
      }
    });

    it("should reject format with too few digits before dash", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "12345-7890",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject format with too many digits before dash", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "1234567-890",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject format with letters", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "ABC456-7890",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject format with spaces", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "123 456-7890",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe("passport number format", () => {
    it("should accept any passport format - alphanumeric", () => {
      const data = {
        ...validBaseData,
        passportNumber: "P1234567",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept passport with multiple letters", () => {
      const data = {
        ...validBaseData,
        passportNumber: "AB12345678",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept passport with spaces and special characters", () => {
      const data = {
        ...validBaseData,
        passportNumber: "P 1234-5678",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept short passport numbers", () => {
      const data = {
        ...validBaseData,
        passportNumber: "ABC123",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept long passport numbers", () => {
      const data = {
        ...validBaseData,
        passportNumber: "ABCDEFGH123456789",
      };
      const result = fatherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});

describe("motherDetailsValidation", () => {
  const validBaseData = {
    firstName: "Jane",
    middleName: "Marie",
    lastName: "Smith",
    hadOtherSurname: "no" as const,
    otherSurname: "",
    dateOfBirth: "03/15/1990",
    address: "123 Main St",
    occupation: "Teacher",
  };

  describe("identifier requirements", () => {
    it("should accept valid national registration number", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "123456-7890",
        passportNumber: "",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should accept valid passport number", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "",
        passportNumber: "P1234567",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject when neither identifier is provided", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "",
        passportNumber: "",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Enter either a National Registration Number or a Passport Number"
        );
      }
    });
  });

  describe("national registration number format", () => {
    it("should accept valid format XXXXXX-XXXX", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "987654-3210",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid format", () => {
      const data = {
        ...validBaseData,
        nationalRegistrationNumber: "12345-67890",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
