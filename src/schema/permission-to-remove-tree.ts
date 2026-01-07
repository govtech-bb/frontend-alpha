import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "landowner",
    title: "Tell us about the landowner",
    fields: [
      {
        name: "applicant.title",
        label: "Title",
        type: "select",
        width: "short",
        validation: {
          required: "Title is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Mr", value: "mr" },
          { label: "Ms", value: "ms" },
          { label: "Mrs", value: "mrs" },
        ],
      },
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
        label: "Middle name",
        type: "text",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Middle name must be at least 2 characters",
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
        name: "applicant.postalCode",
        label: "Postal Code",
        hint: "Optional",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
      {
        name: "applicant.email",
        label: "Email Address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "applicant.mobileNumber",
        label: "Mobile phone",
        type: "tel",
        validation: {
          required: "Mobile phone is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
      {
        name: "applicant.homeNumber",
        label: "Home phone",
        type: "tel",
        validation: {
          required: "Home phone is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "tree-details",
    title: "Tell us about the protected tree you want to remove",
    repeatable: {
      arrayFieldName: "treeDetails",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another tree?",
    },
    fields: [
      {
        name: "typeOfProtectedTree",
        label: "What type of protected tree do you want to remove?",
        hint: "If you are not sure of the species, describe the tree",
        type: "text",
        validation: {
          required: "Type of protected tree is required",
          minLength: {
            value: 2,
            message: "Type must be at least 2 characters",
          },
        },
      },
      {
        name: "reasonForRemovingTree",
        label: "Why does this protected tree need to be removed?",
        hint: "Tell us what is happening and why the tree needs to be removed",
        type: "text",
        validation: {
          required: "Reason for removing tree is required",
          minLength: {
            value: 2,
            message: "Reason must be at least 2 characters",
          },
        },
      },
      {
        name: "addressLine1",
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
        name: "addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
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
        name: "declaration.dateOfDeclaration",
        label: "Date of declaration",
        hidden: true,
        placeholder: "For example, 12 15 2025",
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
    title:
      "Thank you. Your application to remove a protected tree has been submitted",
    description: "",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "",
        items: [
          "We will review your application under the Trees (Preservation) Act, 1981.",
          "We may contact you if we need more information.",
          "You will receive a decision once the review is complete.",
        ],
      },
    ],
    enableFeedback: true,
  },
];
