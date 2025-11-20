Based on the EZpay+ documentation provided and the architecture of the **Alpha.Gov.bb** project, here is a comprehensive technical integration guide designed for an LLM to generate the necessary code.

***

# Integration Spike Guide: EZpay+ for Alpha.Gov.bb

## 1. System Context
*   **External Service:** EZpay+ (Government of Barbados Payment Gateway).
*   **Target Application:** Alpha.Gov.bb (Next.js 15.5, React 19, TypeScript, AWS Amplify).
*   **Current State:** Application uses TanStack Form for multi-step wizard forms.
*   **Objective:** Integrate payment processing into the final step of a service form (e.g., Police Certificate of Character).

## 2. Environment Configuration
The LLM should assume the existence of the following environment variables in `.env.local` and AWS Parameter Store:

```env
# EZpay+ Configuration
EZPAY_ENV="development" # or "production"
EZPAY_API_KEY="[PROVIDED_BY_CLIENT]"
EZPAY_API_URL="https://test.ezpay.gov.bb" # Live: https://ezpay.gov.bb
EZPAY_REDIRECT_URL="https://[YOUR_DOMAIN]/payment/callback"
EZPAY_MERCHANT_IP="[YOUR_NAT_GATEWAY_OR_LAMBDA_IP]" # API is IP Restricted
```

## 3. Data Structures (TypeScript/Zod)
The LLM needs to generate strict types based on the "legacy PHP-style" POST requests expected by EZpay+.

### Core Interfaces
```typescript
// The individual line item in the cart
interface EzPayCartItem {
  code: string;      // Payment Code (from EZpay admin)
  amount: number;    // Cost e.g., 150.00
  details: string;   // Description e.g., "Police Certificate"
  reference: string; // Internal link to your record
}

// The payload sent to init payment
interface EzPayInitPayload {
  ez_cart_array: string; // WARNING: JSON.stringify(EzPayCartItem[])
  ez_reference_email: string;
  ez_reference_name: string;
  ez_reference_number: string; // Unique ID (UUID or Database ID)
  ez_allow_credit?: boolean;   // Default: true
  ez_allow_debit?: boolean;    // Default: true
  ez_allow_payce?: boolean;    // Default: true
}

// The response from initiation
interface EzPayInitResponse {
  token: string; // Use this to redirect user
}

// The response from the Validation/Check API
interface EzPayTransactionStatus {
  _reference: string;
  _status: "Success" | "Failed" | "Initiated";
  _transaction_number: string;
  _ezpay_account: string;
  _processor: string; // e.g., "Direct Debit" or "Credit Card"
  _datesettled: string;
  _amount: string;
  _pcode: string;
}
```

## 4. Integration Workflow & Implementation Steps

The integration requires three distinct components within the Next.js App Router architecture.

### Step A: Payment Initialization (Server Action)
**Context:** User clicks "Pay & Submit" on the final step of a TanStack Form.
**File:** `src/actions/payment/initiate-ezpay.ts`

1.  **Input:** Receive form data + generated internal Application ID.
2.  **Logic:**
    *   Construct the `EzPayCartItem[]`.
    *   **CRITICAL:** Serialize the array to a JSON string.
    *   Send a `POST` request to `${EZPAY_API_URL}/ezpay_receivecart`.
    *   **Header:** Must include `EZPluginKey: process.env.EZPAY_API_KEY`.
    *   **Body:** Form Data (multipart/form-data or x-www-form-urlencoded) – *Note: Docs suggest standard POST fields, not raw JSON body.*
3.  **Response Handling:**
    *   Extract `token` from the JSON response.
    *   Return the token to the Client Component.

### Step B: Client Redirect (Component Logic)
**Context:** Inside the form's `onSubmit` handler.

1.  Receive `token` from Server Action.
2.  Perform a hard redirect (window.location.href) to:
    `https://test.ezpay.gov.bb/payment_page?token={token}`

### Step C: Payment Callback/Return (Page)
**Context:** User finishes payment and is redirected back to Alpha.Gov.bb.
**Route:** `/payment/callback/page.tsx`

1.  **URL Params:** EZpay returns `tx` (Transaction ID) and `rid` (Reference ID/Application ID).
2.  **Server Logic (in `page.tsx`):**
    *   Do not trust the URL params alone.
    *   Call the **Validation API** immediately to confirm status.
    *   **Endpoint:** `${EZPAY_API_URL}/check_api`
    *   **Method:** POST
    *   **Headers:** `EZPluginKey`.
    *   **Body:** `transaction_number={tx}` OR `reference={rid}`.
3.  **Outcome:**
    *   If `_status === "Success"`: Mark application as paid in DB, trigger AWS SES confirmation email, show "Success" UI.
    *   If `_status !== "Success"`: Show "Payment Failed" UI with a retry button.

### Step D: Webhook Handler (API Route)
**Context:** Asynchronous status updates (e.g., Direct Debit settlement takes 5 days).
**File:** `src/app/api/webhooks/ezpay/route.ts`

1.  **Method:** POST.
2.  **Payload:** Form-data containing `_reference`, `_status`, `_transaction_number`, etc.
3.  **Security:**
    *   Validate that the request comes from a known EZpay IP (if possible).
    *   Verify the `_reference` exists in your database.
4.  **Logic:** Update the application status based on `_status`.

## 5. Specific Nuances for the LLM Developer

When generating the code, the LLM must adhere to these constraints:

1.  **TanStack Form Integration:**
    The integration point is likely a custom hook `useEzPay()` that is called within the form's `handleSubmit`. The state of the form should remain "Submitting" until the redirect occurs.

2.  **IP Restriction Warning:**
    The EZpay API is IP restricted.
    *   *Instruction:* Generate code that uses `fetch` with a configured `httpsAgent` if testing locally requires a specific proxy, or explicitly comment that this code will result in `403 Forbidden` on localhost unless the developer's IP is whitelisted in the EZpay console.

3.  **Legacy API Quirk - "Double Encoding":**
    The API requires the cart items to be a **JSON string** passed as a **value** inside a POST field named `ez_cart_array`.
    *   *Incorrect:* `body: JSON.stringify({ ez_cart_array: [...] })`
    *   *Correct:* `formData.append('ez_cart_array', JSON.stringify([...]))`

4.  **Testing (Playground):**
    Reference the "EZPay+ Developer Playground" docs.
    *   Create a helper script `scripts/test-ezpay-callback.ts` that simulates a POST request to the local Webhook endpoint (`localhost:3000/api/webhooks/ezpay`) using the sample payload provided in Document 2, Page 9 (`Call Back Dataset`).

## 6. Development Spike Tasks for LLM

Ask the LLM to generate the following artifacts:

1.  **`src/lib/ezpay/client.ts`**: A type-safe wrapper around the EZpay API `fetch` calls (Init, Check Status).
2.  **`src/app/api/payment/callback/route.ts`**: The API route to handle the webhook updates.
3.  **`src/components/payment/redirect-handler.tsx`**: A client component to handle the loading state while redirecting to the payment gateway.
4.  **Usage Example**: A snippet showing how to call the init function from inside a generic TanStack Form `onSubmit` action.