import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "request-details",
    title: "What do you want to do?",
    fields: [
      {
        name: "request.purpose",
        label: "What do you want to do?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          {
            label: "Search if society name is available",
            value: "request-search",
          },
          { label: "Reserve a society name", value: "reserve-name" },
          {
            label: "Change the name of an existing society",
            value: "change-name",
          },
        ],
      },
      {
        name: "request.currentSocietyName",
        label: "What is the current name of the society",
        type: "text",
        validation: {
          required: "Field is required",
        },
        conditionalOn: {
          field: "request.purpose",
          value: "change-name",
        },
      },
    ],
  },
  {
    id: "society-names",
    title: "What is the proposed society name?",
    description: "You can suggest up to 3 names",
    fields: [
      {
        name: "names.first.title",
        label: "First choice",
        type: "text",
        validation: {
          required: "Title is required",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
        },
      },
      {
        name: "names.first.explanation",
        label: "How did you choose this name?",
        type: "text",
        validation: {
          required: "Your name choice is required",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "society-activity",
    title: "What does the society do?",
    description: "List the main activities of the society",
    fields: [
      {
        name: "activity.type",
        label: "Activity",
        type: "text",
        validation: {
          required: "Activity is required",
          minLength: {
            value: 2,
            message: "Activity must be at least 2 characters",
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
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name",
        hint: "If you have more than one, add them in order",
        type: "text",
        validation: { required: false },
      },
      {
        name: "applicant.lastName",
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
        hint: "Optional",
        type: "text",
        width: "medium",
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
