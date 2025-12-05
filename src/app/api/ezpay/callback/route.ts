import { type NextRequest, NextResponse } from "next/server";
import type {
  EZPayCallbackPayload,
  EZPayTransactionStatus,
} from "@/lib/ezpay/types";

// Parse callback data from form data
const parseCallbackData = (formData: FormData): EZPayCallbackPayload => ({
  _reference: formData.get("_reference") as string,
  _status: formData.get("_status") as EZPayTransactionStatus,
  _transaction_number: formData.get("_transaction_number") as string,
  _ezpay_account: formData.get("_ezpay_account") as string,
  _processor: formData.get("_processor") as EZPayCallbackPayload["_processor"],
  _datesettled: formData.get("_datesettled") as string,
  _amount: formData.get("_amount") as string,
  _pcode: formData.get("_pcode") as string,
});

// Log with timestamp and formatting
const logCallback = (message: string, data?: unknown): void => {
  const timestamp = new Date().toISOString();
  console.log(`\n${"=".repeat(60)}`);
  console.log(`[${timestamp}] EZPAY CALLBACK: ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
  console.log(`${"=".repeat(60)}\n`);
};

export async function POST(request: NextRequest) {
  logCallback("Received callback request");

  try {
    // Log raw request details
    const contentType = request.headers.get("content-type");
    logCallback("Content-Type", contentType);

    // Parse form data
    const formData = await request.formData();

    // Log all form data keys
    const formDataEntries: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataEntries[key] = value.toString();
    });
    logCallback("Raw form data", formDataEntries);

    // Parse into structured data
    const callbackData = parseCallbackData(formData);
    logCallback("Parsed callback data", callbackData);

    // Process based on status
    switch (callbackData._status) {
      case "Success":
        logCallback("✅ Payment SUCCESSFUL", {
          reference: callbackData._reference,
          amount: callbackData._amount,
          processor: callbackData._processor,
        });
        // TODO: Update your database, send confirmation email, etc.
        break;

      case "Initiated":
        logCallback("⏳ Payment INITIATED (Direct Debit pending)", {
          reference: callbackData._reference,
          amount: callbackData._amount,
          note: "Will settle in 5 business days",
        });
        // TODO: Mark order as pending
        break;

      case "Failed":
        logCallback("❌ Payment FAILED", {
          reference: callbackData._reference,
          amount: callbackData._amount,
        });
        // TODO: Handle failed payment
        break;

      default:
        logCallback("⚠️ Unknown status", callbackData._status);
    }

    // Return success response
    const response = { received: true, timestamp: new Date().toISOString() };
    logCallback("Sending response", response);

    return NextResponse.json(response);
  } catch (error) {
    logCallback("❌ ERROR processing callback", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Failed to process callback", received: false },
      { status: 500 }
    );
  }
}

// Also handle GET for testing connectivity
export function GET() {
  logCallback("GET request received (connectivity test)");

  return NextResponse.json({
    status: "ok",
    message: "EZPay callback endpoint is reachable",
    timestamp: new Date().toISOString(),
  });
}
