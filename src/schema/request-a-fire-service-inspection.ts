import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "tell-us-about-the-premises",
    title: "Tell us about the premises",
    description: "",
    fields: [
      {
        name: "premises.typeOfPremises",
        label: "Type of premises",
        type: "radio",
        options: [
          {
            label: "Hotel",
            value: "hotel",
          },
          {
            label: "Daycare",
            value: "daycare",
          },
          {
            label: "Place of entertainment",
            value: "placeOfEntertainment",
          },
        ],
        validation: {
          required: "Type of premises is required",
        },
      },
      {
        name: "premises.nameOfPremises",
        label: "Name of premises",
        type: "text",
        validation: {
          required: "Name of premises is required",
        },
      },
      {
        name: "premises.addressLine1",
        label: "Address line 1",
        type: "text",
        validation: {
          required: "Address line 1 is required",
        },
      },
      {
        name: "premises.addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "premises.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
    ],
  },
  {
    id: "who-is-the-certificate-for",
    title: "Who is the certificate for?",
    description: "",
    fields: [
      {
        name: "purposeOfCertificate",
        label: "Purpose of certificate",
        hidden: true,
        type: "radio",
        options: [
          {
            label: "Barbados Tourism Authority",
            value: "barbados-tourism-authority",
          },
          {
            label: "Child Care Board",
            value: "child-care-board",
          },
          {
            label: "Treasury",
            value: "treasury",
          },
        ],
        validation: {
          required: "Purpose of certificate is required",
        },
      },
    ],
  },
  {
    id: "tell-us-about-yourself",
    title: "Tell us about yourself",
    description: "",
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
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "First name must contain only letters, hyphens, or apostrophes",
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
        type: "text",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value:
              "^(1[-]246[-]\\d{3}[-]\\d{4}|1[\\s]246[\\s]\\d{3}[\\s]\\d{4}|1246\\d{7})$",
            message:
              "Please enter a valid phone number (e.g. 12462345678, 1-246-234-5678, or 1 246 234 5678)",
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
        name: "declaration.dateOfDeclaration",
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
    title: "Your request for a Fire Service inspection has been submitted.",
    description: "We have received your request for a Fire Service inspection.",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "The Fire Service will review your request.",
        items: [
          "If they need more information, they will contact you using the details you provided.",
          "An inspection visit will be scheduled if your request can proceed.",
        ],
      },
    ],
    enableFeedback: true,
  },
];
