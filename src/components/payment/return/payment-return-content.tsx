/** biome-ignore-all lint/style/useTemplate: <explanation> */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type VerifyResult = {
  success: boolean;
  data?: {
    _status: string;
    _transaction_number: string;
    _amount: string;
    _processor: string;
    _datesettled: string;
  };
  error?: string;
};

export function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const transactionNumber = searchParams.get("tx");
  const referenceNumber = searchParams.get("rid");

  useEffect(() => {
    const verifyPayment = async () => {
      setDebugInfo(
        `URL Parameters:\n- tx: ${transactionNumber}\n- rid: ${referenceNumber}\n\n`
      );

      if (!(transactionNumber || referenceNumber)) {
        setResult({
          success: false,
          error: "No transaction information in URL",
        });
        setLoading(false);
        return;
      }

      try {
        setDebugInfo((prev) => prev + "Calling verify API...\n");

        const response = await fetch("/api/ezpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionNumber,
            reference: referenceNumber,
          }),
        });

        const data = await response.json();
        setDebugInfo(
          (prev) =>
            prev + `Verify Response:\n${JSON.stringify(data, null, 2)}\n`
        );
        setResult(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setDebugInfo((prev) => prev + `Error: ${errorMessage}\n`);
        setResult({ success: false, error: errorMessage });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [transactionNumber, referenceNumber]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  const status = result?.data?._status;
  const isSuccess = status === "Success";
  const isInitiated = status === "Initiated";
  const isFailed = status === "Failed" || !result?.success;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Status Card */}
        <div
          className={`rounded-lg p-8 shadow-lg ${
            isSuccess
              ? "bg-green-50"
              : isInitiated
                ? "bg-amber-50"
                : "bg-red-50"
          }`}
        >
          {/* Status Icon */}
          <div className="mb-6 text-center">
            <div
              className={`mb-4 text-6xl ${
                isSuccess
                  ? "text-green-500"
                  : isInitiated
                    ? "text-amber-500"
                    : "text-red-500"
              }`}
            >
              {isSuccess ? "✓" : isInitiated ? "⏳" : "✕"}
            </div>
            <h1
              className={`font-bold text-2xl ${
                isSuccess
                  ? "text-green-700"
                  : isInitiated
                    ? "text-amber-700"
                    : "text-red-700"
              }`}
            >
              {isSuccess
                ? "Payment Successful!"
                : isInitiated
                  ? "Payment Initiated"
                  : "Payment Failed"}
            </h1>
          </div>

          {/* Payment Details */}
          {result?.data && (
            <div className="mb-6 rounded bg-white p-4">
              <h2 className="mb-3 font-semibold">Payment Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction #:</span>
                  <span className="font-mono">
                    {result.data._transaction_number}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span>${result.data._amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span>{result.data._processor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-semibold ${
                      isSuccess
                        ? "text-green-600"
                        : isInitiated
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  >
                    {result.data._status}
                  </span>
                </div>
                {result.data._datesettled && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{result.data._datesettled}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {result?.error && (
            <div className="mb-6 rounded border border-red-300 bg-red-100 p-4">
              <p className="text-red-700">{result.error}</p>
            </div>
          )}

          {/* Initiated Notice */}
          {isInitiated && (
            <div className="mb-6 rounded border border-amber-300 bg-amber-100 p-4">
              <p className="text-amber-800">
                Your Direct Debit payment has been initiated and will settle in
                approximately 5 business days. You will receive a confirmation
                once the payment is complete.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition-colors ${
                isFailed
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => router.push("/checkout")}
              type="button"
            >
              {isFailed ? "Try Again" : "New Payment"}
            </button>
            <button
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              onClick={() => router.push("/")}
              type="button"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Debug Information */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-3 font-semibold">Debug Information</h2>
          <pre className="max-h-64 overflow-auto rounded bg-gray-900 p-4 text-green-400 text-xs">
            {debugInfo}
          </pre>
        </div>

        {/* Callback Reminder */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-2 font-semibold text-blue-800">
            📋 Check Your Terminal
          </h2>
          <p className="text-blue-700 text-sm">
            If the callback was configured correctly, you should see callback
            logs in your Next.js terminal. Look for "EZPAY CALLBACK" messages.
          </p>
        </div>
      </div>
    </div>
  );
}
