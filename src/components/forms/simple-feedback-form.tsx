"use client";

import type { ErrorItem } from "@govtech-bb/react";
import { Button, ErrorSummary, Text, TextArea } from "@govtech-bb/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { type FeedbackState, sendFeedback } from "@/app/actions/send-feedback";

const initialState: FeedbackState = { error: null };

export function SimpleFeedbackForm() {
  const [state, formAction, isPending] = useActionState(
    sendFeedback,
    initialState
  );
  const [referrer, setReferrer] = useState("");
  const [dismissedState, setDismissedState] = useState<FeedbackState | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Read the referrer from sessionStorage
  useEffect(() => {
    setReferrer(sessionStorage.getItem("feedbackReferrer") || "");
  }, []);

  // Reset form fields when a successful submission comes back
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const fieldErrors = state.fieldErrors ?? {};
  const errorItems: ErrorItem[] = Object.entries(fieldErrors).map(
    ([field, message]) => ({ text: message, target: field })
  );

  useEffect(() => {
    if (state.fieldErrors && Object.keys(state.fieldErrors).length > 0) {
      errorSummaryRef.current?.focus();
      errorSummaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [state.fieldErrors]);

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

  const showSuccess = state.success && dismissedState !== state;
  const showServerError =
    !!state.error && Object.keys(fieldErrors).length === 0;

  return (
    <div className="mb-6 space-y-6">
      {showSuccess ? (
        <div className="flex flex-wrap items-baseline gap-2 border-4 border-teal-40 bg-teal-10 p-6">
          <Text weight={"bold"}>Thank you for your feedback.</Text>
          <Button
            className="text-black!"
            onClick={() => setDismissedState(state)}
            variant={"link"}
          >
            Tell us something else
          </Button>
        </div>
      ) : (
        <form action={formAction} className="space-y-6" ref={formRef}>
          {errorItems.length > 0 && (
            <ErrorSummary
              errors={errorItems}
              onErrorClick={handleErrorClick}
              ref={errorSummaryRef}
              title="There is a problem"
            />
          )}

          <div>
            <TextArea
              error={fieldErrors.visitReason}
              id="visitReason"
              label="Why did you visit alpha.gov.bb?"
              name="visitReason"
              rows={3}
            />
          </div>

          <div>
            <TextArea
              error={fieldErrors.whatWentWrong}
              id="whatWentWrong"
              label={"What went wrong?"}
              name="whatWentWrong"
              rows={4}
            />
          </div>

          <input name="referrer" readOnly type="hidden" value={referrer} />

          <Button className="w-full" type="submit" variant="primary">
            {isPending ? "Submitting..." : "Send Feedback"}
          </Button>

          {showServerError && (
            <div className="rounded-md border border-red-100 bg-red-10 px-4 py-3 text-red-00">
              {state.error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
