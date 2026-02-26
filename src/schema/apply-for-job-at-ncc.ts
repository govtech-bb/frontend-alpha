import { barbadosParishes, countries } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "which-job-do-you-want-to-apply-for",
    title: "Which job do you want to apply for?",
    fields: [
      // TODO: Uncomment when we have a list of job positions
      // {
      //   name: "jobPosition",
      //   label: "Select the position you are applying for",
      //   type: "select",
      //   validation: {
      //     required: "Please select a job position",
      //   },
      //   options: [{ label: "", value: "" }],
      // },
      {
        name: "jobPosition",
        label: "Select the position you are applying for",
        type: "text",
        validation: {
          required: "Please select a job position",
        },
      },
    ],
  },
  {
    id: "tell-us-about-yourself",
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
        label: "Middle name(s)",
        hint: "If you have more than one, add them in order",
        type: "text",
        validation: {
          required: false,
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
        name: "applicant.sex",
        label: "Sex",
        type: "select",
        width: "short",
        validation: {
          required: "Sex is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        name: "applicant.maritalStatus",
        label: "Marital status",
        type: "select",
        width: "medium",
        validation: {
          required: "Marital status is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
          { label: "Widowed", value: "widowed" },
        ],
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) number",
        type: "text",
        width: "medium",
        validation: {
          required: "ID number is required",
          minLength: {
            value: 2,
            message: "ID number must be at least 2 characters",
          },
        },
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
              label: "Passport number",
              type: "text",
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
        name: "applicant.nisNumber",
        label: "National Insurance number (NIS)",
        type: "text",
        width: "medium",
        validation: {
          required: "NIS number is required",
          minLength: {
            value: 2,
            message: "NIS number must be at least 2 characters",
          },
        },
      },
      {
        name: "contactDetails.addressLine1",
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
        name: "contactDetails.addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "contactDetails.country",
        label: "Country",
        type: "select",
        width: "medium",
        validation: {
          required: "Country is required",
        },
        options: countries,
      },
      {
        name: "contactDetails.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contactDetails.postcode",
        label: "Postcode",
        type: "text",
        width: "medium",
        hint: "Optional (e.g. BB17004)",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
      {
        name: "contactDetails.email",
        label: "Email address",
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
    id: "tell-us-about-your-education-history",
    title: "Tell us about your education history",
    description: "Tell us which schools or institutions you attended",
    repeatable: {
      arrayFieldName: "educationHistory",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another school or institution?",
    },
    fields: [
      {
        name: "nameOfInstitution",
        label: "Name of institution",
        type: "text",
        width: "medium",
        validation: {
          required: "Name of institution is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        },
      },
      {
        name: "startYear",
        label: "Start year",
        type: "text",
        width: "short",
        validation: {
          required: "Start year is required",
          minLength: {
            value: 4,
            message: "Year must be 4 digits",
          },
          maxLength: {
            value: 4,
            message: "Year must be 4 digits",
          },
        },
      },
      {
        name: "endYear",
        label: "End year",
        type: "text",
        width: "short",
        validation: {
          required: "End year is required",
          minLength: {
            value: 4,
            message: "Year must be 4 digits",
          },
          maxLength: {
            value: 4,
            message: "Year must be 4 digits",
          },
        },
      },
      {
        name: "levelReached",
        label: "Level reached",
        hint: "For example, completed, partially completed, or highest level achieved",
        type: "text",
        validation: {
          required: "Level reached is required",
        },
      },
    ],
  },
  {
    id: "tell-us-about-your-qualifications",
    title: "Tell us about your qualifications",
    description:
      "A qualification would be a certification separate from your formal education. If you don't have any, you may skip to the next page.",
    repeatable: {
      arrayFieldName: "qualifications",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another qualification?",
    },
    fields: [
      {
        name: "qualification",
        label: "Qualification",
        type: "text",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Qualification must be at least 2 characters",
          },
        },
      },
      {
        name: "examiningBody",
        label: "Examining body",
        type: "text",
        validation: {
          required: false,
        },
      },
      {
        name: "year",
        label: "Year",
        type: "text",
        width: "short",
        validation: {
          required: false,
          minLength: {
            value: 4,
            message: "Year must be 4 digits",
          },
          maxLength: {
            value: 4,
            message: "Year must be 4 digits",
          },
        },
      },
      {
        name: "levelGrade",
        label: "Level/Grade",
        type: "text",
        width: "short",
        validation: {
          required: false,
        },
      },
    ],
  },
  {
    id: "tell-us-about-your-work-experience",
    title: "Tell us about your work experience",
    repeatable: {
      arrayFieldName: "workExperience",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another job?",
    },
    fields: [
      {
        name: "employerName",
        label: "Name of employer or organization",
        type: "text",
        width: "medium",
        validation: {
          required: "Employer name is required",
          minLength: {
            value: 2,
            message: "Employer name must be at least 2 characters",
          },
        },
      },
      {
        name: "jobTitle",
        label: "Job title",
        type: "text",
        width: "medium",
        validation: {
          required: "Job title is required",
          minLength: {
            value: 2,
            message: "Job title must be at least 2 characters",
          },
        },
      },
      {
        name: "startDate",
        label: "Start date",
        placeholder: "For example, 01 15 2020",
        type: "date",
        validation: {
          required: "Start date is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "endDate",
        label: "End date",
        placeholder: "For example, 31 12 2023",
        type: "date",
        validation: {
          required: false,
          date: {
            type: "pastOrToday",
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
    ],
  },
  {
    id: "tell-us-about-your-references",
    title: "Tell us about your references",
    description:
      "You will need to share the details of 2 referees who we can contact for a reference. One of them must know you in a professional capacity, the other should know you on a personal level.",
    repeatable: {
      arrayFieldName: "references",
      maxItems: 2,
      addAnotherLabel: "Add your second reference",
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
        name: "country",
        label: "Country",
        type: "select",
        width: "medium",
        validation: {
          required: "Country is required",
        },
        options: countries,
      },
      {
        name: "parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "postcode",
        label: "Postcode",
        type: "text",
        width: "medium",
        hint: "Optional",
        validation: { required: false },
      },
      {
        name: "occupation",
        label: "Occupation",
        type: "text",
        validation: {
          required: "Occupation is required",
        },
      },
      {
        name: "howLongKnown",
        label: "How long have they known you?",
        type: "text",
        validation: {
          required: "This field is required",
        },
      },
    ],
  },
  {
    id: "upload-your-testimonials",
    title: "Upload your testimonials",
    description:
      "Upload copies of testimonials you want to include in your application",
    fields: [
      {
        name: "documents.testimonials",
        label: "Upload testimonials",
        hint: "You can upload multiple files. Accepted formats: PDF, DOC, DOCX, JPG, PNG",
        type: "file",
        accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
        multiple: true,
        validation: {
          required: false,
        },
      },
    ],
  },
  {
    id: "any-other-information",
    title: "Any other information you want to share",
    fields: [
      {
        name: "additionalInfo",
        label: "Additional information",
        hint: "Use this space to share any other relevant information about yourself",
        type: "textarea",
        rows: 6,
        validation: {
          required: false,
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
      "I confirm that the information provided in this application is true and complete to the best of my knowledge. I understand that false information may result in rejection of my application or termination of employment if hired.",
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
        placeholder: "For example, 01 15 2026",
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
    title: "Your application has been submitted.",
    description: "",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content:
          "The National Conservation Commission will review your application and contact you if they need more information.",
      },
    ],
    enableFeedback: true,
  },
];
