"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { ErrorSummary, type ValidationError } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { certificatesValidation } from "../schema";

type CertificatesProps = {
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Order Birth Certificates
 * Allows parents to order certified copies at registration time
 * Based on PDF pages 5 and 14
 */
export function Certificates({
  value,
  onChange,
  onNext,
  onBack,
}: CertificatesProps) {
  const titleRef = useStepFocus(
    "Order a birth certificate",
    "Register a Birth"
  );

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fieldError, setFieldError] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (newValue: number) => {
    onChange(newValue);

    // Clear error when user starts typing (after first submit)
    if (hasSubmitted) {
      validateField(newValue);
    }
  };

  const validateField = (fieldValue: number) => {
    const result = certificatesValidation.safeParse({
      numberOfCertificates: fieldValue,
    });

    if (result.success) {
      setFieldError("");
      setErrors([]);
    } else {
      const error = result.error.issues[0];
      setFieldError(error.message);
      setErrors([{ field: "numberOfCertificates", message: error.message }]);
    }
  };

  const handleBlur = () => {
    if (hasSubmitted) {
      validateField(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const result = certificatesValidation.safeParse({
      numberOfCertificates: value,
    });

    if (result.success) {
      setErrors([]);
      setFieldError("");
      onNext();
    } else {
      const error = result.error.issues[0];
      setFieldError(error.message);
      setErrors([{ field: "numberOfCertificates", message: error.message }]);
    }
  };

  const getFieldClassName = () => {
    const baseClass =
      "w-full max-w-md rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
    const errorClass = fieldError ? "border-red-600" : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Order a birth certificate
      </h1>

      <ErrorSummary errors={errors} />

      <Typography className="mb-4" variant="paragraph">
        A birth certificate is essential for access to some public services. You
        wil need to pay BDD$5.00 for each certificate when you collect them.
      </Typography>

      <Typography className="mb-4" variant="paragraph">
        We keep the original so you can order a certified copy at any point.
      </Typography>

      <Typography className="mb-4" variant="paragraph">
        The birth registration is free of charge.
      </Typography>

      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="numberOfCertificates"
        >
          Number of certificates required
        </label>
        <input
          aria-describedby={
            fieldError ? "numberOfCertificates-error" : undefined
          }
          aria-invalid={fieldError ? true : undefined}
          className={getFieldClassName()}
          id="numberOfCertificates"
          max="20"
          min="0"
          onBlur={handleBlur}
          onChange={(e) =>
            handleChange(Number.parseInt(e.target.value, 10) || 0)
          }
          type="number"
          value={value || 0}
        />
        <FormFieldError id="numberOfCertificates" message={fieldError} />
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
          Next
        </button>
      </div>
    </form>
  );
}
