"use client";

import { Button, Input } from "@/components/ds";
import { validateDateFields } from "@/lib/date-validation";
import { DateInput } from "../../common/date-input";
import { ErrorSummary } from "../../common/error-summary";
import { FormFieldError } from "../../common/form-field-error";
import { getFieldClassName } from "../../common/form-utils";
import { useStepFocus } from "../../common/hooks/use-step-focus";
import { useStepValidation } from "../../common/hooks/use-step-validation";
import { childDetailsValidation } from "../schema";
import type { ChildDetails as ChildDetailsType } from "../types";

type ChildDetailsProps = {
  value: Partial<ChildDetailsType>;
  onChange: (value: Partial<ChildDetailsType>) => void;
  onNext: () => void;
  onBack: () => void;
};

/**
 * Step: Child's Details
 * Collects information about the child being registered
 */
export function ChildDetails({
  value,
  onChange,
  onNext,
  onBack,
}: ChildDetailsProps) {
  const titleRef = useStepFocus("Tell us about the child", "Register a Birth");

  // Use generic validation hook
  const {
    errors,
    fieldErrors,
    hasSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useStepValidation({
    schema: childDetailsValidation,
    value,
    onChange,
    onNext,
    fieldPrefix: "child-",
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1
        className="mb-6 font-bold text-5xl leading-tight focus:outline-none"
        ref={titleRef}
        tabIndex={-1}
      >
        Tell us about the child
      </h1>

      <ErrorSummary errors={errors} />

      {/* First name(s) */}
      <div>
        <Input
          error={fieldErrors.firstNames}
          id="child-firstNames"
          label="First name"
          onBlur={() => handleBlur("firstNames")}
          onChange={(e) => handleChange("firstNames", e.target.value)}
          type="text"
          value={value.firstNames || ""}
        />
      </div>

      {/* Middle name(s) */}
      <div>
        <Input
          description="If they have more than one, add them in order"
          id="child-middleNames"
          label="Middle name(s)"
          onChange={(e) => handleChange("middleNames", e.target.value)}
          type="text"
          value={value.middleNames || ""}
        />
      </div>

      {/* Last name (prefilled) */}
      <div>
        <Input
          error={fieldErrors.lastName}
          id="child-lastName"
          label="Last name"
          onBlur={() => handleBlur("lastName")}
          onChange={(e) => handleChange("lastName", e.target.value)}
          type="text"
          value={value.lastName || ""}
        />
      </div>

      {/* Date of birth */}
      <DateInput
        errors={
          hasSubmitted
            ? (validateDateFields(value.dateOfBirth || "") ?? undefined)
            : undefined
        }
        hint="For example, 27 3 2007"
        id="child-dateOfBirth"
        label="Date of birth"
        onBlur={() => handleBlur("dateOfBirth")}
        onChange={(dateValue) => handleChange("dateOfBirth", dateValue)}
        value={value.dateOfBirth || ""}
      />

      {/* Sex at birth */}
      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="child-sexAtBirth"
        >
          Sex at birth
        </label>
        <p className="mb-2 text-base text-gray-600">
          We ask this so that we can monitor population trends.
        </p>
        <select
          aria-describedby={
            fieldErrors.sexAtBirth ? "child-sexAtBirth-error" : undefined
          }
          aria-invalid={fieldErrors.sexAtBirth ? true : undefined}
          className={getFieldClassName("sexAtBirth", fieldErrors)}
          id="child-sexAtBirth"
          onBlur={() => handleBlur("sexAtBirth")}
          onChange={(e) => handleChange("sexAtBirth", e.target.value)}
          value={value.sexAtBirth || ""}
        >
          <option value="">Select an option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Intersex">Intersex</option>
        </select>
        <FormFieldError
          id="child-sexAtBirth"
          message={fieldErrors.sexAtBirth}
        />
      </div>

      {/* Place of birth */}
      <div>
        <Input
          description="Include the town and parish in your answer. For example, Queen Elizabeth Hospital, Bridgetown, St. Michael. Or a home address if they were born at home."
          error={fieldErrors.parishOfBirth}
          id="child-parishOfBirth"
          label="Place of birth"
          onBlur={() => handleBlur("parishOfBirth")}
          onChange={(e) => handleChange("parishOfBirth", e.target.value)}
          type="text"
          value={value.parishOfBirth || ""}
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
