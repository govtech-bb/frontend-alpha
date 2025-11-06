import { fireEvent, render, screen } from "@testing-library/react";
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

    expect(
      screen.getByText("For example, 27 3 2007 or 27 Mar 2007")
    ).toBeInTheDocument();
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
    expect(monthInput.value).toBe("7"); // Strip leading zero
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

  it("should call onChange when day is entered", () => {
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
    fireEvent.change(dayInput, { target: { value: "15" } });

    // Check that onChange was called with day padded correctly
    expect(handleChange).toHaveBeenCalledWith("00/15/0000");
  });

  it("should call onChange when month is entered", () => {
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const monthInput = screen.getByLabelText("Month");
    fireEvent.change(monthInput, { target: { value: "12" } });

    expect(handleChange).toHaveBeenCalledWith("12/00/0000");
  });

  it("should call onChange when year is entered", () => {
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const yearInput = screen.getByLabelText("Year");
    fireEvent.change(yearInput, { target: { value: "2000" } });

    expect(handleChange).toHaveBeenCalledWith("00/00/2000");
  });

  it("should call onChange with partial date when field is cleared", async () => {
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

    // When one field is cleared, should call onChange with zero-padded partial date
    expect(handleChange).toHaveBeenCalledWith("07/00/1986");
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
    await user.type(dayInput, "5");

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls.at(-1)[0];
    expect(lastCall).toBe("00/05/0000");
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

    const monthInput = screen.getByLabelText("Month");
    await user.type(monthInput, "3");

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls.at(-1)[0];
    expect(lastCall).toBe("03/00/0000");
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

    expect(dayInput).toHaveClass("border-destructive");
    expect(monthInput).toHaveClass("border-destructive");
    expect(yearInput).toHaveClass("border-destructive");
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
    expect(monthInput.value).toBe("7"); // Strip leading zero
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
    expect(monthInput).toHaveClass("w-[10ch]"); // Wider for text months
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
    expect(monthInput).toHaveAttribute("maxLength", "9"); // Allows "September"
    expect(yearInput).toHaveAttribute("maxLength", "4");
  });

  it("should have numeric input mode for mobile keyboards on day and year", () => {
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
    expect(monthInput).not.toHaveAttribute("inputMode"); // Month allows text input
    expect(yearInput).toHaveAttribute("inputMode", "numeric");
  });

  it("should not render asterisk even when required prop is true", () => {
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

    const legend = screen.getByText("Date of birth");
    expect(legend.textContent).not.toContain("*");
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

  it("should sanitize non-numeric characters from day input", () => {
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
    fireEvent.change(dayInput, { target: { value: "a1b2c" } });

    // Should sanitize and only keep numeric characters
    expect(handleChange).toHaveBeenCalledWith("00/12/0000");
  });

  it("should sanitize non-alphanumeric characters from month input but keep letters", () => {
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const monthInput = screen.getByLabelText("Month");
    fireEvent.change(monthInput, { target: { value: "J@a#n$1%" } });

    // Should sanitize special chars but keep letters and digits
    expect(handleChange).toHaveBeenCalledWith("Jan1/00/0000");
  });

  it("should sanitize non-numeric characters from year input", () => {
    const handleChange = vi.fn();

    render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const yearInput = screen.getByLabelText("Year");
    fireEvent.change(yearInput, { target: { value: "abc1def" } });

    // Should sanitize and keep only numeric characters
    expect(handleChange).toHaveBeenCalledWith("00/00/0001");
  });

  it("should handle paste with non-numeric characters", async () => {
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
    await user.click(dayInput);
    await user.paste("12abc");

    // Should sanitize and only keep numeric characters
    expect(handleChange).toHaveBeenCalledWith("00/12/0000");
  });

  it("should have aria-live assertive on error message container", () => {
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

    const errorContainer = screen.getByText("Enter a valid date").parentElement;
    expect(errorContainer).toHaveAttribute("aria-live", "assertive");
  });

  it("should be fully controlled component without internal state", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { rerender } = render(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    const dayInput = screen.getByLabelText("Day") as HTMLInputElement;

    // User types "1"
    await user.type(dayInput, "1");

    // Parent component receives onChange call (with padding)
    expect(handleChange).toHaveBeenCalledWith("00/01/0000");

    // Parent updates with new value (empty because incomplete date)
    rerender(
      <DateInput
        id="test-date"
        label="Date of birth"
        onChange={handleChange}
        value=""
      />
    );

    // Input should show the value from props (empty), not maintain internal state
    expect(dayInput.value).toBe("");
  });

  describe("text month input support", () => {
    it("should accept text month names in month field", () => {
      const handleChange = vi.fn();

      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={handleChange}
          value=""
        />
      );

      const monthInput = screen.getByLabelText("Month");
      // Simulate user pasting or completing typing "Jan"
      fireEvent.change(monthInput, { target: { value: "Jan" } });

      // Should store text month as-is
      expect(handleChange).toHaveBeenCalledWith("Jan/00/0000");
    });

    it("should display text month as typed", () => {
      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={() => {
            /* Test handler */
          }}
          value="December/25/2024"
        />
      );

      const monthInput = screen.getByLabelText("Month") as HTMLInputElement;
      expect(monthInput.value).toBe("December");
    });

    it("should accept case insensitive month names", () => {
      const handleChange = vi.fn();

      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={handleChange}
          value=""
        />
      );

      const monthInput = screen.getByLabelText("Month");
      fireEvent.change(monthInput, { target: { value: "JULY" } });

      // Should preserve case as typed
      expect(handleChange).toHaveBeenCalledWith("JULY/00/0000");
    });

    it("should still accept numeric month input", () => {
      const handleChange = vi.fn();

      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={handleChange}
          value=""
        />
      );

      const monthInput = screen.getByLabelText("Month");
      fireEvent.change(monthInput, { target: { value: "12" } });

      // Should store numeric month
      expect(handleChange).toHaveBeenCalledWith("12/00/0000");
    });

    it("should display numeric month without leading zero when single digit", () => {
      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={() => {
            /* Test handler */
          }}
          value="07/15/2024"
        />
      );

      const monthInput = screen.getByLabelText("Month") as HTMLInputElement;
      // Numeric months still strip leading zeros for display
      expect(monthInput.value).toBe("7");
    });

    it("should allow ambiguous partial text input during typing", () => {
      const handleChange = vi.fn();

      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={handleChange}
          value=""
        />
      );

      const monthInput = screen.getByLabelText("Month");
      fireEvent.change(monthInput, { target: { value: "Ju" } });

      // Should allow partial ambiguous input (normalization happens on submit)
      expect(handleChange).toHaveBeenCalledWith("Ju/00/0000");
    });

    it("should allow mixed alphanumeric input in month field", () => {
      const handleChange = vi.fn();

      render(
        <DateInput
          id="test-date"
          label="Date of birth"
          onChange={handleChange}
          value=""
        />
      );

      const monthInput = screen.getByLabelText("Month");
      fireEvent.change(monthInput, { target: { value: "Jan1" } });

      // Month field accepts both letters and digits
      expect(handleChange).toHaveBeenCalledWith("Jan1/00/0000");
    });
  });

  describe("per-field error handling", () => {
    it("should highlight only day field when day has error", () => {
      render(
        <DateInput
          errors={{ day: "Day must be a number between 1 and 31" }}
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

      expect(dayInput).toHaveClass("border-destructive");
      expect(monthInput).not.toHaveClass("border-destructive");
      expect(yearInput).not.toHaveClass("border-destructive");
    });

    it("should highlight only month field when month has error", () => {
      render(
        <DateInput
          errors={{ month: "Month must be between 1 and 12" }}
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

      expect(dayInput).not.toHaveClass("border-destructive");
      expect(monthInput).toHaveClass("border-destructive");
      expect(yearInput).not.toHaveClass("border-destructive");
    });

    it("should highlight only year field when year has error", () => {
      render(
        <DateInput
          errors={{ year: "Year must include 4 numbers" }}
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

      expect(dayInput).not.toHaveClass("border-destructive");
      expect(monthInput).not.toHaveClass("border-destructive");
      expect(yearInput).toHaveClass("border-destructive");
    });

    it("should highlight multiple fields when multiple errors present", () => {
      render(
        <DateInput
          errors={{
            day: "Day is required",
            month: "Month is required",
          }}
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

      expect(dayInput).toHaveClass("border-destructive");
      expect(monthInput).toHaveClass("border-destructive");
      expect(yearInput).not.toHaveClass("border-destructive");
    });

    it("should set aria-invalid only on fields with errors", () => {
      render(
        <DateInput
          errors={{ day: "Day is required" }}
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
      expect(monthInput).not.toHaveAttribute("aria-invalid");
      expect(yearInput).not.toHaveAttribute("aria-invalid");
    });

    it("should display error message for day field", () => {
      render(
        <DateInput
          errors={{ day: "Day must be between 1 and 31" }}
          id="test-date"
          label="Date of birth"
          onChange={() => {
            /* Test handler */
          }}
          value=""
        />
      );

      expect(
        screen.getByText("Day must be between 1 and 31")
      ).toBeInTheDocument();
    });

    it("should display error message for month field", () => {
      render(
        <DateInput
          errors={{ month: "Month must be between 1 and 12" }}
          id="test-date"
          label="Date of birth"
          onChange={() => {
            /* Test handler */
          }}
          value=""
        />
      );

      expect(
        screen.getByText("Month must be between 1 and 12")
      ).toBeInTheDocument();
    });

    it("should display error message for year field", () => {
      render(
        <DateInput
          errors={{ year: "Year must include 4 numbers" }}
          id="test-date"
          label="Date of birth"
          onChange={() => {
            /* Test handler */
          }}
          value=""
        />
      );

      expect(
        screen.getByText("Year must include 4 numbers")
      ).toBeInTheDocument();
    });

    it("should display all error messages when multiple fields have errors", () => {
      render(
        <DateInput
          errors={{
            day: "Day is required",
            month: "Month is required",
            year: "Year is required",
          }}
          id="test-date"
          label="Date of birth"
          onChange={() => {
            /* Test handler */
          }}
          value=""
        />
      );

      expect(screen.getByText("Day is required")).toBeInTheDocument();
      expect(screen.getByText("Month is required")).toBeInTheDocument();
      expect(screen.getByText("Year is required")).toBeInTheDocument();
    });

    it("should not display any errors when errors object is empty", () => {
      render(
        <DateInput
          errors={{}}
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

      expect(dayInput).not.toHaveClass("border-destructive");
      expect(monthInput).not.toHaveClass("border-destructive");
      expect(yearInput).not.toHaveClass("border-destructive");
    });
  });
});
