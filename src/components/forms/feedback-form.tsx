"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography";

type FeedbackFormProps = {
  onSubmit?: (data: { name: string; email: string; feedback: string }) => void;
};

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
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
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", feedback: "" });
        if (onSubmit) {
          onSubmit(formData);
        }
      } else {
        setSubmitStatus("error");
      }
    } catch (_error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <Typography className="mb-4" variant="h3">
        Share your feedback
      </Typography>
      <Typography className="mb-6 text-gray-600" variant="paragraph">
        Help us improve government services by sharing your thoughts and
        suggestions.
      </Typography>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block font-medium text-gray-900 text-sm"
            htmlFor="name"
          >
            Your name *
          </label>
          <input
            className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            type="text"
            value={formData.name}
          />
        </div>

        <div>
          <label
            className="mb-2 block font-medium text-gray-900 text-sm"
            htmlFor="email"
          >
            Email address *
          </label>
          <input
            className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            type="email"
            value={formData.email}
          />
        </div>

        <div>
          <label
            className="mb-2 block font-medium text-gray-900 text-sm"
            htmlFor="feedback"
          >
            Your feedback *
          </label>
          <textarea
            className="w-full resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            id="feedback"
            name="feedback"
            onChange={handleChange}
            placeholder="Share your thoughts, suggestions, or report issues..."
            required
            rows={4}
            value={formData.feedback}
          />
        </div>

        <button
          className="hover:-translate-y-0.5 w-full transform rounded-md bg-blue-900 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-800 hover:shadow-xl disabled:transform-none disabled:bg-gray-400 disabled:shadow-sm"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send Feedback"}
        </button>

        {submitStatus === "success" && (
          <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-800">
            Thank you! Your feedback has been sent successfully.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            Sorry, there was an error sending your feedback. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
