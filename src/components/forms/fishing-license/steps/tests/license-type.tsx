import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LicenseType } from "../license-type";

describe("LicenseType", () => {
  const defaultProps = {
    value: "" as "" | "river" | "sea",
    onChange: vi.fn(),
    onNext: vi.fn(),
  };

  it("should render heading and radio options", () => {
    render(<LicenseType {...defaultProps} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /what type of fishing/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/river fishing/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sea fishing/i)).toBeInTheDocument();
  });

  it("should render continue button", () => {
    render(<LicenseType {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
  });

  it("should call onChange when river fishing is selected", () => {
    const onChange = vi.fn();
    render(<LicenseType {...defaultProps} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText(/river fishing/i));

    expect(onChange).toHaveBeenCalledWith("river");
  });

  it("should call onChange when sea fishing is selected", () => {
    const onChange = vi.fn();
    render(<LicenseType {...defaultProps} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText(/sea fishing/i));

    expect(onChange).toHaveBeenCalledWith("sea");
  });

  it("should show validation error when submitted without selection", () => {
    const onNext = vi.fn();
    render(<LicenseType {...defaultProps} onNext={onNext} />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText(/select the type of fishing license you need/i)
    ).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("should call onNext on valid submission", () => {
    const onNext = vi.fn();
    render(<LicenseType {...defaultProps} onNext={onNext} value="river" />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledOnce();
  });

  it("should mark radio group as invalid after failed submission", () => {
    render(<LicenseType {...defaultProps} />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveAttribute("aria-invalid", "true");
  });

  it("should pre-select river when value is river", () => {
    render(<LicenseType {...defaultProps} value="river" />);

    const riverRadio = screen.getByLabelText(/river fishing/i);
    expect(riverRadio).toBeChecked();
  });

  it("should pre-select sea when value is sea", () => {
    render(<LicenseType {...defaultProps} value="sea" />);

    const seaRadio = screen.getByLabelText(/sea fishing/i);
    expect(seaRadio).toBeChecked();
  });

  it("should have no selection when value is empty", () => {
    render(<LicenseType {...defaultProps} value="" />);

    const riverRadio = screen.getByLabelText(/river fishing/i);
    const seaRadio = screen.getByLabelText(/sea fishing/i);
    expect(riverRadio).not.toBeChecked();
    expect(seaRadio).not.toBeChecked();
  });

  it("should have accessible labels and ARIA attributes", () => {
    render(<LicenseType {...defaultProps} />);

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveAttribute("aria-label", "License type");
  });
});
