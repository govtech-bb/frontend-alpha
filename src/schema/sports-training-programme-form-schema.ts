import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "personal",
    title: "Tell us about yourself",
    description: "",
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
        name: "dateOfBirth",
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
        name: "gender",
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
    ],
  },
  {
    id: "discipline",
    title: "Which sport are you interested in?",
    description:
      "We ask this to match you to a community sports training programme",
    fields: [
      {
        name: "disciplineOfInterest",
        label: "Discipline of Interest",
        hint: "For example, football or gymnastics",
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
        name: "disciplineExperience",
        label: "Do you have experience in this discipline?",
        type: "radio",
        validation: {
          required: "Experience in this discipline is required",
        },
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Tell us about your experience",
    description: "Tell us about your experience",
    fields: [
      {
        name: "experienceLevel",
        label:
          "What level of experience do you have in the sport you are interested in?",
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
        name: "otherExperienceLevel",
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
          field: "experienceLevel",
          value: "other",
        },
      },
      {
        name: "yearsOfExperience",
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
    description: "We ask this to help with scheduling",
    fields: [
      {
        name: "employmentStatus",
        label: "What is your employment status?",
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
        name: "institutionName",
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
          field: "employmentStatus",
          value: "studying",
        },
      },
      {
        name: "employerName",
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
          field: "employmentStatus",
          value: "employed",
        },
      },
      {
        name: "otherEmploymentDetails",
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
          field: "employmentStatus",
          value: "other",
        },
      },
    ],
  },
  {
    id: "organizations",
    title: "Tell us about your memberships?",
    description: "",
    fields: [
      {
        name: "belongsToOrganizations",
        label: "Do you belong to any organisations?",
        type: "radio",
        validation: {
          required: "Organizational membership is required",
        },
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
      {
        name: "organizationNames",
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
          itemLabel: "Name of the organisation",
          addButtonText: "Add another",
          minItems: 1,
        },
        conditionalOn: {
          field: "belongsToOrganizations",
          value: "true",
        },
      },
    ],
  },
  {
    id: "contact",
    title: "Your contact details",
    description: "Your contact information",
    fields: [
      {
        name: "addressLine1",
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
        name: "addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "telephoneNumber",
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
      {
        name: "email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency contact",
    description: "Provide emergency contact details",
    fields: [
      {
        name: "emergencyFirstName",
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
        name: "emergencyLastName",
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
        name: "emergencyRelationship",
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
        name: "emergencyAddressLine1",
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
        name: "emergencyAddressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "emergencyParish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Emergency contact parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "emergencyTelephoneNumber",
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
    title: "Thank you for your application",
    description:
      "Your information has been sent to the Youth Development Programme, the coordinating programme in the Division of Youth Affairs",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content:
          "If your application is successful, the Youth Commissioner will be in touch shortly to  confirm:",
        items: [
          "the location of the programme",
          "the start date and times",
          "what you will need to bring",
        ],
      },
    ],
    enableFeedback: true,
  },
];
