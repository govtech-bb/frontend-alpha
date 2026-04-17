import { afterEach, describe, expect, it } from "vitest";
import { parseRemoteFormDefinition } from "@/lib/forms/remote-form-schema";
import { resolveFormSubmitApiKey } from "@/lib/form-submit-key";

describe("parseRemoteFormDefinition", () => {
  it("parses a minimal valid envelope and exposes formSteps", () => {
    const parsed = parseRemoteFormDefinition({
      formName: "Test form",
      formSlug: "test-form",
      steps: [
        {
          id: "step-one",
          title: "Step one",
          fields: [
            {
              name: "applicant.firstName",
              label: "First name",
              type: "text",
              validation: { required: "Enter your first name" },
            },
          ],
        },
      ],
    });

    expect(parsed.formName).toBe("Test form");
    expect(parsed.formSlug).toBe("test-form");
    expect(parsed.formSteps).toHaveLength(1);
    expect(parsed.formSteps[0]?.id).toBe("step-one");
    expect(parsed.formSteps[0]?.fields[0]).toMatchObject({
      name: "applicant.firstName",
      type: "text",
    });
  });

  it("accepts computed age field from remote JSON shape", () => {
    const parsed = parseRemoteFormDefinition({
      formName: "Computed",
      formSlug: "computed",
      steps: [
        {
          id: "personal-information",
          title: "Personal information",
          fields: [
            {
              name: "applicant.dateOfBirth",
              label: "Date of birth",
              type: "date",
              validation: {
                required: "Enter your date of birth",
                date: { type: "past" },
              },
            },
            {
              name: "applicant.age",
              label: "Age",
              type: "text",
              hint: "Derived",
              readOnly: true,
              computedFrom: {
                field: "applicant.dateOfBirth",
                calculation: "ageYears",
              },
              validation: { required: false },
            },
          ],
        },
      ],
    });

    const ageField = parsed.formSteps[0]?.fields[1];
    expect(ageField).toMatchObject({
      name: "applicant.age",
      readOnly: true,
      computedFrom: {
        field: "applicant.dateOfBirth",
        calculation: "ageYears",
      },
    });
  });

  it("rejects invalid JSON", () => {
    expect(() =>
      parseRemoteFormDefinition({
        formName: "X",
        formSlug: "x",
        steps: [],
      })
    ).toThrow();
  });
});

describe("resolveFormSubmitApiKey", () => {
  const originalMap = process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP;

  afterEach(() => {
    if (originalMap === undefined) {
      delete process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP;
    } else {
      process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP = originalMap;
    }
  });

  it("returns storage key when map unset", () => {
    delete process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP;
    expect(resolveFormSubmitApiKey("my-form")).toBe("my-form");
  });

  it("maps slug when JSON map is valid", () => {
    process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY_MAP = JSON.stringify({
      "remote-slug": "api-registered-key",
    });
    expect(resolveFormSubmitApiKey("remote-slug")).toBe("api-registered-key");
    expect(resolveFormSubmitApiKey("other")).toBe("other");
  });
});
