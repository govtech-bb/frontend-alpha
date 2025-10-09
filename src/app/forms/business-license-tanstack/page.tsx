"use client";

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Typography } from "@/components/ui/typography";

// Zod schema for form validation
const businessLicenseSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  businessAddress: z
    .string()
    .min(5, "Business address must be at least 5 characters"),
  numberOfEmployees: z
    .number()
    .int()
    .min(0, "Number of employees must be 0 or greater")
    .optional(),
  businessDescription: z.string().optional(),
});

type BusinessLicenseFormData = z.infer<typeof businessLicenseSchema>;

export default function BusinessLicenseTanstackPage() {
  const form = useForm({
    defaultValues: {
      businessName: "",
      businessType: "",
      ownerName: "",
      email: "",
      phone: "",
      businessAddress: "",
      numberOfEmployees: 0,
      businessDescription: "",
    } as BusinessLicenseFormData,
    onSubmit: ({ value }) => {
      // Handle form submission
      // biome-ignore lint/suspicious/noConsole: This is a demo/spike form
      console.log("Form submitted:", value);
      // biome-ignore lint/suspicious/noAlert: This is a demo/spike form
      alert(
        `Business License Application Submitted!\n\n${JSON.stringify(value, null, 2)}`
      );
    },
    validatorAdapter: zodValidator(),
  });

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

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              {/* Business Name */}
              <form.Field
                name="businessName"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 2
                      ? "Business name must be at least 2 characters"
                      : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Business Name *
                    </label>
                    <input
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your business name"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Business Type */}
              <form.Field
                name="businessType"
                validators={{
                  onChange: ({ value }) =>
                    value ? undefined : "Please select a business type",
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Business Type *
                    </label>
                    <select
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                    >
                      <option value="">Select a business type</option>
                      <option value="retail">Retail</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="service">Service</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="other">Other</option>
                    </select>
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Owner Name */}
              <form.Field
                name="ownerName"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 2
                      ? "Owner name must be at least 2 characters"
                      : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Owner Name *
                    </label>
                    <input
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter owner's full name"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value)
                      ? undefined
                      : "Please enter a valid email address";
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Email Address *
                    </label>
                    <input
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="your.email@example.com"
                      type="email"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Phone */}
              <form.Field
                name="phone"
                validators={{
                  onChange: ({ value }) => {
                    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                    return phoneRegex.test(value)
                      ? undefined
                      : "Please enter a valid phone number";
                  },
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Phone Number *
                    </label>
                    <input
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+1 (246) xxx-xxxx"
                      type="tel"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Business Address */}
              <form.Field
                name="businessAddress"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 5
                      ? "Business address must be at least 5 characters"
                      : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Business Address *
                    </label>
                    <input
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter business address"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Number of Employees */}
              <form.Field
                name="numberOfEmployees"
                validators={{
                  onChange: ({ value }) =>
                    value < 0
                      ? "Number of employees must be 0 or greater"
                      : undefined,
                }}
              >
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Number of Employees (Optional)
                    </label>
                    <input
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      min="0"
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="0"
                      type="number"
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Business Description */}
              <form.Field name="businessDescription">
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block font-bold text-[20px] text-gray-900 leading-[150%]"
                      htmlFor={field.name}
                    >
                      Business Description (Optional)
                    </label>
                    <textarea
                      className="w-full resize-y rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 transition-all focus:border-[#30C0C8] focus:ring-2 focus:ring-[#30C0C8]/20"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe your business activities..."
                      rows={4}
                      value={field.state.value}
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Submit Button */}
              <div className="pt-4">
                <form.Subscribe
                  selector={(state) => ({
                    canSubmit: state.canSubmit,
                    isSubmitting: state.isSubmitting,
                  })}
                >
                  {({ canSubmit, isSubmitting }) => (
                    <button
                      className="w-full rounded bg-[#1E787D] px-6 py-3 font-normal text-white text-xl transition-all hover:bg-[#1E787D]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
                      disabled={!canSubmit}
                      type="submit"
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Business License Application"}
                    </button>
                  )}
                </form.Subscribe>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
