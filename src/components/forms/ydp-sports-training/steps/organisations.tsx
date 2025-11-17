/**
 * Do you belong to any organisations?
 * Collects do you belong to any organisations?, name of the organisation
 */

import { Input, Radio, RadioGroup } from "@govtech-bb/react";
import { StepContainer, useStepValidation } from "@govtech-bb/forms";
import { organisationsValidation } from "../schema";

export type OrganisationsValue = {
  belongsToOrganisation?: string;
  organisationName?: string;
};

export type OrganisationsProps = {
  value: OrganisationsValue;
  onChange: (value: OrganisationsValue) => void;
  onNext: () => void;
  onBack: () => void;
};

export function Organisations({
  value,
  onChange,
  onNext,
  onBack,
}: OrganisationsProps) {
  const { errors, fieldErrors, handleChange, handleSubmit } = useStepValidation(
    {
      schema: organisationsValidation,
      value,
      onChange,
      onNext,
      fieldPrefix: "organisations-",
    }
  );

  return (
    <StepContainer
      errors={errors}
      formTitle="YDP Community Sports Training Programme"
      onBack={onBack}
      onSubmit={handleSubmit}
      title="Do you belong to any organisations?"
    >
      <RadioGroup
        error={fieldErrors.belongsToOrganisation}
        label="Do you belong to any organisations?"
        onValueChange={(value) => handleChange("belongsToOrganisation", value)}
        value={value.belongsToOrganisation || ""}
      >
        <Radio id="organisations-belongsToOrganisation-0" label="Yes" value="yes" />
        <Radio id="organisations-belongsToOrganisation-1" label="No" value="no" />
      </RadioGroup>

      {/* Conditional field - shown when belongsToOrganisation === "yes" */}
      {value.belongsToOrganisation === "yes" && (
        <div className="motion-safe:fade-in motion-safe:slide-in-from-top-2 pl-[20px] motion-safe:animate-in motion-safe:duration-200">
          <div className="border-neutral-grey border-l-8 border-solid pb-4 pl-[52px]">
            <Input
              aria-required="true"
              error={fieldErrors.organisationName}
              id="organisations-organisationName"
              label="Name of the organisation"
              onChange={(e) => handleChange("organisationName", e.target.value)}
              required
              value={value.organisationName || ""}
            />
          </div>
        </div>
      )}
    </StepContainer>
  );
}
