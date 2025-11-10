import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RelationshipRequest } from "../relationship-request";

describe("RelationshipRequest", () => {
  const defaultProps = {
    value: {
      relationshipToDeceased: "",
      reasonForRequest: "",
      numberOfCertificates: undefined,
      causeOfDeath: "",
    },
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<RelationshipRequest {...defaultProps} />);
    expect(
      screen.getByText("Relationship and Request Details")
    ).toBeInTheDocument();
  });

  it("should render all four input fields", () => {
    render(<RelationshipRequest {...defaultProps} />);

    expect(
      screen.getByLabelText("Your relationship to the deceased")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Reason for requesting this certificate")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Number of certificates required")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Cause of death")).toBeInTheDocument();
  });

  it("should call onChange when relationship input changes", () => {
    const onChange = vi.fn();
    render(<RelationshipRequest {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Your relationship to the deceased");
    fireEvent.change(input, { target: { value: "Son" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ relationshipToDeceased: "Son" })
    );
  });

  it("should call onChange when reason input changes", () => {
    const onChange = vi.fn();
    render(<RelationshipRequest {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText(
      "Reason for requesting this certificate"
    );
    fireEvent.change(input, { target: { value: "Legal purposes" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ reasonForRequest: "Legal purposes" })
    );
  });

  it("should call onChange when number of certificates changes", () => {
    const onChange = vi.fn();
    render(<RelationshipRequest {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Number of certificates required");
    fireEvent.change(input, { target: { value: "2" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ numberOfCertificates: 2 })
    );
  });

  it("should call onChange when cause of death input changes", () => {
    const onChange = vi.fn();
    render(<RelationshipRequest {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Cause of death");
    fireEvent.change(input, { target: { value: "Natural causes" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ causeOfDeath: "Natural causes" })
    );
  });

  it("should display values from props", () => {
    render(
      <RelationshipRequest
        {...defaultProps}
        value={{
          relationshipToDeceased: "Son",
          reasonForRequest: "Legal purposes",
          numberOfCertificates: 2,
          causeOfDeath: "Natural causes",
        }}
      />
    );

    expect(screen.getByDisplayValue("Son")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Legal purposes")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Natural causes")).toBeInTheDocument();
  });

  it("should have Continue and Back buttons", () => {
    render(<RelationshipRequest {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<RelationshipRequest {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should show validation errors when form is submitted with empty fields", () => {
    const onNext = vi.fn();
    render(<RelationshipRequest {...defaultProps} onNext={onNext} />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    // Multiple alert elements due to ErrorSummary + individual field errors
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Enter your relationship to the deceased")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enter the reason for requesting this certificate")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter the number of certificates required|Invalid input/
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Enter the cause of death")).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should call onNext when form is submitted with valid data", () => {
    const onNext = vi.fn();
    render(
      <RelationshipRequest
        {...defaultProps}
        onNext={onNext}
        value={{
          relationshipToDeceased: "Son",
          reasonForRequest: "Legal purposes",
          numberOfCertificates: 2,
          causeOfDeath: "Natural causes",
        }}
      />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should show error for number of certificates less than 1", () => {
    const onChange = vi.fn();
    render(<RelationshipRequest {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Number of certificates required");
    fireEvent.change(input, { target: { value: "0" } });

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    // Error message appears somewhere in the document
    expect(
      screen.getByText(/at least 1 certificate|must be 1 or greater/i)
    ).toBeInTheDocument();
  });

  it("should show error for number of certificates greater than 10", () => {
    const onChange = vi.fn();
    render(<RelationshipRequest {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Number of certificates required");
    fireEvent.change(input, { target: { value: "11" } });

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    // Error message appears somewhere in the document
    expect(
      screen.getByText(/maximum of 10 certificates|must be 10 or less/i)
    ).toBeInTheDocument();
  });

  it("should have accessible form structure", () => {
    render(<RelationshipRequest {...defaultProps} />);

    const relationshipInput = screen.getByLabelText(
      "Your relationship to the deceased"
    );
    const reasonInput = screen.getByLabelText(
      "Reason for requesting this certificate"
    );
    const numberOfCertificatesInput = screen.getByLabelText(
      "Number of certificates required"
    );
    const causeOfDeathInput = screen.getByLabelText("Cause of death");

    expect(relationshipInput).toHaveAttribute("required");
    expect(reasonInput).toHaveAttribute("required");
    expect(numberOfCertificatesInput).toHaveAttribute("required");
    expect(causeOfDeathInput).toHaveAttribute("required");
  });

  it("should focus on title when component mounts", () => {
    render(<RelationshipRequest {...defaultProps} />);

    const title = screen.getByText("Relationship and Request Details");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });
});
