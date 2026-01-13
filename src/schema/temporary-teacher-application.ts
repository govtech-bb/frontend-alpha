import { barbadosParishes } from "@/data/constants";
import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "applicantDetails",
    title: "Tell us about yourself",
    description: "",
    fields: [
      {
        name: "applicantDetails.firstName",
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
        name: "applicantDetails.middleName",
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
        name: "applicantDetails.lastName",
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
        name: "applicantDetails.dateOfBirth",
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
        name: "applicantDetails.placeOfBirth",
        type: "text",
        label: "Place of birth",
        validation: {
          required: "This field is required",
        },
      },
      {
        name: "applicantDetails.nationality",
        type: "text",
        label: "Nationality",
        validation: {
          required: "This field is required",
        },
      },
      {
        name: "applicantDetails.sex",
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
        name: "applicantDetails.martialStatus",
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
        name: "applicantDetails.nationalIdNumber",
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
        name: "applicantDetails.passportNumber",
        type: "text",
        label: "Passport Number (#)",
        validation: { required: false },
      },
      {
        name: "applicantDetails.nationalInsuranceNumber",
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
    id: "contactDetails",
    title: "Contact Details",
    description: "Your contact information",
    fields: [
      {
        name: "contactDetails.addressLine1",
        type: "text",
        label: "Address Line 1",
        validation: {
          required: "This field is required",
        },
      },
      {
        name: "contactDetails.addressLine2",
        type: "text",
        label: "Address Line 2",
        validation: {
          required: false,
        },
      },
      {
        name: "contactDetails.country",
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
        name: "contactDetails.parish",
        type: "select",
        label: "Parish",
        validation: {
          required: "This field is required",
        },
        options: barbadosParishes,
      },
      {
        name: "contactDetails.postcode",
        type: "text",
        label: "Postcode",
        validation: { required: false },
      },
      {
        name: "contactDetails.emailAddress",
        type: "email",
        label: "Email address",
        validation: { required: "This field is required" },
      },
      {
        name: "contactDetails.telephoneNumber",
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
    id: "applicantEducation",
    title: "Your Education",
    description: "Tell us about your education",
    fields: [
      {
        name: "applicantEducation.nameOfInstitution",
        type: "text",
        label: "Name of Institution",
        validation: { required: "This field is required" },
      },
      {
        name: "applicantEducation.country",
        type: "text",
        label: "Country",
        validation: { required: false },
      },
      {
        name: "applicantEducation.startYear",
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
        name: "applicantEducation.endYear",
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
        name: "applicantEducation.anotherEducation",
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
    id: "applicantQualification",
    title: "Your qualifications",
    fields: [
      {
        name: "applicantQualification.subject",
        label: "Subject",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicantQualification.examinLengthingBody",
        label: "ExaminLengthing Body",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicantQualification.year",
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
        name: "applicantQualification.levelGrade",
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
    id: "applicantWorkExperience",
    title: "Your work experience",
    description: "Tell us about your work experience",
    fields: [
      {
        name: "applicantWorkExperience.employerName",
        label: "Name of employer or organization",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicantWorkExperience.positionHeld",
        label: "Position held",
        type: "text",
        validation: { required: "This field is required" },
      },
      {
        name: "applicantWorkExperience.fromYear",
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
        name: "applicantWorkExperience.toYear",
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
        name: "applicantWorkExperience.currentlyWorking",
        label: "I am currently working here",
        type: "checkbox",
        validation: {
          required: false,
        },
      },
      {
        name: "applicantWorkExperience.tasks",
        label: "Your main tasks",
        validation: { required: "This field is required" },
        type: "text",
      },
      {
        name: "applicantWorkExperience.anotherExperience",
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
    id: "skillsAndExperience",
    title: "Your skills and experiences",
    fields: [
      {
        name: "skillsAndExperience.athleticsGamesCraftSkills",
        label: "Athletics, games, or craft skills",
        type: "text",
        validation: { required: false },
      },
      {
        name: "skillsAndExperience.youthCommunityVolunteerGroups",
        label: "Experience in youth, community, or volunteer groups",
        type: "text",
        validation: { required: false },
      },
      {
        name: "skillsAndExperience.responsibilityPositions",
        label: "Positions of responsibility held",
        type: "text",
        validation: { required: false },
      },
      {
        name: "skillsAndExperience.extraDetails",
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
];
