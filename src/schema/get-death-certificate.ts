import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
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
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name",
        hint: "Optional. Provide only if known",
        type: "text",
        validation: { required: false },
      },
      {
        name: "applicant.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
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
        type: "text",
        width: "short",
        validation: {
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        placeholder: "e.g., 850101-0001",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (e.g., 850101-0001)",
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
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message:
              "Please enter a valid phone number (e.g., 246 234 5678 or 1 246 234 5678)",
          },
        },
      },
    ],
  },

  {
    id: "relationship-to-person",
    title: "Tell us your relationship with the deceased",
    description:
      "For example, spouse, child, parent, sibling, executor, or authorised representative.",
    fields: [
      {
        name: "relationshipToPerson",
        label: "Relationship",
        hidden: true,
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
        name: "relationshipOtherDescription",
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
    ],
  },
  {
    id: "reason-for-certificate",
    title: "Tell us about why you need this certificate",
    description: "Give the reason in a short sentence.",
    fields: [
      {
        name: "reasonForCertificate",
        label: "Reason for requesting the certificate",
        type: "text",
        validation: {
          required: "Reason is required",
          minLength: {
            value: 10,
            message: "Please provide at least 10 characters",
          },
        },
      },
    ],
  },

  {
    id: "deceased-details",
    title: "Tell us about the deceased",
    description:
      "Provide as much information as you can to help us find the correct record.",
    fields: [
      {
        name: "deceased.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },
      {
        name: "deceased.middleName",
        label: "Middle name",
        hint: "Leave blank if not known",
        type: "text",
        validation: { required: false },
      },
      {
        name: "deceased.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
        },
      },
      {
        name: "deceased.knownDateOfDeath",
        label: "Do you know the date the person died?",
        type: "radio",
        validation: {
          required: "Whether date of death is known is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "deceased.dateOfDeath",
        label: "",
        type: "date",
        validation: {
          required: "Date of death is required",
          date: {
            type: "past",
          },
        },
        conditionalOn: {
          field: "deceased.knownDateOfDeath",
          value: "yes",
        },
      },

      {
        name: "deceased.estimatedDateOfDeath",
        label: "Provide the two-year search range you want us to check",
        hint: "Enter a 2-year period, for example 1990 to 1991. If you are not sure, give your best estimate.",
        type: "text",
        validation: {
          required: "Estimate is required",
        },
        conditionalOn: {
          field: "deceased.knownDateOfDeath",
          value: "no",
        },
      },
      {
        name: "deceased.idNumber",
        label: "National Identification (ID) Number",
        hint: "Enter only if known",
        type: "text",
        validation: {
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (e.g., 850101-0001)",
          },
        },
      },
      {
        name: "deceased.placeOfDeath",
        label: "Place of death",
        hint: "Enter a house, institution, home address, or parish, if known",
        type: "text",
        validation: {
          required: "Place of death is required",
        },
      },
      {
        name: "deceased.causeOfDeath",
        label: "Cause of death",
        hint: "Leave blank if you do not know",
        type: "text",
        validation: { required: false },
      },
    ],
  },

  {
    id: "order-details",
    title: "How many copies do you need?",
    description: "Each copy costs $5.00 BBD for a certificate",
    fields: [
      {
        name: "order.numberOfCopies",
        label: "Number of copies",
        hidden: true,
        type: "number",
        width: "short",
        validation: {
          required: "Number of copies is required",
          min: {
            value: 1,
            message: "You must order at least 1 copy",
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
    title: "Your submission has been saved",
    description: "Complete your payment below to finalize your submission",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "You will receive a confirmation email with:",
        items: [
          "Your application reference number",
          "the cost of the certificate(s)",
          "the expected completion date",
        ],
      },
    ],
    contactDetails: {
      title: "Registration Department",
      telephoneNumber: "(246) 535-8300",
      email: "registrationdept@barbados.gov.bb",
      address: {
        line1: "Supreme Court Complex",
        line2: "Whitepark Road",
        city: "St. Michael",
        country: "Barbados",
      },
    },
    enableFeedback: true,
  },
];
