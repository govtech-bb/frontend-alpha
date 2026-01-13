import { barbadosParishes } from "@/data/constants";
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
        hint: "If you have more than one, add them in order",
        type: "text",
        validation: {
          required: false,
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
        name: "applicant.dateOfBirth",
        label: "Date of birth",
        placeholder: "For example, 12 30 1986",
        type: "date",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
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
        name: "contactDetails.addressLine2",
        label: "Address Line 2",
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
        name: "contactDetails.postalCode",
        label: "Postal Code  (e.g. BB17004)",
        hint: "Optional",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g. BB17004)",
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
    id: "licence-history",
    title: "Your licence history",
    description: "Tell us about any previous conductor's or driving licences",
    fields: [
      {
        name: "licenceHistory.hasPreviousLicence",
        label: "Do you have any previous licences?",
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
    title: "Your endorsements",
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
    title:
      "Your endorsements",
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
        placeholder: "For example, 12 15 2025",
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
        label: "Duration",
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
    title: "Your disqualifications",
    description:
      "A disqualification is when a court has stopped you from getting or holding a licence. Include any period when you were not allowed to hold or apply for a conductor’s or driving licence, and the reason the court gave for the disqualification",
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
        label: "Date of Declaration",
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
    title: "Your request for a Fire Service inspection has been submitted.",
    description: "We have received your request for a Fire Service inspection.",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "The Fire Service will review your request.",
        items: [
          "If they need more information, they will contact you using the details you provided.",
          "An inspection visit will be scheduled if your request can proceed.",
        ],
      },
    ],
    enableFeedback: true,
  },
];
