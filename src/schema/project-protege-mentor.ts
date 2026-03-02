import {
  barbadosParishes,
  NAME_REGEX,
  PHONE_REGEX,
  POSTCODE_REGEX,
} from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "applicant",
    title: "Tell us about yourself",
    description: "",
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
          pattern: {
            value: NAME_REGEX,
            message:
              "First name must contain only letters, hyphens, or apostrophes",
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
            message: "Last name must be at least 2  characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "applicant.dateOfBirth",
        label: "Date of birth",
        type: "date",
        placeholder: "For example, 27 03 2007",
        validation: {
          required: "Date of birth is required",
        },
      },
      {
        name: "applicant.employmentStatus",
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
        name: "applicant.institutionName",
        label: "Name of institution",
        type: "text",
        validation: {
          required: "Institution name is required",
          minLength: {
            value: 2,
            message: "Institution name must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "applicant.employmentStatus",
          value: "studying",
        },
      },
      {
        name: "applicant.employerName",
        label: "Name of company or organisation",
        type: "text",
        validation: {
          required: "Company or organisation name is required",
          minLength: {
            value: 2,
            message:
              "Company or organisation name must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "applicant.employmentStatus",
          value: "employed",
        },
      },
      {
        name: "applicant.otherEmploymentDetails",
        label: "Please give details",
        type: "text",
        validation: {
          required: "Employment details are required",
          minLength: {
            value: 2,
            message: "Details must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "applicant.employmentStatus",
          value: "other",
        },
      },
    ],
  },

  {
    id: "contact",
    title: "Contact details",
    description: "Your contact information",
    fields: [
      {
        name: "contact.addressLine1",
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
        name: "contact.addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
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
        name: "contact.postcode",
        label: "Postcode",
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "short",
        validation: {
          pattern: {
            value: POSTCODE_REGEX,
            message: "Enter a valid postcode (for example, BB17004)",
          },
        },
      },
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
            value: PHONE_REGEX,
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
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
        name: "mentorship.whyMentor",
        label: "Why do you want to be a mentor?",
        type: "textarea",
        rows: 5,
        validation: {
          required: "Tell us why you want to be a mentor",
          minLength: {
            value: 5,
            message:
              "Why you want to be a mentor must be at least 5 characters",
          },
        },
      },
      {
        name: "mentorship.strengths",
        label: "What are your strengths?",
        type: "textarea",
        hint: "What qualities, knowledge or skills do you have that would make you a good mentor?",
        rows: 5,
        validation: {
          required: "Tell us about your strengths",
          minLength: {
            value: 5,
            message:
              "Your qualities, knowledge or skills must be at least 5 characters",
          },
        },
      },
      {
        name: "mentorship.menteeLearn",
        label: "What do you think a mentee could learn from you?",
        type: "textarea",
        hint: "You may use an experience you've had or a challenge you've overcome that shows an admirable quality",
        rows: 5,
        validation: {
          required: "Tell us what a mentee could learn from you",
          minLength: {
            value: 5,
            message:
              "What you think a mentee could learn from you must be at least 5 characters",
          },
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
        name: "preferences.menteeGenderPreference",
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
        name: "preferences.sharePhoneNumber",
        label:
          "Would you agree to share your personal number with your mentee?",
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
        name: "preferences.menteePhoneNumber",
        label: "What is your phone number?",
        type: "tel",
        validation: {
          required: "Enter your phone number",
          pattern: {
            value: PHONE_REGEX,
            message:
              "Please enter a valid phone number (for example, 246 234 5678 or 1 246 234 5678)",
          },
        },
        conditionalOn: {
          field: "preferences.sharePhoneNumber",
          value: "yes",
        },
      },
      {
        name: "preferences.hasMenteeInMind",
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
        name: "preferences.menteeInMindName",
        label: "What is their name?",
        type: "text",
        validation: {
          required: "Enter the name of the person you have in mind",
        },
        conditionalOn: {
          field: "preferences.hasMenteeInMind",
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
        name: "experience.hasMentorExperience",
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
        name: "experience.yearsOfExperience",
        label: "How many years of experience?",
        type: "number",
        validation: {
          required: "Enter your years of experience",
        },
        conditionalOn: {
          field: "experience.hasMentorExperience",
          value: "yes",
        },
      },
    ],
  },

  {
    id: "professionalReferee",
    title: "Tell us about your professional referee",
    description:
      "This can be someone in a supervisory role who you've worked with. Or, if you have not been part of a workforce yet, this can be a teacher or lecturer.",
    fields: [
      {
        name: "professionalReferee.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "First name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "professionalReferee.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2  characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "professionalReferee.relationship",
        label: "Relationship",
        type: "text",
        validation: {
          required: "Enter your relationship to the referee",
        },
      },
      {
        name: "professionalReferee.email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Enter the referee's email address",
        },
      },
      {
        name: "professionalReferee.phone",
        label: "Phone number",
        type: "tel",
        validation: {
          required: "Enter the referee's phone number",
          pattern: {
            value: PHONE_REGEX,
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
          },
        },
      },
    ],
  },

  {
    id: "personalReferee",
    title: "Tell us about your personal referee",
    description:
      "This can be someone who can speak about your character. For example, a community leader or mentor.",
    fields: [
      {
        name: "personalReferee.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "First name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "personalReferee.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2  characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "personalReferee.relationship",
        label: "Relationship",
        type: "text",
        validation: {
          required: "Enter your relationship to the referee",
        },
      },
      {
        name: "personalReferee.email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Enter the referee's email address",
        },
      },
      {
        name: "personalReferee.phone",
        label: "Phone number",
        type: "tel",
        validation: {
          required: "Enter the referee's phone number",
          pattern: {
            value: PHONE_REGEX,
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
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
    title: "Thank you for your application",
    description:
      "Your information has been sent to the Youth Development Programme, the coordinating programme in the Division of Youth Affairs",
    fields: [],
    bodyContent: `## What happens next

If you are shortlisted, you will be contacted by phone or email and invited for an interview.`,
    enableFeedback: true,
  },
];
