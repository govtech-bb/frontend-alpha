"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { ErrorSummary, type ValidationError } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import {
  contactInfoValidation,
  contactInfoValidationWithPhone,
} from "../schema";

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
  wantContact,
  phoneNumber,
  onChange,
  onNext,
  onBack,
}: ContactInfoProps) {
  const titleRef = useStepFocus("Contact details", "Register a Birth");

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (
    field: "email" | "wantContact" | "phoneNumber",
    value: string
  ) => {
    onChange(field, value);

    // Clear error for this field when user starts typing (after first submit)
    if (hasSubmitted) {
      validateField(field, value);
    }
  };

  const validateField = (
    field: "email" | "wantContact" | "phoneNumber",
    value: string
  ) => {
    const testValue = {
      email: field === "email" ? value : email,
      wantContact: field === "wantContact" ? value : wantContact,
      phoneNumber: field === "phoneNumber" ? value : phoneNumber,
    };

    // Use conditional schema based on wantContact
    const schema =
      testValue.wantContact === "yes"
        ? contactInfoValidationWithPhone
        : contactInfoValidation;

    const result = schema.safeParse(testValue);

    if (result.success) {
      // Clear error for this field
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
      setErrors((prev) => prev.filter((e) => e.field !== field));
    } else {
      // Set error for this field
      const fieldError = result.error.issues.find((e) => e.path[0] === field);
      if (fieldError) {
        setFieldErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        setErrors((prev) => {
          const filtered = prev.filter((e) => e.field !== field);
          return [...filtered, { field, message: fieldError.message }];
        });
      }
    }
  };

  const handleBlur = (field: "email" | "wantContact" | "phoneNumber") => {
    if (hasSubmitted) {
      validateField(
        field,
        field === "email"
          ? email
          : field === "phoneNumber"
            ? phoneNumber
            : wantContact
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const formData = { email, wantContact, phoneNumber };

    // Use conditional schema
    const schema =
      wantContact === "yes"
        ? contactInfoValidationWithPhone
        : contactInfoValidation;

    const result = schema.safeParse(formData);

    if (result.success) {
      setErrors([]);
      setFieldErrors({});
      onNext();
    } else {
      // Build error list for summary and field errors
      const validationErrors: ValidationError[] = [];
      const newFieldErrors: Record<string, string> = {};

      for (const error of result.error.issues) {
        const field = error.path[0] as string;
        validationErrors.push({
          field,
          message: error.message,
        });
        newFieldErrors[field] = error.message;
      }

      setErrors(validationErrors);
      setFieldErrors(newFieldErrors);
    }
  };

  const getFieldClassName = (field: string) => {
    const baseClass =
      "w-full max-w-md rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
    const errorClass = fieldErrors[field]
      ? "border-red-600"
      : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Contact details
      </h1>

      <ErrorSummary errors={errors} />

      <Typography className="mb-4" variant="paragraph">
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
          className={getFieldClassName("email")}
          id="email"
          onBlur={() => handleBlur("email")}
          onChange={(e) => handleChange("email", e.target.value)}
          type="email"
          value={email || ""}
        />
        <FormFieldError id="email" message={fieldErrors.email} />
      </div>

      {/* Want contact */}
      <fieldset>
        <legend className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]">
          Do you want us to get in touch if we need to ask more questions
        </legend>

        <div className="space-y-3">
          <div className="flex items-start">
            <input
              checked={wantContact === "yes"}
              className="mt-1 size-5 border-2 border-gray-400 text-[#1E787D] focus:ring-2 focus:ring-[#1E787D]"
              id="wantContact-yes"
              name="wantContact"
              onChange={() => handleChange("wantContact", "yes")}
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
              onChange={() => handleChange("wantContact", "no")}
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
        <FormFieldError id="wantContact" message={fieldErrors.wantContact} />
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
            aria-describedby={
              fieldErrors.phoneNumber ? "phoneNumber-error" : undefined
            }
            aria-invalid={fieldErrors.phoneNumber ? true : undefined}
            className="w-full max-w-sm rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
            id="phoneNumber"
            onBlur={() => handleBlur("phoneNumber")}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            type="tel"
            value={phoneNumber || ""}
          />
          <FormFieldError id="phoneNumber" message={fieldErrors.phoneNumber} />
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
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
}
