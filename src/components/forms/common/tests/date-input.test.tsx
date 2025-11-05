import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateInput } from "../date-input";

describe("DateInput", () => {
  it("should render three input fields for day, month, and year", () => {
    render(
      <DateInput
        id="test-date"
        label="Test Date"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    expect(screen.getByLabelText("Day")).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
    expect(screen.getByLabelText("Year")).toBeInTheDocument();
  });

  it("should render label text", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    expect(screen.getByText("Date of birth")).toBeInTheDocument();
  });

  it("should render default hint text", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    expect(screen.getByText("For example, 27 3 2007")).toBeInTheDocument();
  });

  it("should render custom hint text", () => {
    render(
      <DateInput
        hint="Enter the date you were born"
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    expect(
      screen.getByText("Enter the date you were born")
    ).toBeInTheDocument();
  });

  it("should parse MM/DD/YYYY value into separate fields", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value="07/30/1986"
      />
    );

    const dayInput = screen.getByLabelText("Day") as HTMLInputElement;
    const monthInput = screen.getByLabelText("Month") as HTMLInputElement;
    const yearInput = screen.getByLabelText("Year") as HTMLInputElement;

    expect(dayInput.value).toBe("30");
    expect(monthInput.value).toBe("07");
    expect(yearInput.value).toBe("1986");
  });

  it("should show empty fields when value is empty string", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day") as HTMLInputElement;
    const monthInput = screen.getByLabelText("Month") as HTMLInputElement;
    const yearInput = screen.getByLabelText("Year") as HTMLInputElement;

    expect(dayInput.value).toBe("");
    expect(monthInput.value).toBe("");
    expect(yearInput.value).toBe("");
  });

  it("should call onChange with combined MM/DD/YYYY when day is entered", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value="07/30/1986"
      />
    );

    const dayInput = screen.getByLabelText("Day");

    await user.clear(dayInput);
    await user.type(dayInput, "15");

    // Should call onChange with updated date
    expect(handleChange).toHaveBeenCalledWith("07/15/1986");
  });

  it("should call onChange with combined MM/DD/YYYY when month is entered", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value="07/30/1986"
      />
    );

    const monthInput = screen.getByLabelText("Month");

    await user.clear(monthInput);
    await user.type(monthInput, "12");

    expect(handleChange).toHaveBeenCalledWith("12/30/1986");
  });

  it("should call onChange with combined MM/DD/YYYY when year is entered", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value="07/30/1986"
      />
    );

    const yearInput = screen.getByLabelText("Year");

    await user.clear(yearInput);
    await user.type(yearInput, "2000");

    expect(handleChange).toHaveBeenCalledWith("07/30/2000");
  });

  it("should call onChange with empty string when fields are cleared", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value="07/30/1986"
      />
    );

    const dayInput = screen.getByLabelText("Day");

    await user.clear(dayInput);

    expect(handleChange).toHaveBeenCalledWith("");
  });

  it("should pad single-digit day to 2 digits in onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    await user.type(dayInput, "5");
    await user.type(monthInput, "7");
    await user.type(yearInput, "1986");

    expect(handleChange).toHaveBeenLastCalledWith("07/05/1986");
  });

  it("should pad single-digit month to 2 digits in onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    await user.type(dayInput, "15");
    await user.type(monthInput, "3");
    await user.type(yearInput, "1986");

    expect(handleChange).toHaveBeenLastCalledWith("03/15/1986");
  });

  it("should render error message when error prop is provided", () => {
    render(
      <DateInput
        error="Enter a valid date"
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    expect(screen.getByText("Enter a valid date")).toBeInTheDocument();
  });

  it("should apply error styling to inputs when error prop is provided", () => {
    render(
      <DateInput
        error="Enter a valid date"
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    expect(dayInput).toHaveClass("border-red-600");
    expect(monthInput).toHaveClass("border-red-600");
    expect(yearInput).toHaveClass("border-red-600");
  });

  it("should set aria-invalid on inputs when error is present", () => {
    render(
      <DateInput
        error="Enter a valid date"
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    expect(dayInput).toHaveAttribute("aria-invalid", "true");
    expect(monthInput).toHaveAttribute("aria-invalid", "true");
    expect(yearInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should not set aria-invalid when no error", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");

    expect(dayInput).not.toHaveAttribute("aria-invalid");
  });

  it("should call onBlur when day field loses focus", async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onBlur={handleBlur}
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");

    await user.click(dayInput);
    await user.tab(); // Move focus away

    expect(handleBlur).toHaveBeenCalled();
  });

  it("should call onBlur when month field loses focus", async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onBlur={handleBlur}
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const monthInput = screen.getByLabelText("Month");

    await user.click(monthInput);
    await user.tab(); // Move focus away

    expect(handleBlur).toHaveBeenCalled();
  });

  it("should call onBlur when year field loses focus", async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onBlur={handleBlur}
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const yearInput = screen.getByLabelText("Year");

    await user.click(yearInput);
    await user.tab(); // Move focus away

    expect(handleBlur).toHaveBeenCalled();
  });

  it("should update fields when external value prop changes", () => {
    const { rerender } = render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value="07/30/1986"
      />
    );

    const dayInput = screen.getByLabelText("Day") as HTMLInputElement;
    const monthInput = screen.getByLabelText("Month") as HTMLInputElement;
    const yearInput = screen.getByLabelText("Year") as HTMLInputElement;

    expect(dayInput.value).toBe("30");
    expect(monthInput.value).toBe("07");
    expect(yearInput.value).toBe("1986");

    // Update external value
    rerender(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value="12/25/2000"
      />
    );

    expect(dayInput.value).toBe("25");
    expect(monthInput.value).toBe("12");
    expect(yearInput.value).toBe("2000");
  });

  it("should have correct input widths for GOV.UK style", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    expect(dayInput).toHaveClass("w-[5ch]");
    expect(monthInput).toHaveClass("w-[5ch]");
    expect(yearInput).toHaveClass("w-[7ch]");
  });

  it("should have maxLength attributes to limit input", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    expect(dayInput).toHaveAttribute("maxLength", "2");
    expect(monthInput).toHaveAttribute("maxLength", "2");
    expect(yearInput).toHaveAttribute("maxLength", "4");
  });

  it("should have numeric input mode for mobile keyboards", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day");
    const monthInput = screen.getByLabelText("Month");
    const yearInput = screen.getByLabelText("Year");

    expect(dayInput).toHaveAttribute("inputMode", "numeric");
    expect(monthInput).toHaveAttribute("inputMode", "numeric");
    expect(yearInput).toHaveAttribute("inputMode", "numeric");
  });

  it("should render required asterisk when required prop is true", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        required
        value=""
      />
    );

    const legend = screen.getByText(/Date of birth/);
    expect(legend.textContent).toContain("*");
  });

  it("should not render asterisk when required prop is false", () => {
    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        required={false}
        value=""
      />
    );

    const legend = screen.getByText("Date of birth");
    expect(legend.textContent).not.toContain("*");
  });

  it("should have proper aria-describedby linking hint and error", () => {
    render(
      <DateInput
        error="Enter a valid date"
        hint="Custom hint text"
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveAttribute(
      "aria-describedby",
      "test-date-hint test-date-error"
    );
  });

  it("should have aria-describedby with only hint when no error", () => {
    render(
      <DateInput
        hint="Custom hint text"
        id="test-date"
        label="Date of birth"
        onChange={() => {
          /* Test handler */
        }}
        value=""
      />
    );

    const fieldset = screen.getByRole("group");
    expect(fieldset).toHaveAttribute("aria-describedby", "test-date-hint");
  });
});
