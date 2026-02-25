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
        label: "Middle name(s)",
        type: "text",
        hint: "Enter all middle names in order",
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
              "^(?:1[- ]?[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{4})$",
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "old-address",
    title: "Old address",
    description: "Which address does your personal mail currently go to?",
    fields: [
      {
        name: "oldAddress.addressLine1",
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
        name: "oldAddress.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "oldAddress.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "oldAddress.postalCode",
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
    ],
  },
  {
    id: "new-address",
    title: "New address",
    description: "Which address would you like your personal mail to go to?",
    fields: [
      {
        name: "newAddress.addressLine1",
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
        name: "newAddress.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "newAddress.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "newAddress.postalCode",
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
        name: "newAddress.redirectionStartDate",
        label: "When do you want the redirection to start?",
        type: "date",
        validation: {
          required: "Start date is required",
        },
      },
      {
        name: "newAddress.redirectionEndDate",
        label: "When do you want the redirection to end?",
        hint: "A redirection notice lasts for a maximum of 6 months.",
        type: "date",
        validation: {
          required: "End date is required",
        },
      },
    ],
  },
  {
    id: "minor-dependents",
    title:
      "Are there any minor dependents who also need their mail to be redirected to the new address?",
    description:
      "Dependants are children under 18 or vulnerable relatives (those with physical or mental infirmity or care needs)",
    fields: [
      {
        name: "dependents.anyMinorDependents",
        label:
          "Are there any minor dependents who also need their mail to be redirected to the new address?",
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
    ],
  },
  {
    id: "minor-details",
    title: "Tell us about your dependent(s)",
    conditionalOn: {
      field: "dependents.anyMinorDependents",
      value: "yes",
    },
    repeatable: {
      arrayFieldName: "minorDetails",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another minor dependent?",
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
        name: "middleName",
        label: "Middle name(s)",
        type: "text",
        hint: "Enter all middle names in order",
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
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (for example, 850101-0001)",
          },
        },
      },
    ],
  },

  {
    id: "adult-dependents",
    title:
      "Are there any adults who also need their mail to be redirected to the new address?",
    description:
      "Adults are members of the household who are 18 years old and over",
    fields: [
      {
        name: "adult.anyAdults",
        label:
          "Are there any adults who also need their mail to be redirected to the new address?",
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
    ],
  },
  {
    id: "adult-details",
    title: "Tell us about the adult(s)",
    conditionalOn: {
      field: "adult.anyAdults",
      value: "yes",
    },
    repeatable: {
      arrayFieldName: "adultDetails",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another adult?",
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
        name: "middleName",
        label: "Middle name(s)",
        type: "text",
        hint: "Enter all middle names in order",
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
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (for example, 850101-0001)",
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
    title: "Thank you for your request",
    description:
      "Your information has been sent to the Barbados Postal Service.",
    fields: [],
    showReferenceNumber: true,
    bodyContent: `## What happens next

Everyone who is 18 years old and over who wants to redirect their personal mail must visit any Post Office, in person, to:

1. Sign the form.
2. Verify their identity with their National ID card.

The Post Office cashier will ask for the reference number above. You can find a record of it on your confirmation email.`,
    enableFeedback: true,
  },
];
