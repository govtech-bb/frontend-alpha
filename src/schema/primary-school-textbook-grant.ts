import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "beneficiaries",
    title: "Tell us about the child",
    description: "",
    fields: [
      {
        name: "beneficiaries.firstName",
        label: "First Name",
        type: "text",
        validation: {
          required: "First name is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Only letters, spaces, hyphens, and apostrophes are allowed",
          },
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "beneficiaries.lastName",
        label: "Last Name",
        type: "text",
        validation: {
          required: "Last name is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Only letters, spaces, hyphens, and apostrophes are allowed",
          },
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "beneficiaries.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (e.g., 850101-0001)",
          },
        },
        // Note: ID Number validation is skipped when ShowHide is open (handled in step validation)
        skipValidationWhenShowHideOpen: "beneficiaries.usePassportInstead",
      },
      {
        name: "beneficiaries.passportDetails",
        label: "",
        type: "showHide",
        validation: { required: false },
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "beneficiaries.usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "beneficiaries.passportNumber",
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
        name: "beneficiaries.class",
        label: "What class are they currently in?",
        hint: "If they are between school years, add the class they are going into",
        type: "select",
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
        name: "beneficiaries.relationshipToChild",
        label: "Are you the parent or guardian?",
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
        name: "beneficiaries.relationshipDescription",
        label: "What is your relationship with the child?",
        // hint: "For example, nephew, researcher, historian, or authorised representative.",
        type: "text",
        validation: {
          required: "Please describe your relationship",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "beneficiaries.relationshipToChild",
          value: "no",
        },
      },
      //TODO: Allow user to add multiple children
    ],
  },
  {
    id: "guardian",
    title: "Tell us about the parent or guardian",
    description: "",
    conditionalOn: {
      field: "beneficiaries.relationshipToChild",
      value: "no",
    },
    fields: [
      {
        name: "guardian.firstName",
        label: "First Name",
        type: "text",
        validation: {
          required: "First name is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Only letters, spaces, hyphens, and apostrophes are allowed",
          },
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "guardian.lastName",
        label: "Last Name",
        type: "text",
        validation: {
          required: "Last name is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Only letters, spaces, hyphens, and apostrophes are allowed",
          },
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "guardian.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
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
        name: "guardian.passportDetails",
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
              name: "guardian.passportNumber",
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
        name: "guardian.tamisNumber",
        label: "TAMIS Number",
        type: "text",
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
      },
    ],
  },
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
        },
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
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "applicant.postalCode",
        label: "Postal Code",
        type: "text",
        validation: {
          required: false,
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
            message:
              "Please enter a valid phone number (e.g., 246 234 5678 or 1 246 234 5678)",
          },
        },
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        // placeholder: "e.g., 850101-0001",
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
        name: "applicant.tamisNumber",
        label: "TAMIS Number",
        type: "number",
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
      },
    ],
  },

  {
    id: "bankAccount",
    title: "Bank account information",
    description:
      "Add the bank account details for an account which has been used within the last 3 months.  Check your details are correct to avoid delays.",
    fields: [
      {
        name: "bankAccount.accountHolderName",
        label: "Account holder name",
        hint: "Enter the full name shown on the bank account",
        type: "text",
        placeholder: "",
        validation: {
          required: "Name on account is required",
          pattern: {
            value: "^[A-Za-z\\s'-]+$",
            message:
              "Only letters, spaces, hyphens, and apostrophes are allowed",
          },
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        },
      },
      {
        name: "bankAccount.bankName",
        label: "Bank name",
        hint: "For example: Republic Bank, Scotiabank, CIBC FirstCaribbean",
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
          required: "Branch name is required",
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
    id: "review",
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
          "You will receiv $100 BBD per eligible child in the bank account you provided details for",
        ],
      },
    ],
    enableFeedback: true,
  },
];
