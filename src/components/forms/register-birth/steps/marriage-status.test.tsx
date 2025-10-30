import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MarriageStatus } from "./marriage-status";

describe("MarriageStatus", () => {
  const defaultProps = {
    value: "" as "" | "yes" | "no",
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title and question", () => {
    render(<MarriageStatus {...defaultProps} />);

    expect(
      screen.getByText(
        "When the child was born, were the mother and father married to each other?"
      )
    ).toBeInTheDocument();
  });

  it("should render explanation text", () => {
    render(<MarriageStatus {...defaultProps} />);

    expect(
      screen.getByText("We ask this because your answer determines:")
    ).toBeInTheDocument();
    expect(screen.getByText("the surname of the child")).toBeInTheDocument();
    expect(screen.getByText("who can register the birth")).toBeInTheDocument();
  });

  it("should render both radio buttons", () => {
    render(<MarriageStatus {...defaultProps} />);

    const yesRadio = screen.getByLabelText("Yes");
    const noRadio = screen.getByLabelText("No");

    expect(yesRadio).toBeInTheDocument();
    expect(noRadio).toBeInTheDocument();
  });

  it("should call onChange when Yes radio button is clicked", () => {
    const onChange = vi.fn();
    render(<MarriageStatus {...defaultProps} onChange={onChange} />);

    const yesRadio = screen.getByLabelText("Yes");
    fireEvent.click(yesRadio);

    expect(onChange).toHaveBeenCalledWith("yes");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should call onChange when No radio button is clicked", () => {
    const onChange = vi.fn();
    render(<MarriageStatus {...defaultProps} onChange={onChange} />);

    const noRadio = screen.getByLabelText("No");
    fireEvent.click(noRadio);

    expect(onChange).toHaveBeenCalledWith("no");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should disable Next button when no selection is made", () => {
    render(<MarriageStatus {...defaultProps} value="" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("should enable Next button when Yes is selected", () => {
    render(<MarriageStatus {...defaultProps} value="yes" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it("should enable Next button when No is selected", () => {
    render(<MarriageStatus {...defaultProps} value="no" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it("should check the correct radio button based on value prop", () => {
    const { rerender } = render(
      <MarriageStatus {...defaultProps} value="yes" />
    );

    const yesRadio = screen.getByLabelText("Yes") as HTMLInputElement;
    const noRadio = screen.getByLabelText("No") as HTMLInputElement;

    expect(yesRadio.checked).toBe(true);
    expect(noRadio.checked).toBe(false);

    rerender(<MarriageStatus {...defaultProps} value="no" />);

    expect(yesRadio.checked).toBe(false);
    expect(noRadio.checked).toBe(true);
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<MarriageStatus {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onNext when Next button is clicked with valid selection", () => {
    const onNext = vi.fn();
    render(<MarriageStatus {...defaultProps} onNext={onNext} value="yes" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should prevent form submission when Next button is clicked without selection", () => {
    const onNext = vi.fn();
    render(<MarriageStatus {...defaultProps} onNext={onNext} value="" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Button is disabled, so click should not trigger onNext
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should have accessible form structure", () => {
    render(<MarriageStatus {...defaultProps} />);

    // Check for proper fieldset and legend
    const fieldset = screen.getByRole("group", { name: /marriage status/i });
    expect(fieldset).toBeInTheDocument();

    // Check that radio buttons are properly grouped
    const yesRadio = screen.getByLabelText("Yes");
    const noRadio = screen.getByLabelText("No");

    expect(yesRadio).toHaveAttribute("name", "marriageStatus");
    expect(noRadio).toHaveAttribute("name", "marriageStatus");
  });

  it("should focus on title when component mounts", () => {
    render(<MarriageStatus {...defaultProps} />);

    const title = screen.getByText(
      "When the child was born, were the mother and father married to each other?"
    );
    expect(title).toHaveAttribute("tabIndex", "-1");
  });
});
