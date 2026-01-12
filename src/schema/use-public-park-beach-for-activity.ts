import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "individual-or-business",
    title: "Is the applicant an individual or a business?",
    fields: [
      {
        name: "isIndividualOrBusiness",
        label: "Is the applicant an individual or a business?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Individual", value: "individual" },
          { label: "Business", value: "business" },
        ],
      },
    ],
  },
  {
    id: "applicant-details",
    title: "Tell us about yourself",
    conditionalOn: {
      field: "isIndividualOrBusiness",
      value: "individual",
    },
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
        name: "applicant.postcode",
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
        name: "applicant.mobilePhoneNumber",
        label: "Mobile number",
        type: "tel",
        validation: {
          required: "Mobile number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
      {
        name: "applicant.workPhoneNumber",
        label: "Work phone number",
        type: "tel",
        validation: {
          required: "Work phone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
      {
        name: "applicant.homePhoneNumber",
        label: "Home phone number",
        type: "tel",
        validation: {
          required: "Home phone number is required",
          pattern: {
            value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
            message: "Please enter a valid phone number (e.g., 1 246 234 5678)",
          },
        },
      },
    ],
  },
  {
    id: "business-details",
    title: "Tell us about the business",
    conditionalOn: {
      field: "isIndividualOrBusiness",
      value: "business",
    },
    fields: [
      {
        name: "business.businessName",
        label: "Name of business",
        type: "text",
        validation: {
          required: "Name of business is required",
          minLength: {
            value: 2,
            message: "Name of business must be at least 2 characters",
          },
        },
      },
      {
        name: "business.generalName",
        label: "General name of business",
        type: "text",
        validation: {
          required: "General name of business is required",
          minLength: {
            value: 2,
            message: "General name of business must be at least 2 characters",
          },
        },
      },
      {
        name: "business.addressLine1",
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
        name: "business.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },
      {
        name: "business.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "business.postcode",
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
    id: "business-contact-details",
    title: "Tell us about the business contact person",
    conditionalOn: {
      field: "isIndividualOrBusiness",
      value: "business",
    },
    fields: [
      {
        name: "businessContact.firstName",
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
        name: "businessContact.lastName",
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
        name: "businessContact.email",
        label: "Email address",
        type: "text",
        validation: {
          required: "Email address is required",
          minLength: {
            value: 2,
            message: "Email address must be at least 2 characters",
          },
        },
      },
      {
        name: "businessContact.telephoneNumber",
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
    id: "activity-details",
    title: "When will the activity take place",
    fields: [
      {
        name: "activity.startDate",
        label: "Start date",
        type: "date",
        validation: {
          required: "Start date is required",
        },
      },
      {
        name: "activity.startTime",
        label: "Start time",
        type: "text",
        validation: {
          required: "Start time is required",
          minLength: {
            value: 2,
            message: "Start time must be at least 2 characters",
          },
        },
      },
      {
        name: "activity.endDate",
        label: "End date",
        type: "date",
        validation: {
          required: "End date is required",
        },
      },
      {
        name: "activity.endTime",
        label: "End time",
        type: "text",
        validation: {
          required: "End time is required",
          minLength: {
            value: 2,
            message: "End time must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "location-details",
    title: "Where will the activity take place?",
    fields: [
      {
        name: "location.nameOfLocation",
        label: "Name of park or beach",
        hint: "For example, Carlisle Bay or Queen's Park",
        type: "text",
        validation: {
          required: "Field is required",
        },
      },
      {
        name: "location.addressLine1",
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
        name: "location.addressLine2",
        label: "Address line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },
      {
        name: "location.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "location.postcode",
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
    id: "structures-required",
    title: "Will you set up any structures at the location?",
    fields: [
      {
        name: "structures.typesRequired",
        label: "Select all structures required",
        hidden: true,
        type: "checkboxGroup",
        validation: {
          required: "Select at least one option",
        },
        options: [
          { label: "Tent(s)", value: "tents" },
          { label: "Stall(s)", value: "stalls" },
          { label: "Bar(s)", value: "bars" },
          { label: "Stage(s)", value: "stages" },
        ],
      },
      {
        name: "structures.numberOfTents",
        label: "Number of tents",
        type: "number",
        validation: {
          required: "Number of tents is required",
        },
        conditionalOn: {
          field: "structures.typesRequired",
          value: "tents",
        },
      },
      {
        name: "structures.numberOfStalls",
        label: "Number of stalls",
        type: "number",
        validation: {
          required: "Number of stalls is required",
        },
        conditionalOn: {
          field: "structures.typesRequired",
          value: "stalls",
        },
      },
      {
        name: "structures.numberOfBars",
        label: "Number of bars",
        type: "number",
        validation: {
          required: "Number of bars is required",
        },
        conditionalOn: {
          field: "structures.typesRequired",
          value: "bars",
        },
      },
      {
        name: "structures.numberOfStages",
        label: "Number of stages",
        type: "number",
        validation: {
          required: "Number of stages is required",
        },
        conditionalOn: {
          field: "structures.typesRequired",
          value: "stages",
        },
      },
    ],
  },
  {
    id: "services-required",
    title: "What services do you need for this activity?",
    fields: [
      {
        name: "servicesRequired",
        label: "Select all services you require",
        type: "checkboxGroup",
        validation: {
          required: "Select at least one option",
        },
        options: [
          { label: "Exclusive use of area", value: "exclusive-use-of-area" },
          { label: "Electricity", value: "electricity" },
          { label: "Caretaker service", value: "caretaker-service" },
          { label: "Ranger or warden service", value: "ranger-warden-service" },
          { label: "Lifeguard service", value: "lifeguard-service" },
          {
            label: "Self-catering facilities - Batts Rock (bar)",
            value: "self-catering-batts-rock-bar",
          },
          {
            label: "Self-catering facilities - Batts Rock (kitchen)",
            value: "self-catering-batts-rock-kitchen",
          },
          {
            label: "King George V Memorial Park - park hall",
            value: "king-george-memorial-park-park-hall",
          },
        ],
      },
    ],
  },
  {
    id: "upload-document",
    title: "Upload supporting documents",
    description: "Provide the official company stamp",
    fields: [
      {
        type: "file",
        name: "uploads.insurance-certificate",
        label: "Upload public liability insurance certificate",
        hint: "Minimum coverage of $100,000.00",
        validation: {
          required: "Please upload public liability insurance certificate",
        },
      },
      {
        type: "file",
        name: "uploads.security-arrangement",
        label: "Upload proof of security arrangement",
        hint: "From the Royal Barbados Police Force",
        validation: {
          required: "Please upload proof of security arrangement",
        },
      },
      {
        type: "file",
        name: "uploads.chemical-toilet-provision",
        label: "Upload proof of chemical toilet provision",
        hint: "At least one chemical toilet",
        validation: {
          required: "Please upload proof of chemical toilet provision",
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
