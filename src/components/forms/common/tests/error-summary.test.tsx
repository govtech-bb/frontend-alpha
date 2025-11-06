import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorSummary } from "../error-summary";

describe("ErrorSummary", () => {
  it("should render error summary with title", () => {
    render(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
        ]}
      />
    );

    expect(screen.getByText("There is a problem")).toBeInTheDocument();
    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    render(
      <ErrorSummary
        errors={[{ field: "field1", message: "Error 1" }]}
        title="Custom Error Title"
      />
    );

    expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
  });

  it("should not render when there are no errors", () => {
    const { container } = render(<ErrorSummary errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render error links with correct href", () => {
    render(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
        ]}
      />
    );

    const link1 = screen.getByRole("link", { name: "Error 1" });
    const link2 = screen.getByRole("link", { name: "Error 2" });

    expect(link1).toHaveAttribute("href", "#field1");
    expect(link2).toHaveAttribute("href", "#field2");
  });

  it("should have role alert for accessibility", () => {
    render(<ErrorSummary errors={[{ field: "field1", message: "Error 1" }]} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should focus error summary when errors first appear", () => {
    const { rerender } = render(<ErrorSummary errors={[]} />);

    // Initially no errors, component doesn't render
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Add errors - component should render and focus
    rerender(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
        ]}
      />
    );

    const summary = screen.getByRole("alert");
    expect(summary).toHaveAttribute("tabIndex", "-1");
    expect(document.activeElement).toBe(summary);
  });

  it("should not refocus when errors decrease (user starts typing)", () => {
    const { rerender } = render(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
          { field: "field3", message: "Error 3" },
        ]}
      />
    );

    const summary = screen.getByRole("alert");

    // Create a mock to track focus calls
    const focusSpy = vi.spyOn(summary, "focus");

    // Clear focus (simulate user clicking away or typing in a field)
    summary.blur();
    expect(document.activeElement).not.toBe(summary);

    // User fixes one field - errors decrease from 3 to 2
    rerender(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
        ]}
      />
    );

    // Should NOT refocus when errors decrease
    expect(focusSpy).not.toHaveBeenCalled();
    expect(document.activeElement).not.toBe(summary);
  });

  it("should not refocus when errors change but count stays same", () => {
    const { rerender } = render(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
        ]}
      />
    );

    const summary = screen.getByRole("alert");
    const focusSpy = vi.spyOn(summary, "focus");

    // Clear focus
    summary.blur();

    // Change error messages but keep same count
    rerender(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Different Error 1" },
          { field: "field2", message: "Different Error 2" },
        ]}
      />
    );

    // Should not refocus
    expect(focusSpy).not.toHaveBeenCalled();
  });

  it("should not refocus when errors increase after initial render", () => {
    const { rerender } = render(
      <ErrorSummary errors={[{ field: "field1", message: "Error 1" }]} />
    );

    const summary = screen.getByRole("alert");
    const focusSpy = vi.spyOn(summary, "focus");

    // Clear focus
    summary.blur();

    // Add more errors
    rerender(
      <ErrorSummary
        errors={[
          { field: "field1", message: "Error 1" },
          { field: "field2", message: "Error 2" },
        ]}
      />
    );

    // Should not refocus when errors increase (user submitted again with more errors)
    expect(focusSpy).not.toHaveBeenCalled();
  });
});
