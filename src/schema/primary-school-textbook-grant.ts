import { barbadosParishes } from "@/data/constants";
import { primarySchools } from "@/data/schools";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "tell-us-about-the-child",
    title: "Tell us about the child",
    description: "You can add information for other children later",
    repeatable: {
      arrayFieldName: "beneficiaries",
      maxItems: 10,
      addAnotherLabel: "Do you have another child at the same school?",
      sharedFields: ["school", "principalName"],
    },
    fields: [
      {
        name: "firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        width: "medium",
        validation: {
          required: "ID number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (for example, 850101-0001)",
          },
        },
        // Note: ID Number validation is skipped when ShowHide is open (handled in step validation)
        skipValidationWhenShowHideOpen: "usePassportInstead",
      },
      {
        name: "passportDetails",
        label: "",
        type: "showHide",
        validation: { required: false },
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "passportNumber",
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
        name: "sex",
        label: "Sex",
        type: "radio",
        validation: {
          required: "Please select the child's sex",
        },
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        name: "school",
        label: "Name of institution",
        type: "select",
        validation: {
          required: "Please select the child's school.",
        },
        options: primarySchools,
        width: "short",
      },
      {
        name: "principalName",
        label: "Name of principal",
        type: "text",
        validation: {
          required: "Principal's name is required",
          minLength: {
            value: 2,
            message: "Principal's name must be at least 2 characters",
          },
        },
        width: "short",
      },
      {
        name: "classNumber",
        label: "Which class are they currently in?",
        hint: "If they are between school years, add the class they are going into",
        type: "text",
        validation: {
          required: "Class number is required",
        },
        width: "short",
      },
      {
        name: "isParentOrGuardian",
        label: "Are you the parent or guardian?",
        type: "radio",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "relationshipDescription",
        label: "What is your relationship with the child?",
        type: "text",
        validation: {
          required: "Please describe your relationship",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "isParentOrGuardian",
          value: "no",
        },
      },
    ],
  },
  {
    id: "guardian-details",
    title: "Tell us about the parent or guardian",
    description: "",
    repeatable: {
      arrayFieldName: "beneficiaries",
      maxItems: 10,
      skipAddAnother: true,
    },
    conditionalOn: {
      field: "isParentOrGuardian",
      value: "no",
    },
    fields: [
      {
        name: "guardian.firstName",
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
        name: "guardian.lastName",
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
        name: "guardian.idNumber",
        label: "National Identification (ID) number",
        type: "text",
        width: "medium",
        validation: {
          required: "ID number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (for example, 850101-0001)",
          },
        },
        skipValidationWhenShowHideOpen: "guardian.usePassportInstead",
      },
      {
        name: "guardian.passportDetails",
        label: "",
        type: "showHide",
        validation: { required: false },
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "guardian.usePassportInstead",
          description:
            "If the guardian doesn't have a National ID number, you can use their passport number instead.",
          fields: [
            {
              name: "guardian.passportNumber",
              label: "Passport number",
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
        label: "TAMIS number",
        type: "text",
        width: "medium",
        validation: {
          required: "TAMIS number is required",
          pattern: {
            value: "^\\d{10,15}$",
            message:
              "TAMIS number is between 10 to 15 digits. Example TAMIS number: 1234567890",
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
        name: "applicant.addressLine2",
        label: "Address line 2",
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
        type: "text",
        hint: "For example, BB17004 (optional)",
        width: "medium",
        validation: {
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postcode (for example, BB17004)",
          },
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
              "^(?:1[- ]?[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{4})$",
            message:
              "Please enter a valid phone number (for example, 12462345678, 1-246-234-5678, or 1 246 234 5678)",
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
              label: "Passport number",
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
        label: "TAMIS number",
        type: "text",
        width: "medium",
        validation: {
          required: "TAMIS number is required",
          pattern: {
            value: "^\\d{10,15}$",
            message:
              "TAMIS number is between 10 to 15 digits. Example TAMIS number: 1234567890",
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
      "Add the bank account details for an account which has been used within the last 3 months. Check your details are correct to avoid delays.",
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
    title: "Thank you for your request",
    description:
      "Review the answers you've given carefully. Incorrect information may be difficult to change after registration.",
    fields: [],
    bodyContent: `## What happens next

- Your application has been sent to the principal of the child’s school for review.
- The school will check that:
  - the child is eligible, and
  - no other claim has been submitted for the same child in this academic year.
- Once the principal approves the application, the payment details you provided will be added to the system.
- If approved, **BDS $100** will be paid to the bank account you provided.

### Need help?

If you have questions about your application, contact the Ministry of Educational Transformation:

**Ministry of Educational Transformation**
**Telephone:** (246) 535-0600 
**Email:** info@mes.gov.bb
 
Keep a copy of this application for your records.

`,
    enableFeedback: true,
  },
];
