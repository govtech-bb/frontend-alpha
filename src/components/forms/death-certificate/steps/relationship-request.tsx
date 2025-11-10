/**
 * Step 2: Relationship & Request Details
 * Collects relationship to deceased, reason for request, number of certificates, and cause of death
 */

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Input, TextArea } from "@govtech-bb/react";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { relationshipRequestValidation } from "../schema";

export type RelationshipRequestValue = {
  relationshipToDeceased?: string;
  reasonForRequest?: string;
  numberOfCertificates?: number;
  causeOfDeath?: string;
};

export type RelationshipRequestProps = {
  value: RelationshipRequestValue;
  onChange: (value: RelationshipRequestValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function RelationshipRequest({
  value,
  onChange,
  onNext,
  onBack,
}: RelationshipRequestProps) {
  const titleRef = useStepFocus(
    "Relationship and Request Details",
    "Death Certificate Application"
  );

  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: relationshipRequestValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "relationship-request-",
    }
  );

  // Map ValidationError[] to ErrorItem[] for @govtech-bb/react ErrorSummary
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
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="col-span-2 flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="pt-2 lg:pt-0">
            <h1
              className="mb-4 font-bold text-[56px] leading-[1.15] lg:mb-2"
              ref={titleRef}
              tabIndex={-1}
            >
              Relationship and Request Details
            </h1>

            {errorItems.length > 0 && (
              <ErrorSummary
                errors={errorItems}
                onErrorClick={handleErrorClick}
                title="There is a problem"
              />
            )}
          </div>

          <Input
            aria-required="true"
            error={fieldErrors.relationshipToDeceased}
            hint="For example, spouse, child, parent, sibling, executor"
            id="relationship-request-relationshipToDeceased"
            label="Your relationship to the deceased"
            onChange={(e) =>
              handleChange("relationshipToDeceased", e.target.value)
            }
            required
            value={value.relationshipToDeceased || ""}
          />

          <TextArea
            aria-required="true"
            error={fieldErrors.reasonForRequest}
            id="relationship-request-reasonForRequest"
            label="Reason for requesting this certificate"
            onChange={(e) => handleChange("reasonForRequest", e.target.value)}
            required
            rows={3}
            value={value.reasonForRequest || ""}
          />

          <Input
            aria-required="true"
            error={fieldErrors.numberOfCertificates}
            hint="You can request between 1 and 10 certificates"
            id="relationship-request-numberOfCertificates"
            label="Number of certificates required"
            max={10}
            min={1}
            onChange={(e) => {
              const numValue =
                e.target.value === ""
                  ? undefined
                  : Number.parseInt(e.target.value, 10);
              handleChange("numberOfCertificates", numValue);
            }}
            required
            type="number"
            value={value.numberOfCertificates?.toString() || ""}
          />

          <Input
            aria-required="true"
            error={fieldErrors.causeOfDeath}
            id="relationship-request-causeOfDeath"
            label="Cause of death"
            onChange={(e) => handleChange("causeOfDeath", e.target.value)}
            required
            value={value.causeOfDeath || ""}
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
