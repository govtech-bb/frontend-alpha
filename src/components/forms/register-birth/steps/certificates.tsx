"use client";

import { useStepFocus } from "../../common/hooks/use-step-focus";

type CertificatesProps = {
  value: number;
  onChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
  stepNumber?: number;
  totalSteps?: number;
};

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
    "Order a birth certificate",
    "Register a Birth",
    stepNumber,
    totalSteps
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h1 className="mb-6 font-bold text-3xl" ref={titleRef} tabIndex={-1}>
        Order a birth certificate
      </h1>

      <p className="mb-4 text-base">
        A birth certificate is essential for access to some public services. You
        wil need to pay BDD$5.00 for each certificate when you collect them.
      </p>

      <p className="mb-4 text-base">
        We keep the original so you can order a certified copy at any point.
      </p>

      <p className="mb-4 text-base">
        The birth registration is free of charge.
      </p>

      <div>
        <label
          className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
          htmlFor="numberOfCertificates"
        >
          Number of certificates required
        </label>
        <p className="mb-2 text-base text-gray-600">You can order up to x</p>
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
