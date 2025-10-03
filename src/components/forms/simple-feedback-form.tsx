"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SimpleFeedbackForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    visitReason: "",
    whatWentWrong: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitReason: formData.visitReason,
          whatWentWrong: formData.whatWentWrong,
        }),
      });

      if (response.ok) {
        router.push("/feedback/submitted");
      } else {
        setSubmitStatus("error");
      }
    } catch (_error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
            htmlFor="visitReason"
          >
            Why did you visit alpha.gov.bb?
          </label>
          <textarea
            className="w-full resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
            id="visitReason"
            name="visitReason"
            onChange={handleChange}
            rows={3}
            value={formData.visitReason}
          />
        </div>

        <div>
          <label
            className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
            htmlFor="whatWentWrong"
          >
            What went wrong?
          </label>
          <textarea
            className="w-full resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
            id="whatWentWrong"
            name="whatWentWrong"
            onChange={handleChange}
            rows={4}
            value={formData.whatWentWrong}
          />
        </div>

        <button
          className="w-full rounded bg-[#1E787D] px-6 py-3 font-normal text-white text-xl transition-all hover:bg-[#1E787D]/90 disabled:bg-gray-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Send Feedback"}
        </button>

        {submitStatus === "error" && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            Sorry, there was an error sending your feedback. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
