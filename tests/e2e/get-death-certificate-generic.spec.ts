import { formSteps } from "@/schema/get-death-certificate";
import { createFormTest, type FormTestConfig } from "./generic-form.spec";

/**
 * Death Certificate Form Test using Generic Test Framework
 */

const config: FormTestConfig = {
  schemaPath: "@/schema/get-death-certificate",
  formUrl: "/family-birth-relationships/get-death-certificate/form",
  formName: "Get Death Certificate",
};

createFormTest(config, formSteps);
