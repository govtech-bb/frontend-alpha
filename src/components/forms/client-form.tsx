"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";

type ClientFormProps = {
  formDefinition: Record<string, unknown>;
  title: string;
  description?: string;
  department?: string;
  division?: string;
  onSubmit?: (submission: { data: Record<string, unknown> }) => void;
};

export function ClientForm({
  formDefinition,
  title,
  description,
  department = "Government of Barbados",
  division,
  onSubmit,
}: ClientFormProps) {
  const [FormComponent, setFormComponent] = useState<React.ComponentType<
    Record<string, unknown>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dynamically import Form.io only on the client side
    const loadFormio = async () => {
      try {
        const { Form } = await import("@formio/react");
        setFormComponent(() => Form);
        setIsLoading(false);
      } catch (_error) {
        setIsLoading(false);
      }
    };

    loadFormio();
  }, []);

  const handleSubmit = (submission: { data: Record<string, unknown> }) => {
    if (onSubmit) {
      onSubmit(submission);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-900 py-8 text-white">
          <div className="container mx-auto px-4">
            <Typography className="mb-2 text-white" variant="h1">
              {title}
            </Typography>
            <Typography className="text-blue-100" variant="body">
              {department}
              {division && (
                <>
                  <br />
                  <span className="text-sm">{division}</span>
                </>
              )}
            </Typography>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <div className="py-8 text-center">
                <Typography variant="body">Loading form...</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!FormComponent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-900 py-8 text-white">
          <div className="container mx-auto px-4">
            <Typography className="mb-2 text-white" variant="h1">
              {title}
            </Typography>
            <Typography className="text-blue-100" variant="body">
              {department}
              {division && (
                <>
                  <br />
                  <span className="text-sm">{division}</span>
                </>
              )}
            </Typography>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <div className="py-8 text-center">
                <Typography className="text-red-600" variant="body">
                  Failed to load form. Please refresh the page and try again.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <Typography className="mb-2 text-white" variant="h1">
            {title}
          </Typography>
          <Typography className="text-blue-100" variant="body">
            {department}
            {division && (
              <>
                <br />
                <span className="text-sm">{division}</span>
              </>
            )}
          </Typography>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            {description && (
              <div className="mb-8">
                <Typography className="text-gray-600" variant="body">
                  {description}
                </Typography>
              </div>
            )}

            <div className="govbb-form">
              <FormComponent
                form={formDefinition}
                onSubmit={handleSubmit}
                options={{
                  noAlerts: true,
                  readOnly: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
