"use client";

import { ClientForm } from "@/components/forms/client-form";

// Business license form definition
const businessLicenseForm = {
  components: [
    // Business Information Panel
    {
      type: "panel",
      title: "Business Information",
      collapsible: false,
      key: "businessInfo",
      components: [
        {
          type: "textfield",
          key: "businessName",
          label: "Business Name",
          placeholder: "Enter the legal name of your business",
          validate: {
            required: true,
            minLength: 2,
          },
        },
        {
          type: "textfield",
          key: "tradingName",
          label: "Trading Name (if different)",
          placeholder: "Enter trading name if different from business name",
        },
        {
          type: "select",
          key: "businessType",
          label: "Type of Business",
          data: {
            values: [
              { label: "Sole Proprietorship", value: "sole_proprietorship" },
              { label: "Partnership", value: "partnership" },
              { label: "Company Limited by Shares", value: "company_shares" },
              {
                label: "Company Limited by Guarantee",
                value: "company_guarantee",
              },
              { label: "Foreign Company", value: "foreign_company" },
            ],
          },
          validate: {
            required: true,
          },
        },
        {
          type: "textarea",
          key: "businessDescription",
          label: "Description of Business Activities",
          placeholder: "Describe the nature of your business operations",
          rows: 3,
          validate: {
            required: true,
            minLength: 10,
          },
        },
        {
          type: "select",
          key: "businessCategory",
          label: "Business Category",
          data: {
            values: [
              { label: "Retail", value: "retail" },
              { label: "Food Service", value: "food_service" },
              { label: "Manufacturing", value: "manufacturing" },
              { label: "Professional Services", value: "professional" },
              { label: "Construction", value: "construction" },
              { label: "Tourism & Hospitality", value: "tourism" },
              { label: "Information Technology", value: "it" },
              { label: "Import/Export", value: "import_export" },
              { label: "Other", value: "other" },
            ],
          },
          validate: {
            required: true,
          },
        },
      ],
    },

    // Business Address Panel
    {
      type: "panel",
      title: "Business Address",
      collapsible: false,
      key: "businessAddress",
      components: [
        {
          type: "address",
          key: "businessLocation",
          label: "Business Operating Address",
          validate: {
            required: true,
          },
        },
        {
          type: "checkbox",
          key: "sameAsHome",
          label: "Business address is the same as home address",
        },
      ],
    },

    // Applicant Information Panel
    {
      type: "panel",
      title: "Applicant Information",
      collapsible: false,
      key: "applicantInfo",
      components: [
        {
          type: "textfield",
          key: "applicantFirstName",
          label: "Applicant's First Name",
          placeholder: "Enter your first name",
          validate: {
            required: true,
            minLength: 2,
          },
        },
        {
          type: "textfield",
          key: "applicantLastName",
          label: "Applicant's Last Name",
          placeholder: "Enter your last name",
          validate: {
            required: true,
            minLength: 2,
          },
        },
        {
          type: "textfield",
          key: "nationalId",
          label: "National ID Number",
          placeholder: "Enter your 9-digit National ID",
          validate: {
            required: true,
            pattern: "^\\d{9}$",
          },
        },
        {
          type: "email",
          key: "applicantEmail",
          label: "Email Address",
          placeholder: "your.email@example.com",
          validate: {
            required: true,
          },
        },
        {
          type: "phoneNumber",
          key: "applicantPhone",
          label: "Phone Number",
          placeholder: "+1 (246) xxx-xxxx",
          validate: {
            required: true,
          },
        },
      ],
    },

    // Employment Details Panel
    {
      type: "panel",
      title: "Employment Details",
      collapsible: false,
      key: "employmentInfo",
      components: [
        {
          type: "number",
          key: "numberOfEmployees",
          label: "Expected Number of Employees",
          defaultValue: 1,
          validate: {
            required: true,
            min: 1,
            max: 1000,
          },
        },
        {
          type: "number",
          key: "localEmployees",
          label: "Number of Barbadian Employees",
          defaultValue: 1,
          validate: {
            required: true,
            min: 0,
          },
        },
        {
          type: "select",
          key: "operatingHours",
          label: "Operating Hours",
          data: {
            values: [
              {
                label: "Standard Business Hours (9 AM - 5 PM)",
                value: "standard",
              },
              { label: "Extended Hours (6 AM - 10 PM)", value: "extended" },
              { label: "24 Hours", value: "24hour" },
              { label: "Seasonal/Variable", value: "variable" },
            ],
          },
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
            "I consent to the processing of this personal data for the purpose of business license application and compliance monitoring.",
          validate: {
            required: true,
          },
        },
        {
          type: "checkbox",
          key: "termsAcceptance",
          label:
            "I understand and accept the terms and conditions for operating a business in Barbados.",
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
      label: "Submit Business License Application",
      theme: "primary",
      size: "lg",
    },
  ],
};

export default function BusinessLicensePage() {
  const handleSubmit = (_submission: { data: Record<string, unknown> }) => {
    // Here you would typically send to an API endpoint
    alert(
      "Business license application submitted successfully! You will receive a confirmation email shortly."
    );
  };

  return (
    <ClientForm
      department="Ministry of Industry"
      description="Please complete this application to obtain a business license in Barbados. All fields marked with an asterisk (*) are required. Processing typically takes 10-15 business days upon receipt of a complete application."
      division="Business Licensing Division"
      formDefinition={businessLicenseForm}
      onSubmit={handleSubmit}
      title="Business License Application"
    />
  );
}
