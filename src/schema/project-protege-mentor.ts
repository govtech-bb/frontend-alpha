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
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Date of birth is required",
        },
      },
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
        placeholder: "e.g., University of the West Indies",
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
        placeholder: "e.g., ABC Company Ltd",
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
        placeholder: "Describe your employment status",
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
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
        validation: {
          required: "Email address is required",
        },
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
    id: "mentorship",
    title: "Tell us why you would be a good mentor",
    description: "",
    fields: [
      {
        name: "whyMentor",
        label: "Why do you want to be a mentor?",
        type: "textarea",
        rows: 5,
        validation: {
          required: "Tell us why you want to be a mentor",
        },
      },
      {
        name: "strengths",
        label: "What are your strengths?",
        type: "textarea",
        hint: "What qualities, knowledge or skills do you have that would make you a good mentor?",
        rows: 5,
        validation: {
          required: "Tell us about your strengths",
        },
      },
      {
        name: "menteeLearn",
        label: "What do you think a mentee could learn from you?",
        type: "textarea",
        hint: "You might describe an experience you've had or a challenge you've overcome that shows an admirable quality",
        rows: 5,
        validation: {
          required: "Tell us what a mentee could learn from you",
        },
      },
    ],
  },

  {
    id: "preferences",
    title: "Your preferences",
    description: "",
    fields: [
      {
        name: "menteeGenderPreference",
        label: "Would you prefer a male or female mentee?",
        type: "radio",
        hint: "We ask this so we can find the best mentee/mentor match and both can thrive",
        validation: {
          required: "Select your preference",
        },
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "No preference", value: "no-preference" },
        ],
      },
      {
        name: "sharePhoneNumber",
        label:
          "Would you be happy for your personal phone number to be given to your mentee?",
        type: "radio",
        validation: {
          required: "Select whether you would share your phone number",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "menteePhoneNumber",
        label: "What is your phone number?",
        type: "tel",
        placeholder: "+1 (246) 234-5678",
        validation: {
          required: "Enter your phone number",
          pattern: {
            value: "^\\+1\\s?\\(?246\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message:
              "Please enter a valid Barbados phone number (e.g., +1 246 234 5678)",
          },
        },
        conditionalOn: {
          field: "sharePhoneNumber",
          value: "yes",
        },
      },
      {
        name: "hasMenteeInMind",
        label: "Do you have someone in mind that you'd like to mentor?",
        type: "radio",
        validation: {
          required: "Select whether you have someone in mind",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "menteeInMindName",
        label: "What is their name?",
        type: "text",
        placeholder: "Enter their name",
        validation: {
          required: "Enter the name of the person you have in mind",
        },
        conditionalOn: {
          field: "hasMenteeInMind",
          value: "yes",
        },
      },
    ],
  },

  {
    id: "experience",
    title: "Your experience",
    description: "",
    fields: [
      {
        name: "hasMentorExperience",
        label: "Do you have experience as a mentor?",
        type: "radio",
        hint: "Previous experience is not mandatory",
        validation: {
          required: "Select whether you have experience as a mentor",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "yearsOfExperience",
        label: "How many years of experience?",
        type: "number",
        placeholder: "e.g., 3",
        validation: {
          required: "Enter your years of experience",
        },
        conditionalOn: {
          field: "hasMentorExperience",
          value: "yes",
        },
      },
    ],
  },

  {
    id: "professional-referee",
    title: "Tell us about your professional referee",
    description:
      "This can be someone more senior who you've worked with, or a teacher or lecturer.",
    fields: [
      {
        name: "professionalRefereeFirstName",
        label: "First name",
        type: "text",
        placeholder: "John",
        validation: {
          required: "Enter the referee's first name",
        },
      },
      {
        name: "professionalRefereeLastName",
        label: "Last name",
        type: "text",
        placeholder: "Smith",
        validation: {
          required: "Enter the referee's last name",
        },
      },
      {
        name: "professionalRefereeRelationship",
        label: "Relationship",
        type: "text",
        placeholder: "e.g., Former manager, Lecturer",
        validation: {
          required: "Enter your relationship to the referee",
        },
      },
      {
        name: "professionalRefereeEmail",
        label: "Email address",
        type: "email",
        placeholder: "john.smith@example.com",
        validation: {
          required: "Enter the referee's email address",
        },
      },
      {
        name: "professionalRefereePhone",
        label: "Phone number",
        type: "tel",
        placeholder: "+1 (246) 234-5678",
        validation: {
          required: "Enter the referee's phone number",
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
    id: "personal-referee",
    title: "Tell us about your personal referee",
    description:
      "This can be someone who can speak about your character. For example, a community leader or mentor.",
    fields: [
      {
        name: "personalRefereeFirstName",
        label: "First name",
        type: "text",
        placeholder: "Jane",
        validation: {
          required: "Enter the referee's first name",
        },
      },
      {
        name: "personalRefereeLastName",
        label: "Last name",
        type: "text",
        placeholder: "Doe",
        validation: {
          required: "Enter the referee's last name",
        },
      },
      {
        name: "personalRefereeRelationship",
        label: "Relationship",
        type: "text",
        placeholder: "e.g., Family friend, Neighbour",
        validation: {
          required: "Enter your relationship to the referee",
        },
      },
      {
        name: "personalRefereeEmail",
        label: "Email address",
        type: "email",
        placeholder: "jane.doe@example.com",
        validation: {
          required: "Enter the referee's email address",
        },
      },
      {
        name: "personalRefereePhone",
        label: "Phone number",
        type: "tel",
        placeholder: "+1 (246) 234-5678",
        validation: {
          required: "Enter the referee's phone number",
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
