import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "marriage-status",
    title:
      "When the child was born, were the mother and father married to each other?",
    description: "",
    fields: [
      {
        name: "marriageStatus",
        label: "",
        type: "radio",
        hint: "We ask this because your answer might determine, the surname of the child and who can register the birth",
        validation: {
          required: "Select your preference",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "include-father-details",
    title: "Do you want to include the father's details on the birth record?",
    description:
      "If you choose 'Yes', both parents must go to the Registration Department and sign the official register together",
    fields: [
      {
        name: "includeFatherDetails",
        label: "",
        type: "radio",
        hint: "If you choose 'No', the mother must go to the Registration Department but it is not necessary for the father to attend",
        validation: {
          required: "Select your preference",
        },
        options: [
          { label: "Yes, include the father's details", value: "yes" },
          { label: "No, do not include the father's details", value: "no" },
        ],
      },
    ],
  },
  {
    id: "father-details",
    title: "Tell us about the child's father",
    description: "",
    fields: [
      {
        name: "father.firstName",
        label: "First Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "father.middleName",
        label: "Middle Name(s)",
        hint: "If they have more than one, add them in order",
        type: "text",
        placeholder: "",
        validation: {},
      },
      {
        name: "father.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "father.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "father.currentAddress",
        label: "Current Address",
        type: "textarea",
        validation: {
          required: "Current Address is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "father.occupation",
        label: "Occupation",
        hint: "This will be included on the child's birth certificate and in official records",
        type: "text",
        placeholder: "",
        validation: {
          required: "Occupation is required",
          minLength: {
            value: 2,
            message: "Occupation must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "mother-details",
    title: "Tell us about the child's mother",
    description: "",
    fields: [
      {
        name: "mother.firstName",
        label: "First Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "mother.middleName",
        label: "Middle Name(s)",
        hint: "If they have more than one, add them in order",
        type: "text",
        placeholder: "",
        validation: {},
      },
      {
        name: "mother.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },
      {
        name: "mother.hasPreviousLastName",
        label: "Has the mother had any other last name?",
        type: "radio",
        hint: "For example, a maiden name.",
        validation: {
          required: "Select your preference",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "mother.previousLastName",
        label: "Previous Last Name",
        type: "text",

        validation: {
          required: "Field is required",
          minLength: {
            value: 5,
            message: "Previous Last Name must be at least 5 characters",
          },
        },
        conditionalOn: {
          field: "mother.hasPreviousLastName",
          value: "yes",
        },
      },
      {
        name: "mother.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "mother.currentAddress",
        label: "Current Address",
        type: "textarea",
        validation: {
          required: "Date of birth is required",
          minLength: {
            value: 5,
            message: "Address must be at least 5 characters",
          },
        },
      },
      {
        name: "mother.occupation",
        label: "Occupation",
        hint: "This will be included on the child's birth certificate and in official records",
        type: "text",
        placeholder: "",
        validation: {
          required: "Occupation is required",
          minLength: {
            value: 2,
            message: "Occupation must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "child-details",
    title: "Tell us about the child",
    description: "",
    fields: [
      {
        name: "child.firstName",
        label: "First Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        },
      },
      {
        name: "child.middleName",
        label: "Middle Name(s)",
        hint: "If they have more than one, add them in order",
        type: "text",
        placeholder: "",
        validation: {},
      },
      {
        name: "child.lastName",
        label: "Last Name",
        type: "text",
        placeholder: "",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        },
      },

      {
        name: "child.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "child.gender",
        label: "Sex at birth",
        hint: "We ask this so that we can monitor population trends",
        type: "radio",
        validation: {
          required: "Sex at birth is required",
        },
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },

      {
        name: "child.placeOfBirth",
        label: "Place of birth",
        hint: "Include the town and parish in your answer. For example, Queen Elizabeth Hospital, Bridgetown, St. Michael. Or a home address if they were born at home.",
        type: "text",
        validation: {
          required: "Place of birth is required",
        },
      },
    ],
  },
  {
    id: "order-details",
    title: "Order a birth certificate",
    description: `A birth certificate is essential for access to some public services. You wil need to pay BBD$5.00 for each certificate when you collect them.
We keep the original so you can order a certified copy at any point.
The birth registration is free of charge.`,
    fields: [
      {
        name: "order.numberOfCopies",
        label: "Number of Copies",
        type: "number",
        placeholder: "For example, 2",
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
    id: "contact",
    title: "Contact Details",
    description:
      "We ask for this information so that we can send you confirmation and let you know what to do next.",
    fields: [
      {
        name: "contact.email",
        label: "Email Address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "contact.telephoneNumber",
        label: "Telephone Number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value: "^\\+1\\s?\\(?246\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
            message:
              "Please enter a valid Barbados phone number (e.g., +1 246 234 5678)",
          },
        },
      },
    ],
  },
];
