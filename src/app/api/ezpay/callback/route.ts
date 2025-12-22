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

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Parse into structured data
    const callbackData = parseCallbackData(formData);

    // Process based on status
    switch (callbackData._status) {
      case "Success":
        // TODO: Update your database, send confirmation email, etc.
        break;

      case "Initiated":
        // TODO: Mark order as pending
        break;

      case "Failed":
        // TODO: Handle failed payment
        break;

      default:
        // Unknown status
        break;
    }

    // Return success response
    const response = { received: true, timestamp: new Date().toISOString() };

    return NextResponse.json(response);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to process callback", received: false },
      { status: 500 }
    );
  }
}

// Also handle GET for testing connectivity
export function GET() {
  return NextResponse.json({
    status: "ok",
    message: "EZPay callback endpoint is reachable",
    timestamp: new Date().toISOString(),
  });
}
