"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { getYouthOpportunityServiceCode } from "@/data/youth-opportunity-service-codes";
import { buildYouthOpportunityFormSteps } from "@/schema/youth-opportunity-default";

interface Props {
  opportunityId: string;
  opportunityTitle: string;
  notificationEmail: string | null;
  notificationCc?: string | null;
}

export function YouthOpportunityForm({
  opportunityId,
  opportunityTitle,
  notificationEmail,
  notificationCc = null,
}: Props) {
  const formSteps = buildYouthOpportunityFormSteps(opportunityTitle);
  const programmeCode = getYouthOpportunityServiceCode(opportunityId);

  return (
    <DynamicMultiStepForm
      analyticsCategory="youth-opportunities"
      confirmationFormId={opportunityId}
      continueOnEmailFailure
      formSteps={formSteps}
      ministryName="Ministry of Youth, Sports and Community Empowerment"
      notificationCc={notificationCc}
      notificationEmail={notificationEmail}
      serviceTitle={`Apply for ${opportunityTitle}`}
      storageKey={`youth-opportunity-${opportunityId}`}
      submissionMode="serverActionOnly"
      webhookProgrammeCode={programmeCode}
    />
  );
}
