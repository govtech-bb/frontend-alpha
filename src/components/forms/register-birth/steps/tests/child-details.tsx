import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChildDetails } from "../child-details";

describe("ChildDetails", () => {
  const defaultProps = {
    value: {},
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(screen.getByText("Tell us about the child")).toBeInTheDocument();
  });

  it("should render all form fields", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle name(s)")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Sex at birth")).toBeInTheDocument();
    expect(screen.getByLabelText("Place of birth")).toBeInTheDocument();
  });

  it("should display helper text for middle names", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(
      screen.getByText("If they have more than one, add them in order")
    ).toBeInTheDocument();
  });

  it("should display date format hint", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(
      screen.getByText(/Use the calendar picker or enter the date/)
    ).toBeInTheDocument();
  });

  it("should display sex at birth explanation", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(
      screen.getByText(/We ask this so that we can monitor population trends/)
    ).toBeInTheDocument();
  });

  it("should display place of birth instructions", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(
      screen.getByText(/Include the town and parish in your answer/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Queen Elizabeth Hospital, Bridgetown, St. Michael/)
    ).toBeInTheDocument();
  });

  it("should display current values", () => {
    render(
      <ChildDetails
        {...defaultProps}
        value={{
          firstNames: "John",
          middleNames: "Paul",
          lastName: "Smith",
          dateOfBirth: "10/22/2025",
          sexAtBirth: "Male",
          parishOfBirth: "St. Michael",
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
    ).toBe("2025-10-22");
    expect(
      (screen.getByLabelText("Sex at birth") as HTMLSelectElement).value
    ).toBe("Male");
    expect(
      (screen.getByLabelText("Place of birth") as HTMLInputElement).value
    ).toBe("St. Michael");
  });

  it("should call onChange when first name changes", () => {
    const onChange = vi.fn();
    render(<ChildDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("First name");
    fireEvent.change(input, { target: { value: "Jane" } });

    expect(onChange).toHaveBeenCalledWith({ firstNames: "Jane" });
  });

  it("should call onChange when last name changes", () => {
    const onChange = vi.fn();
    render(<ChildDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Last name");
    fireEvent.change(input, { target: { value: "Doe" } });

    expect(onChange).toHaveBeenCalledWith({ lastName: "Doe" });
  });

  it("should call onChange when sex at birth changes", () => {
    const onChange = vi.fn();
    render(<ChildDetails {...defaultProps} onChange={onChange} />);

    const select = screen.getByLabelText("Sex at birth");
    fireEvent.change(select, { target: { value: "Female" } });

    expect(onChange).toHaveBeenCalledWith({ sexAtBirth: "Female" });
  });

  it("should render sex at birth options", () => {
    render(<ChildDetails {...defaultProps} />);

    const select = screen.getByLabelText("Sex at birth") as HTMLSelectElement;
    const options = Array.from(select.options).map((opt) => opt.value);

    expect(options).toContain("");
    expect(options).toContain("Male");
    expect(options).toContain("Female");
    expect(options).toContain("Intersex");
  });

  it("should prefill lastName when prefillSurname is provided and lastName is empty", () => {
    const onChange = vi.fn();
    render(
      <ChildDetails
        {...defaultProps}
        onChange={onChange}
        prefillSurname="Johnson"
        value={{ lastName: "" }}
      />
    );

    expect(onChange).toHaveBeenCalledWith({
      lastName: "Johnson",
    });
  });

  it("should not override existing lastName with prefillSurname", () => {
    const onChange = vi.fn();
    render(
      <ChildDetails
        {...defaultProps}
        onChange={onChange}
        prefillSurname="Johnson"
        value={{ lastName: "Smith" }}
      />
    );

    // onChange should not be called to override existing value
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should display prefillSurname in lastName field when value is empty", () => {
    render(
      <ChildDetails {...defaultProps} prefillSurname="Johnson" value={{}} />
    );

    const lastNameInput = screen.getByLabelText(
      "Last name"
    ) as HTMLInputElement;
    expect(lastNameInput.value).toBe("Johnson");
  });

  it("should validate required fields on submission", () => {
    render(<ChildDetails {...defaultProps} value={{}} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should call onNext on successful form submission", () => {
    const onNext = vi.fn();
    render(
      <ChildDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstNames: "John",
          lastName: "Smith",
          dateOfBirth: "10/22/2025",
          sexAtBirth: "Male",
          parishOfBirth: "St. Michael",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<ChildDetails {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should mark invalid fields with aria-invalid after submission", () => {
    render(<ChildDetails {...defaultProps} value={{ firstNames: "" }} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should link error messages to inputs with aria-describedby", () => {
    render(<ChildDetails {...defaultProps} value={{ firstNames: "" }} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const firstNameInput = screen.getByLabelText("First name");
    expect(firstNameInput).toHaveAttribute(
      "aria-describedby",
      "child-firstNames-error"
    );
  });

  it("should have correct field prefixes in IDs", () => {
    render(<ChildDetails {...defaultProps} />);

    expect(screen.getByLabelText("First name")).toHaveAttribute(
      "id",
      "child-firstNames"
    );
    expect(screen.getByLabelText("Last name")).toHaveAttribute(
      "id",
      "child-lastName"
    );
    expect(screen.getByLabelText("Date of birth")).toHaveAttribute(
      "id",
      "child-dateOfBirth"
    );
  });

  it("should focus on title when component mounts", () => {
    render(<ChildDetails {...defaultProps} />);

    const title = screen.getByText("Tell us about the child");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should validate date of birth format", () => {
    render(
      <ChildDetails
        {...defaultProps}
        value={{
          firstNames: "John",
          lastName: "Smith",
          dateOfBirth: "invalid-date",
          sexAtBirth: "Male",
          parishOfBirth: "St. Michael",
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

  it("should accept middle names as optional", () => {
    const onNext = vi.fn();
    render(
      <ChildDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          firstNames: "John",
          lastName: "Smith",
          dateOfBirth: "10/22/2025",
          sexAtBirth: "Male",
          parishOfBirth: "St. Michael",
        }}
      />
    );

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalled();
  });
});
