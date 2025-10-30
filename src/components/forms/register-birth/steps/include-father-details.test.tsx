import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IncludeFatherDetails } from "./include-father-details";

describe("IncludeFatherDetails", () => {
  const defaultProps = {
    value: "" as "" | "yes" | "no",
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title and question", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    expect(
      screen.getByText(
        "Do you want to include the father's details on the birth record?"
      )
    ).toBeInTheDocument();
  });

  it("should render explanation text for both options", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    expect(
      screen.getByText(/If you choose 'Yes', both parents must go/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/If you choose 'No', the mother must go/)
    ).toBeInTheDocument();
  });

  it("should render both radio buttons with descriptive labels", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    const yesRadio = screen.getByLabelText("Yes, include the father's details");
    const noRadio = screen.getByLabelText(
      "No, do not include the father's details"
    );

    expect(yesRadio).toBeInTheDocument();
    expect(noRadio).toBeInTheDocument();
  });

  it("should call onChange when Yes radio button is clicked", () => {
    const onChange = vi.fn();
    render(<IncludeFatherDetails {...defaultProps} onChange={onChange} />);

    const yesRadio = screen.getByLabelText("Yes, include the father's details");
    fireEvent.click(yesRadio);

    expect(onChange).toHaveBeenCalledWith("yes");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should call onChange when No radio button is clicked", () => {
    const onChange = vi.fn();
    render(<IncludeFatherDetails {...defaultProps} onChange={onChange} />);

    const noRadio = screen.getByLabelText(
      "No, do not include the father's details"
    );
    fireEvent.click(noRadio);

    expect(onChange).toHaveBeenCalledWith("no");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should disable Next button when no selection is made", () => {
    render(<IncludeFatherDetails {...defaultProps} value="" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("should enable Next button when Yes is selected", () => {
    render(<IncludeFatherDetails {...defaultProps} value="yes" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it("should enable Next button when No is selected", () => {
    render(<IncludeFatherDetails {...defaultProps} value="no" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it("should check the correct radio button based on value prop", () => {
    const { rerender } = render(
      <IncludeFatherDetails {...defaultProps} value="yes" />
    );

    const yesRadio = screen.getByLabelText(
      "Yes, include the father's details"
    ) as HTMLInputElement;
    const noRadio = screen.getByLabelText(
      "No, do not include the father's details"
    ) as HTMLInputElement;

    expect(yesRadio.checked).toBe(true);
    expect(noRadio.checked).toBe(false);

    rerender(<IncludeFatherDetails {...defaultProps} value="no" />);

    expect(yesRadio.checked).toBe(false);
    expect(noRadio.checked).toBe(true);
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<IncludeFatherDetails {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onNext when Next button is clicked with valid selection", () => {
    const onNext = vi.fn();
    render(
      <IncludeFatherDetails {...defaultProps} onNext={onNext} value="yes" />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should prevent form submission when Next button is clicked without selection", () => {
    const onNext = vi.fn();
    render(<IncludeFatherDetails {...defaultProps} onNext={onNext} value="" />);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Button is disabled, so click should not trigger onNext
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should have accessible form structure", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    // Check for proper fieldset and legend (screen reader only)
    const fieldset = screen.getByRole("group", {
      name: /include father's details/i,
    });
    expect(fieldset).toBeInTheDocument();

    // Check that radio buttons are properly grouped
    const yesRadio = screen.getByLabelText("Yes, include the father's details");
    const noRadio = screen.getByLabelText(
      "No, do not include the father's details"
    );

    expect(yesRadio).toHaveAttribute("name", "includeFatherDetails");
    expect(noRadio).toHaveAttribute("name", "includeFatherDetails");
  });

  it("should focus on title when component mounts", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    const title = screen.getByText(
      "Do you want to include the father's details on the birth record?"
    );
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should explain the consequences of choosing Yes", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    expect(
      screen.getByText(/both parents must go to the Registration Department/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sign the official register together/)
    ).toBeInTheDocument();
  });

  it("should explain the consequences of choosing No", () => {
    render(<IncludeFatherDetails {...defaultProps} />);

    expect(
      screen.getByText(/the mother must go to the Registration Department/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not necessary for the father to attend/)
    ).toBeInTheDocument();
  });
});
