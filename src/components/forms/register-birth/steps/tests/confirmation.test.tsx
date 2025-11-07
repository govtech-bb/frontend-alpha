import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Confirmation } from "../confirmation";

describe("Confirmation", () => {
  it("should render the title", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("Pre-registration complete")).toBeInTheDocument();
  });

  it("should render confirmation message", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        "Your information has been sent to the Registration Department."
      )
    ).toBeInTheDocument();
  });

  it("should render next steps section", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("What you must do next")).toBeInTheDocument();
    expect(
      screen.getByText(
        /You must now visit the Registration Department in person to sign the birth register/
      )
    ).toBeInTheDocument();
  });

  it("should show mother-only attendance message when father details not included", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={2} />);

    expect(
      screen.getByText("The mother must attend the appointment.")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/both the mother and father/)
    ).not.toBeInTheDocument();
  });

  it("should show both parents attendance message when father details included", () => {
    render(<Confirmation hasFatherDetails={true} numberOfCertificates={2} />);

    expect(
      screen.getByText(
        "Both the mother and father of the child must attend the appointment."
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("The mother must attend")
    ).not.toBeInTheDocument();
  });

  it("should calculate certificate cost correctly for 1 certificate", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText(/BDD\$5\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Remember to bring payment/)).toBeInTheDocument();
  });

  it("should calculate certificate cost correctly for multiple certificates", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={3} />);

    // 3 certificates at $5 each = $15.00
    expect(screen.getByText(/BDD\$15\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Remember to bring payment/)).toBeInTheDocument();
  });

  it("should calculate certificate cost correctly for zero certificates", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={0} />);

    expect(screen.getByText(/is free/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Remember to bring payment/)
    ).not.toBeInTheDocument();
  });

  it("should render location information", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("Location")).toBeInTheDocument();

    // Check that all location details are present (Registration Department appears multiple times)
    const allText = screen.getAllByText(/Registration Department/);
    expect(allText.length).toBeGreaterThan(0);

    expect(screen.getByText(/Supreme Court Complex/)).toBeInTheDocument();
    expect(screen.getByText(/Whitepark Road/)).toBeInTheDocument();
    expect(screen.getByText(/St. Michael/)).toBeInTheDocument();
  });

  it("should render appointment information section", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText("Who must attend the appointment")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You do not need an appointment/)
    ).toBeInTheDocument();
  });

  it("should render payment reminder", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={2} />);

    expect(
      screen.getByText(/Remember to bring payment with you/)
    ).toBeInTheDocument();
  });

  it("should render identification reminder", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /You should also bring valid photo identification for the parent\(s\) attending/
      )
    ).toBeInTheDocument();
  });

  it("should render button for additional information", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    const button = screen.getByRole("button", {
      name: /see what you need to bring with you/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should have blue background banner for confirmation message", () => {
    const { container } = render(
      <Confirmation hasFatherDetails={false} numberOfCertificates={1} />
    );

    // Check for the blue banner container with bg-[#D4F1F4]
    const banner = container.querySelector(".bg-\\[\\#D4F1F4\\]");
    expect(banner).toBeInTheDocument();
  });

  it("should focus on title when component mounts", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    const title = screen.getByText("Pre-registration complete");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should format currency with two decimal places", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={5} />);

    // 5 certificates at $5 each = $25.00
    expect(screen.getByText(/BDD\$25\.00/)).toBeInTheDocument();
  });

  it("should render all key information sections", () => {
    render(<Confirmation hasFatherDetails={true} numberOfCertificates={2} />);

    // Check all major sections are present
    expect(screen.getByText("Pre-registration complete")).toBeInTheDocument();
    expect(screen.getByText("What you must do next")).toBeInTheDocument();
    expect(
      screen.getByText("Who must attend the appointment")
    ).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
  });
});
