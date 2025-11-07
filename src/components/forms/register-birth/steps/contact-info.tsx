"use client";

import { Typography } from "@/components/ui/typography";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { getFieldClassName } from "../../common/form-utils";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { contactInfoValidation } from "../schema";

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
};

/**
 * Step: Email and Phone
 * Collects contact information for follow-up
 * Based on PDF pages 6, 7, 15, and 17
 */
export function ContactInfo({
  email,
  wantContact: _wantContact,
  phoneNumber,
  onChange,
  onNext,
  onBack,
}: ContactInfoProps) {
  const titleRef = useStepFocus("Contact details", "Register a Birth");

  // Wrap onNext to set wantContact before proceeding
  const handleNext = () => {
    onChange("wantContact", "yes");
    onNext();
  };

  // Use generic validation hook
  const {
    errors,
    fieldErrors,
    handleChange: handleChangeInternal,
    handleBlur: handleBlurInternal,
    handleSubmit,
  } = useStepValidation({
    schema: contactInfoValidation,
    value: { email, phoneNumber },
    onChange: (val) => {
      if (val.email !== undefined) onChange("email", val.email);
      if (val.phoneNumber !== undefined)
        onChange("phoneNumber", val.phoneNumber);
    },
    onNext: handleNext,
  });

  const handleChange = (field: "email" | "phoneNumber", value: string) => {
    handleChangeInternal(field, value);
  };

  const handleBlur = (field: "email" | "phoneNumber") => {
    handleBlurInternal(field);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Contact details
      </h1>

      <ErrorSummary errors={errors} />

      <Typography className="mb-4 leading-tight" variant="paragraph">
        We ask for this information so we can send you confirmation and let you
        know what to do next.
      </Typography>

      {/* Email address */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="email"
        >
          Email address
        </label>
        <input
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          aria-invalid={fieldErrors.email ? true : undefined}
          className={getFieldClassName("email", fieldErrors)}
          id="email"
          onBlur={() => handleBlur("email")}
          onChange={(e) => handleChange("email", e.target.value)}
          type="email"
          value={email || ""}
        />
        <FormFieldError id="email" message={fieldErrors.email} />
      </div>

      {/* Phone number */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="phoneNumber"
        >
          Phone number
        </label>
        <input
          aria-describedby={
            fieldErrors.phoneNumber ? "phoneNumber-error" : undefined
          }
          aria-invalid={fieldErrors.phoneNumber ? true : undefined}
          className={getFieldClassName("phoneNumber", fieldErrors)}
          id="phoneNumber"
          onBlur={() => handleBlur("phoneNumber")}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          type="tel"
          value={phoneNumber || ""}
        />
        <FormFieldError id="phoneNumber" message={fieldErrors.phoneNumber} />
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
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90"
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
