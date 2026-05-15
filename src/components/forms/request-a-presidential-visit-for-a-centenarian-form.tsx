"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/request-a-presidential-visit-for-a-centenarian";

interface Props {
  notificationEmail?: string | null;
  notificationCc?: string | null;
}

export default function RequestAPresidentialVisitForACentenarianForm({
  notificationEmail = null,
  notificationCc = null,
}: Props = {}) {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      ministryName="Office of the President"
      notificationCc={notificationCc}
      notificationEmail={notificationEmail}
      serviceTitle="Request a Presidential Visit for a Centenarian"
      storageKey="request-a-presidential-visit-for-a-centenarian"
      submissionMode="serverActionOnly"
    />
  );
}
