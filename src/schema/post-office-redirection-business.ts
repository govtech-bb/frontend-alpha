import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "business-name",
    title: "Tell us about the business",
    fields: [
      {
        name: "businessName",
        label: "Business name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Business name is required",
          minLength: {
            value: 5,
            message: "Business name must be at least 5 characters",
          },
        },
      },
    ],
  },
  {
    id: "current-address",
    title: "Current address of the business",
    fields: [
      {
        name: "currentAddress.addressLine1",
        label: "Address line 1",
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
        name: "currentAddress.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "currentAddress.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "currentAddress.postcode",
        label: "Postcode",
        hint: "Optional (e.g. BB17004)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid post code (e.g., BB17004)",
          },
        },
      },
    ],
  },
  {
    id: "applicant-details",
    title: "Tell us about the person submitting this application",
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
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "First name must contain only letters, hyphens, or apostrophes",
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
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
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
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
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
        name: "applicant.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value:
              "^(1[-]246[-]\\d{3}[-]\\d{4}|1[\\s]246[\\s]\\d{3}[\\s]\\d{4}|1246\\d{7})$",
            message:
              "Please enter a valid phone number (e.g. 12462345678, 1-246-234-5678, or 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "permission-details",
    title: "Tell us what permission you have to act for this business",
    fields: [
      {
        name: "permissionDetails",
        label: "Permission details",
        hint: "For example, director, manager, authorised employee, or appointed agent",
        type: "text",
        placeholder: "",
        validation: {
          required: "Permission details is required",
          minLength: {
            value: 5,
            message: "Permission details must be at least 5 characters",
          },
        },
      },
    ],
  },
  {
    id: "new-address",
    title: "Where should we redirect the mail?",
    fields: [
      {
        name: "newAddress.addressLine1",
        label: "Address line 1",
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
        name: "newAddress.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "newAddress.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "newAddress.postcode",
        label: "Postcode",
        hint: "Optional (e.g. BB17004)",
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
        name: "newAddress.isMovingPermanent",
        label: "Are you moving permanently?",
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "newAddress.redirectionStartDate",
        label: "Redirection start date",
        type: "date",
        validation: {
          required: "Start date is required",
        },
        conditionalOn: {
          field: "newAddress.isMovingPermanent",
          value: "no",
        },
      },
      {
        name: "newAddress.redirectionEndDate",
        label: "Redirection end date",
        type: "date",
        validation: {
          required: "End date is required",
        },
        conditionalOn: {
          field: "newAddress.isMovingPermanent",
          value: "no",
        },
      },
    ],
  },
  {
    id: "upload-document",
    title: "Upload document",
    description: "Provide the official company stamp",
    fields: [
      {
        type: "file",
        name: "uploadDocument",
        label: "Upload a file",
        hint: "Attach a .pdf, .docx or .png file",
        validation: {
          required: "Please upload a document",
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
    title: "Application submitted",
    description: "Your application has been submitted successfully",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "We will review the information you provided.",
        items: [
          "If we need more information or documents, we will contact you",
          "Once approved, mail will be redirected to the address you specified",
        ],
      },
    ],
    enableFeedback: true,
  },
];
