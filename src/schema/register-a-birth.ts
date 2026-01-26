import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "marriage-status",
    title:
      "When the child was born, were the mother and father married to each other?",
    description:
      "We ask this because your answer might determine:\n• the surname of the child\n• who can register the birth",
    fields: [
      {
        name: "marriageStatus",
        label: "",
        type: "radio",
        hint: "",
        validation: {
          required: "Select your preference",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "include-father-details",
    title: "Do you want to include the father's details on the birth record?",
    description:
      "If you choose 'Yes', both parents must go to the Registration Department and sign the official register together\n\nIf you choose 'No', the mother must go to the Registration Department but it is not necessary for the father to attend",
    conditionalOn: {
      field: "marriageStatus",
      value: "no",
    },
    fields: [
      {
        name: "includeFatherDetails",
        label: "",
        type: "radio",
        hint: "",
        validation: {
          required: "Select your preference",
        },
        options: [
          { label: "Yes, include the father's details", value: "yes" },
          { label: "No, do not include the father's details", value: "no" },
        ],
      },
    ],
  },
  {
    id: "father-details",
    title: "Tell us about the child's father",
    description: "",
    conditionalOn: [
      {
        field: "includeFatherDetails",
        value: "yes",
      },
      { field: "marriageStatus", value: "yes" },
    ],
    fields: [
      {
        name: "father.firstName",
        label: "First Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "father.middleName",
        label: "Middle Name(s)",
        hint: "If they have more than one, add them in order",
        type: "text",
        placeholder: "",
        validation: {
          required: false,
        },
      },
      {
        name: "father.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },

      {
        name: "father.idNumber",
        label: "Barbados National Identification (ID) Number",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])-\\d{4}$",
            message: "Enter a valid ID number (e.g., 991231-0001)",
          },
        },
        // Note: ID Number validation is skipped when ShowHide is open (handled in step validation)
        skipValidationWhenShowHideOpen: "father.usePassportInstead",
      },
      {
        name: "father.passportDetails",
        label: "",
        type: "showHide",
        validation: {},
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "father.usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "father.passportNumber",
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
            {
              name: "father.age",
              label: "Age",
              type: "number",
              placeholder: "",
              validation: {
                required: false,
              },
            },
          ],
        },
      },

      {
        name: "father.currentAddressHeading",
        label: "Current address",
        type: "heading",
      },
      {
        name: "father.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "father.streetAddress",
        label: "Street address",
        type: "textarea",
        placeholder: "",
        rows: 3,
        validation: {
          required: "Street address is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "father.seperator1",
        label: "",
        type: "heading",
      },
      {
        name: "father.occupation",
        label: "Occupation",
        hint: "This will be included on the child's birth certificate and in official records",
        type: "text",
        placeholder: "",
        validation: {
          required: "Occupation is required",
          minLength: {
            value: 2,
            message: "Occupation must be at least 2 characters",
          },
        },
      },
    ],
  },

  {
    id: "mother-details",
    title: "Tell us about the child's mother",
    description: "",
    fields: [
      {
        name: "mother.firstName",
        label: "First Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "mother.middleName",
        label: "Middle Name(s)",
        hint: "If they have more than one, add them in order",
        type: "text",
        placeholder: "",
        validation: {},
      },
      {
        name: "mother.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "mother.idNumber",
        label: "Barbados National Identification (ID) Number",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])-\\d{4}$",
            message: "Enter a valid ID number (e.g., 991231-0001)",
          },
        },
        // Note: ID Number validation is skipped when ShowHide is open (handled in step validation)
        skipValidationWhenShowHideOpen: "mother.usePassportInstead",
      },
      {
        name: "mother.passportDetails",
        label: "",
        type: "showHide",
        validation: {},
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "mother.usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "mother.passportNumber",
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
            {
              name: "mother.age",
              label: "Age",
              type: "number",
              placeholder: "",
              validation: {
                required: "Age is required",
                min: {
                  value: 0,
                  message: "Age must be 0 or greater",
                },
              },
            },
          ],
        },
      },
      {
        name: "mother.maidenName",
        label: "Maiden Name",
        type: "text",
        validation: {
          required: false,
        },
      },
      {
        name: "mother.currentAddressHeading",
        label: "Current address",
        type: "heading",
      },
      {
        name: "mother.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "mother.streetAddress",
        label: "Street address",
        type: "textarea",
        placeholder: "",
        rows: 3,
        validation: {
          required: "Street address is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "mother.contactDetailsHeading",
        label: "Contact details",
        type: "heading",
      },
      {
        name: "mother.telephoneNumber",
        label: "Telephone number",
        type: "tel",
        placeholder: "",
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
      {
        name: "mother.emailAddress",
        label: "Email address",
        type: "email",
        placeholder: "",
        validation: {
          required: "Email address is required",
        },
      },
      { name: "mother.seperator1", label: "", type: "heading" },
      {
        name: "mother.occupation",
        label: "Occupation",
        hint: "This will be included on the child's birth certificate and in official records",
        type: "text",
        placeholder: "",
        validation: {
          required: "Occupation is required",
          minLength: {
            value: 2,
            message: "Occupation must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "birth-details",
    title: "Tell us about the birth",
    description: "",
    fields: [
      {
        name: "birth.placeOfBirth",
        label: "Where did the birth take place?",
        type: "radio",
        placeholder: "",
        validation: {
          required: "Select a location",
        },
        options: [
          { label: "Health facility", value: "health-facility" },
          { label: "Residential", value: "residential" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "birth.healthFacility",
        label: "Health Facility",
        type: "select",
        validation: {
          required: "Health Facility is required",
        },
        conditionalOn: {
          field: "birth.placeOfBirth",
          value: "health-facility",
        },
        options: [
          { label: "", value: "" },
          {
            label: "Queen Elizabeth Hospital",
            value: "3d5cd721-df37-493c-86c0-41b8aa42e27d",
          },
          {
            label: "Bayview Hospital",
            value: "9ddfdd4a-4219-4ca0-ad34-5a9fc1071225",
          },
          {
            label: "MD Alliance Surgery and Birthing Centre",
            value: "a1abb507-4a25-4795-a280-c99226cb916f",
          },
        ],
      },
      {
        name: "birth.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        conditionalOn: {
          field: "birth.placeOfBirth",
          value: "residential",
        },
        options: barbadosParishes,
      },
      {
        name: "birth.streetAddress",
        label: "Street address",
        type: "textarea",
        placeholder: "",
        rows: 3,
        validation: {
          required: "Street address is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
        conditionalOn: {
          field: "birth.placeOfBirth",
          value: "residential",
        },
      },
      {
        name: "birth.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        conditionalOn: {
          field: "birth.placeOfBirth",
          value: "other",
        },
        options: barbadosParishes,
      },
      {
        name: "birth.streetAddress",
        label: "Street address",
        type: "textarea",
        placeholder: "",
        rows: 3,
        validation: {
          required: "Street address is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
        conditionalOn: {
          field: "birth.placeOfBirth",
          value: "other",
        },
      },

      {
        name: "birth.separator1",
        label: "",
        type: "heading",
      },

      {
        name: "birth.numberOfBirths",
        label: "How many births do you need to register?",
        type: "radio",
        placeholder: "",
        validation: {
          required: "Select a location",
        },
        options: [
          { label: "Single", value: "single" },
          { label: "Twins", value: "twins" },
          { label: "Triplets", value: "triplets" },
          { label: "Higher multiple births", value: "n" },
        ],
      },
      {
        name: "birth.attendantAtBirth",
        label: "Attendant at birth",
        type: "select",
        width: "medium",
        validation: {
          required: false,
        },
        options: [
          { label: "", value: "" },
          { label: "Doctor", value: "doctor" },
          { label: "Midwife", value: "midwife" },
          { label: "Nurse", value: "nurse" },
          { label: "Relative", value: "relative" },
          { label: "None", value: "none" },
        ],
      },
      {
        name: "birth.textLabel1",
        label:
          "How many births has this mother had in total (including the one(s) you are registering now)",
        type: "heading",
        as: "h3",
      },
      {
        name: "birth.bornAlive",
        label: "Born alive",
        type: "text",
        placeholder: "",
        inputClassName: "w-20",
        validation: {
          required: false,
          pattern: {
            value: "^\\d*$",
            message: "Please enter numbers only",
          },
        },
      },
      {
        name: "birth.stillborn",
        label: "Still born",
        type: "text",
        placeholder: "",
        inputClassName: "w-20",
        validation: {
          required: false,
          pattern: {
            value: "^\\d*$",
            message: "Please enter numbers only",
          },
        },
      },
      {
        name: "birth.totalStillAlive",
        label: "Total still alive",
        type: "text",
        placeholder: "",
        inputClassName: "w-20",
        validation: {
          required: false,
          pattern: {
            value: "^\\d*$",
            message: "Please enter numbers only",
          },
        },
      },
    ],
  },
  {
    id: "child-details",
    title: "Tell us about the child",
    description: "",
    fields: [
      {
        name: "child.firstName",
        label: "First Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "child.middleName",
        label: "Middle Name(s)",
        hint: "If they have more than one, add them in order",
        type: "text",
        placeholder: "",
        validation: {},
      },
      {
        name: "child.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },

      {
        name: "child.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        placeholder: "For example, December 30 1986",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "child.sexAtBirth",
        label: "Sex",
        type: "select",
        width: "short",
        validation: {
          required: "Sex at birth is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
    ],
  },
  {
    id: "order-details",
    title: "Order a birth certificate",
    description:
      "A birth certificate is essential for access to some public services. You wil need to pay BBD$5.00 for each certificate when you collect them. We keep the original so you can order a certified copy at any point. The birth registration is free of charge.",
    fields: [
      {
        name: "order.numberOfCopies",
        label: "Number of Copies",
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
  {
    id: "confirmation",
    title: "Thank you for pre-registering a birth",
    description: "The Registration Department has received your information.",
    fields: [],
    bodyContent: `## What happens next

The Registration Department will contact you within 3 working days and invite you to visit, in person, to sign the birth register.

Show your reference number to the Applications Desk at the Registration Department. You will need to:

1. Sign the register and complete the registration.
2. Collect your copy or copies of the birth certificate. You will be able to pay in cash or by card.

### Who must attend the appointment

[See what you need to bring with you](https://alpha.gov.bb/)
[Who should register a birth?](https://alpha.gov.bb/)`,
    enableFeedback: true,
  },
];
