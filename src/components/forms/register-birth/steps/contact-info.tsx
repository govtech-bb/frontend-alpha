"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Input } from "@govtech-bb/react";
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

  // Convert ValidationError[] to ErrorItem[] for ErrorSummary
  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

  const handleChange = (field: "email" | "phoneNumber", value: string) => {
    handleChangeInternal(field, value);
  };

  const handleBlur = (field: "email" | "phoneNumber") => {
    handleBlurInternal(field);
  };

  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <form
      className="container space-y-8 pt-8 pb-8 lg:grid lg:grid-cols-3 lg:pb-16"
      onSubmit={handleSubmit}
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <h1
            className="mb-4 font-bold text-[56px] leading-[1.15] focus:outline-none lg:mb-2"
            ref={titleRef}
            tabIndex={-1}
          >
            Contact details
          </h1>

          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              title="There is a problem"
            />
          )}

          <div className="space-y-4 font-normal text-[20px] leading-[1.7]">
            <p>
              We ask for this information so we can send you confirmation and
              let you know what to do next.
            </p>
          </div>

          {/* Email address */}
          <Input
            className="lg:w-80"
            error={fieldErrors.email}
            id="email"
            label="Email address"
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleChange("email", e.target.value)}
            type="email"
            value={email || ""}
          />

          {/* Phone number */}
          <Input
            className="lg:w-80"
            error={fieldErrors.phoneNumber}
            id="phoneNumber"
            label="Phone number"
            onBlur={() => handleBlur("phoneNumber")}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            type="tel"
            value={phoneNumber || ""}
          />
        </div>
        <div className="flex gap-4">
          <Button onClick={onBack} type="button" variant="secondary">
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
}
