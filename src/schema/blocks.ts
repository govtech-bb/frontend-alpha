import { barbadosParishes } from "@/data/constants";
import type { FormField } from "@/types";

type AddressOptions = {
  /** Field prefix for namespacing (e.g., "contact" -> "contact.addressLine1") */
  prefix: string;
  /** Show country select field */
  showCountry?: boolean;
  /** Show parish select field */
  showParish?: boolean;
  /** Show postcode text field */
  showPostcode?: boolean;
};

export const address = (options: AddressOptions): FormField[] => {
  const { prefix, showCountry, showParish, showPostcode } = options;

  const fields: FormField[] = [
    {
      name: `${prefix}.addressLine1`,
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
      name: `${prefix}.addressLine2`,
      label: "Address line 2",
      type: "text",
      validation: { required: false },
    },
  ];

  if (showCountry) {
    fields.push({
      name: `${prefix}.country`,
      label: "Country",
      type: "select",
      validation: {
        required: "Country is required",
      },
      options: [], // TODO: Add country options
    });
  }

  if (showParish) {
    fields.push({
      name: `${prefix}.parish`,
      label: "Parish",
      type: "select",
      validation: {
        required: "Parish is required",
      },
      options: barbadosParishes,
    });
  }

  if (showPostcode) {
    fields.push({
      name: `${prefix}.postcode`,
      label: "Postcode",
      type: "text",
      validation: { required: false },
    });
  }

  return fields;
};

type NameOptions = {
  /** Field prefix for namespacing (e.g., "applicant" -> "applicant.firstName") */
  prefix: string;
  /** Show title select field */
  showTitle?: boolean;
  /** Show first name field */
  showFirstName?: boolean;
  /** Show middle name field */
  showMiddleName?: boolean;
  /** Show last name field */
  showLastName?: boolean;
  /** Show other first name question */
  showOtherFirstName?: boolean;
  /** Show other last name question */
  showOtherLastName?: boolean;
  /** Show relationship select field */
  showRelationship?: boolean;
};

export const name = (options: NameOptions): FormField[] => {
  const {
    prefix,
    showTitle,
    showFirstName,
    showMiddleName,
    showLastName,
    showOtherFirstName,
    showOtherLastName,
    showRelationship,
  } = options;

  const fields: FormField[] = [];

  if (showTitle) {
    fields.push({
      name: `${prefix}.title`,
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
    });
  }

  if (showFirstName) {
    fields.push({
      name: `${prefix}.firstName`,
      label: "First name",
      type: "text",
      validation: {
        required: "First name is required",
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters",
        },
      },
    });
  }

  if (showMiddleName) {
    fields.push({
      name: `${prefix}.middleName`,
      label: "Middle name(s)",
      type: "text",
      hint: "If you have more than one, add them in order",
      validation: { required: false },
    });
  }

  if (showLastName) {
    fields.push({
      name: `${prefix}.lastName`,
      label: "Last name",
      type: "text",
      validation: {
        required: "Last name is required",
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters",
        },
      },
    });
  }

  if (showOtherFirstName) {
    fields.push({
      name: `${prefix}.hasOtherFirstName`,
      label: "Have you ever been known by another first name?",
      type: "radio",
      validation: {
        required: "Select an option",
      },
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    });
  }

  if (showOtherLastName) {
    fields.push({
      name: `${prefix}.hasOtherLastName`,
      label: "Have you ever been known by another last name?",
      type: "radio",
      validation: {
        required: "Select an option",
      },
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    });
  }

  if (showRelationship) {
    fields.push({
      name: `${prefix}.relationship`,
      label: "Relationship",
      type: "select",
      validation: {
        required: "Relationship is required",
      },
      options: [], // TODO: Add relationship options as needed
    });
  }

  return fields;
};

type ContactInfoOptions = {
  /** Field prefix for namespacing (e.g., "contact" -> "contact.email") */
  prefix: string;
  /** Show email address field */
  showEmailAddress?: boolean;
  /** Show telephone number field */
  showTelephoneNumber?: boolean;
  /** Show mobile phone number field */
  showMobilePhoneNumber?: boolean;
  /** Show work phone field */
  showWorkPhone?: boolean;
  /** Show home phone field */
  showHomePhone?: boolean;
  /** Show fax field */
  showFax?: boolean;
};

export const contactInfo = (options: ContactInfoOptions): FormField[] => {
  const {
    prefix,
    showEmailAddress,
    showTelephoneNumber,
    showMobilePhoneNumber,
    showWorkPhone,
    showHomePhone,
    showFax,
  } = options;

  const phoneValidation = (field: string) => ({
    required: `${field} is required`,
    pattern: {
      value: "^\\d{1,2}\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}$",
      message:
        "Please enter a valid phone number (e.g., 246 234 5678 or 1 246 234 5678)",
    },
  });

  const fields: FormField[] = [];

  if (showEmailAddress) {
    fields.push({
      name: `${prefix}.email`,
      label: "Email address",
      type: "email",
      validation: {
        required: "Email address is required",
      },
    });
  }

  if (showTelephoneNumber) {
    fields.push({
      name: `${prefix}.telephoneNumber`,
      label: "Telephone number",
      type: "tel",
      validation: phoneValidation("Telephone number"),
    });
  }

  if (showMobilePhoneNumber) {
    fields.push({
      name: `${prefix}.mobileNumber`,
      label: "Mobile number",
      type: "tel",
      validation: phoneValidation("Mobile number"),
    });
  }

  if (showWorkPhone) {
    fields.push({
      name: `${prefix}.workPhone`,
      label: "Work phone number",
      type: "tel",
      validation: phoneValidation("Work phone number"),
    });
  }

  if (showHomePhone) {
    fields.push({
      name: `${prefix}.homePhone`,
      label: "Home phone number",
      type: "tel",
      validation: phoneValidation("Home phone number"),
    });
  }

  if (showFax) {
    fields.push({
      name: `${prefix}.fax`,
      label: "Fax number",
      type: "tel",
      validation: phoneValidation("Fax number"),
    });
  }

  return fields;
};
