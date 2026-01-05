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
        width: "short",
        type: "select",
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
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name(s)",
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
        },
      },
      {
        name: "applicant.dateOfBirth",
        label: "Date of birth",
        placeholder: "For example, 12 30 1986",
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
      {
        name: "applicant.maritalStatus",
        label: "Marital status",
        width: "medium",
        type: "select",
        validation: {
          required: "Marital Status is required",
        },
        options: [
          { label: "Select marital status", value: "" },
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
        ],
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
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
        name: "applicant.hasNisNumber",
        label: "Do you have a National Insurance number (NIS)?",
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
        label: "Provide your National insurance number (NIS)?",
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
    ],
  },
  {
    id: "disability-support",
    title: "Do you have a disability?",
    description:
      "We ask you this so we can accomodate accessibility or support needs.",
    fields: [
      {
        name: "applicant.hasDisability",
        label: "",
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
          required: "Disability is required",
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
    title: "Your contact details",
    description: "Description",
    fields: [
      {
        name: "contactDetails.addressLine1",
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
        name: "contactDetails.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "contactDetails.parish",
        label: "Parish",
        width: "medium",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contactDetails.postalCode",
        label: "Postal code",
        width: "medium",
        type: "text",
        validation: {
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
      {
        name: "contactDetails.email",
        label: "Email Address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "contactDetails.telephoneNumber",
        label: "Telephone number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g. 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "emergency-contact",
    title: "Emergency contact details",
    description: "Description",
    fields: [
      {
        name: "emergency.title",
        label: "Title",
        width: "short",
        type: "select",
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
        name: "emergency.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },
      {
        name: "emergency.lastName",
        label: "Last name",
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
        name: "emergency.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "emergency.parish",
        label: "Parish",
        width: "medium",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "emergency.email",
        label: "Email Address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "emergency.telephoneNumber",
        label: "Phone number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g. 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "primary-education",
    title: "Tell us about your primary education",
    fields: [
      {
        name: "primaryEducation.schoolName",
        label: "Name of primary school",
        type: "text",
        width: "medium",
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "Name must be at least 5 characters",
          },
        },
      },
      {
        name: "primaryEducation.startYear",
        label: "Start year",
        type: "text",
        width: "short",
        validation: {
          required: "Field is required",
          minLength: {
            value: 4,
            message: "Start year must be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "Start year must be 4 characters",
          },
        },
      },
      {
        name: "primaryEducation.endYear",
        label: "End year",
        width: "short",
        type: "text",
        validation: {
          required: "Field is required",
          minLength: {
            value: 4,
            message: "End year must be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "End year must be 4 characters",
          },
        },
      },
    ],
  },
  {
    id: "secondary-education",
    title: "Tell us about your secondary education",
    fields: [
      {
        name: "secondaryEducation.schoolName",
        label: "Name of secondary school",
        width: "medium",
        type: "text",
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "Name must be at least 5 characters",
          },
        },
      },
      {
        name: "secondaryEducation.startYear",
        label: "Start year",
        width: "short",
        type: "text",
        validation: {
          required: "Field is required",
          minLength: {
            value: 4,
            message: "Start year must be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "Start year must be 4 characters",
          },
        },
      },
      {
        name: "secondaryEducation.endYear",
        label: "End year",
        width: "short",
        type: "text",
        validation: {
          required: "Field is required",
          minLength: {
            value: 4,
            message: "End Year must be 4 characters",
          },
          maxLength: {
            value: 4,
            message: "End year must be 4 characters",
          },
        },
      },
    ],
  },
  {
    id: "post-secondary-tertiary-training",
    title: "Post-secondary and tertiary training",
    description:
      "Add information about college, university and training courses you have completed",
    repeatable: {
      arrayFieldName: "postSecondaryEducation",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another training?",
    },
    fields: [
      {
        name: "institutionName",
        label: "Name of Institution",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: false,
          minLength: {
            value: 5,
            message: "Name of Institution must be at least 5 characters",
          },
        },
      },
      {
        name: "qualificationsObtained",
        label: "What are your qualifications?",
        width: "medium",
        type: "textarea",
        placeholder: "",
        validation: { required: false },
      },
      {
        name: "coursesOrSubjects",
        label: "Courses or subjects",
        width: "medium",
        hint: "Separate each course with a comma",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },
      {
        name: "startYear",
        label: "Start Year",
        width: "short",
        type: "text",
        placeholder: "",
        validation: {
          required: false,
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
        name: "endYear",
        label: "End Year",
        width: "short",
        type: "text",
        placeholder: "",
        validation: {
          required: false,
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
    ],
  },
  {
    id: "previous-paid-job",
    title: "Have you had a paid job?",
    description:
      "This includes part-time and /or casual work, or a full-time employed position.",
    fields: [
      {
        name: "hasPreviousPaidJob",
        label: "Have you had a paid job?",
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
    id: "employment-history",
    title: "Tell us about your previous job",
    description: "",
    conditionalOn: {
      field: "hasPreviousPaidJob",
      value: "yes",
    },
    repeatable: {
      arrayFieldName: "employmentHistory",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another job?",
    },
    fields: [
      {
        name: "employerName",
        label: "Name of employer",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: "Name of employer is required",
          minLength: {
            value: 5,
            message: "Name of employer must be at least 5 characters",
          },
        },
      },
      {
        name: "occupation",
        label: "Occupation",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: "Occupation is required",
          minLength: {
            value: 5,
            message: "Occupation must be at least 5 characters",
          },
        },
      },

      {
        name: "startDate",
        label: "When did you start this job?",
        hint: "Provide the month and year (eg 12, 2023)",
        type: "text",
        width: "short",
        placeholder: "",
        validation: {
          required: "Start date is required",
          minLength: {
            value: 4,
            message: "Start date must be 4 characters",
          },
        },
      },
      {
        name: "endDate",
        label: "When did you end this job?",
        hint: "Provide the month and year (eg 12, 2023)",
        type: "text",
        width: "short",
        placeholder: "",
        validation: {
          required: false,
          minLength: {
            value: 4,
            message: "End date must be 4 characters",
          },
        },
      },
      {
        name: "currentlyWorkingHere",
        label: "I am currently working here",
        type: "checkbox",
        validation: {
          required: false,
        },
      },
      {
        name: "mainTasks",
        label: "Your main tasks",
        hint: "Provide a brief description of what you did in your role",
        width: "medium",
        type: "textarea",
        rows: 5,
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "Main tasks must be at least 5 characters",
          },
        },
      },
    ],
  },
  {
    id: "eligibility-interests",
    title: "Tell us about your areas of interests",
    fields: [
      {
        name: "eligibility.interests",
        label: "What type of jobs or trades are you interested in?",
        width: "medium",
        type: "textarea",
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
    id: "eligibility-age",
    title: "Are you 18 and over?",
    fields: [
      {
        name: "eligibility.areYouOver18",
        label: "Are you 18 and over?",
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
      // {
      //   name: "eligibility.availabilityToWork",
      //   label: "Tell us when you are available to work",
      //   hint: "If you are 18 and over you are eligible to work at night. Might you be willing to work between 6pm and 7am?",
      //   type: "radio",
      //   rows: 5,
      //   validation: {
      //     required: "Field is required",
      //   },
      //   options: [
      //     { label: "Yes", value: "yes" },
      //     { label: "No", value: "no" },
      //   ],
      // },
    ],
  },
  {
    id: "eligibility-questions",
    title: "Tell us about your short-term goals",
    description:
      "This helps us understand the kinds of opportunities that will support your growth. ",
    fields: [
      {
        name: "eligibility.shortTermGoals",
        label: "Tell us about your short-term goals",
        hidden: true,
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
    title: "Your application has been submitted",
    description: "",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "",
        items: [
          "Your application will be reviewed.",
          "You may be contacted if more information is needed.",
          "You will be informed of the outcome.",
        ],
      },
    ],
    enableFeedback: true,
  },
];
