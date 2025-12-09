import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "applicant-details",
    title: "Tell us about yourself",
    fields: [
      {
        name: "applicant.firstName",
        label: "First Name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },

      {
        name: "applicant.lastName",
        label: "Last Name",
        type: "text",
        validation: {
          required: "Last name is required",
        },
      },
      {
        name: "applicant.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        validation: {
          required: "Date of birth is required",
        },
      },

      {
        name: "applicant.idNumber",
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
        name: "applicant.hasNisNumber",
        label: "Do you have a National Insurance Number (NIS)?",
        type: "radio",
        validation: {
          required: "NIS Number is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "applicant.nisNumber",
        label: "What is your National Insurance Number (NIS)?",
        type: "text",
        placeholder: "",
        validation: {
          required: "NIS Number is required",
          minLength: {
            value: 2,
            message: "NIS Number must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "applicant.hasNisNumber",
          value: "yes",
        },
      },
      {
        name: "applicant.gender",
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
      {
        name: "applicant.maritalStatus",
        label: "Marital Status",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "Select marital status", value: "" },
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
        ],
      },
      {
        name: "applicant.hasDisability",
        label: "Do you have a disability?",
        type: "radio",
        validation: {
          required: "Disability status is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "applicant.disabilityDetails",
        label: "What is your disability?",
        type: "textarea",
        placeholder: "",
        validation: {
          required: "Field is required",
          minLength: {
            value: 2,
            message: "Field must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "applicant.hasDisability",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "contact-details",
    title: "Your Contact Details",
    description: "Description",
    fields: [
      {
        name: "contact.addressLine1",
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
        name: "contact.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: {},
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
        name: "contact.postalCode",
        label: "Postal Code",
        type: "number",
        placeholder: "",
        validation: {},
      },
      {
        name: "contact.isMailingAddressSame",
        label: "Is your mailing address the same as above?",
        type: "radio",
        validation: {
          required: "Field is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "contact.email",
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "contact.telephoneNumber",
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
    id: "emergency-contact",
    title: "Emergency Contact Details",
    description: "Description",
    fields: [
      {
        name: "emergency.firstName",
        label: "First Name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },
      {
        name: "emergency.lastName",
        label: "Last Name",
        type: "text",
        validation: {
          required: "Last name is required",
        },
      },
      {
        name: "emergency.relationship",
        label: "Relationship ",
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
      {
        name: "emergency.addressLine1",
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
        name: "emergency.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: {},
      },

      {
        name: "emergency.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "emergency.telephoneNumber",
        label: "Phone Number",
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
    id: "education-training",
    title: "Tell us about your education and training",
    description: "",
    fields: [
      {
        name: "education.secondarySchoolName",
        label: "Name of Secondary School",
        type: "text",
        placeholder: "",
        validation: {
          required: "Name of Secondary School is required",
          minLength: {
            value: 5,
            message: "Name of Secondary School must be at least 5 characters",
          },
        },
      },
      {
        name: "education.startYear",
        label: "Start Year",
        type: "text",
        placeholder: "",
        validation: {
          required: "Start Year is required",
          minLength: {
            value: 4,
            message: "Start Year must be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "Start Year must be 4 characters",
          },
        },
      },
      {
        name: "education.endYear",
        label: "End Year",
        type: "text",
        placeholder: "",
        validation: {
          required: "End Year is required",
          minLength: {
            value: 4,
            message: "End Year must be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "End Year must be 4 characters",
          },
        },
      },
      {
        name: "education.coursesOrSubjects",
        label: "What courses or subjects did you study?",
        type: "textarea",
        placeholder: "",
        validation: {},
      },
      {
        name: "education.qualificationsObtained",
        label: "What are your qualifications?",
        type: "textarea",
        placeholder: "",
        validation: {},
      },
      {
        name: "education.gradesObtained",
        label: "What are your grades?",
        type: "textarea",
        placeholder: "",
        validation: {},
      },
    ],
  },
  {
    id: "eligibility-questions",
    title: "Your eligibility",
    description: "",
    fields: [
      {
        name: "eligibility.skillsAndInterests",
        label: "Tell us about your skills and interests",
        hint: "For example, which trades are you skilled in? Which hobbies do you enjoy? Are you part of any community groups",
        type: "textarea",
        rows: 5,
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "This must be at least 5 characters",
          },
        },
      },
      {
        name: "eligibility.areasOfInterest",
        label: "What type of jobs or trades are you interested in?",
        type: "textarea",
        rows: 5,
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "This must be at least 5 characters",
          },
        },
      },
      {
        name: "eligibility.availabilityToWork",
        label: "Tell us when you are available to work",
        hint: "If you are 18 and over you are eligible to work at night. Might you be willing to work between 6pm and 7am?",
        type: "radio",
        rows: 5,
        validation: {
          required: "Field is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "eligibility.shortTermGoals",
        label: "Tell us about your short-term goals",
        hint: " This helps us understand the kinds of opportunities that will support your growth. For example, I want to be working in a full-time administrative role where I can improve my customer service and office management skills.",
        type: "textarea",
        rows: 5,
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "This must be at least 5 characters",
          },
        },
      },
    ],
  },
  {
    id: "check-your-answers",
    title: "Check Your Answers",
    fields: [],
  },
];
