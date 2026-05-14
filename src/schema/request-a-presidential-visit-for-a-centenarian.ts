import { barbadosParishes, NAME_REGEX, PHONE_REGEX } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "centenarian-info",
    title: "Tell us about the centenarian",
    fields: [
      {
        name: "centenarian.fullName",
        label: "Full name",
        width: "two-thirds",
        type: "text",
        validation: {
          required: "Enter the centenarian's full name",
          minLength: {
            value: 2,
            message: "Full name must be at least 2 characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "Full name must contain only letters, spaces, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "centenarian.dateOfBirth",
        label: "Date of birth",
        placeholder: "For example, 27 3 1925",
        type: "date",
        width: "two-thirds",
        validation: {
          required: "Enter the centenarian's date of birth",
          date: {
            type: "ageRange",
            minAge: 99,
            maxAge: 100,
            message:
              "The centenarian must be turning or have turned 100. Check the date of birth is correct.",
          },
        },
      },
      {
        name: "centenarian.sex",
        label: "What is the sex of the centenarian?",
        hint: "This determines which documents you need to upload.",
        type: "radio",
        validation: {
          required: "Choose male or female",
        },
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
    ],
  },
  {
    id: "addresses",
    title: "Where does the centenarian live?",
    fields: [
      {
        name: "home.addressLine1",
        label: "Address line 1",
        type: "text",
        width: "two-thirds",
        validation: {
          required: "Enter the first line of the home address",
          minLength: {
            value: 2,
            message: "Address must be at least 2 characters",
          },
        },
      },
      {
        name: "home.addressLine2",
        label: "Address line 2 (optional)",
        type: "text",
        width: "two-thirds",
        validation: { required: false },
      },
      {
        name: "home.parish",
        label: "Parish",
        type: "select",
        width: "two-thirds",
        validation: {
          required: "Choose a parish",
        },
        options: barbadosParishes,
      },
      {
        name: "visitSameAddress",
        label: "Will the visit take place at this address?",
        type: "radio",
        validation: {
          required: "Choose where the visit will take place",
        },
        options: [
          { label: "Yes", value: "yes" },
          {
            label: "No — the visit will be at a different address",
            value: "no",
          },
        ],
        conditionalGroups: {
          no: { label: "Address for the visit" },
        },
      },
      {
        name: "visit.addressLine1",
        label: "Address line 1",
        type: "text",
        validation: {
          required: "Enter the first line of the visit address",
          minLength: {
            value: 2,
            message: "Address must be at least 2 characters",
          },
        },
        conditionalOn: {
          field: "visitSameAddress",
          value: "no",
        },
      },
      {
        name: "visit.addressLine2",
        label: "Address line 2 (optional)",
        type: "text",
        validation: { required: false },
        conditionalOn: {
          field: "visitSameAddress",
          value: "no",
        },
      },
      {
        name: "visit.parish",
        label: "Parish",
        type: "select",

        validation: {
          required: "Choose a parish for the visit address",
        },
        options: barbadosParishes,
        conditionalOn: {
          field: "visitSameAddress",
          value: "no",
        },
      },
    ],
  },
  {
    id: "contact-person",
    title: "Who should we contact about the arrangements?",
    description:
      "Give us the details of the person the Office of the President should contact.",
    fields: [
      {
        name: "contact.fullName",
        label: "Full name",
        type: "text",
        width: "two-thirds",
        validation: {
          required: "Enter the contact person's full name",
          minLength: {
            value: 2,
            message: "Full name must be at least 2 characters",
          },
          pattern: {
            value: NAME_REGEX,
            message:
              "Full name must contain only letters, spaces, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "contact.addressLine1",
        label: "Address line 1",
        type: "text",
        width: "two-thirds",
        validation: {
          required: "Enter the contact person's address",
          minLength: {
            value: 2,
            message: "Address must be at least 2 characters",
          },
        },
      },
      {
        name: "contact.addressLine2",
        label: "Address line 2 (optional)",
        type: "text",
        width: "two-thirds",
        validation: { required: false },
      },
      {
        name: "contact.parish",
        label: "Parish",
        type: "select",
        width: "two-thirds",
        validation: {
          required: "Choose a parish",
        },
        options: barbadosParishes,
      },
      {
        name: "contact.telephoneNumber",
        label: "Phone number",
        hint: "For example, 246-555-1234",
        type: "tel",
        width: "two-thirds",
        validation: {
          required: "Enter a phone number",
          pattern: {
            value: PHONE_REGEX,
            message:
              "Enter a valid phone number (for example, 246-555-1234 or 1-246-234-5678)",
          },
        },
      },
      {
        name: "contact.email",
        label: "Email address",
        hint: "We'll send you a confirmation of your request. For example, name@example.com",
        type: "email",
        width: "two-thirds",
        validation: {
          required: "Enter your email address",
        },
      },
    ],
  },
  {
    id: "upload-documents",
    title: "Upload your documents",
    description:
      "Upload a scan or clear photo. Accepted formats: PDF, JPG, PNG. Max 5MB per file.",
    inlineNotices: [
      {
        afterField: "documents.birthCertificate",
        title: "If any names differ across documents",
        body: "An affidavit may be required. The Office of the President will contact you if this is needed.",
      },
    ],
    fields: [
      {
        name: "documents.birthCertificate",
        label: "Birth certificate",
        hint: "Original birth certificate with names included. Required for all centenarians.",
        type: "file",
        validation: {
          required: "Upload the birth certificate",
        },
      },
      {
        name: "documents.marriageCertificate",
        label: "Marriage certificate(s)",
        hint: "Upload if she is or has been married. Add files one at a time.",
        type: "file",
        multiple: true,
        validation: { required: false },
        conditionalOn: {
          field: "centenarian.sex",
          value: "female",
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
          "I confirm that the information I have given is correct to the best of my knowledge, that the request will be received at least 3 months before the birthday, and that the documents I have uploaded are true copies of the originals.",
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
    title: "Request submitted",
    fields: [],
    bodyContent: `## What happens next

The Office of the President will review your request and contact the person you named to discuss the arrangements.

If you don't hear back within 4 weeks, contact the Office of the President directly.

### Need help?

**Office of the President**
**Address:** State House, Government Hill, St Michael
`,
    enableFeedback: true,
  },
];
