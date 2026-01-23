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
        hint: "Optional. Provide only if known",
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
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        width: "medium",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
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
    id: "applying-for-yourself",
    title: "Are you applying for your own birth certificate?",
    fields: [
      {
        name: "applyingForYourself",
        label: "Are you applying for your own birth certificate?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Yes - the certificate is for me", value: "yes" },
          { label: "No - the certificate is for someone else", value: "no" },
        ],
      },
    ],
  },
  {
    id: "relationship-to-person",
    title: "What is your relationship to the person?",
    conditionalOn: {
      field: "applyingForYourself",
      value: "no",
    },
    fields: [
      {
        name: "relationshipToPerson",
        label: "What is your relationship to the person?",
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
        hint: "For example, nephew, researcher, historian, or authorised representative.",
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
    title: "Tell us why you're ordering a birth certificate",
    conditionalOn: {
      field: "applyingForYourself",
      value: "no",
    },
    fields: [
      {
        name: "reasonForOrderingCertificate",
        label: "Reason",
        type: "textarea",
        validation: {
          required: "Reason is required",
          minLength: {
            value: 5,
            message: "Please provide at least 10 characters",
          },
        },
      },
    ],
  },
  {
    id: "person-deceased",
    title: "Is the person deceased?",
    conditionalOn: {
      field: "applyingForYourself",
      value: "no",
    },
    fields: [
      {
        name: "personDeceased",
        label: "Is the person deceased?",
        hidden: true,
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
        name: "dateOfDeath",
        label: "Date of death",
        placeholder: "For example, March 15, 2023",
        type: "date",
        validation: {
          required: "Date of death is required",
          date: {
            type: "past",
          },
        },
        conditionalOn: {
          field: "personDeceased",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "person-details",
    title: "Tell us about the person you are applying for",
    conditionalOn: {
      field: "applyingForYourself",
      value: "no",
    },
    fields: [
      {
        name: "person.firstName",
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
        name: "person.middleName",
        label: "Middle name",
        hint: " Optional. Provide only if known",
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
        name: "person.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
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
        name: "person.hasNisNumber",
        label: "Do they have a National Insurance (NIS) number?",
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
        name: "person.nisNumber",
        label: "National Insurance (NIS) Number",
        type: "text",
        placeholder: "for example, 123456",
        validation: {
          required: "NIS number is required",
          pattern: {
            value: "^\\d{6}$",
            message: "Enter a valid NIS number (6 digits)",
          },
        },
        conditionalOn: {
          field: "person.hasNisNumber",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "birth-details",
    title: "Provide your birth details",
    description: "Answer as accurately as possible",
    conditionalOn: {
      field: "applyingForYourself",
      value: "yes",
    },
    fields: [
      {
        name: "birthDetails.dateOfBirth",
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
      {
        name: "birthDetails.placeOfBirth",
        label: "Place of birth",
        hint: "Enter a house, institution, home address, or parish, if known",
        type: "text",
        validation: {
          required: "Place of birth is required",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
        },
      },
      {
        name: "birthDetails.placeOfBaptism",
        label: "Place of baptism",
        hint: "Enter a house, church, or parish, if known",
        type: "text",
        validation: {
          required: "Place of baptism is required",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "parents-self",
    title: "Tell us your parents' names",
    conditionalOn: {
      field: "applyingForYourself",
      value: "yes",
    },
    fields: [
      {
        name: "parents.father.firstName",
        label: "Father's first name",
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
        name: "parents.father.middleName",
        label: "Father's middle name",
        hint: " Optional. Provide only if known",
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
        name: "parents.father.lastName",
        label: "Father's last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
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
        name: "parents.mother.firstName",
        label: "Mother's first name",
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
        name: "parents.mother.middleName",
        label: "Mother's middle name",
        hint: " Optional. Provide only if known",
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
        name: "parents.mother.lastName",
        label: "Mother's last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
    ],
  },
  {
    id: "parents-other",
    title: "Tell us their parents' names",
    conditionalOn: {
      field: "applyingForYourself",
      value: "no",
    },
    fields: [
      {
        name: "parentsOther.father.firstName",
        label: "Father's first name",
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
        name: "parentsOther.father.middleName",
        label: "Father's middle name",
        hint: " Optional. Provide only if known",
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
        name: "parentsOther.father.lastName",
        label: "Father's last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
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
        name: "parentsOther.mother.firstName",
        label: "Mother's first name",
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
        name: "parentsOther.mother.middleName",
        label: "Mother's middle name",
        hint: " Optional. Provide only if known",
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
        name: "parentsOther.mother.lastName",
        label: "Mother's last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
    ],
  },
  {
    id: "order-details",
    title: "How many copies will you be ordering?",
    description: "",
    fields: [
      {
        name: "order.numberOfCopies",
        label: "Number of copies",
        hidden: true,
        type: "number",
        width: "short",
        // placeholder: "For example, 2",
        validation: {
          required: "Number of copies is required",
          min: {
            value: 1,
            message: "You must order at least 1 copy and maximum 10 copies",
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
    enableFeedback: true,
  },
];
