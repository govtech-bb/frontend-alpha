"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Input } from "@govtech-bb/react";
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

  // Convert ValidationError[] to ErrorItem[] for ErrorSummary
  const errorItems: ErrorItem[] = errors.map((error) => ({
    text: error.message,
    target: error.field,
  }));

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
            className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
            ref={titleRef}
            tabIndex={-1}
          >
            Order a birth certificate
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
              Each certificate costs BDS $5 and you can pay when you collect it
              in person.
            </p>
            <p>
              A birth certificate is essential for the parent or guardian to
              access many public services on the child's behalf.
            </p>
            <p>
              You can order certified copies at a later date if the birth was
              registered in Barbados.
            </p>
          </div>

          <Input
            className="lg:w-80"
            error={fieldErrors.numberOfCertificates}
            id="numberOfCertificates"
            inputMode="numeric"
            label="How many certificates would you like?"
            max="20"
            min="0"
            onBlur={handleBlur}
            onChange={(e) =>
              handleChange(Number.parseInt(e.target.value, 10) || 0)
            }
            pattern="[0-9]*"
            type="text"
            value={value || 0}
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
