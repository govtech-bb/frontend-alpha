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
        label: "Middle name",
        type: "text",
        validation: {},
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
        type: "date",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
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
        label: "Marital status",
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
        label: "National identification (ID) number",
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
        validation: {},
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
        label: "Do you have a national insurance number (NIS)?",
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
        label: "Provide your national insurance number (NIS)?",
        type: "number",
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
        name: "contact.addressLine1",
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
        name: "contact.addressLine2",
        label: "Address line 2",
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
        label: "Postal code",
        type: "text",
        validation: {
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
      // {
      //   name: "contact.isMailingAddressSame",
      //   label: "Is your mailing address the same as above?",
      //   type: "radio",
      //   validation: {
      //     required: "Field is required",
      //   },
      //   options: [
      //     { label: "Yes", value: "yes" },
      //     { label: "No", value: "no" },
      //   ],
      // },
      // {
      //   name: "mailing.addressLine1",
      //   label: "Mailing Address Line 1",
      //   type: "text",
      //   placeholder: "",
      //   validation: {
      //     required: "Mailing address line 1 is required",
      //     minLength: {
      //       value: 5,
      //       message: "Address must be at least 5 characters",
      //     },
      //   },
      //   conditionalOn: {
      //     field: "contact.isMailingAddressSame",
      //     value: "no",
      //   },
      // },
      // {
      //   name: "mailing.addressLine2",
      //   label: "Mailing Address Line 2",
      //   type: "text",
      //   placeholder: "",
      //   validation: {},
      //   conditionalOn: {
      //     field: "contact.isMailingAddressSame",
      //     value: "no",
      //   },
      // },
      // {
      //   name: "mailing.parish",
      //   label: "Mailing Parish",
      //   type: "select",
      //   validation: {
      //     required: "Mailing parish is required",
      //   },
      //   options: barbadosParishes,
      //   conditionalOn: {
      //     field: "contact.isMailingAddressSame",
      //     value: "no",
      //   },
      // },
      // {
      //   name: "mailing.postalCode",
      //   label: "Mailing Postal Code",
      //   type: "text",
      //   placeholder: "BB17004",
      //   validation: {
      //     pattern: {
      //       value: "^BB\\d{5}$",
      //       message: "Enter a valid postal code (e.g., BB17004)",
      //     },
      //   },
      //   conditionalOn: {
      //     field: "contact.isMailingAddressSame",
      //     value: "no",
      //   },
      // },
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
            value: "^\\+?1\\s?\\(?246\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message:
              "Please enter a valid 11-digit Barbados phone number (e.g., 1 246 234 5678 or +1 246 234 5678)",
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
        label: "Phone number",
        type: "tel",
        placeholder: "+1 (246) 234-5678",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\+?1\\s?\\(?246\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message:
              "Please enter a valid 11-digit Barbados phone number (e.g., 1 246 234 5678 or +1 246 234 5678)",
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
        name: "education.level",
        label: "Education Level",
        type: "radio",
        validation: {
          required: "Education Level is required",
        },
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
          { label: "Tertiary", value: "tertiary" },
        ],
      },
      {
        name: "education.institutionName",
        label: "Name of institution",
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
        label: "Start year",
        type: "number",
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
        label: "End year",
        type: "number",
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
        name: "education.addanother",
        label: "Do you want to add another experience?",
        type: "radio",
        validation: {
          required: "Field is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "share-employment",
    title: "Do you want to add your employment history?",
    description: "",
    fields: [
      {
        name: "employment.shareEmploymentHistory",
        label: "",
        type: "radio",
        validation: {
          required: "Field is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "previous-job",
    title: "Tell us about your previous job",
    description: "",
    fields: [
      {
        name: "employment.employerName",
        label: "Name of employer or organization",
        type: "text",
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "Please provide more details (at least 5 characters)",
          },
        },
      },
      {
        name: "employment.jobTitle",
        label: "Occupation",
        hint: "Job Title",
        type: "text",
        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "Please provide more details (at least 5 characters)",
          },
        },
      },
      {
        name: "employment.startDate",
        label: "When did you start this job?",
        type: "date",
        validation: {
          required: "Date is required",
        },
      },
      {
        name: "employment.endDate",
        label: "When did you end this job?",
        type: "date",
        validation: {
          required: "Date is required",
        },
      },
      {
        name: "employment.currentlyWorkingHere",
        label: "I am currently working here",
        type: "checkbox",
        validation: {},
      },
      {
        name: "employment.jobDuties",
        label: "Your main tasks",
        hint: "Provide a brief description of what you did in your role",
        type: "textarea",
        placeholder: "",
        validation: {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "Please provide more details (at least 10 characters)",
          },
        },
      },
      {
        name: "employment.addanother",
        label: "Do you want to add another experience?",
        type: "radio",
        validation: {
          required: "Field is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "areas-of-interest",
    title: "Tell us your areas of interest",
    description: "",
    fields: [
      {
        name: "goals.interestInJobsAndTrades",
        label: "What type of jobs or trades are you interested in?",
        type: "text",
        placeholder: "",
        validation: {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "Please provide more details (at least 10 characters)",
          },
        },
      },
      {
        name: "education.18andOver",
        label: "Are you 18 and over?",
        type: "radio",
        validation: {
          required: "Field is required",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "short-term-goals",
    title: "Tell us about your short-term goals",
    description:
      "This helps us understand the kinds of opportunities that will support your growth. For example, I want to be working in a full-time administrative role where I can improve my customer service and office management skills",
    fields: [
      {
        name: "goals.shortTermGoals",
        label: "",
        type: "textarea",
        placeholder: "",
        validation: {
          required: "This field is required",
          minLength: {
            value: 10,
            message: "Please provide more details (at least 10 characters)",
          },
        },
      },
    ],
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description:
      "I certify that all information given herein on this application are true and complete. By submitting this application, I authorize any investigation that the statements made. I understand that if any false information, omissions or misrepresentations are discovered, my registration may not be accepted and if I am employed, my employment may be terminated at any time. I also note that the Government of Barbados will treat my information as Confidential",
    fields: [
      {
        name: "confirmation.agree",
        label: "All information is correct and true",
        type: "checkbox",
        validation: {
          required: "You must agree before submitting",
        },
      },
      {
        name: "confirmation.date",
        label: "Date",
        type: "date",
        validation: {
          required: "Date is required",
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
