"use client";

import DynamicMultiStepForm from "@/components/forms/builder/multi-step-form";
import { formSteps } from "@/schema/sell-goods-services-beach-park";

export default function SellGoodsOrServicesBeachParkForm() {
  return (
    <DynamicMultiStepForm
      formSteps={formSteps}
      serviceTitle="Apply to sell goods or services at a beach or park"
      storageKey="sell-goods-services-beach-park"
    />
  );
}
