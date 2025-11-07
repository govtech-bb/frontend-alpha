"use client";

import { Button, Input } from "@govtech-bb/react";
import { Typography } from "@/components/ui/typography";
import { ErrorSummary } from "../../common/error-summary";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
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

  // Use generic validation hook with object wrapper
  const {
    errors,
    fieldErrors,
    handleChange: handleChangeInternal,
    handleBlur: handleBlurInternal,
    handleSubmit,
  } = useStepValidation({
    schema: certificatesValidation,
    value: { numberOfCertificates: value },
    onChange: (val) => onChange(val.numberOfCertificates || 0),
    onNext,
  });

  const handleChange = (newValue: number) => {
    handleChangeInternal("numberOfCertificates", newValue);
  };

  const handleBlur = () => {
    handleBlurInternal("numberOfCertificates");
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Order a birth certificate
      </h1>

      <ErrorSummary errors={errors} />

      <Typography className="mb-4 leading-tight" variant="paragraph">
        A birth certificate is essential for access to some public services.
        Each certificate costs BDD$5.00 when you collect them.
      </Typography>

      <Typography className="mb-4 leading-tight" variant="paragraph">
        We keep the original so you can order a certified copy at any point.
      </Typography>

      <Typography className="mb-4 leading-tight" variant="paragraph">
        The birth registration is free of charge.
      </Typography>

      <Input
        error={fieldErrors.numberOfCertificates}
        id="numberOfCertificates"
        label="Number of certificates required"
        max="20"
        min="0"
        onBlur={handleBlur}
        onChange={(e) => handleChange(Number.parseInt(e.target.value, 10) || 0)}
        type="number"
        value={value || 0}
      />

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
