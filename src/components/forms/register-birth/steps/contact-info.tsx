"use client";

import { Button, ErrorSummary, Input } from "@/components/ds";
import { Typography } from "@/components/ui/typography";
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

      <ErrorSummary errors={errors} title="There is a problem" />

      <Typography className="mb-4 leading-tight" variant="paragraph">
        We ask for this information so we can send you confirmation and let you
        know what to do next.
      </Typography>

      {/* Email address */}
      <div>
        <Input
          error={fieldErrors.email}
          id="email"
          label="Email address"
          onBlur={() => handleBlur("email")}
          onChange={(e) => handleChange("email", e.target.value)}
          type="email"
          value={email || ""}
        />
      </div>

      {/* Phone number */}
      <div>
        <Input
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

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
}
