import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "deceased-details",
    title: "Tell us about the deceased",
    fields: [
      {
        name: "deceased.title",
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
        name: "deceased.firstName",
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
        name: "deceased.middleName",
        label: "Middle name(s)",
        type: "text",
        hint: "Enter all middle names in order",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Middle name must be at least 2  characters",
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
        name: "deceased.lastName",
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
        name: "deceased.dateOfDeath",
        label: "Date of death",
        placeholder: "For example, 07 09 1999",
        type: "date",
        validation: {
          required: "Date of death is required",
          date: {
            type: "past",
          },
        },
      },
    ],
  },
  {
    id: "address",
    title: "Address of the deceased person",
    fields: [
      {
        name: "oldAddress.addressLine1",
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
        name: "oldAddress.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "oldAddress.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "oldAddress.postcode",
        label: "Postcode",
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postcode (for example, BB17004)",
          },
        },
      },
    ],
  },
  {
    id: "applicant-details",
    title: "Tell us about yourself",
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
        label: "Middle name(s)",
        hint: "Optional. Enter only if known.",
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
        name: "applicant.relationshipToDeceased",
        label: "What is your relationship to the deceased person?",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Parent", value: "parent" },
          { label: "Spouse", value: "spouse" },
          { label: "Child", value: "child" },
          { label: "Sibling", value: "sibling" },
          { label: "Grandparent", value: "grandparent" },
          { label: "Legal guardian", value: "legal-guardian" },
          { label: "Legal representative", value: "legal-representative" },
          { label: "Other (please describe)", value: "other" },
        ],
      },
      {
        name: "applicant.relationshipOtherDescription",
        label: "Please describe your relationship",
        type: "text",
        validation: {
          required: "Please describe your relationship",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "relationshipToPerson",
          value: "other",
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
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value:
              "^(1[-]246[-]\\d{3}[-]\\d{4}|1[\\s]246[\\s]\\d{3}[\\s]\\d{4}|1246\\d{7})$",
            message:
              "Please enter a valid phone number (for example, 12462345678, 1-246-234-5678, or 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "permission-details",
    title:
      "What authority do you have to act on behalf of the deceased person?",
    fields: [
      {
        name: "permissionDetails",
        label: "",
        type: "text",
        hint: "For example, I am executor of the will, or I have letters of Administration",
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
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postcode (for example, BB17004)",
          },
        },
      },
      {
        name: "newAddress.redirectionStartDate",
        label: "When do you want the redirection to start?",
        type: "date",
        validation: {
          required: "Start date is required",
        },
      },
      {
        name: "newAddress.redirectionEndDate",
        label: "When do you want the redirection to end?",
        hint: "A redirection notice lasts for a maximum of 6 months",
        type: "date",
        validation: {
          required: "End date is required",
        },
      },
    ],
  },
  // {
  //   id: "upload-document",
  //   title: "Upload supporting document",
  //   description: "You must upload a Power of Attorney",
  //   fields: [
  //     {
  //       type: "file",
  //       name: "uploadDocument",
  //       label: "Upload a file",
  //       hint: "Attach a .pdf, .docx or .png file",
  //       validation: {
  //         required: "Please upload a document",
  //       },
  //     },
  //   ],
  // },
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
    description: "Your application has been submitted successfully",
    fields: [],
    bodyContent: `## What happens next

We will review the information you provided.

If we need more information or documents, we will contact you

Once approved, mail will be redirected to the address you specified`,
    enableFeedback: true,
  },
];
