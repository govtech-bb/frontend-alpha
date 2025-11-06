"use client";

import { Button, ErrorSummary } from "@/components/ds";
import { Typography } from "@/components/ui/typography";
import { FormFieldError } from "../../common/form-field-error";
import { getFieldClassName } from "../../common/form-utils";
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

      <ErrorSummary errors={errors} title="There is a problem" />

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

      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="numberOfCertificates"
        >
          Number of certificates required
        </label>
        <input
          aria-describedby={
            fieldErrors.numberOfCertificates
              ? "numberOfCertificates-error"
              : undefined
          }
          aria-invalid={fieldErrors.numberOfCertificates ? true : undefined}
          className={getFieldClassName("numberOfCertificates", fieldErrors)}
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
        <FormFieldError
          id="numberOfCertificates"
          message={fieldErrors.numberOfCertificates}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={onBack} type="button" variant="secondary">
          Back
        </Button>

        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
}
