import { barbadosParishes, countries } from "@/data/constants";
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
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "First name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "applicant.middleName",
        label: "Middle name(s)",
        type: "text",
        validation: {
          required: false,
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Middle name must contain only letters, hyphens, or apostrophes",
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
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "applicant.dateOfBirth",
        label: "Date of birth",
        placeholder: "For example, 30 12 1986",
        type: "date",
        validation: {
          required: "Date of birth is required",
          date: {
            type: "past",
          },
        },
      },
      {
        name: "applicant.nationality",
        label: "Nationality",
        type: "select",
        width: "medium",
        validation: {
          required: "Nationality is required",
        },
        options: countries,
      },
      {
        name: "applicant.idNumber",
        label: "National Identification (ID) Number",
        type: "text",
        width: "medium",
        validation: {
          required: "ID Number is required",
          pattern: {
            value: "^\\d{6}-\\d{4}$",
            message: "Enter a valid ID number (for example, 850101-0001)",
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
        label: "Email address",
        type: "email",
        validation: {
          required: "Email address is required",
        },
      },
      {
        name: "applicant.telephoneNumber",
        label: "Telephone number",
        type: "tel",
        validation: {
          required: "Telephone number is required",
          pattern: {
            value:
              "^(?:1[- ]?[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{4})$",
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
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
        name: "applicant.postcode",
        label: "Postcode",
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postcode (for example, BB17004)",
          },
        },
      },
    ],
  },
  {
    id: "goods-or-services",
    title: "Would you like to sell goods or services?",
    description:
      "Goods are physical items such as food or memorabilia. Services are experiences like massages or paddle boarding.",
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
    ],
  },
  {
    id: "goods-details",
    title: "Tell us about the goods you would like to sell",
    conditionalOn: {
      field: "selling.goodsOrServices",
      value: "goods",
    },
    fields: [
      {
        name: "goods.from",
        label: "Where are the goods from?",
        type: "radio",
        validation: {
          required: "Select an option",
        },
        options: [
          { label: "Local (Barbados)", value: "barbados" },
          { label: "Imported", value: "imported" },
        ],
      },
      {
        name: "goods.manufacturingLocation",
        label: "Which country are the goods from?",
        hint: "Select a country",
        type: "select",
        options: countries,
        validation: {
          required: "Location is required",
        },
        conditionalOn: {
          field: "goods.from",
          value: "imported",
        },
      },
      {
        name: "goods.description",
        label: "Describe the goods you would like to sell",
        type: "text",
        hint: "For example, fresh, locally-sourced fruit",
        validation: {
          required: "Description of goods is required",
          minLength: {
            value: 2,
            message: "Description of goods must be at least 2 characters",
          },
        },
      },
      {
        name: "goods.intendedLocation",
        label: "Where do you intend to sell your goods?",
        type: "text",
        hint: "For example, Brownes Beach",
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
    id: "services-details",
    title: "Tell us about your services",
    conditionalOn: {
      field: "selling.goodsOrServices",
      value: "services",
    },
    fields: [
      {
        name: "services.description",
        label: "Describe the services you would like to offer",
        type: "text",
        hint: "For example, 20-minute jet ski rides",
        validation: {
          required: "Description of services is required",
          minLength: {
            value: 2,
            message: "Description of services must be at least 2 characters",
          },
        },
      },
      {
        name: "services.intendedLocation",
        label: "Where do you intend to offer this service?",
        type: "text",
        hint: "For example, Brownes Beach",
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
  // {
  //   id: "business-details",
  //   title: "Tell us about your goods or services",
  //   fields: [
  //     {
  //       name: "business.descriptionOfGoodsOrServices",
  //       label: "Describe the goods or services you would like to sell",
  //       hint: "For example, fresh, locally-sourced fruit or 20-minute jet ski rides",
  //       type: "text",
  //       validation: {
  //         required: "Location is required",
  //         minLength: {
  //           value: 2,
  //           message: "Location must be at least 2 characters",
  //         },
  //       },
  //     },
  //     {
  //       name: "business.intendedPlaceOfDoingBusiness",
  //       label: "Where do you intend to sell your goods or services?",
  //       hint: "For example, in front of Copacabana Beach Club in Carlisle Bay",
  //       type: "text",
  //       validation: {
  //         required: "Place of doing business is required",
  //         minLength: {
  //           value: 2,
  //           message: "Place of doing business must be at least 2 characters",
  //         },
  //       },
  //     },
  //   ],
  // },
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
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
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
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
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
          required: "Professional relationship is required",
        },
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
              "^(?:1[- ]?[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{4})$",
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
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
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postcode (for example, BB17004)",
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
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
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
            message: "Last name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
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
          required: "Personal relationship is required",
        },
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
              "^(?:1[- ]?[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{3}[- ]?\\d{4}|[2-9]\\d{2}[- ]?\\d{4})$",
            message:
              "Please enter a valid phone number (for example, 2345678, 1-246-234-5678, or 1 246 234 5678)",
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
        hint: "For example, BB17004 (optional)",
        type: "text",
        width: "medium",
        validation: {
          required: false,
          pattern: {
            value: "^BB\\d{5}$",
            message: "Enter a valid postcode (for example, BB17004)",
          },
        },
      },
    ],
  },
  {
    id: "first-testimonial",
    title: "First testimonial",
    description:
      "Provide 2 or 3 sentences from someone who can speak about your character. For example, they might be a community leader or mentor. They must not be someone you named as a referee earlier in this application.",
    fields: [
      {
        name: "firstTestimonial.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "First name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "firstTestimonial.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "firstTestimonial.relationship",
        label: "Relationship",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Community leader", value: "community-leader" },
          { label: "Mentor", value: "mentor" },
          { label: "Religious leader", value: "religious-leader" },
          { label: "Teacher", value: "teacher" },
          { label: "Coach", value: "coach" },
          { label: "Neighbour", value: "neighbour" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "firstTestimonial.addressLine1",
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
        name: "firstTestimonial.addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "firstTestimonial.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "firstTestimonial.testimonial",
        label: "Testimonial",
        type: "textarea",
        validation: {
          required: "Testimonial is required",
          minLength: {
            value: 10,
            message: "Testimonial must be at least 10 characters",
          },
        },
      },
    ],
  },
  {
    id: "second-testimonial",
    title: "Second testimonial",
    description:
      "Provide 2 or 3 sentences from someone who can speak about your character. For example, they might be a community leader or mentor. They must not be someone you named as a referee earlier in this application.",
    fields: [
      {
        name: "secondTestimonial.firstName",
        label: "First name",
        type: "text",
        validation: {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "First name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "secondTestimonial.lastName",
        label: "Last name",
        type: "text",
        validation: {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
          pattern: {
            value:
              "^[A-Za-zÀ-ÖØ-öø-ÿ](?:[A-Za-zÀ-ÖØ-öø-ÿ'-]*[A-Za-zÀ-ÖØ-öø-ÿ])?$",
            message:
              "Last name must contain only letters, hyphens, or apostrophes",
          },
        },
      },
      {
        name: "secondTestimonial.relationship",
        label: "Relationship",
        type: "select",
        validation: {
          required: "Relationship is required",
        },
        options: [
          { label: "", value: "" },
          { label: "Community leader", value: "community-leader" },
          { label: "Mentor", value: "mentor" },
          { label: "Religious leader", value: "religious-leader" },
          { label: "Teacher", value: "teacher" },
          { label: "Coach", value: "coach" },
          { label: "Neighbour", value: "neighbour" },
          { label: "Other", value: "other" },
        ],
      },
      {
        name: "secondTestimonial.addressLine1",
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
        name: "secondTestimonial.addressLine2",
        label: "Address line 2",
        type: "text",
        validation: { required: false },
      },
      {
        name: "secondTestimonial.parish",
        label: "Parish",
        type: "select",
        width: "medium",
        validation: {
          required: "Parish is required",
        },
        options: barbadosParishes,
      },
      {
        name: "secondTestimonial.testimonial",
        label: "Testimonial",
        type: "textarea",
        validation: {
          required: "Testimonial is required",
          minLength: {
            value: 10,
            message: "Testimonial must be at least 10 characters",
          },
        },
      },
    ],
  },
  {
    id: "document-uploads",
    title: "Upload supporting documents",
    description:
      "Provide a Police Certificate of Character and 2 passport-sized photos",
    fields: [
      {
        name: "documents.policeCertificate",
        label: "Upload a Police Certificate of Character",
        hint: "Attach a .pdf, .docx or .png file.",
        type: "file",
        validation: {
          required: "Police Certificate of Character is required",
        },
      },
      {
        name: "documents.passportPhotos",
        label: "Upload 2 passport-sized photos",
        hint: "Attach a .pdf, .docx or .png file.",
        multiple: true,
        type: "file",
        validation: {
          required: "Passport-sized photos are required",
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
      "Your information has been sent to the our National Conservation Commission (NCC)",
    fields: [],
    bodyContent: `## What happens next

You will meet with representatives from the NCC at the location where you would like to sell goods or services. They will assess suitability.

If the outcome is positive, you will need to visit the National Conservation Commission to collect:

1. A letter of authorisation.
2. A licence book outlining the conditions of where and what you can sell.
3. Your vendor identification.

## Paying for your licence
You can pay for your vendor documentation in cash or by card when you visit the NCC.

The prices include VAT.

• Licence: $117.50
A watersports licence costs $176.25
• Licence book: $11.75
• ID badge: $12.87
`,
    enableFeedback: true,
  },
];
