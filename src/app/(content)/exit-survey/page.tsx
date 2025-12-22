"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { INFORMATION_ARCHITECTURE } from "@/data/content-directory";
import { formSteps } from "@/schema/exit-survey";

function ExitSurveyFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [serviceTitle, setServiceTitle] = useState<string>("");

  useEffect(() => {
    const refId = searchParams.get("ref_id");

    // Redirect to homepage if ref_id is not set
    if (!refId) {
      router.push("/");
      return;
    }

    // Find the page title by matching the ref_id to the slug
    let foundTitle = "";
    for (const category of INFORMATION_ARCHITECTURE) {
      const page = category.pages.find((p) => p.slug === refId);
      if (page) {
        foundTitle = page.title;
        break;
      }
    }

    // If title not found, redirect to homepage
    if (!foundTitle) {
      router.push("/");
      return;
    }

    setServiceTitle(foundTitle);
  }, [searchParams, router]);

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
