type FormFieldErrorProps = {
  id: string;
  message?: string;
};

/**
 * Inline error message for form fields
 * Displays below the field in red text
 * Associated with field via aria-describedby
 */
export function FormFieldError({ id, message }: FormFieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 font-bold text-red-600 text-sm" id={`${id}-error`}>
      <span className="mr-1 inline-block">⚠</span>
      {message}
    </p>
  );
}
