import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "marriage-status",
    title:
      "When the child was born, were the mother and father married to each other?",
    description: "",
    fields: [
      {
        name: "marriageStatus",
        label: "",
        type: "radio",
        hint: "We ask this because your answer might determine, the surname of the child and who can register the birth",
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
    conditionalOn: {
      or: [
        { field: "marriageStatus", value: "yes" },
        { field: "includeFatherDetails", value: "yes" },
      ],
    },
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
        label: "National Identification (ID) Number",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
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
        name: "father.age",
        label: "Age",
        type: "number",
        width: "short",
        validation: {
          required: "Age is required",
        },
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
        name: "father.addressLine1",
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
        name: "father.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
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
        label: "National Identification (ID) Number",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
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
        name: "mother.age",
        label: "Age",
        type: "number",
        width: "short",
        validation: {
          required: "Age is required",
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
        name: "mother.addressLine1",
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
        name: "mother.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },
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
        name: "birth.location",
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
          required: false,
        },
        conditionalOn: {
          field: "birth.placeOfBirths",
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
        name: "birth.bornAlive",
        label: "Born alive",
        type: "number",
        placeholder: "",
        validation: {
          required: false,
        },
      },
      {
        name: "birth.stillborn",
        label: "Still born",
        type: "number",
        placeholder: "",
        validation: {
          required: false,
        },
      },
      {
        name: "birth.totalStillAlive",
        label: "Total still alive",
        type: "number",
        placeholder: "",
        validation: {
          required: false,
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
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "child.sex",
        label: "Sex",
        hint: "We ask this so that we can monitor population trends",
        type: "radio",
        validation: {
          required: "Sex at birth is required",
        },
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },

      {
        name: "child.placeOfBirth",
        label: "Place of birth",
        hint: "Include the town and parish in your answer. For example, Queen Elizabeth Hospital, Bridgetown, St. Michael. Or a home address if they were born at home.",
        type: "text",
        validation: {
          required: "Place of birth is required",
        },
      },
    ],
  },
  {
    id: "order-details",
    title: "Order a birth certificate",
    description: `A birth certificate is essential for access to some public services. You wil need to pay BBD$5.00 for each certificate when you collect them.
We keep the original so you can order a certified copy at any point.
The birth registration is free of charge.`,
    fields: [
      {
        name: "order.numberOfCopies",
        label: "Number of Copies",
        type: "number",
        placeholder: "For example, 2",
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
      "I confirm that the information provided is correct. I understand that giving false information may result in the registration being rejected or voided.",
    fields: [
      {
        name: "declaration.confirmed",
        label: "I confirm all information is correct and true.",
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
    title: "Thank you for pre-registering a birth",
    description: "The Registration Department has received your information.",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content:
          "The Registration Department will contact you within 3 working days and invite you to visit, in person, to sign the birth register.\n\nShow your reference number to the Applications Desk at the Registration Department. You will need to:",
        items: [
          "Sign the register and complete the registration.",
          "Collect your copy or copies of the birth certificate. You will be able to pay in cash or by card.",
        ],
      },
    ],
    enableFeedback: true,
  },
];
