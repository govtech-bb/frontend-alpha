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
        name: "lastName",
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
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "text", //TODO: change to "date" to display custom date input
        placeholder: "mm/dd/yyyy",
        validation: {
          required: "Date of birth is required",
          pattern: {
            value: "^(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/\\d{4}$",
            message: "Date must be in MM/DD/YYYY format",
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
    title: "What sport discipline are you interested in?",
    description: "Tell us about your area of interest",
    fields: [
      {
        name: "disciplineOfInterest",
        label: "Discipline of Interest",
        type: "text",
        placeholder: "e.g., Tennis, Basketball, Swimming",
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
        label: "What level of experience do you have?",
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
        placeholder: "e.g., Professional, Amateur, etc.",
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
        label: "Years of Experience",
        type: "number",
        placeholder: "e.g., 5",
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
    description: "What is your current employment status?",
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
    ],
  },
  {
    id: "organizations",
    title: "Do you belong to any organizations?",
    description: "Tell us about your organizational memberships",
    fields: [
      {
        name: "belongsToOrganizations",
        label: "Do you belong to any organizations?",
        type: "radio",
        validation: {
          required: "Organizational membership is required",
        },
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
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
        name: "addressLine1",
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
        name: "addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "Apt 4B (Optional)",
        validation: {},
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
        label: "Telephone Number",
        type: "tel",
        placeholder: "+1 (246) 234-5678",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\+1\\s?\\(?246\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message:
              "Please enter a valid Barbados phone number (e.g., +1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Contact",
    description: "Provide emergency contact details",
    fields: [
      {
        name: "emergencyFirstName",
        label: "First Name",
        type: "text",
        placeholder: "Jane",
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
        label: "Last Name",
        type: "text",
        placeholder: "Doe",
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
        placeholder: "e.g., Mother, Father, Spouse, Sibling",
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
        label: "Address Line 1",
        type: "text",
        placeholder: "123 Main Street",
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
        label: "Address Line 2",
        type: "text",
        placeholder: "Apt 4B (Optional)",
        validation: {},
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
        label: "Telephone Number",
        type: "tel",
        placeholder: "+1 (246) 234-5678",
        validation: {
          required: "Emergency contact telephone number is required",
          pattern: {
            value: "^\\+1\\s?\\(?246\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message:
              "Please enter a valid Barbados phone number (e.g., +1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "review",
    title: "Check your answers",
    description:
      "Review the answers you've given carefully. Incorrect information may be difficult to change after registration.",
    fields: [], // Empty fields array for review step
  },
];
