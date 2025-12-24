import { address, contactInfo, name } from "@/schema/blocks";
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
          addButtonText: "Add another",
          minItems: 1,
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
  {
    id: "tell-us-about-yourself",
    title: "Tell us about yourself",
    description: "",
    fields: [
      ...name({
        prefix: "applicant",
        showFirstName: true,
        showMiddleName: true,
        showLastName: true,
      }),
      ...address({
        prefix: "applicant",
        showParish: true,
        showPostcode: true,
      }),
      ...contactInfo({
        prefix: "applicant",
        showEmailAddress: true,
        showTelephoneNumber: true,
      }),
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
