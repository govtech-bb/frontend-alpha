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
    id: "applicant",
    title: "Tell us about yourself",
    description: "",
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
        hint: "If you have more than one, add them in order",
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
        name: "applicant.dateOfBirth",
        label: "Date of birth",
        placeholder: "For example, 30 12 1986",
        type: "date",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
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
    ],
  },
  {
    id: "contact-details",
    title: "Contact details",
    fields: [
      {
        name: "contactDetails.addressLine1",
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
        name: "contactDetails.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "contactDetails.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contactDetails.postcode",
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
        name: "contactDetails.email",
        label: "Email address",
        type: "text",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "contactDetails.telephoneNumber",
        label: "Telephone number",
        type: "text",
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
    id: "licence-history",
    title: "Tell us about your licence history",
    description: "",
    fields: [
      {
        name: "licenceHistory.hasPreviousLicence",
        label: "Have you had a conductor's licence or driving licence before?",
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
        name: "licenceHistory.licenceNumber",
        label: "Provide your licence number",
        type: "text",
        validation: {
          required: "Licence number is required",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "licenceHistory.hasPreviousLicence",
          value: "yes",
        },
      },
      {
        name: "licenceHistory.dateOfIssue",
        label: "Date of issue",
        type: "date",
        validation: {
          required: "Date of issue is required",
          date: {
            type: "past",
          },
        },
        conditionalOn: {
          field: "licenceHistory.hasPreviousLicence",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "endorsements",
    title: "Tell us about any endorsements",
    description:
      "An endorsement is a record of an offence added to your conductor's or driving licence",
    fields: [
      {
        name: "hasEndorsements",
        label: "Do you have any endorsements?",
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "endorsement-details",
    title: "Your endorsements",
    conditionalOn: {
      field: "hasEndorsements",
      value: "yes",
    },
    repeatable: {
      arrayFieldName: "endorsementDetails",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another endorsement?",
    },
    fields: [
      {
        name: "typeOfLicence",
        label: "Type of licence",
        type: "text",
        width: "medium",
        validation: {
          required: "Type of licence is required",
          minLength: {
            value: 2,
            message: "Type of licence must be at least 2 characters",
          },
        },
      },
      {
        name: "dateOfEndorsement",
        label: "Date of endorsement",
        placeholder: "For example, 15 12 2025",
        type: "date",
        validation: {
          required: "Date of endorsement is required",
          date: {
            type: "pastOrToday",
          },
        },
      },
      {
        name: "duration",
        label: "How long did the endorsement appear on your licence?",
        type: "text",
        width: "medium",
        validation: {
          required: "Duration is required",
          minLength: {
            value: 2,
            message: "Duration must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "disqualifications",
    title: "Tell us about your disqualifications",
    description:
      "A disqualification is when a court has stopped you from getting or holding a licence.",
    fields: [
      {
        name: "disqualifications.hasDisqualifications",
        label: "Have you ever been disqualified?",
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
        name: "disqualifications.courtName",
        label: "Court name",
        type: "text",
        validation: {
          required: "Court name is required",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "disqualifications.hasDisqualifications",
          value: "yes",
        },
      },
      {
        name: "disqualifications.reasonForDisqualificiation",
        label: "Court's reason for disqualification",
        type: "text",
        validation: {
          required: "Reason for disqualification is required",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "disqualifications.hasDisqualifications",
          value: "yes",
        },
      },
      {
        name: "disqualifications.dateOfDisqualification",
        label: "Date of disqualification",
        type: "date",
        validation: {
          required: "Date of disqualification is required",
          date: {
            type: "past",
          },
        },
        conditionalOn: {
          field: "disqualifications.hasDisqualifications",
          value: "yes",
        },
      },
      {
        name: "disqualifications.lengthOfDisqualficiation",
        label: "Length of disqualification",
        type: "text",
        validation: {
          required: "Length of disqualification is required",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "disqualifications.hasDisqualifications",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "convictions",
    title: "Your criminal convictions",
    description:
      "A conviction is when a court has found you guilty of a criminal offence.",
    fields: [
      {
        name: "hasCriminalConvictions",
        label: "Have you ever had any criminal convictions?",
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "document-uploads",
    title: "Upload supporting documents",
    fields: [
      {
        name: "documents.policeCertificate",
        label: "Upload a Police Certificate of Character",
        hint: "Attach a .pdf, .docx or .png file.",
        type: "file",
        validation: {
          required: "Police Certificate of Character is required",
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
    title: "Thank you for your application",
    description:
      "Your application for a conductor's licence has been submitted",
    fields: [],
    bodyContent: `## What happens next

We will review the information and documents you provided.

If we need more information, we will contact you using the email address or phone number in your application.

You may be invited to attend an in-person oral test as part of the application process. 

We will contact you if you need to attend.

You do not need to do anything else at this time.

If you do not receive the confirmation email within a few minutes, check your junk or spam folder.`,
    enableFeedback: true,
  },
];
