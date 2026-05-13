import { barbadosParishes, NAME_REGEX, PHONE_REGEX } from "@/data/constants";
import type { FormStep } from "@/types";

/**
 * Default form schema used for every youth opportunity application.
 * Per-opportunity overrides can be added later by branching on the
 * opportunity id when building the steps.
 */
export function buildYouthOpportunityFormSteps(
  opportunityTitle: string
): FormStep[] {
  return [
    {
      id: "applicant-details",
      title: "About you",
      description: "Tell us who you are so we know how to get in touch.",
      fields: [
        {
          name: "applicant.firstName",
          label: "First name",
          type: "text",
          validation: {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters",
            },
            pattern: {
              value: NAME_REGEX,
              message:
                "First name must contain only letters, hyphens, or apostrophes",
            },
          },
        },
        {
          name: "applicant.lastName",
          label: "Last name",
          type: "text",
          validation: {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters",
            },
            pattern: {
              value: NAME_REGEX,
              message:
                "Last name must contain only letters, hyphens, or apostrophes",
            },
          },
        },
        {
          name: "applicant.dateOfBirth",
          label: "Date of birth",
          hint: "Used to confirm you meet the age requirements for this opportunity.",
          type: "date",
          validation: {
            required: "Date of birth is required",
            date: { type: "past" },
          },
        },
        {
          name: "applicant.email",
          label: "Email address",
          type: "email",
          validation: {
            required: "Email address is required",
          },
        },
        {
          name: "applicant.phone",
          label: "Phone number",
          hint: "A local Barbados number, for example 246-555-1234.",
          type: "tel",
          validation: {
            required: "Phone number is required",
            pattern: {
              value: PHONE_REGEX,
              message: "Enter a valid Barbados phone number",
            },
          },
        },
        {
          name: "applicant.parish",
          label: "Parish",
          type: "select",
          options: barbadosParishes,
          validation: { required: "Select your parish" },
        },
        {
          name: "applicant.citizenship",
          label: "Citizenship status",
          type: "radio",
          options: [
            { label: "Barbadian citizen", value: "citizen" },
            { label: "Permanent resident", value: "resident" },
            { label: "Other", value: "other" },
          ],
          validation: { required: "Select your citizenship status" },
        },
      ],
    },
    {
      id: "your-interest",
      title: "About your interest",
      description: `A short paragraph about why ${opportunityTitle} is right for you.`,
      fields: [
        {
          name: "interest.motivation",
          label: "Why are you applying?",
          hint: "Tell us a bit about what you hope to get out of taking part.",
          type: "textarea",
          rows: 5,
          validation: {
            required: "Tell us why you're applying",
            minLength: {
              value: 20,
              message: "Please write at least 20 characters",
            },
          },
        },
      ],
    },
    {
      id: "check-your-answers",
      title: "Check your answers",
      fields: [],
    },
    {
      id: "declaration",
      title: "Declaration",
      fields: [
        {
          name: "declaration.confirmed",
          label:
            "I confirm that my information is correct and I am happy for it to be verified. I understand that false details may lead to my application being rejected, and that the Government of Barbados will keep my information confidential.",
          type: "checkbox",
          validation: {
            required: "You must confirm the declaration to continue",
          },
        },
        {
          name: "declaration.dateOfDeclaration",
          label: "Date of declaration",
          hidden: true,
          type: "date",
          validation: {
            required: "Date is required",
            date: { type: "pastOrToday" },
          },
        },
      ],
    },
    {
      id: "confirmation",
      title: "Application received",
      description: `Thank you for applying to ${opportunityTitle}.`,
      fields: [],
      bodyContent: `## What happens next

- The team running this opportunity will review your application.
- If you meet the eligibility criteria, they will get in touch using the contact details you provided.
- If we need anything else from you, we will reach out by email or phone.

Thank you for your interest.`,
      enableFeedback: true,
    },
  ];
}
