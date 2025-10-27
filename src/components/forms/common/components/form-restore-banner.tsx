import { Typography } from "@/components/ui/typography";

export interface FormRestoreBannerProps {
  /** The date when the form was last saved */
  savedDate: Date;
  /** Callback when user clicks "Start over" */
  onClear: () => void;
}

/**
 * Banner shown when restoring saved form data from localStorage
 *
 * Displays:
 * - "Welcome back!" message
 * - The date when data was saved
 * - "Start over with a blank form" button
 *
 * @example
 * <FormRestoreBanner
 *   savedDate={new Date('2025-10-24')}
 *   onClear={() => clearFormData()}
 * />
 */
export function FormRestoreBanner({
  savedDate,
  onClear,
}: FormRestoreBannerProps) {
  return (
    <div className="mb-6 border-teal-bright border-l-4 bg-teal-light p-4">
      <Typography className="mb-2 font-bold text-black" variant="paragraph">
        Welcome back!
      </Typography>
      <Typography className="mb-2 text-black" variant="paragraph">
        We've restored your progress from{" "}
        {savedDate.toLocaleDateString("en-BB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        .
      </Typography>
      <button
        className="text-black underline hover:no-underline"
        onClick={onClear}
        type="button"
      >
        Start over with a blank form
      </button>
    </div>
  );
}
