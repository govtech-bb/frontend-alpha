import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "personal",
    title: "Application Details",
    description: "",
    fields: [
      {
        name: "personal.firstName",
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
        name: "personal.lastName",
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
        name: "personal.dateOfBirth",
        label: "Date of Birth",
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Date of birth is required",
        },
      },

      {
        name: "personal.idNumber",
        label: "ID Number",
        type: "number",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
          },
        },
      },
    ],
  },
  {
    id: "oldaddress",
    title: "Please provide your old address",
    description: "Description",
    fields: [
      {
        name: "oldaddress.addressLine1",
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
        name: "oldaddress.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "oldaddress.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "oldaddress.postalCode",
        label: "Postal Code",
        type: "number",
        placeholder: "",
        validation: { required: false },
      },
    ],
  },
  {
    id: "newAddress",
    title: "Please provide your new address",
    description: "Description",
    fields: [
      {
        name: "newAddress.addressLine1",
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
        name: "newAddress.addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "",
        validation: { required: false },
      },

      {
        name: "newAddress.parish",
        label: "Parish",
        type: "select",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "newAddress.postalCode",
        label: "Postal Code",
        type: "number",
        placeholder: "",
        validation: { required: false },
      },
    ],
  },
  {
    id: "moving",
    title: "Something here on the date and where",
    description: "Description",
    fields: [
      {
        name: "moving.startDate",
        label: "Start Date",
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "Start Date is required",
        },
      },
      {
        name: "moving.endDate",
        label: "End Date",
        type: "date",
        placeholder: "For example, 27 3 2007",
        validation: {
          required: "End date is required",
        },
      },
    ],
  },
  {
    id: "houseMembers",
    title: "House Member Details",
    description: "",
    fields: [
      {
        name: "houseMembers.firstName",
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
        name: "houseMembers.lastName",
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
        name: "houseMembers.idNumber",
        label: "ID Number",
        type: "number",
        placeholder: "",
        validation: {
          required: "ID Number is required",
          minLength: {
            value: 2,
            message: "ID Number must be at least 2 characters",
          },
        },
      },
      {
        name: "houseMembers.addAnother",
        label: "Do you want to add another member?",
        type: "radio",
        validation: { required: false },
        options: [
          { label: "No", value: "no" },
          { label: "Yes", value: "yes" },
        ],
      },
    ],
  },
  {
    id: "businessInformation",
    title: "Is this for a business/company?",
    description: "Description",
    fields: [
      {
        name: "businessInformation.belongsToBusiness",
        label: "Is this for a business/company?",
        type: "radio",
        validation: {
          required: "Business Information is required",
        },
        options: [
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ],
      },
      {
        name: "businessInformation.businessName",
        label: "What is the name of the business?",
        type: "text",
        placeholder: "Enter business name",
        validation: {
          required: "Business name is required",
          minLength: {
            value: 2,
            message: "Business name must be at least 2 characters",
          },
        },

        conditionalOn: {
          field: "businessInformation.belongsToBusiness",
          value: "true",
        },
      },
    ],
  },
  {
    id: "review",
    title: "Check your answers",
    description:
      "Review the answers you've given carefully. Incorrect information may be difficult to change after registration.",
    fields: [],
  },
];
