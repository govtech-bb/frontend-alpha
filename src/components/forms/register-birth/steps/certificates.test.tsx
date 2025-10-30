import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Certificates } from "./certificates";

describe("Certificates", () => {
  const defaultProps = {
    value: 0,
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<Certificates {...defaultProps} />);

    expect(screen.getByText("Order a birth certificate")).toBeInTheDocument();
  });

  it("should render explanatory text about certificates", () => {
    render(<Certificates {...defaultProps} />);

    expect(
      screen.getByText(
        /A birth certificate is essential for access to some public services/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You will need to pay BDD\$5\.00 for each certificate/)
    ).toBeInTheDocument();
  });

  it("should render information about keeping originals", () => {
    render(<Certificates {...defaultProps} />);

    expect(
      screen.getByText(/We keep the original so you can order a certified copy/)
    ).toBeInTheDocument();
  });

  it("should render information about free registration", () => {
    render(<Certificates {...defaultProps} />);

    expect(
      screen.getByText(/The birth registration is free of charge/)
    ).toBeInTheDocument();
  });

  it("should render number input with correct label", () => {
    render(<Certificates {...defaultProps} />);

    const label = screen.getByLabelText("Number of certificates required");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("type", "number");
  });

  it("should display the current value", () => {
    render(<Certificates {...defaultProps} value={3} />);

    const input = screen.getByLabelText(
      "Number of certificates required"
    ) as HTMLInputElement;
    expect(input.value).toBe("3");
  });

  it("should call onChange when input value changes", () => {
    const onChange = vi.fn();
    render(<Certificates {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Number of certificates required");
    fireEvent.change(input, { target: { value: "2" } });

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("should handle zero value correctly", () => {
    render(<Certificates {...defaultProps} value={0} />);

    const input = screen.getByLabelText(
      "Number of certificates required"
    ) as HTMLInputElement;
    expect(input.value).toBe("0");
  });

  it("should handle empty input as zero", () => {
    const onChange = vi.fn();
    render(<Certificates {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Number of certificates required");
    fireEvent.change(input, { target: { value: "" } });

    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("should have min and max attributes", () => {
    render(<Certificates {...defaultProps} />);

    const input = screen.getByLabelText("Number of certificates required");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "20");
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<Certificates {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should submit form when Next button is clicked with valid value", () => {
    const onNext = vi.fn();
    render(<Certificates {...defaultProps} onNext={onNext} value={2} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should show validation errors after submission with invalid value", () => {
    render(<Certificates {...defaultProps} value={25} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Check for error summary
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should have accessible form structure", () => {
    render(<Certificates {...defaultProps} />);

    const input = screen.getByLabelText("Number of certificates required");
    expect(input).toHaveAttribute("id", "numberOfCertificates");
  });

  it("should focus on title when component mounts", () => {
    render(<Certificates {...defaultProps} />);

    const title = screen.getByText("Order a birth certificate");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should display error summary when validation fails", () => {
    render(<Certificates {...defaultProps} value={25} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    // Check for error summary component
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should mark input as invalid when there are errors", () => {
    render(<Certificates {...defaultProps} value={25} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const input = screen.getByLabelText("Number of certificates required");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should link error message to input with aria-describedby", () => {
    render(<Certificates {...defaultProps} value={25} />);

    const form = screen.getByRole("button", { name: /next/i }).closest("form");
    fireEvent.submit(form!);

    const input = screen.getByLabelText("Number of certificates required");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "numberOfCertificates-error"
    );
  });

  it("should render both Back and Next buttons", () => {
    render(<Certificates {...defaultProps} />);

    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });
});
