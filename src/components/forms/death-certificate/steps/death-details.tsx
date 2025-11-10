/**
 * Step 3: Death Details
 * Collects deceased person's details including name, date of death, NRN, and place of death
 */

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Input } from "@govtech-bb/react";
import { DateInput } from "../../common/date-input";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { deathDetailsValidation } from "../schema";

export type DeathDetailsValue = {
  deceasedSurname?: string;
  deceasedChristianNames?: string;
  dateOfDeath?: string;
  deceasedNationalRegistrationNo?: string;
  placeOfDeath?: string;
};

export type DeathDetailsProps = {
  value: DeathDetailsValue;
  onChange: (value: DeathDetailsValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function DeathDetails({
  value,
  onChange,
  onNext,
  onBack,
}: DeathDetailsProps) {
  const titleRef = useStepFocus(
    "Death Certificate Details",
    "Death Certificate Application"
  );

  const { errors, fieldErrors, dateFieldErrors, handleChange, handleSubmit } =
    useStepValidation({
      schema: deathDetailsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "death-details-",
    });

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
              Death Certificate Details
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
            error={fieldErrors.deceasedSurname}
            id="death-details-deceasedSurname"
            label="Deceased's surname"
            onChange={(e) => handleChange("deceasedSurname", e.target.value)}
            required
            value={value.deceasedSurname || ""}
          />

          <Input
            aria-required="true"
            error={fieldErrors.deceasedChristianNames}
            hint="First and middle names"
            id="death-details-deceasedChristianNames"
            label="Deceased's Christian names"
            onChange={(e) =>
              handleChange("deceasedChristianNames", e.target.value)
            }
            required
            value={value.deceasedChristianNames || ""}
          />

          <DateInput
            aria-required="true"
            errors={dateFieldErrors.dateOfDeath}
            id="death-details-dateOfDeath"
            label="Date of death"
            onChange={(dateValue) => handleChange("dateOfDeath", dateValue)}
            required
            value={value.dateOfDeath || ""}
          />

          <Input
            aria-required="true"
            error={fieldErrors.deceasedNationalRegistrationNo}
            hint="For example, XYZ-789456"
            id="death-details-deceasedNationalRegistrationNo"
            label="Deceased's National Registration Number"
            onChange={(e) =>
              handleChange("deceasedNationalRegistrationNo", e.target.value)
            }
            required
            value={value.deceasedNationalRegistrationNo || ""}
          />

          <Input
            aria-required="true"
            error={fieldErrors.placeOfDeath}
            hint="For example, Queen Elizabeth Hospital, Bridgetown"
            id="death-details-placeOfDeath"
            label="Place of death"
            onChange={(e) => handleChange("placeOfDeath", e.target.value)}
            required
            value={value.placeOfDeath || ""}
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
