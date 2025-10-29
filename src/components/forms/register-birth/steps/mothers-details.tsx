"use client";

import { useStepFocus } from "../../common/hooks/use-step-focus";
import type { PersonDetails, SimplifiedMotherDetails } from "../types";

type MothersDetailsProps = {
  value: Partial<PersonDetails | SimplifiedMotherDetails>;
  onChange: (value: Partial<PersonDetails | SimplifiedMotherDetails>) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber?: number;
  totalSteps?: number;
};

/**
 * Step: Mother's Details
 * Collects information about the mother
 */
export function MothersDetails({
  value,
  onChange,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: MothersDetailsProps) {
  const titleRef = useStepFocus(
    "Tell us about the child's mother",
    "Register a Birth",
    stepNumber,
    totalSteps
  );

  const handleChange = (
    field: keyof (PersonDetails | SimplifiedMotherDetails),
    fieldValue: string
  ) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      value.firstName &&
      value.lastName &&
      value.dateOfBirth &&
      value.address &&
      value.nationalRegistrationNumber
    ) {
      onNext();
    }
  };

  const isValid =
    value.firstName &&
    value.lastName &&
    value.dateOfBirth &&
    value.address &&
    value.nationalRegistrationNumber;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Tell us about the child's mother
      </h1>

      {/* First name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-firstName"
        >
          First name
        </label>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-firstName"
          onChange={(e) => handleChange("firstName", e.target.value)}
          required
          type="text"
          value={value.firstName || ""}
        />
      </div>

      {/* Middle name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-middleName"
        >
          Middle name(s)
        </label>
        <p className="mb-2 text-base text-gray-600">
          If they have more than one, add them in order
        </p>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-middleName"
          onChange={(e) => handleChange("middleName", e.target.value)}
          type="text"
          value={value.middleName || ""}
        />
      </div>

      {/* Last name */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-lastName"
        >
          Last name
        </label>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-lastName"
          onChange={(e) => handleChange("lastName", e.target.value)}
          required
          type="text"
          value={value.lastName || ""}
        />
      </div>

      {/* Had other surname */}
      <fieldset>
        <legend className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]">
          Has the mother had any other last name?
        </legend>
        <p className="mb-2 text-base text-gray-600">
          For example, a maiden name
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <input
              checked={value.hadOtherSurname === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="mother-hadOtherSurname-yes"
              name="mother-hadOtherSurname"
              onChange={() => handleChange("hadOtherSurname", "yes")}
              type="radio"
              value="yes"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="mother-hadOtherSurname-yes"
            >
              Yes
            </label>
          </div>

          <div className="flex items-start">
            <input
              checked={value.hadOtherSurname === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="mother-hadOtherSurname-no"
              name="mother-hadOtherSurname"
              onChange={() => handleChange("hadOtherSurname", "no")}
              type="radio"
              value="no"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="mother-hadOtherSurname-no"
            >
              No
            </label>
          </div>
        </div>

        {value.hadOtherSurname === "yes" && (
          <div className="mt-4">
            <label
              className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
              htmlFor="mother-otherSurname"
            >
              What was it
            </label>
            <input
              className="w-full max-w-sm rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
              id="mother-otherSurname"
              onChange={(e) => handleChange("otherSurname", e.target.value)}
              type="text"
              value={value.otherSurname || ""}
            />
          </div>
        )}
      </fieldset>

      {/* Date of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-dateOfBirth"
        >
          Date of birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          For example, 30 July 1986
        </p>
        <input
          className="w-full max-w-xs rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-dateOfBirth"
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          placeholder="DD/MM/YYYY"
          required
          type="text"
          value={value.dateOfBirth || ""}
        />
      </div>

      {/* Address */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-address"
        >
          Current address
        </label>
        <textarea
          className="w-full max-w-md resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-address"
          onChange={(e) => handleChange("address", e.target.value)}
          required
          rows={3}
          value={value.address || ""}
        />
      </div>

      {/* National registration number */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-nationalRegistrationNumber"
        >
          National registration number
        </label>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-nationalRegistrationNumber"
          onChange={(e) =>
            handleChange("nationalRegistrationNumber", e.target.value)
          }
          required
          type="text"
          value={value.nationalRegistrationNumber || ""}
        />
      </div>

      {/* Occupation (optional) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="mother-occupation"
        >
          Occupation{" "}
          <span className="font-normal text-gray-600">(optional)</span>
        </label>
        <p className="mb-2 text-base text-gray-600">
          This will be included on the child's birth certificate and in official
          records.
        </p>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="mother-occupation"
          onChange={(e) => handleChange("occupation", e.target.value)}
          type="text"
          value={value.occupation || ""}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="rounded bg-gray-300 px-6 py-3 font-normal text-neutral-black text-xl transition-all hover:bg-gray-400"
          onClick={onBack}
          type="button"
        >
          Back
        </button>

        <button
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!isValid}
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
