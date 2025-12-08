import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "eligibility",
    title: "Eligibility",
    fields: [
      {
        name: "eligibility.age",
        label: "Age",
        type: "number",
        placeholder: "Enter your age",
        validation: {
          required: "Number of years is required",
        },
      },
    ],
  },
  {
    id: "applicant-details",
    title: "Applicant Details",
    fields: [
      {
        name: "name.firstName",
        label: "First Name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },
      {
        name: "name.middleName",
        label: "Middle Name",
        type: "text",
        validation: {},
      },
      {
        name: "name.lastName",
        label: "Last Name",
        type: "text",
        validation: {
          required: "Last name is required",
        },
      },
      {
        name: "name.gender",
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
        name: "personal.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        validation: {
          required: "Date of birth is required",
        },
      },
      {
        name: "personal.benNumber",
        label: "BEN Number",
        type: "text",
        validation: {},
      },
      {
        name: "personal.nisNumber",
        label: "NIS Number",
        type: "text",
        validation: {},
      },
      {
        name: "personal.maritalStatus",
        label: "Marital Status",
        type: "text",
        validation: {},
      },
      {
        name: "contact.landline",
        label: "Landline",
        type: "tel",
        validation: {},
      },
      {
        name: "contact.cellular",
        label: "Cellular",
        type: "tel",
        validation: {
          required: "Cellular number is required",
        },
      },
      {
        name: "contact.email",
        label: "Email",
        type: "text",
        validation: {
          required: "Email address is required",
          pattern: {
            value: ".+@.+\\..+",
            message: "Enter a valid email address",
          },
        },
      },
      {
        name: "address.addressLine1",
        label: "Address Line 1",
        type: "text",
        validation: {
          required: "Address line 1 is required",
        },
      },
      {
        name: "address.addressLine2",
        label: "Address Line 2",
        type: "text",
        validation: {},
      },
      {
        name: "address.parish",
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
    id: "criteria-and-entitlement",
    title: "Criteria and Entitlement",
    fields: [
      {
        name: "eligibility.areasOfInterest",
        label: "Areas of Interest",
        type: "text",
        placeholder: "Enter your areas of interest",
        validation: {},
      },
      {
        name: "eligibility.willingToWorkAtNight",
        label: "Willing to Work at Night",
        type: "text",
        placeholder: "Yes or No",
        validation: {},
      },
      {
        name: "education.primarySchool",
        label: "Primary School (Name/Years)",
        type: "text",
        validation: {},
      },
      {
        name: "education.secondarySchool",
        label: "Secondary School (Name/Years)",
        type: "text",
        validation: {},
      },
      {
        name: "education.subjectsStudied",
        label: "Subjects Studied",
        type: "text",
        validation: {},
      },
      {
        name: "employment.employerName",
        label: "Employer Name",
        type: "text",
        validation: {},
      },
      {
        name: "employment.position",
        label: "Position",
        type: "text",
        validation: {},
      },
      {
        name: "employment.responsibilities",
        label: "Responsibilities",
        type: "text",
        validation: {},
      },
      {
        name: "employment.duration",
        label: "Duration",
        type: "text",
        validation: {},
      },
      {
        name: "disability.isDisabled",
        label: "Are You Disabled?",
        type: "text",
        placeholder: "Yes or No",
        validation: {},
      },
      {
        name: "disability.type",
        label: "Disability Type",
        type: "text",
        validation: {},
        conditionalOn: {
          field: "disability.isDisabled",
          value: "Yes",
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
