"use client";

import { ClientForm } from "@/components/forms/client-form";

// Simple birth registration form definition
const birthRegistrationForm = {
  components: [
    // Child Information Panel
    {
      type: "panel",
      title: "Child Information",
      collapsible: false,
      key: "childInfo",
      components: [
        {
          type: "textfield",
          key: "childFirstName",
          label: "Child's First Name",
          placeholder: "Enter the child's first name",
          validate: {
            required: true,
            minLength: 2,
          },
        },
        {
          type: "textfield",
          key: "childLastName",
          label: "Child's Last Name",
          placeholder: "Enter the child's last name",
          validate: {
            required: true,
            minLength: 2,
          },
        },
        {
          type: "datetime",
          key: "dateOfBirth",
          label: "Date of Birth",
          format: "yyyy-MM-dd",
          validate: {
            required: true,
          },
        },
        {
          type: "select",
          key: "sex",
          label: "Sex",
          data: {
            values: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
          },
          validate: {
            required: true,
          },
        },
        {
          type: "textfield",
          key: "placeOfBirth",
          label: "Place of Birth",
          placeholder: "Hospital or location name",
          validate: {
            required: true,
          },
        },
      ],
    },

    // Mother Information Panel
    {
      type: "panel",
      title: "Mother Information",
      collapsible: false,
      key: "motherInfo",
      components: [
        {
          type: "textfield",
          key: "motherFirstName",
          label: "Mother's First Name",
          placeholder: "Enter mother's first name",
          validate: {
            required: true,
          },
        },
        {
          type: "textfield",
          key: "motherLastName",
          label: "Mother's Last Name",
          placeholder: "Enter mother's last name",
          validate: {
            required: true,
          },
        },
        {
          type: "textfield",
          key: "motherNationalId",
          label: "Mother's National ID",
          placeholder: "Enter 9-digit National ID",
          validate: {
            required: true,
            pattern: "^\\d{9}$",
          },
        },
        {
          type: "datetime",
          key: "motherDateOfBirth",
          label: "Mother's Date of Birth",
          format: "yyyy-MM-dd",
          validate: {
            required: true,
          },
        },
      ],
    },

    // Father Information Panel
    {
      type: "panel",
      title: "Father Information",
      collapsible: false,
      key: "fatherInfo",
      components: [
        {
          type: "textfield",
          key: "fatherFirstName",
          label: "Father's First Name",
          placeholder: "Enter father's first name",
          validate: {
            required: true,
          },
        },
        {
          type: "textfield",
          key: "fatherLastName",
          label: "Father's Last Name",
          placeholder: "Enter father's last name",
          validate: {
            required: true,
          },
        },
        {
          type: "textfield",
          key: "fatherNationalId",
          label: "Father's National ID",
          placeholder: "Enter 9-digit National ID",
          validate: {
            required: true,
            pattern: "^\\d{9}$",
          },
        },
        {
          type: "datetime",
          key: "fatherDateOfBirth",
          label: "Father's Date of Birth",
          format: "yyyy-MM-dd",
          validate: {
            required: true,
          },
        },
      ],
    },

    // Contact Information Panel
    {
      type: "panel",
      title: "Contact Information",
      collapsible: false,
      key: "contactInfo",
      components: [
        {
          type: "email",
          key: "email",
          label: "Email Address",
          placeholder: "your.email@example.com",
          validate: {
            required: true,
          },
        },
        {
          type: "phoneNumber",
          key: "phone",
          label: "Phone Number",
          placeholder: "+1 (246) xxx-xxxx",
          validate: {
            required: true,
          },
        },
        {
          type: "address",
          key: "address",
          label: "Home Address",
          validate: {
            required: true,
          },
        },
      ],
    },

    // Declaration Panel
    {
      type: "panel",
      title: "Declaration",
      collapsible: false,
      key: "declaration",
      components: [
        {
          type: "checkbox",
          key: "truthDeclaration",
          label:
            "I declare that the information provided in this application is true and correct to the best of my knowledge.",
          validate: {
            required: true,
          },
        },
        {
          type: "checkbox",
          key: "consentDeclaration",
          label:
            "I consent to the processing of this personal data for the purpose of birth registration.",
          validate: {
            required: true,
          },
        },
      ],
    },

    // Submit Button
    {
      type: "button",
      action: "submit",
      label: "Submit Birth Registration",
      theme: "primary",
      size: "lg",
    },
  ],
};

export default function BirthRegistrationPage() {
  const handleSubmit = (_submission: { data: Record<string, unknown> }) => {
    // Here you would typically send to an API endpoint
    alert(
      "Birth registration submitted successfully! You will receive a confirmation email shortly."
    );
  };

  return (
    <ClientForm
      department="Government of Barbados"
      description="Please complete this form to register the birth of a child in Barbados. All fields marked with an asterisk (*) are required. This information will be used to issue an official birth certificate."
      division="Vital Statistics Division"
      formDefinition={birthRegistrationForm}
      onSubmit={handleSubmit}
      title="Birth Registration Application"
    />
  );
}
