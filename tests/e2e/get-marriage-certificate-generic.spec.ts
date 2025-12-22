import { formSteps } from "@/schema/get-marriage-certificate";
import { createFormTest, type FormTestConfig } from "./generic-form.spec";

/**
 * Marriage Certificate Form Test using Generic Test Framework
 */

const config: FormTestConfig = {
  schemaPath: "@/schema/get-marriage-certificate",
  formUrl: "/family-birth-relationships/get-marriage-certificate/form",
  formName: "Get Marriage Certificate",
};

createFormTest(config, formSteps);
