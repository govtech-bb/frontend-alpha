import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PartialBirthRegistrationFormData } from "../types";
import { CheckAnswers } from "./check-answers";

describe("CheckAnswers", () => {
  const mockOnSubmit = vi.fn();
  const mockOnBack = vi.fn();
  const mockOnEdit = vi.fn();

  const completeFormData: PartialBirthRegistrationFormData = {
    marriageStatus: "yes",
    includeFatherDetails: "",
    numberOfCertificates: 2,
    email: "test@example.com",
    wantContact: "yes",
    phoneNumber: "246-555-0123",
    child: {
      firstNames: "John",
      middleNames: "Michael",
      lastName: "Smith",
      dateOfBirth: "01/01/2024",
      sexAtBirth: "Male",
      parishOfBirth: "St. Michael",
    },
    mother: {
      firstName: "Jane",
      middleName: "Marie",
      lastName: "Smith",
      hadOtherSurname: "yes",
      otherSurname: "Johnson",
      dateOfBirth: "03/15/1990",
      address: "123 Main St\nBridgetown\nBarbados",
      nationalRegistrationNumber: "123456-7890",
      passportNumber: "",
      occupation: "Teacher",
    },
    father: {
      firstName: "Robert",
      middleName: "James",
      lastName: "Smith",
      hadOtherSurname: "no",
      otherSurname: "",
      dateOfBirth: "05/20/1988",
      address: "123 Main St\nBridgetown\nBarbados",
      nationalRegistrationNumber: "987654-3210",
      passportNumber: "",
      occupation: "Engineer",
    },
  };

  describe("Mother's details display", () => {
    it("should display mother's name fields", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("Marie")).toBeInTheDocument();
      // Smith appears multiple times (child and parents), so we can't use getByText
      const smithElements = screen.getAllByText("Smith");
      expect(smithElements.length).toBeGreaterThan(0);
    });

    it("should display mother's date of birth", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("03/15/1990")).toBeInTheDocument();
    });

    it("should display mother's address", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      const addresses = screen.getAllByText(
        /123 Main St.*Bridgetown.*Barbados/s
      );
      expect(addresses.length).toBeGreaterThan(0);
    });

    it("should display mother's previous surname when hadOtherSurname is yes", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("Johnson")).toBeInTheDocument();
    });

    it("should display mother's national registration number", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("123456-7890")).toBeInTheDocument();
    });

    it("should display mother's occupation", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("Teacher")).toBeInTheDocument();
    });

    it("should not display previous surname when hadOtherSurname is no", () => {
      const formDataWithoutPreviousSurname: PartialBirthRegistrationFormData = {
        ...completeFormData,
        mother: {
          ...completeFormData.mother!,
          hadOtherSurname: "no",
          otherSurname: "",
        },
      };

      render(
        <CheckAnswers
          formData={formDataWithoutPreviousSurname}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      // Should not find "Previous surname" label
      expect(screen.queryByText(/Previous surname/i)).not.toBeInTheDocument();
    });
  });

  describe("Father's details display", () => {
    it("should display father's name fields", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("Robert")).toBeInTheDocument();
      expect(screen.getByText("James")).toBeInTheDocument();
      // Smith appears multiple times (child and parents), so we use getAllByText
      const smithElements = screen.getAllByText("Smith");
      expect(smithElements.length).toBeGreaterThan(0);
    });

    it("should display father's date of birth", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("05/20/1988")).toBeInTheDocument();
    });

    it("should display father's address", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      // Father's address should appear (same as mother's in this test data)
      const addresses = screen.getAllByText(
        /123 Main St.*Bridgetown.*Barbados/s
      );
      expect(addresses.length).toBeGreaterThan(0);
    });

    it("should display father's national registration number", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("987654-3210")).toBeInTheDocument();
    });

    it("should display father's occupation", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("Engineer")).toBeInTheDocument();
    });
  });

  describe("Child's details display", () => {
    it("should display all child details", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Michael")).toBeInTheDocument();
      // Smith appears multiple times (child and parents), so we use getAllByText
      const smithElements = screen.getAllByText("Smith");
      expect(smithElements.length).toBeGreaterThan(0);
      expect(screen.getByText("01/01/2024")).toBeInTheDocument();
      expect(screen.getByText("Male")).toBeInTheDocument();
      expect(screen.getByText("St. Michael")).toBeInTheDocument();
    });
  });

  describe("Certificates display", () => {
    it("should display number of certificates and total cost", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("BBD$10.00")).toBeInTheDocument();
    });
  });

  describe("Contact information display", () => {
    it("should display email and phone number when wantContact is yes", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.getByText("246-555-0123")).toBeInTheDocument();
    });

    it("should not display phone number when wantContact is no", () => {
      const formDataWithoutPhone: PartialBirthRegistrationFormData = {
        ...completeFormData,
        wantContact: "no",
      };

      render(
        <CheckAnswers
          formData={formDataWithoutPhone}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("test@example.com")).toBeInTheDocument();
      expect(screen.queryByText("246-555-0123")).not.toBeInTheDocument();
    });
  });

  describe("Father section visibility", () => {
    it("should show father section when marriageStatus is yes", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(
        screen.getByText("Tell us about the child's father")
      ).toBeInTheDocument();
    });

    it("should show father section when includeFatherDetails is yes", () => {
      const unmarriedWithFather: PartialBirthRegistrationFormData = {
        ...completeFormData,
        marriageStatus: "no",
        includeFatherDetails: "yes",
      };

      render(
        <CheckAnswers
          formData={unmarriedWithFather}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(
        screen.getByText("Tell us about the child's father")
      ).toBeInTheDocument();
    });

    it("should not show father section when includeFatherDetails is no", () => {
      const unmarriedWithoutFather: PartialBirthRegistrationFormData = {
        ...completeFormData,
        marriageStatus: "no",
        includeFatherDetails: "no",
        father: undefined,
      };

      render(
        <CheckAnswers
          formData={unmarriedWithoutFather}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.queryByText("Father's details")).not.toBeInTheDocument();
    });
  });

  describe("Submission error handling", () => {
    it("should display submission error when submissionError prop is set", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
          submissionError="Failed to send confirmation emails"
        />
      );

      expect(screen.getByText("Submission failed")).toBeInTheDocument();
      expect(
        screen.getByText("Failed to send confirmation emails")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Please try again or contact support if the problem persists/
        )
      ).toBeInTheDocument();
    });

    it("should not display error section when submissionError is null", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
          submissionError={null}
        />
      );

      expect(screen.queryByText("Submission failed")).not.toBeInTheDocument();
    });

    it("should not display error section when submissionError is undefined", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.queryByText("Submission failed")).not.toBeInTheDocument();
    });

    it("should display error in a visually prominent red box", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
          submissionError="Test error message"
        />
      );

      const errorContainer = screen
        .getByText("Submission failed")
        .closest("div");
      expect(errorContainer).toHaveClass("border-4", "border-red-600", "p-4");
    });
  });

  describe("Submission state handling", () => {
    it("should disable buttons when isSubmitting is true", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          isSubmitting={true}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      const backButton = screen.getByRole("button", { name: /back/i });
      const submitButton = screen.getByRole("button", {
        name: /submitting/i,
      });

      expect(backButton).toBeDisabled();
      expect(submitButton).toBeDisabled();
    });

    it("should change submit button text to 'Submitting...' when isSubmitting is true", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          isSubmitting={true}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(
        screen.getByRole("button", { name: /submitting\.\.\./i })
      ).toBeInTheDocument();
    });

    it("should show 'Confirm and send' button text when not submitting", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          isSubmitting={false}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      expect(
        screen.getByRole("button", { name: /confirm and send/i })
      ).toBeInTheDocument();
    });

    it("should not disable buttons when isSubmitting is false", () => {
      render(
        <CheckAnswers
          formData={completeFormData}
          isSubmitting={false}
          onBack={mockOnBack}
          onEdit={mockOnEdit}
          onSubmit={mockOnSubmit}
        />
      );

      const backButton = screen.getByRole("button", { name: /back/i });
      const submitButton = screen.getByRole("button", {
        name: /confirm and send/i,
      });

      expect(backButton).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });
  });
});
