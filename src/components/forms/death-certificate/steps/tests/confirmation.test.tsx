import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Confirmation } from "../confirmation";

describe("Confirmation", () => {
  it("should render the title", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(
      screen.getByText(
        "Your death certificate application has been sent to the Registration Department."
      )
    ).toBeInTheDocument();
  });

  it("should render what happens next section", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(screen.getByText("What happens next")).toBeInTheDocument();
    expect(
      screen.getByText(
        /The Registration Department will process your application/i
      )
    ).toBeInTheDocument();
  });

  it("should render what to bring section", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(
      screen.getByText("What to bring when collecting")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Valid photo identification (passport or ID card)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your National Registration Number")
    ).toBeInTheDocument();
  });

  it("should render collection location section", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(screen.getByText("Collection location")).toBeInTheDocument();
    // Text is split across multiple lines in the address element
    expect(
      screen.getByText(/Registration Department, Records Branch/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Supreme Court Complex/)).toBeInTheDocument();
  });

  it("should display singular certificate text when numberOfCertificates is 1", () => {
    render(<Confirmation numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /You will need to visit in person to collect your certificate\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/when your certificate is ready for collection/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Payment for the certificate$/i)
    ).toBeInTheDocument();
  });

  it("should display plural certificates text when numberOfCertificates is greater than 1", () => {
    render(<Confirmation numberOfCertificates={3} />);

    expect(
      screen.getByText(
        /You will need to visit in person to collect your certificates\./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/when your certificates are ready for collection/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Payment for the certificates$/i)
    ).toBeInTheDocument();
  });

  it("should display the number of certificates requested", () => {
    render(<Confirmation numberOfCertificates={5} />);
    expect(
      screen.getByText("Number of certificates requested: 5")
    ).toBeInTheDocument();
  });

  it("should render office hours", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(
      screen.getByText("Office hours: Monday to Friday, 8:00 AM - 4:00 PM")
    ).toBeInTheDocument();
  });

  it("should render contact link", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(
      screen.getByText("Contact the Registration Department")
    ).toBeInTheDocument();
  });

  it("should render breadcrumb navigation", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(
      screen.getByText("Family, death and bereavement")
    ).toBeInTheDocument();
  });

  it("should focus on title when component mounts", () => {
    render(<Confirmation numberOfCertificates={1} />);

    const title = screen.getByText("Application submitted");
    expect(title).toHaveAttribute("tabIndex", "-1");
  });

  it("should render processing time information", () => {
    render(<Confirmation numberOfCertificates={1} />);
    expect(
      screen.getByText(/Processing typically takes 5-10 business days/i)
    ).toBeInTheDocument();
  });
});
