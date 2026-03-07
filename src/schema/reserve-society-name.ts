import {
  barbadosParishes,
  NAME_REGEX,
  PHONE_REGEX,
  POSTCODE_REGEX,
} from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "request-details",
    title: "What do you want to do?",
    fields: [
      {
        name: "request.purpose",
        label: "What do you want to do?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          {
            label: "Search if society name is available",
            value: "request-search",
          },
          { label: "Reserve a society name", value: "reserve-name" },
          {
            label: "Change the name of an existing society",
            value: "change-name",
          },
        ],
      },
      {
        name: "request.currentSocietyName",
        label: "What is the current name of the society",
        type: "text",
        validation: {
          required: "Field is required",
        },
        conditionalOn: {
          field: "request.purpose",
          value: "change-name",
        },
      },
    ],
  },
  {
    id: "proposals",
    title: "What is the proposed society name?",
    description: "You can suggest up to 3 names",
    fields: [
      {
        name: "proposed-names",
        label: "Society name choices",
        type: "fieldArray",
        validation: {
          required: "At least one society name is required",
        },
        fieldArray: {
          itemLabel: "Name choice",
          addButtonText: "Add another name",
          minItems: 1,
          maxItems: 3,
          fields: [
            {
              name: "title",
              label: "Name of society",
              type: "text",
              validation: {
                required: "Society name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              },
            },
            {
              name: "explanation",
              label: "How did you choose this name?",
              type: "text",
              validation: {
                required: "Explanation is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              },
            },
          ],
        },
      },
    ],
  },
  {
    id: "society-activity",
    title: "What does the society do?",
    description: "List the main activities of the society",
    fields: [
      {
        name: "activities",
        label: "Activities",
        type: "fieldArray",
        validation: {
          required: "At least one activity is required",
        },
        fieldArray: {
          itemLabel: "Activity",
          addButtonText: "Add another activity",
          minItems: 1,
          maxItems: 3,
        },
      },
    ],
  },
  {
    id: "applicant-details",
    title: "Tell us about yourself",
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
        name: "applicant.middleName",
        label: "Middle name",
        hint: "Optional. Provide only if known",
        type: "text",
        validation: {
          required: false,
          pattern: {
            value: NAME_REGEX,
            message:
              "Middle name must contain only letters, hyphens, or apostrophes",
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
            message: "Last name must be at least 2  characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "applicant.addressLine1",
        label: "Address Line 1",
        type: "text",
        placeholder: "",
        validation: {
          required: "Address line 1 is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "applicant.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "applicant.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "applicant.postcode",
        label: "Postcode",
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: POSTCODE_REGEX,
            message: "Enter a valid postcode (for example, BB17004)",
          },
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
        name: "applicant.telephoneNumber",
        label: "Telephone number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: PHONE_REGEX,
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
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
        placeholder: "",
        type: "date",
        validation: {
          required: "Date is required",
          date: {
            type: "pastOrToday",
          },
        },
      },
    ],
  },
  {
    id: "confirmation",
    title: "Thank you for your request",
    description: "Complete your payment below to finalize your submission",
    fields: [],
    bodyContent: `## What happens next

- We will review your request.
- We will contact you if we need more information.
- You will be notified of the outcome of your request.`,
    enableFeedback: true,
  },
];
