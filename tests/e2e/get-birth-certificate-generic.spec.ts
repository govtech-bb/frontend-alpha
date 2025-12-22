import { formSteps } from "@/schema/get-birth-certificate";
import { createFormTest, type FormTestConfig } from "./generic-form.spec";

/**
 * Birth Certificate Form Test using Generic Test Framework
 */

const config: FormTestConfig = {
  schemaPath: "@/schema/get-birth-certificate",
  formUrl: "/family-birth-relationships/get-birth-certificate/form",
  formName: "Get Birth Certificate",
};

createFormTest(config, formSteps);
