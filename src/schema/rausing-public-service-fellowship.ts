import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "applicant-details",
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
        label: "Middle name",
        hint: "If you have more than one, add them in order",
        type: "text",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Middle name must be at least 2 characters",
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
          { label: "", value: "" },
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
        ],
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) number",
        type: "text",
        width: "medium",
        // placeholder: "e.g., 850101-0001",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (e.g., 850101-0001)",
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
              label: "Passport number",
              type: "text",
              placeholder: "",
              validation: {
                required: "Passport number is required",
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
        label: "National insurance number (NIS)?",
        width: "medium",
        type: "text",
        placeholder: "",
        validation: {
          required: "NIS Number is required",
          minLength: {
            value: 2,
            message: "NIS Number must be at least 2 characters",
          },
        },
      },
      {
        name: "applicant.addressLine1",
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
        name: "applicant.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "applicant.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "applicant.postCode",
        label: "Postcode",
        hint: "Optional",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
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
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "employment",
    title: "Your employment details",
    fields: [
      {
        name: "employment.employerName",
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
        name: "employment.occupation",
        label: "Occupation",
        hint: "Job title",
        type: "text",
        width: "medium",
        validation: {
          required: "Occupation is required",
          minLength: {
            value: 2,
            message: "Occupation must be at least 2 characters",
          },
        },
      },
      {
        name: "employment.yearsOfEmployment",
        label: "Years of employment",
        hint: "Type a number or use the controls to count",
        type: "number",
        width: "short",
        validation: {
          required: "Years of employment is required",
        },
      },
    ],
  },
  {
    id: "emergency-contact",
    title: "Emergency contact details",
    description: "In case of an emergency, who should we contact?",
    fields: [
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
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g. 1 246 234 5678)",
          },
        },
      },
      {
        name: "emergency.isAddressTheSame",
        label: "Address is the same as my address provided",
        type: "checkbox",
        validation: {
          required: false,
        },
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
        name: "emergency.postCode",
        label: "Postcode",
        hint: "Optional",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
    ],
  },
  {
    id: "proposed-study",
    title: "Your proposed programme of study",
    description: "",
    fields: [
      {
        name: "study.programmeName",
        label: "The programme you plan to study",
        hint: "Include the name of the programme, the institution, and the country where you plan to study.",
        type: "text",
        validation: {
          required: "Programme name is required",
          minLength: {
            value: 2,
            message: "Programme name must be at least 2 characters",
          },
        },
      },
      {
        name: "study.reasonForApplying",
        label: "Why do you want to attend this programme",
        hint: "Why do you want to attend this programme",
        type: "text",
        validation: {
          required: "Why you want to attend is required",
          minLength: {
            value: 2,
            message: "Why you want to attend must be at least 2 characters",
          },
        },
      },
      {
        name: "study.benefitForNationalDevelopment",
        label: "How this programme will benefit national development",
        hint: "This statement must be no more than 300 words",
        type: "text",
        validation: {
          required: "Benefit for national development is required",
          minLength: {
            value: 2,
            message:
              "Benefit for national development must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "education-qualifications",
    title: "Tell us about your educational qualification",
    repeatable: {
      arrayFieldName: "educationQualifications",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another educational qualification?",
    },
    fields: [
      {
        name: "institutionName",
        label: "Name of institution",
        type: "text",
        width: "medium",
        validation: {
          required: "Name of institution is required",
          minLength: {
            value: 2,
            message: "Name of institution must be at least 2 characters",
          },
        },
      },
      {
        name: "institutionLocation",
        label: "Location of institution",
        type: "text",
        width: "medium",
        validation: {
          required: "Location of institution is required",
          minLength: {
            value: 2,
            message: "Location of institution must be at least 2 characters",
          },
        },
      },
      {
        name: "awardEarned",
        label: "Award earned",
        type: "text",
        width: "medium",
        validation: {
          required: "Award earned is required",
          minLength: {
            value: 2,
            message: "Award earned must be at least 2 characters",
          },
        },
      },
      {
        name: "areaOfStudy",
        label: "Area of study",
        type: "text",
        width: "medium",
        validation: {
          required: "Area of study is required",
          minLength: {
            value: 2,
            message: "Area of study must be at least 2 characters",
          },
        },
      },
      {
        name: "yearAwarded",
        label: "Year awarded",
        type: "text",
        width: "medium",
        validation: {
          required: "Year awarded is required",
          minLength: {
            value: 2,
            message: "Year awarded must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "professional-qualifications",
    title: "Tell us about your professional qualification",
    repeatable: {
      arrayFieldName: "professionalQualifications",
      maxItems: 10,
      addAnotherLabel: "Do you need to add another professional qualification?",
    },
    fields: [
      {
        name: "institutionName",
        label: "Name of institution",
        type: "text",
        width: "medium",
        validation: {
          required: "Name of institution is required",
          minLength: {
            value: 2,
            message: "Name of institution must be at least 2 characters",
          },
        },
      },
      {
        name: "institutionLocation",
        label: "Location of institution",
        type: "text",
        width: "medium",
        validation: {
          required: "Location of institution is required",
          minLength: {
            value: 2,
            message: "Location of institution must be at least 2 characters",
          },
        },
      },
      {
        name: "awardEarned",
        label: "Award earned",
        type: "text",
        width: "medium",
        validation: {
          required: "Award earned is required",
          minLength: {
            value: 2,
            message: "Award earned must be at least 2 characters",
          },
        },
      },
      {
        name: "areaOfStudy",
        label: "Area of study",
        type: "text",
        width: "medium",
        validation: {
          required: "Area of study is required",
          minLength: {
            value: 2,
            message: "Area of study must be at least 2 characters",
          },
        },
      },
      {
        name: "yearAwarded",
        label: "Year awarded",
        type: "text",
        width: "medium",
        validation: {
          required: "Year awarded is required",
          minLength: {
            value: 2,
            message: "Year awarded must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "upload-document",
    title: "Upload your documents",
    description: "",
    fields: [
      {
        type: "file",
        name: "uploadDocument",
        label: "Upload your degrees/diplomas",
        hint: "Attach a .pdf, .docx or .png file",
        validation: {
          required: "Please upload document(s)",
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
    title: "Your submission has been saved",
    description: "Complete your payment below to finalize your submission",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "You will receive a confirmation email with:",
        items: [
          "Your application reference number",
          "the cost of the certificate(s)",
          "the expected completion date",
        ],
      },
    ],
    enableFeedback: true,
  },
];
