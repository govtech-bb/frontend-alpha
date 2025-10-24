"use client";

import { Typography } from "@/components/ui/typography";
import { useStepFocus } from "../useStepFocus";

type CertificatesProps = {
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
};

const CERTIFICATE_COST = 5.0; // BBD$5.00 per certificate

/**
 * Step: Order Birth Certificates
 * Allows parents to order certified copies at registration time
 * Based on PDF pages 5 and 14
 */
export function Certificates({
  value,
  onChange,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: CertificatesProps) {
  const titleRef = useStepFocus(
    "Order birth certificates",
    stepNumber,
    totalSteps
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const totalCost = value * CERTIFICATE_COST;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Order birth certificates
      </h1>

      <Typography variant="paragraph">
        The initial registration of the birth is free of charge.
      </Typography>

      <Typography variant="paragraph">
        You can order certified copies of the birth certificate for official
        use. Each copy costs BBD$5.00.
      </Typography>

      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="numberOfCertificates"
        >
          Number of certificates required
        </label>
        <input
          className="w-full max-w-md rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-[#1E787D] focus:ring-2 focus:ring-[#1E787D]/20"
          id="numberOfCertificates"
          max="20"
          min="0"
          onChange={(e) => onChange(Number.parseInt(e.target.value, 10) || 0)}
          type="number"
          value={value || 0}
        />
      </div>

      {value > 0 && (
        <div className="rounded-md border-2 border-gray-300 bg-gray-50 p-4">
          <Typography className="font-bold" variant="paragraph">
            Total cost: BBD${totalCost.toFixed(2)}
          </Typography>
        </div>
      )}

      <div className="flex gap-4">
        <button
          className="rounded bg-gray-300 px-6 py-3 font-normal text-neutral-black text-xl transition-all hover:bg-gray-400"
          onClick={onBack}
          type="button"
        >
          Back
        </button>

        <button
          className="rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90"
          type="submit"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
