import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

// Helper function to create child basic info fields
const createChildFields = (childIndex: number) => [
  {
    name: `beneficiaries.${childIndex}.firstName`,
    label: "First name",
    type: "text" as const,
    validation: {
      required: "First name is required",
      pattern: {
        value: "^[A-Za-z\\s'-]+$",
        message:
          "Please enter a valid name using only letters, spaces, hyphens, and apostrophes",
      },
      minLength: {
        value: 2,
        message: "First name must be at least 2 characters",
      },
    },
  },
  {
    name: `beneficiaries.${childIndex}.lastName`,
    label: "Last name",
    type: "text" as const,
    validation: {
      required: "Last name is required",
      pattern: {
        value: "^[A-Za-z\\s'-]+$",
        message:
          "Please enter a valid name using only letters, spaces, hyphens, and apostrophes",
      },
      minLength: {
        value: 2,
        message: "Last name must be at least 2 characters",
      },
    },
  },
  {
    name: `beneficiaries.${childIndex}.idNumber`,
    label: "National Identification (ID) number",
    width: "medium" as const,
    type: "text" as const,
    validation: {
      required: "ID Number is required",
      pattern: {
        value: "^\\d{6}-\\d{4}$",
        message: "Enter a valid ID number (e.g., 850101-0001)",
      },
    },
    skipValidationWhenShowHideOpen: `beneficiaries.${childIndex}.usePassportInstead`,
  },
  {
    name: `beneficiaries.${childIndex}.passportDetails`,
    label: "",
    type: "showHide" as const,
    validation: { required: false as const },
    showHide: {
      summary: "Use passport number instead",
      stateFieldName: `beneficiaries.${childIndex}.usePassportInstead`,
      description:
        "If you don't have a National ID number, you can use your passport number instead.",
      fields: [
        {
          name: `beneficiaries.${childIndex}.passportNumber`,
          label: "Passport number",
          type: "text" as const,
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
    name: `beneficiaries.${childIndex}.class`,
    label: "What class are they currently in?",
    hint: "If they are between school years, add the class they are going into",
    type: "select" as const,
    validation: {
      required: "Class is required",
    },
    options: [
      { label: "Select class", value: "" },
      { label: "Class 1", value: "1" },
      { label: "Class 2", value: "2" },
      { label: "Class 3", value: "3" },
      { label: "Class 4", value: "4" },
    ],
  },
  {
    name: `beneficiaries.${childIndex}.isParentOrGuardian`,
    label: "Are you the parent or guardian?",
    type: "radio" as const,
    validation: {
      required: "Relationship is required",
    },
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    name: `beneficiaries.${childIndex}.relationshipDescription`,
    label: "What is your relationship with the child?",
    type: "text" as const,
    validation: {
      required: "Please describe your relationship",
      minLength: {
        value: 2,
        message: "Please provide at least 2 characters",
      },
    },
    conditionalOn: {
      field: `beneficiaries.${childIndex}.isParentOrGuardian`,
      value: "no",
    },
  },
  ...(childIndex < 4
    ? [
        {
          name: `beneficiaries.${childIndex}.addAnotherChild`,
          label: "Do you have another child at the same school?",
          type: "radio" as const,
          validation: {
            required: false as const,
          },
          options: [
            { label: "Yes, add another child", value: "yes" },
            { label: "No, continue", value: "no" },
          ],
        },
      ]
    : []),
];

// Helper function to create guardian fields
const createGuardianFields = (childIndex: number) => [
  {
    name: `beneficiaries.${childIndex}.guardian.firstName`,
    label: "First name",
    type: "text" as const,
    validation: {
      required: "Guardian first name is required",
      pattern: {
        value: "^[A-Za-z\\s'-]+$",
        message:
          "Please enter a valid name using only letters, spaces, hyphens, and apostrophes",
      },
      minLength: {
        value: 2,
        message: "First name must be at least 2 characters",
      },
    },
  },
  {
    name: `beneficiaries.${childIndex}.guardian.lastName`,
    label: "Last name",
    type: "text" as const,
    validation: {
      required: "Guardian last name is required",
      pattern: {
        value: "^[A-Za-z\\s'-]+$",
        message:
          "Please enter a valid name using only letters, spaces, hyphens, and apostrophes",
      },
      minLength: {
        value: 2,
        message: "Last name must be at least 2 characters",
      },
    },
  },
  {
    name: `beneficiaries.${childIndex}.guardian.idNumber`,
    label: "National Identification (ID) number",
    type: "text" as const,
    width: "medium" as const,
    validation: {
      required: "Guardian ID Number is required",
      pattern: {
        value: "^\\d{6}-\\d{4}$",
        message: "Enter a valid ID number (e.g., 850101-0001)",
      },
    },
    skipValidationWhenShowHideOpen: `beneficiaries.${childIndex}.guardian.usePassportInstead`,
  },
  {
    name: `beneficiaries.${childIndex}.guardian.passportDetails`,
    label: "",
    type: "showHide" as const,
    validation: { required: false as const },
    showHide: {
      summary: "Use passport number instead",
      stateFieldName: `beneficiaries.${childIndex}.guardian.usePassportInstead`,
      description:
        "If you don't have a National ID number, you can use your passport number instead.",
      fields: [
        {
          name: `beneficiaries.${childIndex}.guardian.passportNumber`,
          label: "Passport number",
          type: "text" as const,
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
    name: `beneficiaries.${childIndex}.guardian.tamisNumber`,
    label: "TAMIS number",
    type: "number" as const,
    width: "medium" as const,
    validation: {
      required: "Guardian TAMIS Number is required",
      min: {
        value: 10,
        message: "TAMIS number must be at least 2 digits",
      },
    },
    skipValidationWhenShowHideOpen: `beneficiaries.${childIndex}.guardian.usePassportInstead`,
  },
];

// Generate steps for up to 5 children
const childSteps: FormStep[] = [];
for (let i = 0; i < 5; i++) {
  const ordinalNum =
    i === 0
      ? "first"
      : i === 1
        ? "second"
        : i === 2
          ? "third"
          : i === 3
            ? "fourth"
            : "fifth";

  // Child basic info step
  childSteps.push({
    id: `beneficiaries-${i}`,
    title:
      i === 0
        ? "Tell us about the child"
        : `Tell us about the ${ordinalNum} child`,
    description: "",
    ...(i > 0
      ? {
          conditionalOn: {
            field: `beneficiaries.${i - 1}.addAnotherChild`,
            value: "yes",
          },
        }
      : {}),
    fields: createChildFields(i),
  });

  // Guardian step (conditional)
  childSteps.push({
    id: `beneficiaries-${i}-guardian`,
    title:
      i === 0
        ? "Tell us about the parent or guardian for the child"
        : `Tell us about the parent or guardian for the ${ordinalNum} child`,
    description: "",
    conditionalOn: {
      field: `beneficiaries.${i}.isParentOrGuardian`,
      value: "no",
    },
    fields: createGuardianFields(i),
  });
}

export const formSteps: FormStep[] = [
  ...childSteps,
  {
    id: "applicant-details",
    title: "Tell us about yourself",
    fields: [
      {
        name: "applicant.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Please enter a valid name using only letters, spaces, hyphens, and apostrophes",
          },
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "applicant.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Please enter a valid name using only letters, spaces, hyphens, and apostrophes",
          },
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
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
        type: "text",
        width: "medium",
        validation: {
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
        name: "applicant.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g. 1 246 234 5678)",
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
            message: "Enter a valid ID number (e.g., 850101-0001)",
          },
        },
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
        name: "applicant.tamisNumber",
        label: "TAMIS Number",
        type: "number",
        width: "medium",
        validation: {
          required: "TAMIS Number is required",
          pattern: {
            value: "^\\d+$",
            message: "Please enter numbers only",
          },
          minLength: {
            value: 2,
            message: "TAMIS number must be at least 2 characters",
          },
        },
        skipValidationWhenShowHideOpen: "applicant.usePassportInstead",
      },
    ],
  },

  {
    id: "bankAccount",
    title: "Bank account information",
    description:
      "In order to receive the $100 Grant, please provide accurate and current banking information to prevent delays in processing this application.",
    fields: [
      {
        name: "bankAccount.accountHolderName",
        label: "Account holder name",
        hint: "Enter the full name shown on the bank account",
        type: "text",
        placeholder: "",
        validation: {
          required: "Name on account is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        },
      },
      {
        name: "bankAccount.bankName",
        label: "Bank name",
        hint: "For example: 'Republic Bank', 'CIBC FirstCaribbean', 'Scotiabank', or 'First Citizens'",
        type: "text",
        validation: {
          required: "Bank name is required",
          minLength: {
            value: 2,
            message: "Bank name must be at least 2 characters",
          },
        },
      },
      {
        name: "bankAccount.accountNumber",
        label: "Account number",
        hint: "Enter the account number exactly as it appears on your bank statement",
        type: "text",
        placeholder: "",
        validation: {
          required: "Account number is required",
          minLength: {
            value: 2,
            message: "Bank name must be at least 2 characters",
          },
        },
      },
      {
        name: "bankAccount.branchName",
        label: "Branch name",
        hint: "Enter the branch where the account is held",
        type: "text",
        validation: {
          required: "Branch name is required",
          minLength: {
            value: 2,
            message: "Branch name must be at least 2 characters",
          },
        },
      },
      {
        name: "bankAccount.branchCode",
        label: "Branch code",
        hint: "Enter the bank branch code used for transfers",
        type: "text",
        validation: {
          required: "Branch code is required",
          minLength: {
            value: 2,
            message: "Branch name must be at least 2 characters",
          },
        },
      },
      {
        name: "bankAccount.accountType",
        label: "Account type",
        type: "radio",
        validation: {
          required: "Please select an account type",
        },
        options: [
          { label: "Savings", value: "savings" },
          { label: "Chequing", value: "chequing" },
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
    id: "confirmation",
    title: "Your submission has been saved",
    description:
      "Review the answers you've given carefully. Incorrect information may be difficult to change after registration.",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "",
        items: [
          "The child's school will confirm if they are eligible for the grant.",
          "You will receive $100 BBD per eligible child in the bank account you provided details for",
        ],
      },
    ],
    enableFeedback: true,
  },
];
