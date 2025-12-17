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
        placeholder: "John",
        validation: {
          required: "First name is required",
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
        placeholder: "Doe",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "beneficiaries.idNumber",
        label: "ID Number",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
          },
        },
      },
      {
        name: "beneficiaries.gender",
        label: "Gender",
        type: "select",
        validation: {
          required: "Gender is required",
        },
        options: [
          { label: "Select gender", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        name: "beneficiaries.class",
        label: "Class",
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
    ],
  },
  {
    id: "guardian",
    title: "Tell us about the guardian",
    description: "",
    fields: [
      {
        name: "guardian.title",
        label: "Title",
        type: "select",
        validation: { required: false },
        options: [
          { label: "Select title", value: "" },
          { label: "Mr", value: "mr" },
          { label: "Miss", value: "miss" },
          { label: "Mrs", value: "mrs" },
          { label: "Dr", value: "dr" },
        ],
      },
      {
        name: "guardian.firstName",
        label: "First Name",
        type: "text",
        placeholder: "John",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "guardian.middleName",
        label: "Middle Name",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },
      {
        name: "guardian.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Doe",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "guardian.idNumber",
        label: "ID Number",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
          },
        },
      },

      {
        name: "guardian.relationship",
        label: "Relationship to Child",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "Select relationship", value: "" },
          { label: "Mother", value: "mother" },
          { label: "Father", value: "father" },
          { label: "Grandmother", value: "grandmother" },
          { label: "Grandfather", value: "grandfather" },
          { label: "Aunt", value: "aunt" },
          { label: "Uncle", value: "uncle" },
          { label: "Legal Guardian", value: "legal_guardian" },
          { label: "Other", value: "other" },
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Details",
    description: "Your contact information",
    fields: [
      {
        name: "contact.addressLine1",
        label: "Address Line 1",
        type: "text",
        placeholder: "123 Main Street",
        validation: {
          required: "Address line 1 is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "contact.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "Apt 4B (Optional)",
        validation: { required: false },
      },
      {
        name: "contact.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contact.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        placeholder: "246 234 5678",
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
    id: "bankAccount",
    title: "Bank account information",
    description:
      "In order to receive the $100 Grant, please provide accurate and current banking information to prevent delays in processing this application.",
    fields: [
      {
        name: "bankAccount.bank",
        label: "Select a bank",
        type: "select",
        validation: {
          required: "Please select a bank",
        },
        options: [
          { label: "Select a bank", value: "" },
          { label: "Republic Bank (Barbados) Limited", value: "republic_bank" },
          {
            label: "CIBC FirstCaribbean International Bank",
            value: "cibc_firstcaribbean",
          },
          { label: "Scotiabank Barbados", value: "scotiabank" },
          {
            label: "First Citizens Bank (Barbados) Limited",
            value: "first_citizens",
          },
        ],
      },
      // Republic Bank branches
      {
        name: "bankAccount.branch",
        label: "Select a branch",
        type: "select",
        validation: {
          required: "Please select a branch",
        },
        conditionalOn: {
          field: "bankAccount.bank",
          value: "republic_bank",
        },
        options: [
          { label: "Select a branch", value: "" },
          { label: "Broad Street, Bridgetown", value: "broad_street" },
          { label: "Haggatt Hall", value: "haggatt_hall" },
          { label: "Hastings", value: "hastings" },
          { label: "Holetown", value: "holetown" },
          { label: "Oistins", value: "oistins" },
          { label: "Speightstown", value: "speightstown" },
          { label: "Warrens", value: "warrens" },
        ],
      },
      // CIBC FirstCaribbean branches
      {
        name: "bankAccount.branch",
        label: "Select a branch",
        type: "select",
        validation: {
          required: "Please select a branch",
        },
        conditionalOn: {
          field: "bankAccount.bank",
          value: "cibc_firstcaribbean",
        },
        options: [
          { label: "Select a branch", value: "" },
          { label: "Broad Street, Bridgetown", value: "broad_street" },
          { label: "Holetown", value: "holetown" },
          { label: "Oistins", value: "oistins" },
          { label: "Sunset Crest", value: "sunset_crest" },
          { label: "Warrens", value: "warrens" },
        ],
      },
      // Scotiabank branches
      {
        name: "bankAccount.branch",
        label: "Select a branch",
        type: "select",
        validation: {
          required: "Please select a branch",
        },
        conditionalOn: {
          field: "bankAccount.bank",
          value: "scotiabank",
        },
        options: [
          { label: "Select a branch", value: "" },
          { label: "Broad Street, Bridgetown", value: "broad_street" },
          { label: "Haggatt Hall", value: "haggatt_hall" },
          { label: "Holetown", value: "holetown" },
          { label: "Sunset Crest", value: "sunset_crest" },
          { label: "Warrens", value: "warrens" },
        ],
      },
      // First Citizens Bank branches
      {
        name: "bankAccount.branch",
        label: "Select a branch",
        type: "select",
        validation: {
          required: "Please select a branch",
        },
        conditionalOn: {
          field: "bankAccount.bank",
          value: "first_citizens",
        },
        options: [
          { label: "Select a branch", value: "" },
          { label: "Warrens", value: "warrens" },
        ],
      },
      {
        name: "bankAccount.accountType",
        label: "Select account type",
        type: "select",
        validation: {
          required: "Please select an account type",
        },
        options: [
          { label: "Select account type", value: "" },
          { label: "Savings", value: "savings" },
          { label: "Chequing", value: "chequing" },
        ],
      },
      {
        name: "bankAccount.nameOnAccount",
        label: "Name on account",
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
        name: "bankAccount.accountNumber",
        label: "Account number",
        type: "text",
        placeholder: "",
        validation: {
          required: "Account number is required",
        },
      },
    ],
  },
  {
    id: "review",
    title: "Check your answers",
    description:
      "Review the answers you've given carefully. Incorrect information may be difficult to change after registration.",
    fields: [],
  },
];
