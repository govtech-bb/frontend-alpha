import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactInfo } from "../contact-info";

describe("ContactInfo", () => {
  const defaultProps = {
    email: "",
    wantContact: "" as "" | "yes" | "no",
    phoneNumber: "",
    onChange: vi.fn(),
    onNext: vi.fn(),
    onBack: vi.fn(),
  };

  it("should render the title", () => {
    render(<ContactInfo {...defaultProps} />);

    expect(screen.getByText("Contact details")).toBeInTheDocument();
  });

  it("should render explanatory text", () => {
    render(<ContactInfo {...defaultProps} />);

    expect(
      screen.getByText(
        /We ask for this information so we can send you confirmation/
      )
    ).toBeInTheDocument();
  });

  it("should render email field with correct label", () => {
    render(<ContactInfo {...defaultProps} />);

    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should render phone number field with correct label", () => {
    render(<ContactInfo {...defaultProps} />);

    const phoneInput = screen.getByLabelText("Phone number");
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute("type", "tel");
  });

  it("should display current email value", () => {
    render(<ContactInfo {...defaultProps} email="test@example.com" />);

    const emailInput = screen.getByLabelText(
      "Email address"
    ) as HTMLInputElement;
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should display current phone number value", () => {
    render(<ContactInfo {...defaultProps} phoneNumber="246-555-1234" />);

    const phoneInput = screen.getByLabelText(
      "Phone number"
    ) as HTMLInputElement;
    expect(phoneInput.value).toBe("246-555-1234");
  });

  it("should call onChange with email when email changes", () => {
    const onChange = vi.fn();
    render(<ContactInfo {...defaultProps} onChange={onChange} />);

    const emailInput = screen.getByLabelText("Email address");
    fireEvent.change(emailInput, { target: { value: "new@example.com" } });

    expect(onChange).toHaveBeenCalledWith("email", "new@example.com");
  });

  it("should call onChange with phoneNumber when phone changes", () => {
    const onChange = vi.fn();
    render(<ContactInfo {...defaultProps} onChange={onChange} />);

    const phoneInput = screen.getByLabelText("Phone number");
    fireEvent.change(phoneInput, { target: { value: "246-555-9999" } });

    expect(onChange).toHaveBeenCalledWith("phoneNumber", "246-555-9999");
  });

  it("should call onBack when Back button is clicked", () => {
    const onBack = vi.fn();
    render(<ContactInfo {...defaultProps} onBack={onBack} />);

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should validate email on form submission", () => {
    render(
      <ContactInfo
        {...defaultProps}
        email="invalid-email"
        phoneNumber="246-555-1234"
      />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should validate required fields on form submission", () => {
    render(<ContactInfo {...defaultProps} email="" phoneNumber="" />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should call onNext with wantContact set to yes on successful submission", () => {
    const onChange = vi.fn();
    const onNext = vi.fn();
    render(
      <ContactInfo
        {...defaultProps}
        email="valid@example.com"
        onChange={onChange}
        onNext={onNext}
        phoneNumber="246-555-1234"
      />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(onChange).toHaveBeenCalledWith("wantContact", "yes");
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should display error summary when validation fails", () => {
    render(<ContactInfo {...defaultProps} email="" phoneNumber="" />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should mark email input as invalid when there are errors", () => {
    render(<ContactInfo {...defaultProps} email="invalid" />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should link error message to email input with aria-describedby", () => {
    render(<ContactInfo {...defaultProps} email="invalid" />);

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    const emailInput = screen.getByLabelText("Email address");
    expect(emailInput).toHaveAttribute("aria-describedby", "email-error");
  });

  it("should focus on title when component mounts", () => {
    render(<ContactInfo {...defaultProps} />);

    const title = screen.getByText("Contact details");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should render Continue button instead of Next", () => {
    render(<ContactInfo {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /continue/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^next$/i })
    ).not.toBeInTheDocument();
  });

  it("should have accessible form structure with proper IDs", () => {
    render(<ContactInfo {...defaultProps} />);

    const emailInput = screen.getByLabelText("Email address");
    const phoneInput = screen.getByLabelText("Phone number");

    expect(emailInput).toHaveAttribute("id", "email");
    expect(phoneInput).toHaveAttribute("id", "phoneNumber");
  });

  it("should validate phone number required", () => {
    render(
      <ContactInfo {...defaultProps} email="valid@example.com" phoneNumber="" />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    const phoneInput = screen.getByLabelText("Phone number");
    expect(phoneInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should accept valid phone number", () => {
    const onNext = vi.fn();
    render(
      <ContactInfo
        {...defaultProps}
        email="valid@example.com"
        onNext={onNext}
        phoneNumber="246-555-1234"
      />
    );

    const form = screen
      .getByRole("button", { name: /continue/i })
      .closest("form");
    fireEvent.submit(form!);

    expect(onNext).toHaveBeenCalled();
  });
});
