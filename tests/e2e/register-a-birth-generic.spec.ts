import { formSteps } from "@/schema/register-a-birth";
import { createFormTest, type FormTestConfig } from "./generic-form.spec";

/**
 * Register a Birth Form Test using Generic Test Framework
 */

const config: FormTestConfig = {
  schemaPath: "@/schema/register-a-birth",
  formUrl: "/family-birth-relationships/register-a-birth/form",
  formName: "Register a Birth",
};

createFormTest(config, formSteps);
