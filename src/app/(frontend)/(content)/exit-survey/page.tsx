"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { useInformationArchitecture } from "@/components/information-architecture-provider";
import { formSteps } from "@/schema/exit-survey";

function ExitSurveyFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const informationArchitecture = useInformationArchitecture();
  const [serviceTitle, setServiceTitle] = useState<string>("");

  useEffect(() => {
    const refId = searchParams.get("ref_id");

    if (!refId) {
      router.push("/");
      return;
    }

    let foundTitle = "";
    for (const category of informationArchitecture) {
      const page = category.pages.find((p) => p.slug === refId);
      if (page) {
        foundTitle = page.title;
        break;
      }
    }

    if (!foundTitle) {
      router.push("/");
      return;
    }

    setServiceTitle(foundTitle);
  }, [searchParams, router, informationArchitecture]);

  // Don't render the form until we have a service title
  if (!serviceTitle) {
    return null;
  }

  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle={serviceTitle}
      storageKey="exit-survey"
    />
  );
}

export default function ExitSurveyForm() {
  return (
    <Suspense fallback={null}>
      <ExitSurveyFormContent />
    </Suspense>
  );
}
