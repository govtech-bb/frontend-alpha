import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Confirmation } from "../confirmation";

describe("Confirmation", () => {
  it("should render the title", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText("We have received your registration details")
    ).toBeInTheDocument();
  });

  it("should render confirmation message", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /Confirmation has been sent to the email address you provided/
      )
    ).toBeInTheDocument();
  });

  it("should render breadcrumb link", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText("Family, birth and relationships")
    ).toBeInTheDocument();
  });

  it("should render 'What to do next' section", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("What to do next")).toBeInTheDocument();
    expect(
      screen.getByText(
        /To finish registering the birth, you must go to the Registration Department/
      )
    ).toBeInTheDocument();
  });

  it("should render information about birth certificate collection", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /The Registrations team will let you know when you can collect the child's birth certificate/
      )
    ).toBeInTheDocument();
  });

  it("should render 'Who should go to complete the registration' section", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText("Who should go to complete the registration")
    ).toBeInTheDocument();
  });

  it("should render attendance requirements for married parents", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /married to each other, the father must register and the mother can attend/
      )
    ).toBeInTheDocument();
  });

  it("should render attendance requirements for unmarried parents", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /not married to each other, the mother must register the birth/
      )
    ).toBeInTheDocument();
  });

  it("should render attendance requirements when father wants to be named", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(/both parents must register the birth together/)
    ).toBeInTheDocument();
  });

  it("should render note about not needing to bring baby", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText("You do not need to take the baby.")
    ).toBeInTheDocument();
  });

  it("should render 'What to bring' section", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("What to bring")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your child's medical book from the hospital or birthing centre/
      )
    ).toBeInTheDocument();
  });

  it("should render information about photo identification", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /A valid form of photo identification for each parent who will be named on the birth record/
      )
    ).toBeInTheDocument();
  });

  it("should render information about marriage certificate", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(
      screen.getByText(
        /Your original marriage certificate if you are married to the child's other parent/
      )
    ).toBeInTheDocument();
  });

  it("should render section for parents who are minors", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("Parents who are minors")).toBeInTheDocument();
    expect(screen.getByText(/you are considered a minor/)).toBeInTheDocument();
  });

  it("should render 'If you need support' section", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("If you need support")).toBeInTheDocument();
    expect(
      screen.getByText(
        /If you need help registering a birth, for example, you are unable to sign the register in person/
      )
    ).toBeInTheDocument();
  });

  it("should render Registration Department contact information", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    expect(screen.getByText("Registration Department")).toBeInTheDocument();
    expect(screen.getByText(/Supreme Court Complex/)).toBeInTheDocument();
    expect(screen.getByText(/Whitepark Road/)).toBeInTheDocument();
    expect(screen.getByText(/St. Michael/)).toBeInTheDocument();
    expect(screen.getByText(/\(246\) 535-9700/)).toBeInTheDocument();
  });

  it("should have green background banner for header section", () => {
    const { container } = render(
      <Confirmation hasFatherDetails={false} numberOfCertificates={1} />
    );

    // Check for the green banner container with bg-green-40
    const banner = container.querySelector(".bg-green-40");
    expect(banner).toBeInTheDocument();
  });

  it("should focus on title when component mounts", () => {
    render(<Confirmation hasFatherDetails={false} numberOfCertificates={1} />);

    const title = screen.getByText(
      "We have received your registration details"
    );
    expect(title).toHaveAttribute("tabIndex", "-1");
  });
});
