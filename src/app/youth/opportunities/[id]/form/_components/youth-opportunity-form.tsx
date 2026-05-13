"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { buildYouthOpportunityFormSteps } from "@/schema/youth-opportunity-default";

interface Props {
  opportunityId: string;
  opportunityTitle: string;
  notificationEmail: string | null;
}

export function YouthOpportunityForm({
  opportunityId,
  opportunityTitle,
  notificationEmail,
}: Props) {
  const formSteps = buildYouthOpportunityFormSteps(opportunityTitle);

  return (
    <DynamicMultiStepForm
      analyticsCategory="youth-opportunities"
      confirmationFormId={opportunityId}
      formSteps={formSteps}
      ministryName="Ministry of Youth, Sports and Community Empowerment"
      notificationEmail={notificationEmail}
      serviceTitle={`Apply for ${opportunityTitle}`}
      storageKey={`youth-opportunity-${opportunityId}`}
      submissionMode="serverActionOnly"
    />
  );
}
