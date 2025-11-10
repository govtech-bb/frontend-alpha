import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PartialDeathCertificateData } from "../../types";
import { CheckAnswers } from "../check-answers";

describe("CheckAnswers", () => {
  const validFormData: PartialDeathCertificateData = {
    applicantName: "John Smith",
    applicantAddress: "123 Main St, Bridgetown",
    applicantNationalRegistrationNo: "ABC-123456",
    relationshipToDeceased: "Son",
    reasonForRequest: "Legal purposes",
    numberOfCertificates: 2,
    causeOfDeath: "Natural causes",
    deceasedSurname: "Doe",
    deceasedChristianNames: "Jane Marie",
    dateOfDeath: "2024-01-15",
    deceasedNationalRegistrationNo: "XYZ-789456",
    placeOfDeath: "QEH Bridgetown",
  };

  const defaultProps = {
    formData: validFormData,
    onSubmit: vi.fn(),
    onBack: vi.fn(),
    onEdit: vi.fn(),
    submissionError: null,
    isSubmitting: false,
  };

  it("should render the title", () => {
    render(<CheckAnswers {...defaultProps} />);
    expect(screen.getByText("Check your answers")).toBeInTheDocument();
  });

  it("should display all applicant details", () => {
    render(<CheckAnswers {...defaultProps} />);

    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, Bridgetown")).toBeInTheDocument();
    expect(screen.getByText("ABC-123456")).toBeInTheDocument();
  });

  it("should display all relationship and request details", () => {
    render(<CheckAnswers {...defaultProps} />);

    expect(screen.getByText("Son")).toBeInTheDocument();
    expect(screen.getByText("Legal purposes")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Natural causes")).toBeInTheDocument();
  });

  it("should display all death details", () => {
    render(<CheckAnswers {...defaultProps} />);

    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Marie")).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument(); // Formatted date using formatForDisplay
    expect(screen.getByText("XYZ-789456")).toBeInTheDocument();
    expect(screen.getByText("QEH Bridgetown")).toBeInTheDocument();
  });

  it("should have Change buttons for each section", () => {
    render(<CheckAnswers {...defaultProps} />);

    const changeButtons = screen.getAllByText("Change");
    // 3 sections × 2 buttons each (desktop + mobile) = 6 buttons
    expect(changeButtons.length).toBeGreaterThanOrEqual(3);
  });

  it("should call onEdit with correct step when Change button is clicked", () => {
    const onEdit = vi.fn();
    render(<CheckAnswers {...defaultProps} onEdit={onEdit} />);

    const changeButtons = screen.getAllByText("Change");
    fireEvent.click(changeButtons[0]); // First Change button (applicant details)

    expect(onEdit).toHaveBeenCalledWith("applicant-details");
  });

  it("should have Back and Confirm buttons", () => {
    render(<CheckAnswers {...defaultProps} />);

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirm and send/i })
    ).toBeInTheDocument();
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<CheckAnswers {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when Confirm button is clicked with valid data", () => {
    const onSubmit = vi.fn();
    render(<CheckAnswers {...defaultProps} onSubmit={onSubmit} />);

    const confirmButton = screen.getByRole("button", {
      name: /confirm and send/i,
    });
    fireEvent.click(confirmButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should show missing data error when form data is incomplete", () => {
    const incompleteData: PartialDeathCertificateData = {
      applicantName: "John Smith",
      // Missing other required fields
    };

    render(<CheckAnswers {...defaultProps} formData={incompleteData} />);

    expect(
      screen.getByText("Missing or invalid information")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Some required information is missing or invalid. Please go back and complete all steps correctly."
      )
    ).toBeInTheDocument();
  });

  it("should disable buttons when submitting", () => {
    render(<CheckAnswers {...defaultProps} isSubmitting={true} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    const confirmButton = screen.getByRole("button", { name: /submitting/i });

    expect(backButton).toBeDisabled();
    expect(confirmButton).toBeDisabled();
  });

  it("should show Submitting... text when submitting", () => {
    render(<CheckAnswers {...defaultProps} isSubmitting={true} />);

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });

  it("should display submission error when present", () => {
    const submissionError = "Network error occurred";
    render(
      <CheckAnswers {...defaultProps} submissionError={submissionError} />
    );

    expect(screen.getByText("Submission failed")).toBeInTheDocument();
    expect(screen.getByText(submissionError)).toBeInTheDocument();
  });

  it("should not call onSubmit when form data is invalid", () => {
    const onSubmit = vi.fn();
    const incompleteData: PartialDeathCertificateData = {
      applicantName: "John Smith",
    };

    render(
      <CheckAnswers
        {...defaultProps}
        formData={incompleteData}
        onSubmit={onSubmit}
      />
    );

    // Back button should be present but not Confirm button (due to validation error)
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /confirm/i })
    ).not.toBeInTheDocument();
  });

  it("should focus on title when component mounts", () => {
    render(<CheckAnswers {...defaultProps} />);

    const title = screen.getByText("Check your answers");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should display section titles", () => {
    render(<CheckAnswers {...defaultProps} />);

    expect(screen.getByText("Applicant's Details")).toBeInTheDocument();
    expect(
      screen.getByText("Relationship and Request Details")
    ).toBeInTheDocument();
    expect(screen.getByText("Death Certificate Details")).toBeInTheDocument();
  });
});
