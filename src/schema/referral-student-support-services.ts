import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "student",
    title: "Tell us about the student",
    fields: [
      {
        name: "student.firstName",
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
        name: "student.middleName",
        label: "Middle name",
        hint: "Optional. Provide only if known",
        type: "text",
        validation: { required: false },
      },
      {
        name: "student.lastName",
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
        name: "student.dateOfBirth",
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
        name: "student.sex",
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
        name: "student.idNumber",
        label: "National Identification (ID) Number",
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
        skipValidationWhenShowHideOpen: "student.usePassportInstead",
      },
      {
        name: "student.passportDetails",
        label: "",
        type: "showHide",
        validation: { required: false },
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "student.usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "student.passportNumber",
              label: "Passport Number",
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
        name: "student.addressLine1",
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
        name: "student.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "student.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "student.postcode",
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
    id: "guardian-details",
    title: "Who is the child's legal guardian?",
    description: "Select all that apply",
    fields: [
      {
        name: "whoIsChildLegalGuardian",
        label: "Who is the child's legal guardian?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Mother", value: "mother" },
          { label: "Father", value: "father" },
          { label: "Guardian", value: "guardian" },
        ],
      },
    ],
  },
  {
    id: "mother-details",
    title: "Tell us about the child's mother",
    conditionalOn: {
      field: "whoIsChildLegalGuardian",
      value: "mother",
    },
    fields: [
      {
        name: "mother.firstName",
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
        name: "mother.lastName",
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
        name: "mother.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
      {
        name: "mother.addressLine1",
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
        name: "mother.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "mother.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "mother.postcode",
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
    id: "father-details",
    title: "Tell us about the child's father",
    conditionalOn: {
      field: "whoIsChildLegalGuardian",
      value: "father",
    },
    fields: [
      {
        name: "father.firstName",
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
        name: "father.lastName",
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
        name: "father.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
      {
        name: "father.addressLine1",
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
        name: "father.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },
      {
        name: "father.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "father.postcode",
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
    id: "guardian-details",
    title: "Tell us about the child's guardian",
    conditionalOn: {
      field: "whoIsChildLegalGuardian",
      value: "guardian",
    },
    fields: [
      {
        name: "guardian.firstName",
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
        name: "guardian.lastName",
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
        name: "guardian.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
      {
        name: "guardian.addressLine1",
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
        name: "guardian.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "guardian.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "guardian.postcode",
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
    id: "school-details",
    title: "School contact details",
    fields: [
      {
        name: "school.schoolName",
        label: "School name",
        type: "text",
        validation: {
          required: "School name is required",
          minLength: {
            value: 2,
            message: "School name must be at least 2 characters",
          },
        },
      },
      {
        name: "school.classOrForm",
        label: "Class or form",
        hint: "Enter the student’s current class or form at the time of referral, for example Class 3 or Form 1.",
        type: "text",
        validation: {
          required: "Class or form is required",
          minLength: {
            value: 2,
            message: "Class or form must be at least 2 characters",
          },
        },
      },
      {
        name: "school.emailAddress",
        label: "School email address",
        hint: "Enter a contact email for the school",
        type: "text",
        validation: {
          required: "Contact email is required",
          minLength: {
            value: 2,
            message: "Contact email must be at least 2 characters",
          },
        },
      },
      {
        name: "school.telephoneNumber",
        label: "School telephone number",
        hint: "Enter the main telephone number the Student Support Services Unit can use to contact the school",
        type: "text",
        validation: {
          required: "Telephone number is required",
          minLength: {
            value: 2,
            message: "Telephone number must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "student-challenges",
    title: "What challenges affect the student?",
    description: "Select all that apply",
    fields: [
      {
        name: "challenges.difficulties",
        label: "What challenges affect the student?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Hearing", value: "hearing" },
          { label: "Vision", value: "vision" },
          { label: "Physical", value: "physical" },
          { label: "Behavioural", value: "behavioural" },
          {
            label: "Social or emotional difficulties",
            value: "social-emotional",
          },
          {
            label: "Speech and language difficulties",
            value: "speech-language",
          },
          { label: "Learning difficulties", value: "learning" },
        ],
      },

      {
        name: "challenges.additionalChallenges",
        label: "Describe any additional challenges",
        hint: "Provide additional details or clarify any challenges selected above, or enter any other challenges not listed.",
        type: "textarea",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Additional challenges must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "student-attendance",
    title: "How often does the student attend school?",
    description:
      "Regular: student attends every day; Irregular: student misses some days; Non-attendance: student does not attend.",
    fields: [
      {
        name: "attendance",
        label: "How often does the student attend school?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Regular - student attends everyday", value: "regular" },
          {
            label: "Misses some days - student misses school occasionally",
            value: "misses-some-days",
          },
          {
            label: "Does not attend - student does not attend school",
            value: "does-not-attend",
          },
        ],
      },
    ],
  },
  {
    id: "other-services-used",
    title: "Which other support service does the student use?",
    description: "Select all that apply",
    fields: [
      {
        name: "otherServices.currentlyUsed",
        label: "Which other support service does the student use?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          {
            label: "Children's Development Centre",
            value: "children-development-centre",
          },
          {
            label: "Juvenile Liaison Scheme",
            value: "juvenile-liaison-scheme",
          },
          {
            label: "Child Guidance Clinic",
            value: "child-guidance-clinic",
          },
          {
            label: "Edna Nichols Centre",
            value: "edna-nichols-centre",
          },
          {
            label: "Government Industrial School",
            value: "government-industrial-school",
          },
          {
            label: "Probation Department",
            value: "probation-department",
          },
          {
            label: "Child Care Board",
            value: "child-care-board",
          },
          {
            label: "Private support services",
            value: "private-support-services",
          },
          {
            label: "Welfare Department",
            value: "welfare-department",
          },
        ],
      },

      {
        name: "otherServices.otherAgency",
        label: "Other agency",
        hint: "Enter any agency not listed above that is supporting the student, for example private support services or welfare programs. Do not repeat agencies already selected above.",
        type: "textarea",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Other agency must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "support-provided",
    title: "What support has the school already provided?",
    description:
      "Describe the support the school has already provided, including approaches, duration, and outcomes, to help the Student Support Services Unit understand the student’s needs",
    fields: [
      {
        name: "supportProvided",
        label: "What support has the school already provided?",
        hidden: true,
        type: "textarea",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "The support provided must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "consulted-parent-guardian",
    title: "Have you spoken to the parent or guardian?",
    description: "Has the parent or guardian been consulted?",
    fields: [
      {
        name: "consultation.hasHappened",
        label: "Has the parent or guardian been consulted?",
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
      {
        name: "consultation.dateOfConsultation",
        label: "Date of consultation",
        placeholder: "For example, 12 30 1986",
        type: "date",
        validation: {
          required: "Date of consultation is required",
          date: {
            type: "past",
          },
        },
        conditionalOn: {
          field: "consultation.hasHappened",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "referrer-details",
    title: "Who is referring the student?",
    description: "",
    fields: [
      {
        name: "referrer.fullName",
        label: "Name of the person making this referral",
        hint: "Should be the same as the person completing this form",
        type: "text",
        validation: {
          required: "Referrer name is required",
          minLength: {
            value: 2,
            message: "Referrer name must be at least 5 characters",
          },
        },
      },
      {
        name: "referrer.dateOfReferral",
        label: "Date of referral",
        placeholder: "For example, 12 30 1986",
        type: "date",
        validation: {
          required: "Date of referral is required",
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
