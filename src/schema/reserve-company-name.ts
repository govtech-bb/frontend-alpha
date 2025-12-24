import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "what-will-this-name-be-used-for",
    title: "What will this name be used for?",
    description: "",
    fields: [
      {
        name: "aNewCompany",
        label: "What will this name be used for?",
        type: "radio",
        hidden: true,
        validation: { required: "Name will be used for is required" },
        options: [
          {
            label: "A new company",
            value: "newCompany",
          },
          {
            label: "A change of company name",
            value: "nameChange",
          },
          {
            label: "A merger of two or more companies (amalgamation)",
            value: "merger",
          },
        ],
      },
    ],
  },
  {
    id: "company-present-name",
    title: "What is the present name of the company?",
    conditionalOn: {
      field: "aNewCompany",
      value: "nameChange",
    },
    description: "",
    fields: [
      {
        name: "What is the present name of the company",
        label: "What is the present name of the company?",
        type: "text",
        hidden: true,
        validation: { required: "Company's present name is required" },
      },
    ],
  },
  {
    id: "company-names-merged",
    title: "What are the names of the companies being merged?",
    conditionalOn: {
      field: "aNewCompany",
      value: "merger",
    },
    description: "",
    fields: [
      {
        name: "companyName",
        label: "Company name",
        type: "fieldArray",
        validation: { required: "Company name is required" },
        fieldArray: {
          itemLabel: "Company name",
          addButtonText: "Add another company",
          minItems: 2,
        },
      },
    ],
  },
  {
    id: "company-name",
    title: "Tell us about the company name",
    description: "",
    fields: [
      {
        name: "firstChoice",
        label: "First choice",
        type: "text",
        validation: { required: "First choice is required" },
      },
      {
        name: "secondChoice",
        label: "Second choice",
        type: "text",
        validation: { required: "Second choice is required" },
      },
      {
        name: "thirdChoice",
        label: "Third choice",
        type: "text",
        validation: { required: "Third choice is required" },
      },
      {
        name: "reserveFirstAvailableName",
        label: "Reserve the first available name",
        type: "checkbox",
        validation: { required: false },
      },
    ],
  },
  {
    id: "business-activity",
    title: "What type of business will use this name?",
    description: "",
    fields: [
      {
        name: "businessActivity",
        label: "Business activity",
        type: "fieldArray",
        validation: { required: "Business activity is required" },
        fieldArray: {
          itemLabel: "Business activity",
          addButtonText: "Add another business activity",
          minItems: 1,
          fields: [
            {
              name: "activity",
              label: "Business activity",
              type: "select",
              validation: { required: "Business activity is required" },
              options: [
                { label: "", value: "" },
                { label: "Business", value: "business" },
                { label: "Non-profit", value: "non-profit" }, // TODO: Add the options for this field, i put placeholders for now
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "tell-us-about-yourself",
    title: "Tell us about yourself",
    description: "",
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
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name(s)",
        type: "text",
        hint: "If you have more than one, add them in order",
        validation: { required: false },
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
        },
      },
      {
        name: "applicant.addressLine1",
        label: "Address line 1",
        type: "text",
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
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "applicant.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "applicant.postcode",
        label: "Postcode",
        type: "text",
        validation: { required: false },
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
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message:
              "Please enter a valid phone number (e.g., 246 234 5678 or 1 246 234 5678)",
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
    description:
      "I confirm that my information is correct and I am happy for it to be verified. I understand that false details may lead to my application being rejected, and that the Government of Barbados will keep my information confidential.",
    fields: [
      {
        name: "declaration.confirmed",
        label: "All information is correct and true.",
        type: "checkbox",
        validation: {
          required: "You must confirm the declaration to continue",
        },
      },
      {
        name: "dateOfDeclaration",
        label: "Date of declaration",
        hidden: true,
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
];
