/**
 * Form configuration for government service forms
 * Maps form types to their metadata and email recipients
 */

export type FormType = "business-license";

export type FormConfig = {
  name: string;
  department: string;
  recipientEmail: string;
};

/**
 * Configuration for all government forms
 * Each form can have a specific email override via environment variable,
 * or will use the default FORMS_DEFAULT_EMAIL
 */
export const formConfigs: Record<
  FormType,
  Omit<FormConfig, "recipientEmail">
> = {
  "business-license": {
    name: "Business License Application",
    department: "Ministry of Commerce",
  },
};

/**
 * Get the complete configuration for a specific form type
 * Includes email recipient from environment variables
 */
export function getFormConfig(formType: FormType): FormConfig {
  const config = formConfigs[formType];

  if (!config) {
    throw new Error(`Unknown form type: ${formType}`);
  }

  // Try form-specific email first, then fall back to default
  const envKey = `${formType.toUpperCase().replace(/-/g, "_")}_EMAIL`;
  const recipientEmail =
    process.env[envKey] || process.env.FORMS_DEFAULT_EMAIL || "";

  if (!recipientEmail) {
    throw new Error(
      `No recipient email configured for form type: ${formType}. ` +
        `Set ${envKey} or FORMS_DEFAULT_EMAIL environment variable.`
    );
  }

  return {
    ...config,
    recipientEmail,
  };
}

/**
 * Check if a form type is valid
 */
export function isValidFormType(formType: string): formType is FormType {
  return formType in formConfigs;
}
