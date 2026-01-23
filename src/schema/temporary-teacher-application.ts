import { barbadosParishes, countries } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "applicant",
    title: "Tell us about yourself",
    description: "",
    fields: [
      {
        name: "applicant.firstName",
        type: "text",
        label: "First name",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "First name must be at least 50 characters",
          },
        },
      },
      {
        name: "applicant.middleName",
        type: "text",
        label: "Middle name(s)",
        hint: "If you have more than one, add them in order",
        validation: {
          minLength: {
            value: 2,
            message: "Middle name(s) must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Middle name(s) must be at most 50 characters",
          },
          required: false,
        },
      },
      {
        name: "applicant.lastName",
        type: "text",
        label: "Last name",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Last name must be at least 50 characters",
          },
        },
      },
      {
        name: "applicant.dateOfBirth",
        type: "date",
        label: "Date of birth",
        placeholder: "For example, 30 12 1986",
        validation: {
          required: "Date of birth is required",
          pattern: {
            value: "^\\d{4}-\\d{2}-\\d{2}$",
            message: "Date must be in YYYY-MM-DD format",
          },
        },
      },
      {
        name: "applicant.placeOfBirth",
        type: "text",
        label: "Place of birth",
        validation: {
          required: "Place of birth is required",
        },
      },
      {
        name: "applicant.nationality",
        label: "Nationality",
        type: "select",
        width: "medium",
        validation: {
          required: "Nationality is required",
        },
        options: countries,
      },
      {
        name: "applicant.sex",
        type: "radio",
        label: "Sex",
        options: [
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
        ],
        validation: {
          required: "Sex is required",
          pattern: {
            value: "^(male|female)$",
            message: "Please choose male or female.",
          },
        },
      },
      {
        name: "applicant.maritalStatus",
        type: "select",
        label: "Marital status",
        width: "short",
        options: [
          {
            label: "Single",
            value: "single",
          },
          {
            label: "Married",
            value: "married",
          },
          {
            label: "Divorced",
            value: "divorced",
          },
        ],
        validation: {
          required: "Marital status is required",
          pattern: {
            value: "^(single|married|divorced)$",
            message: "Must select single, married, or divorced.",
          },
        },
      },
      {
        name: "applicant.nationalIdNumber",
        label: "National Identification (ID) number",
        type: "text",
        width: "medium",
        // placeholder: "for example, 850101-0001",
        validation: {
          required: "ID number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (for example, 850101-0001)",
          },
        },
        // Note: ID Number validation is skipped when ShowHide is open (handled in step validation)
        skipValidationWhenShowHideOpen: "usePassportInstead",
      },
      {
        name: "passportDetails",
        label: "",
        type: "showHide",
        validation: { required: false },
        showHide: {
          summary: "Use passport number instead",
          stateFieldName: "usePassportInstead",
          description:
            "If you don't have a National ID number, you can use your passport number instead.",
          fields: [
            {
              name: "passportNumber",
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
        name: "applicant.nationalInsuranceNumber",
        type: "text",
        label: "National Insurance number (NIS)",
        validation: { required: false },
      },
    ],
  },
  {
    id: "barbadosResidencyDuration",
    title: "How long have you lived in barbados?",
    description: "For example: 2 weeks, 4 months, 1 year",
    fields: [
      {
        name: "barbadosResidencyDuration.residencyDuration",
        label: "",
        hint: "",
        type: "text",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Content must be at least 2 characters",
          },
          maxLength: {
            value: 20,
            message: "Content should be no more than 20 characters",
          },
        },
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Details",
    description: "",
    fields: [
      {
        name: "contact.addressLine1",
        type: "text",
        label: "Address line 1",
        validation: {
          required: "Address is required",
        },
      },
      {
        name: "contact.addressLine2",
        type: "text",
        label: "Address line 2",
        validation: {
          required: false,
        },
      },
      {
        name: "contact.country",
        type: "select",
        label: "Country",
        width: "short",
        validation: {
          required: "Country is required",
        },
        options: [
          {
            label: "Barbados",
            value: "barbados",
          },
        ],
      },
      {
        name: "contact.parish",
        type: "select",
        label: "Parish",
        width: "short",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contact.postcode",
        type: "text",
        label: "Postcode",
        width: "short",
        validation: {
          required: false,
          pattern: {
            value: "BB\\d{5}",
            message: "Enter a valid postal code (for example, BB17004)",
          },
        },
      },
      {
        name: "contact.emailAddress",
        type: "email",
        label: "Email address",
        validation: { required: "Email address is required" },
      },
      {
        name: "contact.telephoneNumber",
        type: "text",
        label: "Telephone number",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value:
              "^(1[-]246[-]\\d{3}[-]\\d{4}|1[\\s]246[\\s]\\d{3}[\\s]\\d{4}|1246\\d{7})$",
            message:
              "Please enter a valid phone number (for example 12462345678, 1-246-234-5678, or 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "applicantEducation",
    title: "Tell us about your education",
    description: "",
    repeatable: {
      arrayFieldName: "applicantEducation",
      maxItems: 5,
      addAnotherLabel: "Do you need to add another education experience?",
    },
    fields: [
      {
        name: "nameOfInstitution",
        type: "text",
        label: "Name of institution",
        validation: { required: "Name of institution is required" },
        width: "medium",
      },
      {
        name: "country",
        type: "select",
        label: "Country",
        width: "medium",
        options: countries,
        validation: { required: false },
      },
      {
        name: "startYear",
        label: "Start year",
        type: "text",
        width: "short",
        validation: {
          required: "Start year is required",
          min: {
            value: 1930,
            message: "Start Year must be at least 1930",
          },
          pattern: {
            value: "^[0-9]{4}$",
            message: "Please enter a valid year",
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
          pattern: {
            value: "^[0-9]{4}$",
            message: "Please enter a valid year",
          },
        },
      },
    ],
  },
  {
    id: "applicantQualification",
    title: "Tell us about your qualification",
    description: "",
    repeatable: {
      arrayFieldName: "qualifications",
      maxItems: 10,
      addAnotherLabel: "Do you want to add another qualification?",
    },
    fields: [
      {
        name: "subject",
        label: "Subject",
        type: "text",
        validation: { required: "Subject is required" },
        width: "medium",
      },
      {
        name: "examiningBody",
        label: "Examining body",
        type: "text",
        validation: { required: "Examining body is required" },
        width: "medium",
      },
      {
        name: "year",
        label: "Year",
        type: "text",
        width: "short",
        validation: {
          required: "Year is required",
          min: {
            value: 1930,
            message: "Year may not be before 1930",
          },
          pattern: {
            value: "^[0-9]{4}$",
            message: "Please enter a valid year",
          },
        },
      },
      {
        name: "levelGrade",
        label: "Level/Grade",
        type: "text",
        validation: { required: "Level/Grade is required" },
      },
    ],
  },
  {
    id: "applicantWorkExperience",
    title: "Tell us about your work experience",
    description: "",
    repeatable: {
      arrayFieldName: "workExperiences",
      maxItems: 5,
      addAnotherLabel: "Do you want to add another experience?",
    },
    fields: [
      {
        name: "employerName",
        label: "Name of employer or organization",
        type: "text",
        validation: { required: "This field is required" },
        width: "medium",
      },
      {
        name: "positionHeld",
        label: "Position held",
        type: "text",
        validation: { required: "This field is required" },
        width: "medium",
      },
      {
        name: "fromYear",
        label: "From (year)",
        type: "text",
        validation: {
          required: "This field is required",
          min: {
            value: 1930,
            message: "From (year) must be at least 1930",
          },
          pattern: {
            value: "^[0-9]{4}$",
            message: "Please enter a valid year",
          },
        },
        width: "short",
      },
      {
        name: "toYear",
        label: "To (year)",
        type: "text",
        validation: {
          required: false,
          min: {
            value: 1930,
            message: "To (year) must be at least 1930",
          },
          pattern: {
            value: "^[0-9]{4}$",
            message: "Please enter a valid year",
          },
        },
        width: "short",
      },
      {
        name: "currentlyWorking",
        label: "I am currently working here",
        type: "checkbox",
        validation: {
          required: false,
        },
      },
      {
        name: "tasks",
        label: "Your main tasks",
        hint: "Provide a brief description of what you did in your role",
        validation: { required: "Your main tasks is required" },
        type: "textarea",
        width: "medium",
      },
    ],
  },
  {
    id: "skillsAndExperience",
    title: "Tell us about your skills and experience",
    fields: [
      {
        name: "skillsAndExperience.athleticsGamesCraftSkills",
        label: "Athletics, games, or craft skills",
        type: "textarea",
        validation: { required: false },
        width: "medium",
      },
      {
        name: "skillsAndExperience.youthCommunityVolunteerGroups",
        label: "Experience in youth, community, or volunteer groups",
        type: "textarea",
        validation: { required: false },
        width: "medium",
      },
      {
        name: "skillsAndExperience.responsibilityPositions",
        label: "Positions of responsibility held",
        type: "textarea",
        validation: { required: false },
        width: "medium",
      },
      {
        name: "skillsAndExperience.extraDetails",
        label: "Anything else relevant to your application?",
        type: "textarea",
        validation: { required: false },
        width: "medium",
      },
    ],
  },
  {
    id: "reference",
    title: "Tell us about your reference",
    description: "",
    repeatable: {
      arrayFieldName: "references",
      maxItems: 2,
      addAnotherLabel: "Add another reference?",
    },
    fields: [
      {
        name: "title",
        label: "Title",
        type: "select",
        options: [
          {
            label: "Mr",
            value: "mr",
          },
          {
            label: "Mrs",
            value: "mrs",
          },
          {
            label: "Miss",
            value: "miss",
          },
        ],
        validation: { required: "Title is required" },
        width: "short",
      },
      {
        name: "firstName",
        type: "text",
        label: "First name",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "First name must be at least 50 characters",
          },
        },
      },
      {
        name: "lastName",
        type: "text",
        label: "Last name",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Last name must be at least 50 characters",
          },
        },
      },
      {
        name: "addressLine1",
        type: "text",
        label: "Address line 1",
        validation: { required: "Address line 1 is required" },
      },
      {
        name: "addressLine2",
        type: "text",
        label: "Address line 2",
        validation: { required: false },
      },
      {
        name: "country",
        type: "select",
        label: "Country",
        validation: { required: "Country is required" },
        options: [
          {
            label: "Barbados",
            value: "barbados",
          },
        ],
        width: "medium",
      },
      {
        name: "parish",
        type: "select",
        label: "Parish",
        validation: { required: "Parish is required" },
        options: barbadosParishes,
        width: "medium",
      },
      {
        name: "postcode",
        type: "text",
        label: "Postcode",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (for example, BB17004)",
          },
        },
        width: "medium",
      },
      {
        name: "occupation",
        label: "Occupation",
        validation: { required: "Occupation is required" },
        type: "text",
      },
      {
        name: "emailAddress",
        type: "email",
        label: "Email address",
        validation: { required: "Email address is required" },
      },
      {
        name: "telephoneNumber",
        type: "text",
        label: "Telephone number",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value:
              "^(1[-]246[-]\\d{3}[-]\\d{4}|1[\\s]246[\\s]\\d{3}[\\s]\\d{4}|1246\\d{7})$",
            message:
              "Please enter a valid phone number (for example 12462345678, 1-246-234-5678, or 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "documents",
    title: "Upload your documents",
    description: "",
    fields: [
      {
        name: "documents.certificateDiplomaTranscript",
        label: "Upload your certificates, diplomas, and transcripts",
        // validation: { required: "Upload your certificates, diplomas, and transcripts is required" },
        validation: { required: false },
        type: "file",
      },
      {
        name: "documents.testimonials",
        label: "Upload your two testimonials",
        validation: { required: false },
        // validation: { required: "Upload your two testimonials is required" },
        type: "file",
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
    fields: [
      {
        name: "declaration.confirmed",
        label:
          "I confirm that my information is correct and I am happy for it to be verified. I understand that false details may lead to my application being rejected, and that the Government of Barbados will keep my information confidential.",
        type: "checkbox",
        validation: {
          required: "You must confirm the declaration to continue",
        },
      },
      {
        name: "declaration.dateOfDeclaration",
        label: "Date of declaration",
        hidden: true,
        placeholder: "",
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
