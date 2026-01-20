import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "personal",
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
        name: "applicant.dateOfBirth",
        label: "Date of birth",
        hint: "For example, 3 27 2007",
        type: "date",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "applicant.sex",
        label: "Sex",
        type: "radio",
        validation: {
          required: "Sex is required",
        },
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
    ],
  },
  {
    id: "discipline",
    title: "Which sport are you interested in?",
    description:
      "We ask this to match you to a community sports training programme",
    fields: [
      {
        name: "discipline.areaOfInterest",
        label: "Discipline of interest",
        hint: "For example, football or gymnastics",
        // hidden: true,
        type: "text",
        validation: {
          required: "Discipline of interest is required",
          minLength: {
            value: 2,
            message: "Discipline must be at least 2 characters",
          },
        },
      },
      {
        name: "discipline.hasExperience",
        label: "Do you have experience in this discipline?",
        type: "radio",
        validation: {
          required: "Experience in this discipline is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Tell us about your experience",
    description:
      "What level of experience do you have in the sport you are interested in?",
    conditionalOn: {
      field: "discipline.hasExperience",
      value: "yes",
    },
    fields: [
      {
        name: "experience.levelOfExperience",
        label:
          "What level of experience do you have in the sport you are interested in?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Experience level is required",
        },
        options: [
          { label: "School", value: "school" },
          { label: "Club", value: "club" },
          { label: "National", value: "national" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "experience.otherExperience",
        label: "Please specify",
        type: "text",
        validation: {
          required: "Please specify your experience level",
          minLength: {
            value: 2,
            message: "Experience level must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "experience.levelOfExperience",
          value: "other",
        },
      },
      {
        name: "experience.yearsOfExperience",
        label: "Years of experience",
        type: "number",
        validation: {
          required: "Years of experience is required",
          pattern: {
            value: "^[0-9]+$",
            message: "Please enter a valid number",
          },
        },
      },
    ],
  },
  {
    id: "employment",
    title: "What is your employment status?",
    description:
      "We ask this to help with scheduling and to help us see the impact of the programme",
    fields: [
      {
        name: "employment.status",
        label: "What is your employment status?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Employment status is required",
        },
        options: [
          { label: "Studying", value: "studying" },
          { label: "Employed", value: "employed" },
          { label: "Unemployed", value: "unemployed" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "employment.institutionName",
        label: "Name of institution",
        type: "text",
        validation: {
          required: "Institution name is required",
          minLength: {
            value: 2,
            message: "Institution name must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "employment.status",
          value: "studying",
        },
      },
      {
        name: "employment.companyName",
        label: "Name of company or organisation",
        type: "text",
        validation: {
          required: "Company or organisation name is required",
          minLength: {
            value: 2,
            message:
              "Company or organisation name must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "employment.status",
          value: "employed",
        },
      },
      {
        name: "employment.otherDetails",
        label: "Please give details",
        type: "text",
        validation: {
          required: "Employment details are required",
          minLength: {
            value: 2,
            message: "Details must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "employment.status",
          value: "other",
        },
      },
    ],
  },
  {
    id: "membership",
    title: "Do you belong to any organisations?",
    description:
      "For example, a sports or social group, or a youth and community club",
    fields: [
      {
        name: "belongsToOrganisations",
        label: "Do you belong to any organisations?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Organizational membership is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "organisation-details",
    title: "Do you belong to any organisations?",
    description:
      "For example, a sports or social group, or a youth and community club",
    conditionalOn: {
      field: "belongsToOrganisations",
      value: "yes",
    },
    fields: [
      {
        name: "organisationDetails",
        label: "Organisations",
        type: "fieldArray",
        validation: {
          required: "Organisation name is required",
          minLength: {
            value: 2,
            message: "Organisation name must be at least 2 characters",
          },
        },
        fieldArray: {
          itemLabel: "Organisation name",
          addButtonText: "Add another",
          minItems: 1,
          maxItems: 3,
          fields: [
            {
              name: "organisationName",
              label: "Name of the organisation",
              type: "text",
              validation: {
                required: "Name of the organisation is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              },
            },
            {
              name: "hasSignificantPosition",
              label:
                "Do you hold a significant position within the organisation?",
              type: "radio",
              validation: {
                required: "If you hold a significant position is required",
              },
              options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "contact",
    title: "Your contact details",
    fields: [
      {
        name: "contact.addressLine1",
        label: "Address line 1",
        type: "text",
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
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "contact.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contact.email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "contact.telephoneNumber",
        label: "Telephone number",
        type: "tel",
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
    id: "emergency",
    title: "Emergency contact",
    description: "If there is an emergency, who should we contact?",
    fields: [
      {
        name: "emergency.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "Emergency contact first name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "emergency.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Emergency contact last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "emergency.relationship",
        label: "Relationship",
        type: "text",
        validation: {
          required: "Relationship is required",
          minLength: {
            value: 2,
            message: "Relationship must be at least 2 characters",
          },
        },
      },
      {
        name: "emergency.addressLine1",
        label: "Address line 1",
        type: "text",
        validation: {
          required: "Emergency contact address line 1 is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "emergency.addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "emergency.parish",
        label: "Parish",
        width: "medium",
        type: "select",
        validation: {
          required: "Emergency contact parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "emergency.email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "emergency.telephoneNumber",
        label: "Telephone number",
        type: "tel",
        validation: {
          required: "Emergency contact telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g. 12462345678)",
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
    title: "Thank you for registering",
    description:
      "Your information has been sent to the Youth Development Programme, the coordinating programme in the Division of Youth Affairs",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "The Youth Commissioner will be in touch shortly to confirm:",
        items: [
          "The location of the programme",
          "The start date and times",
          "What you will need to bring",
        ],
      },
    ],
    enableFeedback: true,
  },
];
