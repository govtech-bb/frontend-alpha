/**
 * Shared utility functions for form components
 */

type FieldErrors = Record<string, string>;

/**
 * Get className for input fields with error state styling
 * @param field - The field name to check for errors
 * @param fieldErrors - Object containing field error messages
 * @returns Combined className string with appropriate styling
 */
export function getFieldClassName(
  field: string,
  fieldErrors: FieldErrors
): string {
  const baseClass =
    "w-full max-w-md rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
  const errorClass = fieldErrors[field] ? "border-red-600" : "border-gray-300";
  return `${baseClass} ${errorClass}`;
}

/**
 * Get className for textarea fields with error state styling
 * @param field - The field name to check for errors
 * @param fieldErrors - Object containing field error messages
 * @returns Combined className string with appropriate styling
 */
export function getTextareaClassName(
  field: string,
  fieldErrors: FieldErrors
): string {
  const baseClass =
    "w-full max-w-md resize-y rounded-md border-2 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20";
  const errorClass = fieldErrors[field] ? "border-red-600" : "border-gray-300";
  return `${baseClass} ${errorClass}`;
}
