import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MothersDetails } from "../mothers-details";

describe("MothersDetails", () => {
  const defaultProps = {
    value: {},
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(
      screen.getByText("Tell us about the child's mother")
    ).toBeInTheDocument();
  });

  it("should render all required form fields", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle name(s)")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
    expect(screen.getByLabelText("Current address")).toBeInTheDocument();
    expect(
      screen.getByLabelText("National registration number")
    ).toBeInTheDocument();
  });

  it("should render maiden name question", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(
      screen.getByText("Has the mother had any other last name?")
    ).toBeInTheDocument();
    expect(screen.getByText(/For example, a maiden name/)).toBeInTheDocument();
  });

  it("should render occupation field as required", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(screen.getByText(/Occupation/)).toBeInTheDocument();
    expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
  });

  it("should display helper text for middle names", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(
      screen.getByText("If they have more than one, add them in order")
    ).toBeInTheDocument();
  });

  it("should display date format hint", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(screen.getByText("For example, 27 3 2007")).toBeInTheDocument();
  });

  it("should display occupation explanation", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(
      screen.getByText(
        /This will be included on the child's birth certificate and in official records/
      )
    ).toBeInTheDocument();
  });

  it("should display current values", () => {
    render(
      <MothersDetails
        {...defaultProps}
        value={{
          firstName: "Jane",
          middleName: "Marie",
          lastName: "Smith",
          dateOfBirth: "07/30/1986",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "Teacher",
          hadOtherSurname: "yes",
          otherSurname: "Johnson",
        }}
      />
    );

    expect(
      (screen.getByLabelText("First name") as HTMLInputElement).value
    ).toBe("Jane");
    expect(
      (screen.getByLabelText("Middle name(s)") as HTMLInputElement).value
    ).toBe("Marie");
    expect((screen.getByLabelText("Last name") as HTMLInputElement).value).toBe(
      "Smith"
    );
    // Date of birth is now split into Day, Month, Year
    expect((screen.getByLabelText("Day") as HTMLInputElement).value).toBe("30");
    expect((screen.getByLabelText("Month") as HTMLInputElement).value).toBe(
      "7"
    );
    expect((screen.getByLabelText("Year") as HTMLInputElement).value).toBe(
      "1986"
    );
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

    // Occupation field
    const occupationInput = screen.getByLabelText(/Occupation/);
    expect((occupationInput as HTMLInputElement).value).toBe("Teacher");
  });

  it("should render hadOtherSurname radio buttons", () => {
    render(<MothersDetails {...defaultProps} />);

    const yesRadio = screen.getByRole("radio", { name: "Yes" });
    const noRadio = screen.getByRole("radio", { name: "No" });

    expect(yesRadio).toBeInTheDocument();
    expect(noRadio).toBeInTheDocument();
    expect(yesRadio).toHaveAttribute("name", "mother-hadOtherSurname");
    expect(noRadio).toHaveAttribute("name", "mother-hadOtherSurname");
  });

  it("should call onChange when Yes is selected for hadOtherSurname", () => {
    const onChange = vi.fn();
    render(<MothersDetails {...defaultProps} onChange={onChange} />);

    const yesRadio = screen.getByRole("radio", { name: "Yes" });
    fireEvent.click(yesRadio);

    expect(onChange).toHaveBeenCalledWith({ hadOtherSurname: "yes" });
  });

  it("should call onChange when No is selected for hadOtherSurname", () => {
    const onChange = vi.fn();
    render(<MothersDetails {...defaultProps} onChange={onChange} />);

    const noRadio = screen.getByRole("radio", { name: "No" });
    fireEvent.click(noRadio);

    expect(onChange).toHaveBeenCalledWith({ hadOtherSurname: "no" });
  });

  it("should show otherSurname field when hadOtherSurname is yes", () => {
    render(
      <MothersDetails {...defaultProps} value={{ hadOtherSurname: "yes" }} />
    );

    expect(screen.getByLabelText("What was it")).toBeInTheDocument();
  });

  it("should not show otherSurname field when hadOtherSurname is no", () => {
    render(
      <MothersDetails {...defaultProps} value={{ hadOtherSurname: "no" }} />
    );

    expect(screen.queryByLabelText("What was it")).not.toBeInTheDocument();
  });

  it("should not show otherSurname field when hadOtherSurname is not set", () => {
    render(<MothersDetails {...defaultProps} value={{}} />);

    expect(screen.queryByLabelText("What was it")).not.toBeInTheDocument();
  });

  it("should call onChange when otherSurname changes", () => {
    const onChange = vi.fn();
    render(
      <MothersDetails
        {...defaultProps}
        onChange={onChange}
        value={{ hadOtherSurname: "yes" }}
      />
    );

    const input = screen.getByLabelText("What was it");
    fireEvent.change(input, { target: { value: "Johnson" } });

    expect(onChange).toHaveBeenCalledWith({
      hadOtherSurname: "yes",
      otherSurname: "Johnson",
    });
  });

  it("should call onChange when first name changes", () => {
    const onChange = vi.fn();
    render(<MothersDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("First name");
    fireEvent.change(input, { target: { value: "Sarah" } });

    expect(onChange).toHaveBeenCalledWith({ firstName: "Sarah" });
  });

  it("should call onChange when address changes", () => {
    const onChange = vi.fn();
    render(<MothersDetails {...defaultProps} onChange={onChange} />);

    const textarea = screen.getByLabelText("Current address");
    fireEvent.change(textarea, { target: { value: "456 Oak Ave" } });

    expect(onChange).toHaveBeenCalledWith({ address: "456 Oak Ave" });
  });

  it("should render passport number field inside details", () => {
    render(<MothersDetails {...defaultProps} />);

    // Click the disclosure to reveal the passport field
    const summary = screen.getByText("Use passport number instead");
    fireEvent.click(summary);

    // Passport field should be visible after opening details
    expect(screen.getByLabelText("Passport number")).toBeInTheDocument();
  });

  it("should display passport explanation text when details is open", () => {
    render(<MothersDetails {...defaultProps} />);

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
    render(<MothersDetails {...defaultProps} onChange={onChange} />);

    // Open details
    const summary = screen.getByText("Use passport number instead");
    fireEvent.click(summary);

    const input = screen.getByLabelText("Passport number");
    fireEvent.change(input, { target: { value: "P123456" } });

    expect(onChange).toHaveBeenCalledWith({ passportNumber: "P123456" });
  });

  it("should validate required fields on submission", () => {
    render(<MothersDetails {...defaultProps} value={{}} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(screen.getByText("There is a problem")).toBeInTheDocument();
  });

  it("should call onNext on successful form submission", () => {
    const onNext = vi.fn();
    render(
      <MothersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "07/30/1986",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "Teacher",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<MothersDetails {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should mark invalid fields with aria-invalid after submission", () => {
    render(<MothersDetails {...defaultProps} value={{ firstName: "" }} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should link error messages to inputs with aria-describedby", () => {
    render(<MothersDetails {...defaultProps} value={{ firstName: "" }} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute(
      "aria-describedby",
      "mother-firstName-error"
    );
  });

  it("should have correct field prefixes in IDs", () => {
    render(<MothersDetails {...defaultProps} />);

    expect(screen.getByLabelText("First name")).toHaveAttribute(
      "id",
      "mother-firstName"
    );
    expect(screen.getByLabelText("Last name")).toHaveAttribute(
      "id",
      "mother-lastName"
    );
    // Date fields now have separate IDs
    expect(screen.getByLabelText("Day")).toHaveAttribute(
      "id",
      "mother-dateOfBirth-day"
    );
    expect(screen.getByLabelText("Month")).toHaveAttribute(
      "id",
      "mother-dateOfBirth-month"
    );
    expect(screen.getByLabelText("Year")).toHaveAttribute(
      "id",
      "mother-dateOfBirth-year"
    );
    expect(screen.getByLabelText("Current address")).toHaveAttribute(
      "id",
      "mother-address"
    );
  });

  it("should focus on title when component mounts", () => {
    render(<MothersDetails {...defaultProps} />);

    const title = screen.getByText("Tell us about the child's mother");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should validate date of birth format", () => {
    render(
      <MothersDetails
        {...defaultProps}
        value={{
          firstName: "Jane",
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
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
    const dateInput = screen.getByLabelText("Day");
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should accept middle name as optional", () => {
    const onNext = vi.fn();
    render(
      <MothersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "07/30/1986",
          address: "123 Main St",
          nationalRegistrationNumber: "123456-7890",
          occupation: "Teacher",
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
      <MothersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "07/30/1986",
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
      screen.getAllByText("Enter the mother's occupation").length
    ).toBeGreaterThan(0);
  });

  it("should show error when occupation is empty string", () => {
    const onNext = vi.fn();
    render(
      <MothersDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "07/30/1986",
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
      screen.getAllByText("Enter the mother's occupation").length
    ).toBeGreaterThan(0);
  });

  it("should check the correct hadOtherSurname radio based on value", () => {
    const { rerender } = render(
      <MothersDetails {...defaultProps} value={{ hadOtherSurname: "yes" }} />
    );

    const yesRadio = screen.getByRole("radio", {
      name: "Yes",
    }) as HTMLInputElement;
    const noRadio = screen.getByRole("radio", {
      name: "No",
    }) as HTMLInputElement;

    expect(yesRadio.checked).toBe(true);
    expect(noRadio.checked).toBe(false);

    rerender(
      <MothersDetails {...defaultProps} value={{ hadOtherSurname: "no" }} />
    );

    expect(yesRadio.checked).toBe(false);
    expect(noRadio.checked).toBe(true);
  });

  it("should display placeholder for national registration number", () => {
    render(<MothersDetails {...defaultProps} />);

    const input = screen.getByLabelText("National registration number");
    expect(input).toHaveAttribute("placeholder", "123456-7890");
  });

  it("should render address as textarea with 3 rows", () => {
    render(<MothersDetails {...defaultProps} />);

    const textarea = screen.getByLabelText("Current address");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("should validate national registration number format", () => {
    render(
      <MothersDetails
        {...defaultProps}
        value={{
          firstName: "Jane",
          lastName: "Smith",
          dateOfBirth: "07/30/1986",
          address: "123 Main St",
          nationalRegistrationNumber: "abc",
          occupation: "Teacher",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Check for error (message appears in both summary and field)
    expect(screen.getByText("There is a problem")).toBeInTheDocument();
    const input = screen.getByLabelText("National registration number");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should render hadOtherSurname fieldset with proper accessibility", () => {
    render(<MothersDetails {...defaultProps} />);

    const fieldset = screen.getByRole("group", {
      name: /Has the mother had any other last name/,
    });
    expect(fieldset).toBeInTheDocument();
  });
});
