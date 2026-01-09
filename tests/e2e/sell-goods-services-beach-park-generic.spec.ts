import { formSteps } from "@/schema/sell-goods-services-beach-park";
import { createFormTest, type FormTestConfig } from "./generic-form.spec";

/**
 * Sell Goods or Services at Beach or Park Form Test using Generic Test Framework
 */

const config: FormTestConfig = {
  schemaPath: "@/schema/sell-goods-services-beach-park",
  formUrl: "/work-employment/sell-goods-services-beach-park/form",
  formName: "Sell Goods or Services at Beach or Park",
};

createFormTest(config, formSteps);
