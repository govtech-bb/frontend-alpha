import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ApplicantDetails } from "../applicant-details";

describe("ApplicantDetails", () => {
  const defaultProps = {
    value: {
      applicantName: "",
      applicantAddress: "",
      applicantNationalRegistrationNo: "",
    },
    onChange: vi.fn(),
    onNext: vi.fn(),
  };

  it("should render the title", () => {
    render(<ApplicantDetails {...defaultProps} />);
    expect(screen.getByText("Applicant's Details")).toBeInTheDocument();
  });

  it("should render all three input fields", () => {
    render(<ApplicantDetails {...defaultProps} />);

    expect(screen.getByLabelText("Your full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Your address")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Your National Registration Number")
    ).toBeInTheDocument();
  });

  it("should call onChange when name input changes", () => {
    const onChange = vi.fn();
    render(<ApplicantDetails {...defaultProps} onChange={onChange} />);

    const nameInput = screen.getByLabelText("Your full name");
    fireEvent.change(nameInput, { target: { value: "John Smith" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ applicantName: "John Smith" })
    );
  });

  it("should call onChange when address input changes", () => {
    const onChange = vi.fn();
    render(<ApplicantDetails {...defaultProps} onChange={onChange} />);

    const addressInput = screen.getByLabelText("Your address");
    fireEvent.change(addressInput, {
      target: { value: "123 Main St, Bridgetown" },
    });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ applicantAddress: "123 Main St, Bridgetown" })
    );
  });

  it("should call onChange when NRN input changes", () => {
    const onChange = vi.fn();
    render(<ApplicantDetails {...defaultProps} onChange={onChange} />);

    const nrnInput = screen.getByLabelText("Your National Registration Number");
    fireEvent.change(nrnInput, { target: { value: "ABC-123456" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ applicantNationalRegistrationNo: "ABC-123456" })
    );
  });

  it("should display values from props", () => {
    render(
      <ApplicantDetails
        {...defaultProps}
        value={{
          applicantName: "John Smith",
          applicantAddress: "123 Main St",
          applicantNationalRegistrationNo: "ABC-123456",
        }}
      />
    );

    expect(screen.getByDisplayValue("John Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ABC-123456")).toBeInTheDocument();
  });

  it("should have Continue button", () => {
    render(<ApplicantDetails {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  it("should not render Back button as this is the first step", () => {
    render(<ApplicantDetails {...defaultProps} />);
    expect(
      screen.queryByRole("button", { name: /back/i })
    ).not.toBeInTheDocument();
  });

  it("should show validation errors when form is submitted with empty fields", () => {
    const onNext = vi.fn();
    render(<ApplicantDetails {...defaultProps} onNext={onNext} />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    // Multiple alert elements due to ErrorSummary + individual field errors
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
    expect(screen.getByText("Enter your address")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your National Registration Number")
    ).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should call onNext when form is submitted with valid data", () => {
    const onNext = vi.fn();
    render(
      <ApplicantDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          applicantName: "John Smith",
          applicantAddress: "123 Main St, Bridgetown",
          applicantNationalRegistrationNo: "ABC-123456",
        }}
      />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should show error for name longer than 200 characters", () => {
    const onChange = vi.fn();
    render(<ApplicantDetails {...defaultProps} onChange={onChange} />);

    const nameInput = screen.getByLabelText("Your full name");
    const longName = "a".repeat(201);
    fireEvent.change(nameInput, { target: { value: longName } });

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    // Error message about character limit
    expect(
      screen.getByText(
        /Name must be 200 characters or less|String must contain at most 200 character/i
      )
    ).toBeInTheDocument();
  });

  it("should show error for invalid NRN characters", () => {
    const onChange = vi.fn();
    render(<ApplicantDetails {...defaultProps} onChange={onChange} />);

    const nrnInput = screen.getByLabelText("Your National Registration Number");
    fireEvent.change(nrnInput, { target: { value: "ABC@123" } });

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(
      screen.getByText(
        "National Registration Number must contain only letters, numbers, and hyphens"
      )
    ).toBeInTheDocument();
  });

  it("should have accessible form structure", () => {
    render(<ApplicantDetails {...defaultProps} />);

    const nameInput = screen.getByLabelText("Your full name");
    const addressInput = screen.getByLabelText("Your address");
    const nrnInput = screen.getByLabelText("Your National Registration Number");

    expect(nameInput).toHaveAttribute("required");
    expect(addressInput).toHaveAttribute("required");
    expect(nrnInput).toHaveAttribute("required");
  });

  it("should focus on title when component mounts", () => {
    render(<ApplicantDetails {...defaultProps} />);

    const title = screen.getByText("Applicant's Details");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });
});
