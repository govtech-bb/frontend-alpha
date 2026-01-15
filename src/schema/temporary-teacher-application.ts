import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "applicant-details",
    title: "Tell us about yourself",
    description: "",
    fields: [
      {
        name: "applicant-details.firstName",
        type: "text",
        label: "First Name",
        validation: {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "First Name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "First Name must be at least 50 characters",
          },
        },
      },
      {
        name: "applicant-details.middleName",
        type: "text",
        label: "Middle name(s)",
        validation: {
          minLength: {
            value: 2,
            message: "Middle name(s) must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Middle name(s) must be at least 50 characters",
          },
          required: false,
        },
      },
      {
        name: "applicant-details.lastName",
        type: "text",
        label: "Last Name",
        validation: {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "Last Name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Last Name must be at least 50 characters",
          },
        },
      },
      {
        name: "applicant-details.dateOfBirth",
        type: "date",
        label: "Date of Birth",
        validation: {
          required: "This field is required",
          pattern: {
            value: "^\\d{4}-\\d{2}-\\d{2}$",
            message: "Date must be in YYYY-MM-DD format",
          },
        },
      },
      {
        name: "applicant-details.placeOfBirth",
        type: "text",
        label: "Place of birth",
        validation: {
          required: "This field is required",
        },
      },
      {
        name: "applicant-details.nationality",
        type: "text",
        label: "Nationality",
        validation: {
          required: "This field is required",
        },
      },
      {
        name: "applicant-details.sex",
        type: "select",
        label: "Sex",
        options: [
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
        ],
        validation: {
          required: "This field is required",
          pattern: {
            value: "^(male|female)$",
            message: "Please choose male or female.",
          },
        },
      },
      {
        name: "applicant-details.martialStatus",
        type: "select",
        label: "Martial status",
        options: [
          {
            label: "Single",
            value: "single",
          },
          {
            label: "Married",
            value: "married",
          },
          {
            label: "Divorced",
            value: "divorced",
          },
        ],
        validation: {
          required: "Must select a martial status",
          pattern: {
            value: "^(single|married|divorced)$",
            message: "Must select single, married, or divorced.",
          },
        },
      },
      {
        name: "applicant-details.nationalIdNumber",
        type: "text",
        label: "National Identification (ID) number",
        validation: {
          pattern: {
            value: "^[0-9]{6}-[0-9]{4}$",
            message: "Invalid ID number.",
          },
        },
      },
      {
        name: "applicant-details.passportNumber",
        type: "text",
        label: "Passport Number (#)",
        validation: { required: false },
      },
      {
        name: "applicant-details.nationalInsuranceNumber",
        type: "text",
        label: "National Insurance number (NIS)",
        validation: { required: false },
      },
    ],
  },
  {
    id: "barbados-residency-duration",
    title: "Barbados Residency Duration",
    description: "How long have you lived in Barbados?",
    fields: [
      {
        name: "barbados-residency-duration.residencyDuration",
        label: "How long have you lived in Barbados?",
        hint: "For example: 2 weeks, 4 months, 1 year",
        type: "number",
        validation: {
          required: false,
          minLength: {
            value: 2,
            message: "Content must be at least 2 characters",
          },
          maxLength: {
            value: 20,
            message: "Content should be no more than 20 characters",
          },
        },
      },
    ],
  },
  {
    id: "contact-details",
    title: "Contact Details",
    description: "Your contact information",
    fields: [
      {
        name: "contact-details.addressLine1",
        type: "text",
        label: "Address Line 1",
        validation: {
          required: "This field is required",
        },
      },
      {
        name: "contact-details.addressLine2",
        type: "text",
        label: "Address Line 2",
        validation: {
          required: false,
        },
      },
      {
        name: "contact-details.country",
        type: "select",
        label: "Country",
        validation: {
          required: "This field is required",
        },
        options: [
          {
            label: "Barbados",
            value: "barbados",
          },
        ],
      },
      {
        name: "contact-details.parish",
        type: "select",
        label: "Parish",
        validation: {
          required: "This field is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contact-details.postcode",
        type: "text",
        label: "Postcode",
        validation: { required: false },
      },
      {
        name: "contact-details.emailAddress",
        type: "email",
        label: "Email address",
        validation: { required: "This field is required" },
      },
      {
        name: "contact-details.telephoneNumber",
        type: "text",
        label: "Telephone Number",
        validation: {
          required: "This field is required",
          pattern: {
            value: "^\\+?[0-9]{10,15}$",
            message: "Telephone number must be 10-15 digits",
          },
        },
      },
    ],
  },
  {
    id: "applicant-education",
    title: "Your Education",
    description: "Tell us about your education",
    fields: [
      {
        name: "applicant-education.nameOfInstitution",
        type: "text",
        label: "Name of Institution",
        validation: { required: "This field is required" },
      },
      {
        name: "applicant-education.country",
        type: "text",
        label: "Country",
        validation: { required: false },
      },
      {
        name: "applicant-education.startYear",
        label: "Start Year",
        type: "number",
        validation: {
          required: "This field is required",
          minLength: {
            value: 1930,
            message: "Start Year must be at least 1930",
          },
        },
      },
      {
        name: "applicant-education.endYear",
        label: "End Year",
        type: "number",
        validation: {
          required: "This field is required",
          minLength: {
            value: 1930,
            message: "End Year must be at least 1930.",
          },
        },
      },
      {
        name: "applicant-education.anotherEducation",
        label: "Do you want to add another education experience?",
        type: "radio",
        validation: { required: "This field is required" },
        options: [
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
        ],
      },
    ],
  },
  {
    id: "applicant-qualification",
    title: "Your qualifications",
    fields: [
      {
        name: "applicant-qualification.subject",
        label: "Subject",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicant-qualification.examinLengthingBody",
        label: "ExaminLengthing Body",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicant-qualification.year",
        label: "Year",
        type: "number",
        validation: {
          required: "This field is required",
          min: {
            value: 1930,
            message: "Year may not be before 1930",
          },
        },
      },
      {
        name: "applicant-qualification.levelGrade",
        label: "Level / Grade Obtained",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "anotherQualification",
        label: "Do you want to add another qualification",
        type: "radio",
        validation: { required: "This field is required" },
        options: [
          {
            label: "Yes",
            value: "yes",
          },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "applicant-work-experience",
    title: "Your work experience",
    description: "Tell us about your work experience",
    fields: [
      {
        name: "applicant-work-experience.employerName",
        label: "Name of employer or organization",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicant-work-experience.positionHeld",
        label: "Position held",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicant-work-experience.fromYear",
        label: "From (year)",
        type: "number",
        validation: {
          required: "This field is required",
          minLength: {
            value: 1930,
            message: "From (year) must be at least 1930",
          },
        },
      },
      {
        name: "applicant-work-experience.toYear",
        label: "To (year)",
        type: "number",
        validation: {
          required: false,
          minLength: {
            value: 1930,
            message: "To (year) must be at least 1930",
          },
        },
      },
      {
        name: "applicant-work-experience.currentlyWorking",
        label: "I am currently working here",
        type: "checkbox",
        validation: {
          required: false,
        },
      },
      {
        name: "applicant-work-experience.tasks",
        label: "Your main tasks",
        validation: { required: "This field is required" },
        type: "text",
      },
      {
        name: "applicant-work-experience.anotherExperience",
        validation: { required: "This field is required" },
        type: "radio",
        label: "Do you want to add another experience?",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "skills-and-experience",
    title: "Your skills and experiences",
    fields: [
      {
        name: "skills-and-experience.athleticsGamesCraftSkills",
        label: "Athletics, games, or craft skills",
        type: "text",
        validation: { required: false },
      },
      {
        name: "skills-and-experience.youthCommunityVolunteerGroups",
        label: "Experience in youth, community, or volunteer groups",
        type: "text",
        validation: { required: false },
      },
      {
        name: "skills-and-experience.responsibilityPositions",
        label: "Positions of responsibility held",
        type: "text",
        validation: { required: false },
      },
      {
        name: "skills-and-experience.extraDetails",
        label: "Anything else relevant to your application?",
        type: "text",
        validation: { required: false },
      },
    ],
  },
  {
    id: "reference",
    title: "Tell us about your reference",
    description: "",
    fields: [
      {
        name: "reference.title",
        label: "Title",
        type: "select",
        options: [
          {
            label: "Mr",
            value: "mr",
          },
          {
            label: "Mrs",
            value: "mrs",
          },
          {
            label: "Miss",
            value: "miss",
          },
        ],
        validation: { required: "This field is required" },
      },
      {
        name: "reference.firstName",
        type: "text",
        label: "First Name",
        validation: {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "First Name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "First Name must be at least 50 characters",
          },
        },
      },
      {
        name: "reference.lastName",
        type: "text",
        label: "Last Name",
        validation: {
          required: "This field is required",
          minLength: {
            value: 2,
            message: "Last Name must be at least 2 characters",
          },
          maxLength: {
            value: 50,
            message: "Last Name must be at least 50 characters",
          },
        },
      },
      {
        name: "reference.addressLine1",
        type: "text",
        label: "Address Line 1",
        validation: { required: "This field is required" },
      },
      {
        name: "reference.addressLine2",
        type: "text",
        label: "Address Line 2",
        validation: { required: false },
      },
      {
        name: "reference.country",
        type: "select",
        label: "Country",
        validation: { required: "This field is required" },
        options: [
          {
            label: "Barbados",
            value: "barbados",
          },
        ],
      },
      {
        name: "reference.parish",
        type: "select",
        label: "Parish",
        validation: { required: "This field is required" },
        options: barbadosParishes,
      },
      {
        name: "reference.postcode",
        type: "text",
        label: "Postcode",
        validation: { required: false },
      },
      {
        name: "reference.occupation",
        label: "Occupation",
        validation: { required: "This field is required" },
        type: "text",
      },
      {
        name: "reference.emailAddress",
        type: "email",
        label: "Email address",
        validation: { required: "This field is required" },
      },
      {
        name: "reference.telephoneNumber",
        type: "text",
        label: "Telephone Number",
        validation: {
          required: "This field is required",
          pattern: {
            value: "^\\+?[0-9]{10,15}$",
            message: "Telephone number must be 10-15 digits",
          },
        },
      },
      {
        name: "reference.anotherReference",
        validation: { required: "This field is required" },
        type: "radio",
        label: "Do you want to add another reference?",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "documents",
    title: "Upload your documents",
    description: "",
    fields: [
      {
        name: "documents.certificateDiplomaTranscript",
        label: "Upload your certificates, diplomas, and transcripts",
        validation: { required: "This field is required" },
        type: "file",
      },
      {
        name: "documents.testimonials",
        label: "Upload your two testimonials",
        validation: { required: "This field is required" },
        type: "fieldArray",
        fieldArray: {
          itemLabel: "Testimonial",
          addButtonText: "Add another Testimonial",
          maxItems: 2,
          minItems: 1,
          fields: [
            {
              name: "Testimonial",
              label: "Upload testimonial",
              type: "file",
              validation: { required: "This field is required" },
            },
          ],
        },
      },
    ],
  },
  {
    id: "confirmation",
    title: "Your application has been submitted",
    description: "",
    fields: [],
    steps: [
      {
        title: "What happens next",
        content: "",
        items: [
          "Your application will be reviewed.",
          "You may be contacted if more information is needed.",
          "You will be informed of the outcome.",
        ],
      },
    ],
    enableFeedback: true,
  },
];
