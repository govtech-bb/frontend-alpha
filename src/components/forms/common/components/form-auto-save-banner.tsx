import { Typography } from "@/components/ui/typography";

export type FormAutoSaveBannerProps = {
  /** Callback when user clicks "Clear saved data" */
  onClear: () => void;
};

/**
 * Banner informing users that their progress is automatically saved
 *
 * Displays:
 * - Auto-save information message
 * - "Clear saved data" button
 *
 * @example
 * <FormAutoSaveBanner
 *   onClear={() => clearFormData()}
 * />
 */
export function FormAutoSaveBanner({ onClear }: FormAutoSaveBannerProps) {
  return (
    <div className="mb-6 border-blue-bright border-l-4 bg-blue-light/30 p-4">
      <Typography className="text-neutral-black" variant="paragraph">
        Your progress is automatically saved on this device.{" "}
        <button
          className="underline hover:no-underline"
          onClick={onClear}
          type="button"
        >
          Clear saved data
        </button>
      </Typography>
    </div>
  );
}
