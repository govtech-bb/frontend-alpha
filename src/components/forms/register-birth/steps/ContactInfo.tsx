"use client";

import { useStepFocus } from "../useStepFocus";

type ContactInfoProps = {
  email: string;
  wantContact: "yes" | "no" | "";
  phoneNumber: string;
  onChange: (
    field: "email" | "wantContact" | "phoneNumber",
    value: string
  ) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
};

/**
 * Step: Email and Phone
 * Collects contact information for follow-up
 * Based on PDF pages 6, 7, 15, and 17
 */
export function ContactInfo({
  email,
  wantContact,
  phoneNumber,
  onChange,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: ContactInfoProps) {
  const titleRef = useStepFocus("Contact information", stepNumber, totalSteps);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email is provided
    if (email) {
      // If user wants contact, phone is required
      if (wantContact === "yes" && !phoneNumber) {
        return;
      }
      onNext();
    }
  };

  const isValid =
    email && (wantContact === "no" || (wantContact === "yes" && phoneNumber));

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Email and phone pls
      </h1>

      <p className="text-base text-gray-600">Words that do a help</p>

      {/* Email address */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="email"
        >
          Email address
        </label>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="email"
          onChange={(e) => onChange("email", e.target.value)}
          required
          type="email"
          value={email || ""}
        />
      </div>

      {/* Want contact */}
      <fieldset>
        <legend className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]">
          Do you want us to get in touch if we need to ask more questions or
          summink
        </legend>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              checked={wantContact === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="wantContact-yes"
              name="wantContact"
              onChange={() => onChange("wantContact", "yes")}
              type="radio"
              value="yes"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="wantContact-yes"
            >
              Yes
            </label>
          </div>

          <div className="flex items-start">
            <input
              checked={wantContact === "no"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="wantContact-no"
              name="wantContact"
              onChange={() => onChange("wantContact", "no")}
              type="radio"
              value="no"
            />
            <label
              className="ml-3 block font-normal text-[20px] text-neutral-black leading-[150%]"
              htmlFor="wantContact-no"
            >
              No
            </label>
          </div>
        </div>
      </fieldset>

      {/* Phone number (conditional) */}
      {wantContact === "yes" && (
        <div>
          <label
            className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
            htmlFor="phoneNumber"
          >
            Phone number
          </label>
          <input
            className="w-full max-w-sm rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
            id="phoneNumber"
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            required={wantContact === "yes"}
            type="tel"
            value={phoneNumber || ""}
          />
        </div>
      )}

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
