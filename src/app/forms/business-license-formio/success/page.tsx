import Link from "next/link";
import { Typography } from "@/components/ui/typography";

export default function BusinessLicenseSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <Typography className="mb-2 text-white" variant="h1">
            Application Submitted Successfully
          </Typography>
          <Typography className="text-blue-100" variant="body">
            Government of Barbados
            <br />
            <span className="text-sm">Ministry of Commerce</span>
          </Typography>
        </div>
      </div>

      {/* Success Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  aria-label="Success"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Success</title>
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-8 text-center">
              <Typography className="mb-4" variant="h2">
                Thank you for your submission
              </Typography>
              <Typography className="text-gray-600" variant="body">
                Your business license application has been successfully
                submitted to the Ministry of Commerce. You will receive a
                confirmation email shortly.
              </Typography>
            </div>

            {/* What Happens Next */}
            <div className="mb-8 rounded-lg bg-blue-50 p-6">
              <Typography className="mb-3 font-semibold" variant="h3">
                What happens next?
              </Typography>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-blue-600">•</span>
                  <span>
                    You will receive an email confirmation at the address you
                    provided
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-blue-600">•</span>
                  <span>
                    Our team will review your application within 5-7 business
                    days
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-blue-600">•</span>
                  <span>
                    We may contact you if additional information is required
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-1 mr-2 text-blue-600">•</span>
                  <span>
                    You will be notified once your application has been
                    processed
                  </span>
                </li>
              </ul>
            </div>

            {/* Reference Number */}
            <div className="mb-8 text-center">
              <Typography className="mb-2 text-gray-600 text-sm" variant="body">
                For your records, please keep a note of your submission time:
              </Typography>
              <Typography
                className="font-mono text-gray-700 text-sm"
                variant="body"
              >
                {new Date().toLocaleString("en-BB", {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "America/Barbados",
                })}
              </Typography>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                className="rounded-lg bg-blue-900 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-800"
                href="/"
              >
                Return to Home
              </Link>
              <Link
                className="rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
                href="/forms/business-license-formio"
              >
                Submit Another Application
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
