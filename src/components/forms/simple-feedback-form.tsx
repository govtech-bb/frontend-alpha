"use client";

import { useEffect, useState } from "react";
import { Typography } from "../ui/typography";

export function SimpleFeedbackForm() {
  const [formData, setFormData] = useState({
    visitReason: "",
    whatWentWrong: "",
    referrer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    // Read the referrer from sessionStorage
    const referrer = sessionStorage.getItem("feedbackReferrer") || "";
    setFormData((prev) => ({ ...prev, referrer }));
  }, []);

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
          referrer: formData.referrer,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          visitReason: "",
          whatWentWrong: "",
          referrer: formData.referrer,
        });
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

  const resetForm = () => {
    setSubmitStatus("idle");
    setFormData((prev) => ({ ...prev, visitReason: "", whatWentWrong: "" }));
  };

  return (
    <div className="mb-6 space-y-6">
      {submitStatus === "success" ? (
        <div className="gap-2 space-y-2 border-4 border-teal-bright bg-teal-light p-6">
          <Typography className="font-bold text-black" variant="paragraph">
            Thank you for your feedback.
          </Typography>
          <button
            className="cursor-pointer font-normal text-[20px] text-black leading-[150%] underline decoration-[#00267F] underline-offset-[1px]"
            onClick={resetForm}
            type="button"
          >
            Tell us something else
          </button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
              htmlFor="visitReason"
            >
              Why did you visit alpha.gov.bb?
            </label>
            <textarea
              className="w-full resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-teal-bright focus:ring-2 focus:ring-teal-bright/20"
              id="visitReason"
              name="visitReason"
              onChange={handleChange}
              rows={3}
              value={formData.visitReason}
            />
          </div>

          <div>
            <label
              className="mb-2 block font-bold text-[20px] text-neutral-black leading-[150%]"
              htmlFor="whatWentWrong"
            >
              What went wrong?
            </label>
            <textarea
              className="w-full resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-neutral-black transition-all focus:border-teal-bright focus:ring-2 focus:ring-teal-bright/20"
              id="whatWentWrong"
              name="whatWentWrong"
              onChange={handleChange}
              rows={4}
              value={formData.whatWentWrong}
            />
          </div>

          <input name="referrer" type="hidden" value={formData.referrer} />

          <button
            className="w-full rounded bg-[#1E787D] px-6 py-3 font-normal text-neutral-white text-xl transition-all hover:bg-[#1E787D]/90 disabled:bg-gray-400"
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
      )}
    </div>
  );
}
