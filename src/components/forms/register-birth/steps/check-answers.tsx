"use client";

import { Typography } from "@/components/ui/typography";
import { formatDateForDisplay } from "@/lib/date-display";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { finalSubmissionSchema } from "../schema";
import type { PartialBirthRegistrationFormData, StepName } from "../types";

type CheckAnswersProps = {
  formData: PartialBirthRegistrationFormData;
  onSubmit: () => void;
  onBack: () => void;
  onEdit: (step: StepName) => void;
  submissionError?: string | null;
  isSubmitting?: boolean;
};

/**
 * Step: Check Your Answers
 * Summary page showing all entered data with edit links
 * Based on PDF pages 8 and 18
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex form rendering logic is necessary for this component
export function CheckAnswers({
  formData,
  onSubmit,
  onBack,
  onEdit,
  submissionError,
  isSubmitting = false,
}: CheckAnswersProps) {
  const titleRef = useStepFocus("Check your answers", "Register a Birth");

  // Validate form data against final submission schema
  const validationResult = finalSubmissionSchema.safeParse(formData);
  const hasMissingData = !validationResult.success;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate again on submit
    const result = finalSubmissionSchema.safeParse(formData);
    if (!result.success) {
      // Navigate back if validation fails
      onBack();
      return;
    }

    onSubmit();
  };

  const hasFather =
    formData.marriageStatus === "yes" ||
    formData.includeFatherDetails === "yes";

  // Each certificate costs $5 BBD
  const totalCost = (formData.numberOfCertificates || 0) * 5.0;

  // Show error if required data is missing (e.g., user navigated here incorrectly)
  if (hasMissingData) {
    return (
      <div className="space-y-6">
        <h1
          className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
          ref={titleRef}
          tabIndex={-1}
        >
          Check your answers
        </h1>

        <div className="border-4 border-red-600 p-4">
          <h2 className="mb-2 font-bold text-red-600 text-xl">
            Missing or invalid information
          </h2>
          <Typography variant="paragraph">
            Some required information is missing or invalid. Please go back and
            complete all steps correctly.
          </Typography>

          {/* Show specific validation errors */}
          {validationResult.error && (
            <ul className="mt-4 list-disc space-y-1 pl-5">
              {validationResult.error.issues.slice(0, 5).map((issue, index) => (
                <li className="text-red-600" key={index}>
                  {issue.path.join(".")}: {issue.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="rounded bg-gray-300 px-6 py-3 font-normal text-neutral-black text-xl transition-all hover:bg-gray-400"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Check your answers
      </h1>

      <Typography className="mb-4" variant="paragraph">
        Review the answers you've given carefully.
      </Typography>

      <Typography className="mb-6" variant="paragraph">
        Incorrect information may be difficult to change after registration.
      </Typography>

      {/* Father's details (if included) */}
      {hasFather && formData.father && (
        <div className="border-gray-300 border-b pb-6">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="font-bold text-2xl">
              Tell us about the child's father
            </h2>
            <button
              className="text-[#1E787D] underline hover:text-[#1E787D]/80"
              onClick={() => onEdit("father-details")}
              type="button"
            >
              Change
            </button>
          </div>

          <dl className="space-y-2">
            <div className="flex">
              <dt className="w-1/3">First name</dt>
              <dd className="w-2/3">{formData.father.firstName}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3">Middle name(s)</dt>
              <dd className="w-2/3">{formData.father.middleName}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3">Last name</dt>
              <dd className="w-2/3">{formData.father.lastName}</dd>
            </div>
            <div className="flex">
              <dt className="w-1/3">Date of birth</dt>
              <dd className="w-2/3">
                {formatDateForDisplay(formData.father.dateOfBirth)}
              </dd>
            </div>
            <div className="flex">
              <dt className="w-1/3">Current address</dt>
              <dd className="w-2/3 whitespace-pre-line">
                {formData.father.address}
              </dd>
            </div>
            {formData.father.nationalRegistrationNumber && (
              <div className="flex">
                <dt className="w-1/3">National registration number</dt>
                <dd className="w-2/3">
                  {formData.father.nationalRegistrationNumber}
                </dd>
              </div>
            )}
            {formData.father.passportNumber && (
              <div className="flex">
                <dt className="w-1/3">Passport number</dt>
                <dd className="w-2/3">{formData.father.passportNumber}</dd>
              </div>
            )}
            <div className="flex">
              <dt className="w-1/3">Occupation</dt>
              <dd className="w-2/3">{formData.father.occupation}</dd>
            </div>
          </dl>
        </div>
      )}

      {/* Mother's details */}
      <div className="border-gray-300 border-b pb-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="font-bold text-2xl">
            Tell us about the child's mother
          </h2>
          <button
            className="text-[#1E787D] underline hover:text-[#1E787D]/80"
            onClick={() => onEdit("mother-details")}
            type="button"
          >
            Change
          </button>
        </div>

        <dl className="space-y-2">
          <div className="flex">
            <dt className="w-1/3">First name</dt>
            <dd className="w-2/3">{formData.mother?.firstName}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Middle name(s)</dt>
            <dd className="w-2/3">{formData.mother?.middleName}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Last name</dt>
            <dd className="w-2/3">{formData.mother?.lastName}</dd>
          </div>
          {formData.mother?.hadOtherSurname === "yes" &&
            formData.mother?.otherSurname && (
              <div className="flex">
                <dt className="w-1/3">Previous last name</dt>
                <dd className="w-2/3">{formData.mother.otherSurname}</dd>
              </div>
            )}
          <div className="flex">
            <dt className="w-1/3">Date of birth</dt>
            <dd className="w-2/3">
              {formData.mother?.dateOfBirth &&
                formatDateForDisplay(formData.mother.dateOfBirth)}
            </dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Current address</dt>
            <dd className="w-2/3 whitespace-pre-line">
              {formData.mother?.address}
            </dd>
          </div>
          {formData.mother?.nationalRegistrationNumber && (
            <div className="flex">
              <dt className="w-1/3">National registration number</dt>
              <dd className="w-2/3">
                {formData.mother.nationalRegistrationNumber}
              </dd>
            </div>
          )}
          {formData.mother?.passportNumber && (
            <div className="flex">
              <dt className="w-1/3">Passport number</dt>
              <dd className="w-2/3">{formData.mother.passportNumber}</dd>
            </div>
          )}
          <div className="flex">
            <dt className="w-1/3">Occupation</dt>
            <dd className="w-2/3">{formData.mother?.occupation}</dd>
          </div>
        </dl>
      </div>

      {/* Child's details */}
      <div className="border-gray-300 border-b pb-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="font-bold text-2xl">Tell us about the child</h2>
          <button
            className="text-[#1E787D] underline hover:text-[#1E787D]/80"
            onClick={() => onEdit("child-details")}
            type="button"
          >
            Change
          </button>
        </div>

        <dl className="space-y-2">
          <div className="flex">
            <dt className="w-1/3">First name</dt>
            <dd className="w-2/3">{formData.child?.firstNames}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Middle name(s)</dt>
            <dd className="w-2/3">{formData.child?.middleNames}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Last name</dt>
            <dd className="w-2/3">{formData.child?.lastName}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Date of birth</dt>
            <dd className="w-2/3">
              {formData.child?.dateOfBirth &&
                formatDateForDisplay(formData.child.dateOfBirth)}
            </dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Sex at birth</dt>
            <dd className="w-2/3">{formData.child?.sexAtBirth}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Place of birth</dt>
            <dd className="w-2/3">{formData.child?.parishOfBirth}</dd>
          </div>
        </dl>
      </div>

      {/* Certificates */}
      <div className="border-gray-300 border-b pb-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="font-bold text-2xl">Certificates</h2>
          <button
            className="text-[#1E787D] underline hover:text-[#1E787D]/80"
            onClick={() => onEdit("certificates")}
            type="button"
          >
            Change
          </button>
        </div>

        <dl className="space-y-2">
          <div className="flex">
            <dt className="w-1/3">Number ordered</dt>
            <dd className="w-2/3">{formData.numberOfCertificates || 0}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Total cost</dt>
            <dd className="w-2/3">
              {totalCost === 0 ? "Free" : `BBD$${totalCost.toFixed(2)}`}
            </dd>
          </div>
        </dl>
      </div>

      {/* Contact information */}
      <div className="border-gray-300 border-b pb-6">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="font-bold text-2xl">Contact information</h2>
          <button
            className="text-[#1E787D] underline hover:text-[#1E787D]/80"
            onClick={() => onEdit("contact-info")}
            type="button"
          >
            Change
          </button>
        </div>

        <dl className="space-y-2">
          <div className="flex">
            <dt className="w-1/3">Email address</dt>
            <dd className="w-2/3">{formData.email}</dd>
          </div>
          {formData.wantContact === "yes" && formData.phoneNumber && (
            <div className="flex">
              <dt className="w-1/3">Phone number</dt>
              <dd className="w-2/3">{formData.phoneNumber}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Submission error display */}
      {submissionError && (
        <div className="border-4 border-red-600 p-4">
          <h2 className="mb-2 font-bold text-red-600 text-xl">
            Submission failed
          </h2>
          <Typography variant="paragraph">{submissionError}</Typography>
          <Typography className="mt-2" variant="paragraph">
            Please try again or contact support if the problem persists.
          </Typography>
        </div>
      )}

      <div className="flex gap-4">
        <button
          className="rounded bg-gray-300 px-6 py-3 font-normal text-neutral-black text-xl transition-all hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          onClick={onBack}
          type="button"
        >
          Back
        </button>

        <button
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Confirm and send"}
        </button>
      </div>
    </form>
  );
}
