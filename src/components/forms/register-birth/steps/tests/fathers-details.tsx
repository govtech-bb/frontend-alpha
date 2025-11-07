import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FathersDetails } from "../fathers-details";

describe("FathersDetails", () => {
  const defaultProps = {
    value: {},
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<FathersDetails {...defaultProps} />);

    expect(
      screen.getByText("Tell us about the child's father")
    ).toBeInTheDocument();
  });

  it("should render all required form fields", () => {
    render(<FathersDetails {...defaultProps} />);

    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle name(s)")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Current address")).toBeInTheDocument();
    expect(
      screen.getByLabelText("National registration number")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Occupation")).toBeInTheDocument();
  });

  it("should display helper text for middle names", () => {
    render(<FathersDetails {...defaultProps} />);

    expect(
      screen.getByText("If they have more than one, add them in order")
    ).toBeInTheDocument();
  });

  it("should display date format hint", () => {
    render(<FathersDetails {...defaultProps} />);

    expect(
      screen.getByText(/Use the calendar picker or enter the date/)
    ).toBeInTheDocument();
  });

  it("should display occupation explanation", () => {
    render(<FathersDetails {...defaultProps} />);

    expect(
      screen.getByText(
        /This will be included on the child's birth certificate and in official records/
      )
    ).toBeInTheDocument();
  });

  it("should display current values", () => {
    render(
      <FathersDetails
        {...defaultProps}
        value={{
          firstName: "John",
          middleName: "Paul",
          lastName: "Smith",
          dateOfBirth: "1986-07-30",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "Engineer",
        }}
      />
    );

    expect(
      (screen.getByLabelText("First name") as HTMLInputElement).value
    ).toBe("John");
    expect(
      (screen.getByLabelText("Middle name(s)") as HTMLInputElement).value
    ).toBe("Paul");
    expect((screen.getByLabelText("Last name") as HTMLInputElement).value).toBe(
      "Smith"
    );
    expect(
      (screen.getByLabelText("Date of birth") as HTMLInputElement).value
    ).toBe("1986-07-30");
    expect(
      (screen.getByLabelText("Current address") as HTMLTextAreaElement).value
    ).toBe("123 Main St");
    expect(
      (
        screen.getByLabelText(
          "National registration number"
        ) as HTMLInputElement
      ).value
    ).toBe("123456-7890");
    expect(
      (screen.getByLabelText("Occupation") as HTMLInputElement).value
    ).toBe("Engineer");
  });

  it("should call onChange when first name changes", () => {
    const onChange = vi.fn();
    render(<FathersDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("First name");
    fireEvent.change(input, { target: { value: "Michael" } });

    expect(onChange).toHaveBeenCalledWith({ firstName: "Michael" });
  });

  it("should call onChange when last name changes", () => {
    const onChange = vi.fn();
    render(<FathersDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Last name");
    fireEvent.change(input, { target: { value: "Johnson" } });

    expect(onChange).toHaveBeenCalledWith({ lastName: "Johnson" });
  });

  it("should call onChange when address changes", () => {
    const onChange = vi.fn();
    render(<FathersDetails {...defaultProps} onChange={onChange} />);

    const textarea = screen.getByLabelText("Current address");
    fireEvent.change(textarea, { target: { value: "456 Oak Ave" } });

    expect(onChange).toHaveBeenCalledWith({ address: "456 Oak Ave" });
  });

  it("should render passport number field inside details", () => {
    render(<FathersDetails {...defaultProps} />);

    // Click the disclosure to reveal the passport field
    const summary = screen.getByText("Use passport number instead");
    fireEvent.click(summary);

    // Passport field should be visible after opening details
    expect(screen.getByLabelText("Passport number")).toBeInTheDocument();
  });

  it("should display passport explanation text when details is open", () => {
    render(<FathersDetails {...defaultProps} />);

    const summary = screen.getByText("Use passport number instead");
    fireEvent.click(summary);

    expect(
      screen.getByText(
        /If you don't have a National Registration number, you can use your passport number instead/
      )
    ).toBeInTheDocument();
  });

  it("should call onChange when passport number changes", () => {
    const onChange = vi.fn();
    render(<FathersDetails {...defaultProps} onChange={onChange} />);

    // Open details
    const summary = screen.getByText("Use passport number instead");
    fireEvent.click(summary);

    const input = screen.getByLabelText("Passport number");
    fireEvent.change(input, { target: { value: "P123456" } });

    expect(onChange).toHaveBeenCalledWith({ passportNumber: "P123456" });
  });

  it("should validate required fields on submission", () => {
    render(<FathersDetails {...defaultProps} value={{}} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should call onNext on successful form submission", () => {
    const onNext = vi.fn();
    render(
      <FathersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: "1986-07-30",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "Engineer",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<FathersDetails {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should mark invalid fields with aria-invalid after submission", () => {
    render(<FathersDetails {...defaultProps} value={{ firstName: "" }} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should link error messages to inputs with aria-describedby", () => {
    render(<FathersDetails {...defaultProps} value={{ firstName: "" }} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute(
      "aria-describedby",
      "father-firstName-error"
    );
  });

  it("should have correct field prefixes in IDs", () => {
    render(<FathersDetails {...defaultProps} />);

    expect(screen.getByLabelText("First name")).toHaveAttribute(
      "id",
      "father-firstName"
    );
    expect(screen.getByLabelText("Last name")).toHaveAttribute(
      "id",
      "father-lastName"
    );
    expect(screen.getByLabelText("Date of birth")).toHaveAttribute(
      "id",
      "father-dateOfBirth"
    );
    expect(screen.getByLabelText("Current address")).toHaveAttribute(
      "id",
      "father-address"
    );
  });

  it("should focus on title when component mounts", () => {
    render(<FathersDetails {...defaultProps} />);

    const title = screen.getByText("Tell us about the child's father");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should validate date of birth format", () => {
    render(
      <FathersDetails
        {...defaultProps}
        value={{
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: "invalid-date",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Check for error (message appears in both summary and field)
    expect(screen.getByRole("alert")).toBeInTheDocument();
    const dateInput = screen.getByLabelText("Date of birth");
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should accept middle name as optional", () => {
    const onNext = vi.fn();
    render(
      <FathersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: "1986-07-30",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "Engineer",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalled();
  });

  it("should show error when occupation is missing", () => {
    const onNext = vi.fn();
    render(
      <FathersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: "1986-07-30",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          // occupation is missing
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Should not proceed to next step
    expect(onNext).not.toHaveBeenCalled();

    // Should display error message (appears in both summary and field)
    expect(
      screen.getAllByText("Enter the father's occupation").length
    ).toBeGreaterThan(0);
  });

  it("should show error when occupation is empty string", () => {
    const onNext = vi.fn();
    render(
      <FathersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: "1986-07-30",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Should not proceed to next step
    expect(onNext).not.toHaveBeenCalled();

    // Should display error message (appears in both summary and field)
    expect(
      screen.getAllByText("Enter the father's occupation").length
    ).toBeGreaterThan(0);
  });

  it("should display placeholder for national registration number", () => {
    render(<FathersDetails {...defaultProps} />);

    const input = screen.getByLabelText("National registration number");
    expect(input).toHaveAttribute("placeholder", "123456-7890");
  });

  it("should render address as textarea with 3 rows", () => {
    render(<FathersDetails {...defaultProps} />);

    const textarea = screen.getByLabelText("Current address");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("should validate national registration number format", () => {
    render(
      <FathersDetails
        {...defaultProps}
        value={{
          firstName: "John",
          lastName: "Smith",
          dateOfBirth: "1986-07-30",
          address: "123 Main St",
          nationalRegistrationNumber: "abc",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Check for error (message appears in both summary and field)
    expect(screen.getByRole("alert")).toBeInTheDocument();
    const input = screen.getByLabelText("National registration number");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
