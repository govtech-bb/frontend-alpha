/** biome-ignore-all lint/style/useTemplate: String concatenation needed for dynamic debug messages */
"use client";

import { useState } from "react";
import type { EZPayCartItem } from "@/lib/ezpay/types";

// Replace with your actual payment code from EZPay+ Playground
const PAYMENT_CODE = "awR2Da5z7K";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo("Starting payment...\n");

    try {
      // Example form ID - in production, this would come from your form context
      const formId = "get-birth-certificate"; // Must match a slug from FORM_COMPONENTS

      // Create cart items
      const cartItems: EZPayCartItem[] = [
        {
          code: PAYMENT_CODE,
          amount: 10.0, // Small test amount
          details: "Test Payment - Development",
          reference: `TEST-${Date.now()}`,
        },
      ];

      setDebugInfo(
        (prev) =>
          prev +
          `Form ID: ${formId}\n` +
          `Cart items: ${JSON.stringify(cartItems, null, 2)}\n`
      );

      // Call create payment API with formId
      const response = await fetch("/api/ezpay/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          customerEmail: "test@example.com",
          customerName: "Test User",
          formId, // This will be encoded in the reference number
        }),
      });

      const result = await response.json();
      setDebugInfo(
        (prev) => prev + `API Response: ${JSON.stringify(result, null, 2)}\n`
      );

      if (result.success && result.paymentUrl) {
        setDebugInfo(
          (prev) =>
            prev + `\n✅ Success! Redirecting to: ${result.paymentUrl}\n`
        );

        // Store reference for verification later
        localStorage.setItem("ezpay_test_reference", result.referenceNumber);

        // Small delay so user can see the debug info
        setTimeout(() => {
          window.location.href = result.paymentUrl;
        }, 1500);
      } else {
        setError(result.error || "Failed to create payment");
        setDebugInfo((prev) => prev + `\n❌ Error: ${result.error}\n`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      setDebugInfo((prev) => prev + `\n❌ Exception: ${errorMessage}\n`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 font-bold text-2xl">EZPay+ Test Checkout</h1>

          {/* Test Payment Info */}
          <div className="mb-6 rounded border border-blue-200 bg-blue-50 p-4">
            <h2 className="mb-2 font-semibold text-blue-800">
              Test Payment Details
            </h2>
            <p className="text-blue-700 text-sm">Amount: $10.00 BBD</p>
            <p className="text-blue-700 text-sm">
              Payment Code: {PAYMENT_CODE}
            </p>
            <p className="text-blue-700 text-sm">Customer: test@example.com</p>
          </div>

          {/* Test Card Info */}
          <div className="mb-6 rounded border border-green-200 bg-green-50 p-4">
            <h2 className="mb-2 font-semibold text-green-800">
              Test Card Numbers
            </h2>
            <div className="space-y-1 text-green-700 text-sm">
              <p>
                <strong>Success:</strong> 4111 1111 1111 1111
              </p>
              <p>
                <strong>Failure:</strong> 5111 1111 1111 1111
              </p>
              <p>
                <strong>Expiry:</strong> Any future date (e.g., 12/25)
              </p>
              <p>
                <strong>CVV:</strong> Any 3 digits (e.g., 123)
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 rounded border border-red-200 bg-red-50 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Pay Button */}
          <button
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onClick={handlePayment}
            type="button"
          >
            {loading ? "Processing..." : "Pay $10.00 with EZPay+"}
          </button>

          {/* Debug Output */}
          {debugInfo && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold">Debug Log:</h3>
              <pre className="max-h-64 overflow-auto rounded bg-gray-900 p-4 text-green-400 text-xs">
                {debugInfo}
              </pre>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-3 font-semibold">Testing Instructions</h2>
          <ol className="list-inside list-decimal space-y-2 text-gray-700 text-sm">
            <li>Click "Pay $10.00 with EZPay+"</li>
            <li>You'll be redirected to EZPay+ payment page</li>
            <li>Use test card 4111 1111 1111 1111 for success</li>
            <li>Complete the payment</li>
            <li>
              You'll be redirected back to the form with a payment status banner
            </li>
            <li>Check your terminal for callback logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
