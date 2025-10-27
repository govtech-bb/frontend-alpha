"use client";

import { useEffect } from "react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import type {
  ChildDetails as ChildDetailsType,
  DetailsVariant,
} from "../types";

type ChildDetailsProps = {
  value: Partial<ChildDetailsType>;
  onChange: (value: Partial<ChildDetailsType>) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
  variant: DetailsVariant;
  prefillSurname?: string;
};

/**
 * Step: Child's Details
 * Collects information about the child being registered
 * Based on PDF pages 4 (with father) and 16 (without father)
 *
 * @param variant - 'with-father' or 'without-father' determines field labels
 * @param prefillSurname - Pre-filled from father or mother's surname
 */
export function ChildDetails({
  value,
  onChange,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
  variant,
  prefillSurname,
}: ChildDetailsProps) {
  const titleRef = useStepFocus(
    "Child's details",
    "Register a Birth",
    stepNumber,
    totalSteps
  );

  // Pre-fill lastName with surname if not already set
  // biome-ignore lint/correctness/useExhaustiveDependencies: Need value for spread operator, but tracking value.lastName specifically to prevent unnecessary runs when other fields change
  useEffect(() => {
    if (prefillSurname && !value.lastName) {
      onChange({ ...value, lastName: prefillSurname });
    }
  }, [prefillSurname, value.lastName, onChange, value]);

  const handleChange = (field: keyof ChildDetailsType, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      value.firstNames &&
      value.lastName &&
      value.dateOfBirth &&
      value.sexAtBirth &&
      value.parishOfBirth
    ) {
      onNext();
    }
  };

  const isValid =
    value.firstNames &&
    value.lastName &&
    value.dateOfBirth &&
    value.sexAtBirth &&
    value.parishOfBirth;

  // Labels change based on variant
  const firstNameLabel =
    variant === "with-father" ? "First name(s)" : "Christian name(s)";
  const middleNameLabel =
    variant === "with-father" ? "Middle name(s)" : "Middle name(s)";
  const lastNameLabel = variant === "with-father" ? "Last name" : "Surname";
  const surnameHint =
    variant === "with-father" ? "Father's surname" : "Mother's surname";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Child's details
      </h1>

      {/* First name(s) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-firstNames"
        >
          {firstNameLabel}
        </label>
        <input
          className="w-full max-w-lg rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-firstNames"
          onChange={(e) => handleChange("firstNames", e.target.value)}
          required
          type="text"
          value={value.firstNames || ""}
        />
      </div>

      {/* Middle name(s) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-middleNames"
        >
          {middleNameLabel}
        </label>
        <p className="mb-2 text-base text-gray-600">
          If they have more than one, add them in order
        </p>
        <input
          className="w-full max-w-lg rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-middleNames"
          onChange={(e) => handleChange("middleNames", e.target.value)}
          type="text"
          value={value.middleNames || ""}
        />
      </div>

      {/* Last name (prefilled) */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-lastName"
        >
          {lastNameLabel}
        </label>
        <input
          className="w-full max-w-lg rounded-md border-2 border-gray-300 bg-gray-100 px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:bg-white focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-lastName"
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder={surnameHint}
          required
          type="text"
          value={value.lastName || prefillSurname || ""}
        />
      </div>

      {/* Date of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-dateOfBirth"
        >
          Date of birth
        </label>
        <input
          className="w-full max-w-sm rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-dateOfBirth"
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          placeholder="DD/MM/YYYY"
          required
          type="text"
          value={value.dateOfBirth || ""}
        />
      </div>

      {/* Sex at birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-sexAtBirth"
        >
          Sex at birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          Do we need to say why we need to ask?
        </p>
        <input
          className="w-full max-w-lg rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-sexAtBirth"
          onChange={(e) => handleChange("sexAtBirth", e.target.value)}
          required
          type="text"
          value={value.sexAtBirth || ""}
        />
      </div>

      {/* Parish of birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-parishOfBirth"
        >
          Parish of birth
        </label>
        <input
          className="w-full max-w-lg rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="child-parishOfBirth"
          onChange={(e) => handleChange("parishOfBirth", e.target.value)}
          required
          type="text"
          value={value.parishOfBirth || ""}
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
