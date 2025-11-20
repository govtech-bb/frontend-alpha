"use client";

import type { ErrorItem } from "@govtech-bb/react";
import {
  Button,
  ErrorSummary,
  Input,
  Select,
  TextArea,
} from "@govtech-bb/react";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { getPublicPaymentConfig } from "@/lib/payment/client-config";
import type { PassportReplacementFormData } from "./schema";
import { passportReplacementSchema } from "./schema";

// Get payment configuration from client-safe config
const config = getPublicPaymentConfig("passport-replacement");
if (!config) {
  throw new Error("Payment configuration not found for passport replacement");
}
const PASSPORT_FEE = config.amount;

/**
 * Simple single-step passport replacement form with EZPay integration
 * Demonstrates payment flow without server-side PII storage
 */
export function PassportReplacementForm() {
  const [formData, setFormData] = useState<
    Partial<PassportReplacementFormData>
  >({
    fullName: "",
    email: "",
    phoneNumber: "",
    currentPassportNumber: "",
    reasonForReplacement: undefined,
    deliveryAddress: "",
    parish: undefined,
  });

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [showValidation, setShowValidation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Focus error summary when validation errors appear
  useEffect(() => {
    if (showValidation && Object.keys(fieldErrors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [showValidation, fieldErrors]);

  const handleChange = (
    field: keyof PassportReplacementFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (showValidation) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): Record<string, string> => {
    const result = passportReplacementSchema.safeParse(formData);

    if (result.success) {
      return {};
    }

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    setSubmitError(null);

    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique reference ID
      const referenceNumber = `passport-${crypto.randomUUID()}`;

      // Store form data in sessionStorage with reference ID
      // This allows retrieval after payment callback
      sessionStorage.setItem(
        referenceNumber,
        JSON.stringify({
          ...formData,
          referenceNumber,
          timestamp: new Date().toISOString(),
        })
      );

      // Call payment initiation API
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referenceNumber,
          serviceType: "passport-replacement",
          email: formData.email,
          name: formData.fullName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to initiate payment. Please try again."
        );
      }

      const { paymentUrl } = await response.json();

      // Redirect to EZPay payment gateway
      window.location.href = paymentUrl;
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Convert field errors to ErrorItem format for ErrorSummary
  const errorItems: ErrorItem[] = Object.entries(fieldErrors)
    .filter(([, message]) => message)
    .map(([field, message]) => ({
      text: message || "",
      target: field,
    }));

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
    <div className="container mx-auto max-w-2xl py-8">
      <Typography className="mb-6" variant="h1">
        Apply for a Passport Replacement
      </Typography>

      <div className="mb-6 rounded-md border border-blue-100 bg-blue-10 p-4">
        <Typography className="font-bold" variant="paragraph">
          Fee: ${PASSPORT_FEE.toFixed(2)} BBD
        </Typography>
        <Typography variant="paragraph">
          Payment will be processed securely through EZPay+ Government Payment
          Gateway.
        </Typography>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {showValidation && errorItems.length > 0 && (
          <ErrorSummary
            errors={errorItems}
            onErrorClick={handleErrorClick}
            ref={errorSummaryRef}
            title="There is a problem"
          />
        )}

        {submitError && (
          <div className="rounded-md border border-red-100 bg-red-10 px-4 py-3 text-red-dark">
            {submitError}
          </div>
        )}

        {/* Personal Information */}
        <Typography className="mt-8" variant="h2">
          Personal Information
        </Typography>

        <Input
          error={showValidation ? fieldErrors.fullName : undefined}
          id="fullName"
          label="Full Name"
          name="fullName"
          onChange={(e) => handleChange("fullName", e.target.value)}
          required
          value={formData.fullName || ""}
        />

        <Input
          error={showValidation ? fieldErrors.email : undefined}
          id="email"
          label="Email Address"
          name="email"
          onChange={(e) => handleChange("email", e.target.value)}
          required
          type="email"
          value={formData.email || ""}
        />

        <Input
          error={showValidation ? fieldErrors.phoneNumber : undefined}
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          required
          type="tel"
          value={formData.phoneNumber || ""}
        />

        {/* Passport Information */}
        <Typography className="mt-8" variant="h2">
          Passport Information
        </Typography>

        <Input
          error={showValidation ? fieldErrors.currentPassportNumber : undefined}
          id="currentPassportNumber"
          label="Current Passport Number"
          name="currentPassportNumber"
          onChange={(e) =>
            handleChange("currentPassportNumber", e.target.value.toUpperCase())
          }
          required
          value={formData.currentPassportNumber || ""}
        />

        <Select
          error={showValidation ? fieldErrors.reasonForReplacement : undefined}
          id="reasonForReplacement"
          label="Reason for Replacement"
          name="reasonForReplacement"
          onChange={(e) =>
            handleChange(
              "reasonForReplacement",
              e.target
                .value as PassportReplacementFormData["reasonForReplacement"]
            )
          }
          required
          value={formData.reasonForReplacement || ""}
        >
          <option value="">Select a reason</option>
          <option value="lost">Lost</option>
          <option value="stolen">Stolen</option>
          <option value="damaged">Damaged</option>
          <option value="expired">Expired</option>
        </Select>

        {/* Delivery Information */}
        <Typography className="mt-8" variant="h2">
          Delivery Information
        </Typography>

        <TextArea
          error={showValidation ? fieldErrors.deliveryAddress : undefined}
          id="deliveryAddress"
          label="Delivery Address"
          name="deliveryAddress"
          onChange={(e) => handleChange("deliveryAddress", e.target.value)}
          required
          rows={3}
          value={formData.deliveryAddress || ""}
        />

        <Select
          error={showValidation ? fieldErrors.parish : undefined}
          id="parish"
          label="Parish"
          name="parish"
          onChange={(e) =>
            handleChange(
              "parish",
              e.target.value as PassportReplacementFormData["parish"]
            )
          }
          required
          value={formData.parish || ""}
        >
          <option value="">Select a parish</option>
          <option value="Christ Church">Christ Church</option>
          <option value="St. Andrew">St. Andrew</option>
          <option value="St. George">St. George</option>
          <option value="St. James">St. James</option>
          <option value="St. John">St. John</option>
          <option value="St. Joseph">St. Joseph</option>
          <option value="St. Lucy">St. Lucy</option>
          <option value="St. Michael">St. Michael</option>
          <option value="St. Peter">St. Peter</option>
          <option value="St. Philip">St. Philip</option>
          <option value="St. Thomas">St. Thomas</option>
        </Select>

        <Button
          className="w-full"
          disabled={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? "Redirecting to Payment..." : "Pay & Submit"}
        </Button>
      </form>
    </div>
  );
}
