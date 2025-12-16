import type { FormStep } from "@/types";

export const formSteps: FormStep[] = [
  {
    id: "introduction",
    title: "Help us improve this service",
    description:
      "Thank you for submitting your information. Your feedback helps us improve this service. This will take about 30 seconds and includes 4 short questions.",
    fields: [],
  },
  {
    id: "difficulty-rating",
    title: "Overall, how easy or difficult was it to complete this form?",
    fields: [
      {
        name: "difficultyRating",
        label: "How easy or difficult was it to complete this form?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select a difficulty rating",
        },
        options: [
          { label: "Very Easy", value: "very-easy" },
          { label: "Easy", value: "easy" },
          { label: "Neither easy nor difficult", value: "neither" },
          { label: "Difficult", value: "difficult" },
          { label: "Very Difficult", value: "very-difficult" },
        ],
      },
    ],
  },
  {
    id: "clarity-rating",
    title: "How clear were the instructions and information on this form?",
    fields: [
      {
        name: "clarityRating",
        label: "How clear were the instructions and information on this form?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select a clarity rating",
        },
        options: [
          { label: "Very Clear", value: "very-clear" },
          { label: "Clear", value: "clear" },
          { label: "Neither clear nor unclear", value: "neither" },
          { label: "Unclear", value: "unclear" },
          { label: "Very Unclear", value: "very-unclear" },
        ],
      },
    ],
  },
  {
    id: "technical-problems",
    title:
      "Did you experience any technical problems or barriers while using this form?",
    description:
      "Examples include a button not working, an error message you could not resolve, or difficulty using a screen reader or other assistive technology.",
    fields: [
      {
        name: "technicalProblems",
        label:
          "Did you experience any technical problems when using this form?",
        hidden: true,
        type: "radio",
        validation: {
          required: "Select yes or no",
        },
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        name: "technicalProblemsDescription",
        label: "Please briefly describe the problem you experienced",
        type: "textarea",
        validation: {
          required: "Please describe the problem you experienced",
          minLength: {
            value: 2,
            message: "Please provide at least 2 characters",
          },
        },
        conditionalOn: {
          field: "technicalProblems",
          value: "yes",
        },
      },
    ],
  },
  {
    id: "areas-for-improvement",
    title: "What is one thing we could do to improve this form?",
    description:
      "You can comment on anything, such as the questions, wording, layout, or how easy the form was to use.",
    fields: [
      {
        name: "areasForImprovement",
        label: "What is one thing we could do to improve this form?",
        hidden: true,
        type: "textarea",
        validation: {
          required: "Areas for improvement is required",
          minLength: {
            value: 10,
            message: "Please provide at least 10 characters",
          },
        },
      },
    ],
  },

  {
    id: "thank-you",
    title: "Thank you for your feedback",
    description: "Your feedback has been submitted successfully.",
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
  },
];
