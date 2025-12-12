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
        hint: "Optional. Provide only if known",
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
        name: "applicant.addressLine1",
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
        name: "applicant.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: {},
      },

      {
        name: "applicant.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "applicant.postalCode",
        label: "Postal Code",
        type: "text",
        validation: {
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postal code (e.g., BB17004)",
          },
        },
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
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
    ],
  },
  {
    id: "applying-for-yourself",
    title: "Are you applying for your own birth certificate?",
    // description:
    //   "If you choose 'Yes', both parents must go to the Registration Department and sign the official register together",
    // conditionalOn: {
    //   field: "marriageStatus",
    //   value: "no",
    // },
    fields: [
      {
        name: "applyingForYourself",
        label: "",
        type: "radio",
        // hint: "If you choose 'No', the mother must go to the Registration Department but it is not necessary for the father to attend",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Yes - the certificate is for me", value: "yes" },
          { label: "No - the certificate is for someone else", value: "no" },
        ],
      },
    ],
  },
  {
    id: "birth-details",
    title: "Provide your birth details",
    description: "Answer as accurately as possible",
    // conditionalOn: {
    //   field: "marriageStatus",
    //   value: "no",
    // },
    fields: [
      {
        name: "birthDetails.dateOfBirth",
        label: "Date of birth",
        placeholder: "For example, December 30, 1986",
        type: "date",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "birthDetails.placeOfBirth",
        label: "Place of birth",
        type: "text",
        // hint: "If you choose 'No', the mother must go to the Registration Department but it is not necessary for the father to attend",
        validation: {
          required: "Select an option",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
        },
      },
      {
        name: "birthDetails.placeOfBaptism",
        label: "Place of baptism",
        type: "text",
        // hint: "If you choose 'No', the mother must go to the Registration Department but it is not necessary for the father to attend",
        validation: {
          required: "Select an option",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "parents",
    title: "Tell us your parents' names",
    fields: [
      {
        name: "parents.father.firstName",
        label: "Father's first name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },
      {
        name: "parents.father.lastName",
        label: "Father's last name",
        type: "text",
        validation: {
          required: "Last name is required",
        },
      },
      {
        name: "parents.mother.firstName",
        label: "Mother's first name",
        type: "text",
        validation: {
          required: "First name is required",
        },
      },
      {
        name: "parents.mother.lastName",
        label: "Mother's last name",
        type: "text",
        validation: {
          required: "Last name is required",
        },
      },
    ],
  },
  {
    id: "order-details",
    title: "How many copies will you be ordering?",
    description: "",
    fields: [
      {
        name: "order.numberOfCopies",
        label: "",
        type: "number",
        // placeholder: "For example, 2",
        validation: {
          required: "Number of copies is required",
          min: {
            value: 1,
            message: "You must order at least 1 copy",
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
  {
    id: "confirmation",
    title: "Your submission has been saved",
    description: "Complete your payment below to finalize your submission",
    fields: [],
    payment: {
      amount: 20.0,
      service: "Application Fee",
    },
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
  },
];
