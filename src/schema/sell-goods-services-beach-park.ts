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
        width: "short",
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
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name",
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
        name: "applicant.idNumber",
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
        name: "applicant.email",
        label: "Email Address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "applicant.telephoneNumber",
        label: "Telephone Number",
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
        name: "applicant.postalCode",
        label: "Postal Code",
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
    id: "goods-or-services",
    title: "Would you like to sell goods or services?",
    description:
      "For example, goods are physical items such as food or memorabilia. Services are experiences like massages or horse rides.",
    fields: [
      {
        name: "selling.goodsOrServices",
        label: "Selling goods or services",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Goods", value: "goods" },
          { label: "Services", value: "services" },
        ],
      },
      {
        name: "selling.manufacturingLocation",
        label: "Where are the goods made?",
        hint: "Select a country",
        type: "text",
        validation: {
          required: "Location is required",
          minLength: {
            value: 2,
            message: "Location must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "selling.goodsOrServices",
          value: "goods",
        },
      },
    ],
  },
  {
    id: "business-details",
    title: "Tell us about your goods or services",
    fields: [
      {
        name: "business.descriptionOfGoodsOrServices",
        label: "Describe the goods or services you would like to sell",
        hint: "For example, fresh, locally-sourced fruit or 20-minute jet ski rides",
        type: "text",
        validation: {
          required: "Location is required",
          minLength: {
            value: 2,
            message: "Location must be at least 2 characters",
          },
        },
      },
      {
        name: "business.intendedPlaceOfDoingBusiness",
        label: "Where do you intend to sell your goods or services?",
        hint: "For example, in front of Copacabana Beach Club in Carlisle Bay",
        type: "text",
        validation: {
          required: "Place of doing business is required",
          minLength: {
            value: 2,
            message: "Place of doing business must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "professional-referee",
    title: "Tell us about your professional referee",
    description:
      "This can be someone more senior who you've worked with, or a teacher or lecturer.",
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
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "professionalReferee.relationship",
        label: "Relationship",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Parent", value: "parent" },
          { label: "Spouse", value: "spouse" },
          { label: "Child", value: "child" },
          { label: "Sibling", value: "sibling" },
          { label: "Grandparent", value: "grandparent" },
          { label: "Legal guardian", value: "legal-guardian" },
          { label: "Legal representative", value: "legal-representative" },
          { label: "Other (please describe)", value: "other" },
        ],
      },
      {
        name: "professionalReferee.email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "professionalReferee.telephoneNumber",
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
      {
        name: "professionalReferee.addressLine1",
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
        name: "professionalReferee.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "professionalReferee.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "professionalReferee.postcode",
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
    id: "personal-referee",
    title: "Tell us about your personal referee",
    description:
      "This can be someone who can speak about your character. For example, a community leader or mentor",
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
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "personalReferee.relationship",
        label: "Relationship",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Parent", value: "parent" },
          { label: "Spouse", value: "spouse" },
          { label: "Child", value: "child" },
          { label: "Sibling", value: "sibling" },
          { label: "Grandparent", value: "grandparent" },
          { label: "Legal guardian", value: "legal-guardian" },
          { label: "Legal representative", value: "legal-representative" },
          { label: "Other (please describe)", value: "other" },
        ],
      },
      {
        name: "personalReferee.email",
        label: "Email address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "personalReferee.telephoneNumber",
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
      {
        name: "personalReferee.addressLine1",
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
        name: "personalReferee.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "personalReferee.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "personalReferee.postcode",
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
    description: "",
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
