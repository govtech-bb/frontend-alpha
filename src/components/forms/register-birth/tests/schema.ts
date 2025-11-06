import { describe, expect, it } from "vitest";
import {
  childDetailsValidation,
  contactInfoValidation,
  fatherDetailsValidation,
  motherDetailsValidation,
} from "../schema";

describe("fatherDetailsValidation", () => {
  const validBaseData = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Smith",
    hadOtherSurname: "no" as const,
    otherSurname: "",
    dateOfBirth: "1986-07-30",
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
    dateOfBirth: "1990-03-15",
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

  describe("undefined/empty field handling", () => {
    it("should show custom error message for undefined firstName", () => {
      const data = {
        firstName: undefined,
        middleName: "",
        lastName: "Smith",
        dateOfBirth: "1990-03-15",
        address: "123 Main St",
        nationalRegistrationNumber: "123456-7890",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const firstNameError = result.error.issues.find(
          (issue) => issue.path[0] === "firstName"
        );
        expect(firstNameError?.message).toBe("Enter the mother's first name");
        // Should NOT contain "expected string, received undefined"
        expect(firstNameError?.message).not.toContain("undefined");
      }
    });

    it("should show custom error message for undefined lastName", () => {
      const data = {
        firstName: "Jane",
        middleName: "",
        lastName: undefined,
        dateOfBirth: "1990-03-15",
        address: "123 Main St",
        nationalRegistrationNumber: "123456-7890",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const lastNameError = result.error.issues.find(
          (issue) => issue.path[0] === "lastName"
        );
        expect(lastNameError?.message).toBe("Enter the mother's last name");
        expect(lastNameError?.message).not.toContain("undefined");
      }
    });

    it("should show custom error message for undefined dateOfBirth", () => {
      const data = {
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        dateOfBirth: undefined,
        address: "123 Main St",
        nationalRegistrationNumber: "123456-7890",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const dobError = result.error.issues.find(
          (issue) => issue.path[0] === "dateOfBirth"
        );
        expect(dobError?.message).toBe("Enter the mother's date of birth");
        expect(dobError?.message).not.toContain("undefined");
      }
    });

    it("should show custom error message for undefined address", () => {
      const data = {
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        dateOfBirth: "1990-03-15",
        address: undefined,
        nationalRegistrationNumber: "123456-7890",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const addressError = result.error.issues.find(
          (issue) => issue.path[0] === "address"
        );
        expect(addressError?.message).toBe(
          "Enter the mother's current address"
        );
        expect(addressError?.message).not.toContain("undefined");
      }
    });

    it("should require occupation field", () => {
      const data = {
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        dateOfBirth: "1990-03-15",
        address: "123 Main St",
        nationalRegistrationNumber: "123456-7890",
        // occupation is missing
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const occupationError = result.error.issues.find(
          (e) => e.path[0] === "occupation"
        );
        expect(occupationError?.message).toBe("Enter the mother's occupation");
      }
    });

    it("should reject empty occupation string", () => {
      const data = {
        firstName: "Jane",
        middleName: "",
        lastName: "Smith",
        dateOfBirth: "1990-03-15",
        address: "123 Main St",
        nationalRegistrationNumber: "123456-7890",
        occupation: "",
      };
      const result = motherDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const occupationError = result.error.issues.find(
          (e) => e.path[0] === "occupation"
        );
        expect(occupationError?.message).toBe("Enter the mother's occupation");
      }
    });
  });
});

describe("childDetailsValidation", () => {
  describe("undefined/empty field handling", () => {
    it("should show custom error message for undefined firstNames", () => {
      const data = {
        firstNames: undefined,
        middleNames: "",
        lastName: "Smith",
        dateOfBirth: "10/22/2024",
        sexAtBirth: "Male" as const,
        parishOfBirth: "St. Michael",
      };
      const result = childDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "firstNames"
        );
        expect(error?.message).toBe("Enter the child's first name");
        expect(error?.message).not.toContain("undefined");
        expect(error?.message).not.toContain("expected string");
      }
    });

    it("should show custom error message for undefined lastName", () => {
      const data = {
        firstNames: "John",
        middleNames: "",
        lastName: undefined,
        dateOfBirth: "10/22/2024",
        sexAtBirth: "Male" as const,
        parishOfBirth: "St. Michael",
      };
      const result = childDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "lastName"
        );
        expect(error?.message).toBe("Enter the child's last name");
        expect(error?.message).not.toContain("undefined");
      }
    });

    it("should show custom error message for undefined dateOfBirth", () => {
      const data = {
        firstNames: "John",
        middleNames: "",
        lastName: "Smith",
        dateOfBirth: undefined,
        sexAtBirth: "Male" as const,
        parishOfBirth: "St. Michael",
      };
      const result = childDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "dateOfBirth"
        );
        expect(error?.message).toBe("Enter the child's date of birth");
        expect(error?.message).not.toContain("undefined");
      }
    });

    it("should show custom error message for undefined parishOfBirth", () => {
      const data = {
        firstNames: "John",
        middleNames: "",
        lastName: "Smith",
        dateOfBirth: "10/22/2024",
        sexAtBirth: "Male" as const,
        parishOfBirth: undefined,
      };
      const result = childDetailsValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "parishOfBirth"
        );
        expect(error?.message).toBe("Enter the child's place of birth");
        expect(error?.message).not.toContain("undefined");
      }
    });
  });
});

describe("contactInfoValidation", () => {
  describe("undefined/empty field handling", () => {
    it("should show custom error message for undefined email", () => {
      const data = {
        email: undefined,
        phoneNumber: "246-555-1234",
      };
      const result = contactInfoValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "email"
        );
        expect(error?.message).toBe("Enter a valid email address");
        expect(error?.message).not.toContain("undefined");
        expect(error?.message).not.toContain("expected string");
      }
    });

    it("should show custom error message for undefined phoneNumber", () => {
      const data = {
        email: "test@example.com",
        phoneNumber: undefined,
      };
      const result = contactInfoValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "phoneNumber"
        );
        expect(error?.message).toBe("Enter a phone number");
        expect(error?.message).not.toContain("undefined");
      }
    });

    it("should show custom error for empty email string", () => {
      const data = {
        email: "",
        phoneNumber: "246-555-1234",
      };
      const result = contactInfoValidation.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const error = result.error.issues.find(
          (issue) => issue.path[0] === "email"
        );
        expect(error?.message).toBe("Enter a valid email address");
      }
    });
  });
});

describe("fatherDetailsValidation - undefined field handling", () => {
  it("should show custom error messages for all undefined required fields", () => {
    const data = {
      firstName: undefined,
      lastName: undefined,
      dateOfBirth: undefined,
      address: undefined,
      nationalRegistrationNumber: "123456-7890",
    };
    const result = fatherDetailsValidation.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.issues;

      // Check firstName error
      const firstNameError = errors.find((e) => e.path[0] === "firstName");
      expect(firstNameError?.message).toBe("Enter the father's first name");
      expect(firstNameError?.message).not.toContain("undefined");

      // Check lastName error
      const lastNameError = errors.find((e) => e.path[0] === "lastName");
      expect(lastNameError?.message).toBe("Enter the father's last name");
      expect(lastNameError?.message).not.toContain("undefined");

      // Check dateOfBirth error
      const dobError = errors.find((e) => e.path[0] === "dateOfBirth");
      expect(dobError?.message).toBe("Enter the father's date of birth");
      expect(dobError?.message).not.toContain("undefined");

      // Check address error
      const addressError = errors.find((e) => e.path[0] === "address");
      expect(addressError?.message).toBe("Enter the father's current address");
      expect(addressError?.message).not.toContain("undefined");
    }
  });

  it("should handle mix of undefined and empty strings consistently", () => {
    const data = {
      firstName: undefined,
      lastName: "",
      dateOfBirth: undefined,
      address: "",
      nationalRegistrationNumber: "123456-7890",
    };
    const result = fatherDetailsValidation.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      // All errors should use custom messages, not generic type errors
      for (const error of result.error.issues) {
        expect(error.message).not.toContain("expected string");
        expect(error.message).not.toContain("received undefined");
      }
    }
  });

  it("should require occupation field", () => {
    const data = {
      firstName: "John",
      middleName: "Michael",
      lastName: "Smith",
      dateOfBirth: "1986-07-30",
      address: "123 Main St",
      nationalRegistrationNumber: "123456-7890",
      // occupation is missing
    };
    const result = fatherDetailsValidation.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const occupationError = result.error.issues.find(
        (e) => e.path[0] === "occupation"
      );
      expect(occupationError?.message).toBe("Enter the father's occupation");
    }
  });

  it("should reject empty occupation string", () => {
    const data = {
      firstName: "John",
      middleName: "Michael",
      lastName: "Smith",
      dateOfBirth: "1986-07-30",
      address: "123 Main St",
      nationalRegistrationNumber: "123456-7890",
      occupation: "",
    };
    const result = fatherDetailsValidation.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const occupationError = result.error.issues.find(
        (e) => e.path[0] === "occupation"
      );
      expect(occupationError?.message).toBe("Enter the father's occupation");
    }
  });
});
