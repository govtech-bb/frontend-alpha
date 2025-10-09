"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Typography } from "@/components/ui/typography";
import "formiojs/dist/formio.full.min.css";
import "./formio-custom.css";

// Dynamically import Form.io to avoid SSR issues
const Form = dynamic(() => import("@formio/react").then((mod) => mod.Form), {
  ssr: false,
});

// Form.io schema for business license application
const formSchema = {
  display: "form",
  components: [
    {
      label: "Business Name",
      type: "textfield",
      key: "businessName",
      placeholder: "Enter your business name",
      input: true,
      validate: {
        required: true,
        minLength: 2,
      },
    },
    {
      label: "Business Type",
      type: "select",
      key: "businessType",
      placeholder: "Select a business type",
      input: true,
      data: {
        values: [
          { label: "Retail", value: "retail" },
          { label: "Restaurant", value: "restaurant" },
          { label: "Service", value: "service" },
          { label: "Manufacturing", value: "manufacturing" },
          { label: "Technology", value: "technology" },
          { label: "Other", value: "other" },
        ],
      },
      validate: {
        required: true,
      },
    },
    {
      label: "Owner Name",
      type: "textfield",
      key: "ownerName",
      placeholder: "Enter owner's full name",
      input: true,
      validate: {
        required: true,
        minLength: 2,
      },
    },
    {
      label: "Email Address",
      type: "email",
      key: "email",
      placeholder: "your.email@example.com",
      input: true,
      validate: {
        required: true,
      },
    },
    {
      label: "Phone Number",
      type: "phoneNumber",
      key: "phone",
      placeholder: "+1 (246) xxx-xxxx",
      input: true,
      validate: {
        required: true,
      },
    },
    {
      label: "Business Address",
      type: "textfield",
      key: "businessAddress",
      placeholder: "Enter business address",
      input: true,
      validate: {
        required: true,
        minLength: 5,
      },
    },
    {
      label: "Number of Employees (Optional)",
      type: "number",
      key: "numberOfEmployees",
      placeholder: "0",
      input: true,
      validate: {
        min: 0,
      },
    },
    {
      label: "Business Description (Optional)",
      type: "textarea",
      key: "businessDescription",
      placeholder: "Describe your business activities...",
      rows: 4,
      input: true,
    },
    {
      type: "button",
      action: "submit",
      label: "Submit Business License Application",
      theme: "primary",
      disableOnInvalid: true,
    },
  ],
};

export default function BusinessLicenseFormioPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (submission: {
    data: Record<string, unknown>;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "business-license",
          formData: submission.data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      // Redirect to success page
      router.push("/forms/business-license-formio/success");
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: Needed for debugging
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting the form. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <Typography className="mb-2 text-white" variant="h1">
            Business License Application
          </Typography>
          <Typography className="text-blue-100" variant="body">
            Government of Barbados
            <br />
            <span className="text-sm">Ministry of Commerce</span>
          </Typography>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            <div className="mb-8">
              <Typography className="text-gray-600" variant="body">
                Please complete this form to apply for a business license in
                Barbados. All fields marked with an asterisk (*) are required.
              </Typography>
            </div>

            {error && (
              <div className="mb-6 rounded-lg border-2 border-red-600 bg-red-50 p-4">
                <Typography className="text-red-800" variant="body">
                  <strong>Error:</strong> {error}
                </Typography>
              </div>
            )}

            {isSubmitting && (
              <div className="mb-6 rounded-lg border-2 border-blue-600 bg-blue-50 p-4">
                <Typography className="text-blue-800" variant="body">
                  Submitting your application...
                </Typography>
              </div>
            )}

            <Form form={formSchema} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
