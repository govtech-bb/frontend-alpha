import {
  barbadosParishes,
  NAME_REGEX,
  NID_REGEX,
  PHONE_REGEX,
  POSTCODE_REGEX,
} from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
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
            value: NAME_REGEX,
            message:
              "First name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name",
        hint: "Enter all middle names in order",
        type: "text",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Middle name must be at least 2 characters",
          },
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
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        mask: "nid",
        width: "medium",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: NID_REGEX,
            message: "Enter a valid ID number (for example, 850101-0001)",
          },
        },
        // Note: ID Number validation is skipped when ShowHide is open (handled in step validation)
        skipValidationWhenShowHideOpen: "applicant.usePassportInstead",
      },
      {
        name: "applicant.passportDetails",
        label: "",
        type: "showHide",
        validation: { required: false },
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "applicant.usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "applicant.passportNumber",
              label: "Passport Number",
              type: "text",
              placeholder: "",
              validation: {
                required: "Passport number is required",
                minLength: {
                  value: 6,
                  message: "Passport number must be at least 6 characters",
                },
              },
            },
          ],
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
      {
        name: "registrationNumber",
        label: "Registration number",
        type: "text",
        placeholder: "",
        validation: {
          required: "Registration number is required",
          minLength: {
            value: 5,
            message: "Registration number must be at least 5 characters",
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
    ],
  },
  {
    id: "position-details",
    title: "Tell us what position you hold in the business",
    fields: [
      {
        name: "positionDetails",
        label: "Position",
        hidden: true,
        hint: "For example, are you a director, manager, or an appointed agent?",
        type: "text",
        placeholder: "",
        validation: {
          required: "Position is required",
          minLength: {
            value: 5,
            message: "Position must be at least 5 characters",
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
            value: POSTCODE_REGEX,
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
        hint: "A redirection notice lasts for a maximum of 6 months.",
        type: "date",
        validation: {
          required: "End date is required",
        },
      },
    ],
  },
  // {
  //   id: "upload-document",
  //   title: "Upload supporting documents",
  //   description:
  //     "For example, a letter of authorisation, company resolution, or official company stamp. ",
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
    title: "Application submitted",
    description: "Your application has been submitted successfully",
    fields: [],
    bodyContent: `## What happens next

We will review the information you provided.

If we need more information or documents, we will contact you

Once approved, mail will be redirected to the address you specified`,
    enableFeedback: true,
  },
];
