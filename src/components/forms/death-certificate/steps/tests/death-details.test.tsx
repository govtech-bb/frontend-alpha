import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DeathDetails } from "../death-details";

describe("DeathDetails", () => {
  const defaultProps = {
    value: {
      deceasedSurname: "",
      deceasedChristianNames: "",
      dateOfDeath: "",
      deceasedNationalRegistrationNo: "",
      placeOfDeath: "",
    },
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<DeathDetails {...defaultProps} />);
    expect(screen.getByText("Death Certificate Details")).toBeInTheDocument();
  });

  it("should render all five input fields", () => {
    render(<DeathDetails {...defaultProps} />);

    expect(screen.getByLabelText("Deceased's surname")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Deceased's Christian names")
    ).toBeInTheDocument();
    // DateInput renders Day/Month/Year fields, not a single "Date of death" field
    expect(screen.getByText("Date of death")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Deceased's National Registration Number")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Place of death")).toBeInTheDocument();
  });

  it("should call onChange when surname input changes", () => {
    const onChange = vi.fn();
    render(<DeathDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Deceased's surname");
    fireEvent.change(input, { target: { value: "Doe" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ deceasedSurname: "Doe" })
    );
  });

  it("should call onChange when Christian names input changes", () => {
    const onChange = vi.fn();
    render(<DeathDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Deceased's Christian names");
    fireEvent.change(input, { target: { value: "Jane Marie" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ deceasedChristianNames: "Jane Marie" })
    );
  });

  it("should call onChange when NRN input changes", () => {
    const onChange = vi.fn();
    render(<DeathDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText(
      "Deceased's National Registration Number"
    );
    fireEvent.change(input, { target: { value: "XYZ-789456" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ deceasedNationalRegistrationNo: "XYZ-789456" })
    );
  });

  it("should call onChange when place of death input changes", () => {
    const onChange = vi.fn();
    render(<DeathDetails {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Place of death");
    fireEvent.change(input, { target: { value: "QEH Bridgetown" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ placeOfDeath: "QEH Bridgetown" })
    );
  });

  it("should display values from props", () => {
    render(
      <DeathDetails
        {...defaultProps}
        value={{
          deceasedSurname: "Doe",
          deceasedChristianNames: "Jane Marie",
          dateOfDeath: "2024-01-15",
          deceasedNationalRegistrationNo: "XYZ-789456",
          placeOfDeath: "QEH Bridgetown",
        }}
      />
    );

    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Jane Marie")).toBeInTheDocument();
    expect(screen.getByDisplayValue("XYZ-789456")).toBeInTheDocument();
    expect(screen.getByDisplayValue("QEH Bridgetown")).toBeInTheDocument();
  });

  it("should have Continue and Back buttons", () => {
    render(<DeathDetails {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<DeathDetails {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should show validation errors when form is submitted with empty fields", () => {
    const onNext = vi.fn();
    render(<DeathDetails {...defaultProps} onNext={onNext} />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    // Multiple alert elements due to ErrorSummary + individual field errors
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Enter the deceased's surname")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Enter the deceased's Christian names")
    ).toBeInTheDocument();
    expect(screen.getByText("Enter the date of death")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the deceased's National Registration Number")
    ).toBeInTheDocument();
    expect(screen.getByText("Enter the place of death")).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should call onNext when form is submitted with valid data", () => {
    const onNext = vi.fn();
    render(
      <DeathDetails
        {...defaultProps}
        onNext={onNext}
        value={{
          deceasedSurname: "Doe",
          deceasedChristianNames: "Jane Marie",
          dateOfDeath: "2024-01-15",
          deceasedNationalRegistrationNo: "XYZ-789456",
          placeOfDeath: "QEH Bridgetown",
        }}
      />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should show error for invalid NRN characters", () => {
    render(<DeathDetails {...defaultProps} />);

    const input = screen.getByLabelText(
      "Deceased's National Registration Number"
    );
    fireEvent.change(input, { target: { value: "XYZ@789" } });

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
    render(<DeathDetails {...defaultProps} />);

    const surnameInput = screen.getByLabelText("Deceased's surname");
    const christianNamesInput = screen.getByLabelText(
      "Deceased's Christian names"
    );
    const nrnInput = screen.getByLabelText(
      "Deceased's National Registration Number"
    );
    const placeInput = screen.getByLabelText("Place of death");

    expect(surnameInput).toHaveAttribute("required");
    expect(christianNamesInput).toHaveAttribute("required");
    expect(nrnInput).toHaveAttribute("required");
    expect(placeInput).toHaveAttribute("required");
  });

  it("should focus on title when component mounts", () => {
    render(<DeathDetails {...defaultProps} />);

    const title = screen.getByText("Death Certificate Details");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should render DateInput component for date of death", () => {
    render(<DeathDetails {...defaultProps} />);

    // DateInput renders separate day, month, year fields
    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
  });
});
