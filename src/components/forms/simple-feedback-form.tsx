"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Text, TextArea } from "@govtech-bb/react";
import { useOpenPanel } from "@openpanel/nextjs";
import { useEffect, useRef, useState } from "react";
import {
  FORM_NAMES,
  getFormBaseContext,
  TRACKED_EVENTS,
} from "@/lib/openpanel";

type FormErrors = {
  visitReason?: string;
  whatWentWrong?: string;
};

export function SimpleFeedbackForm() {
  const op = useOpenPanel();

  const [formData, setFormData] = useState({
    visitReason: "",
    whatWentWrong: "",
    referrer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [showValidation, setShowValidation] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read the referrer from sessionStorage
    const referrer = sessionStorage.getItem("feedbackReferrer") || "";
    setFormData((prev) => ({ ...prev, referrer }));
  }, []);

  // Focus error summary when validation errors appear
  useEffect(() => {
    if (showValidation && Object.keys(fieldErrors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [showValidation, fieldErrors]);

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.visitReason.trim()) {
      errors.visitReason = "Please enter a reason.";
    }

    if (!formData.whatWentWrong.trim()) {
      errors.whatWentWrong = "Please enter a reason.";
    }

    return errors;
  };

  const trackFormSubmitError = () => {
    op.track(
      TRACKED_EVENTS.FORM_SUBMIT_ERROR_EVENT,
      getFormBaseContext(FORM_NAMES.SIMPLE_FEEDBACK_FORM, "feedback")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);

    const errors = validateForm();
    setFieldErrors(errors);

    // If there are validation errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }

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
        setShowValidation(false);
        setFieldErrors({});
        setFormData({
          visitReason: "",
          whatWentWrong: "",
          referrer: formData.referrer,
        });
        op.track(
          TRACKED_EVENTS.FORM_SUBMIT_EVENT,
          getFormBaseContext(FORM_NAMES.SIMPLE_FEEDBACK_FORM, "feedback")
        );
      } else {
        setSubmitStatus("error");
        trackFormSubmitError();
      }
    } catch (_error) {
      setSubmitStatus("error");
      trackFormSubmitError();
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
    setShowValidation(false);
    setFieldErrors({});
    setFormData((prev) => ({ ...prev, visitReason: "", whatWentWrong: "" }));
  };

  // Convert field errors to ErrorItem format for ErrorSummary
  const errorItems: ErrorItem[] = Object.entries(fieldErrors).map(
    ([field, message]) => ({
      text: message,
      target: field,
    })
  );

  const handleErrorClick = (
    error: ErrorItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const element = document.getElementById(error.target);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="mb-6 space-y-6">
      {submitStatus === "success" ? (
        <div className="space-y-2 border-4 border-teal-40 bg-teal-10 p-6">
          <Text weight={"bold"}>Thank you for your feedback.</Text>
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
          {showValidation && errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              ref={errorSummaryRef}
              title="There is a problem"
            />
          )}

          <div>
            <TextArea
              error={showValidation ? fieldErrors.visitReason : undefined}
              id="visitReason"
              label="Why did you visit alpha.gov.bb?"
              name="visitReason"
              onChange={handleChange}
              rows={3}
              value={formData.visitReason}
            />
          </div>

          <div>
            <TextArea
              error={showValidation ? fieldErrors.whatWentWrong : undefined}
              id="whatWentWrong"
              label={"What went wrong?"}
              name="whatWentWrong"
              onChange={handleChange}
              rows={4}
              value={formData.whatWentWrong}
            />
          </div>

          <input name="referrer" type="hidden" value={formData.referrer} />

          <Button className="w-full" type="submit" variant="primary">
            {" "}
            {isSubmitting ? "Submitting..." : "Send Feedback"}{" "}
          </Button>

          {submitStatus === "error" && (
            <div className="rounded-md border border-red-100 bg-red-10 px-4 py-3 text-red-00">
              Sorry, there was an error sending your feedback. Please try again.
            </div>
          )}
        </form>
      )}
    </div>
  );
}
