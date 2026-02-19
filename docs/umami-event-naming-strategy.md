# Umami Event Naming Strategy

Reference document for consistent analytics event naming across alpha.gov.bb.

All events use [Umami custom events](https://umami.is/docs/track-events) via `umami.track(eventName, eventData)`.

---

## PII Safeguards

Umami must never receive Personally Identifiable Information. These rules apply to every custom event and virtual pageview.

### Core Rules

1. **Never track field values.** Only track field **names** (schema keys like `"applicant.email"`) and error **types** (`"required"`, `"pattern"`). Never include the data a user typed into a field.
2. **Never track error message text.** Validation messages could contain reflected user input (e.g. `"'john@example' is not a valid email"`). Only track the error type category.
3. **Never track API error messages.** Server responses (`result.message`) could contain submitted field values or internal details. Only track the existence of a submission error, not its content.
4. **Never track reference numbers.** Submission IDs (e.g. `"SUB-2026-001"`) link directly to an individual's form submission.
5. **Never track customer names or contact details.** Values like `storedCustomerName`, email addresses, or phone numbers must never appear in event data.
6. **Never track payment IDs or tokens.** These link to financial transactions and are PII-adjacent.
7. **Never interpolate user input into virtual pageview URLs.** Only use schema-defined constants (step IDs, form slugs) in synthetic URLs.
8. **No DOM-level tracking on review or confirmation pages.** These pages display all entered data. Any future click tracking or session replay must exclude them.

### What Is Safe to Track

| Data | Safe? | Reason |
| ---- | ----- | ------ |
| Step ID (`"applicant-details"`) | Yes | Schema-defined constant |
| Field name (`"applicant.email"`) | Yes | Schema key, not the email value |
| Error type (`"required"`, `"pattern"`) | Yes | Category label, not user-specific |
| Error count (`3`) | Yes | Aggregate number |
| Form ID (`"birth-cert"`) | Yes | Service identifier |
| Category (`"family"`) | Yes | Service category |
| Field value (`"john@example.com"`) | **No** | Direct PII |
| Error message text (`"Enter your email"`) | **No** | Could contain reflected user input |
| API error message (`result.message`) | **No** | Could contain field values |
| Reference number (`"SUB-2026-001"`) | **No** | Links to individual submission |
| Customer name (`storedCustomerName`) | **No** | Direct PII |
| Payment ID / token | **No** | Links to financial transaction |

### Implementation Guard

When extracting errors for tracking, only pull the field name and error type:

```typescript
// SAFE -- schema keys and error categories only
const errorFields = currentFieldNames
  .filter((name) => getNestedValue(errors, name))
  .map((name) => ({
    field: name,                                    // "applicant.email" (schema key)
    type: (getNestedValue(errors, name) as { type?: string })?.type,  // "pattern"
    // NEVER include: error.message, methods.getValues(name), etc.
  }));
```

---

## Naming Conventions

### Event Names

Event names are **form-specific** and use **kebab-case**. The pattern is:

```
{form_id}-{action}
```

Where `{form_id}` is the short form identifier (e.g. `birth-cert`, `death-cert`) and `{action}` describes what happened.

**Step completion** events include the step number as an English word:

```
{form_id}-step-{number}
```

Where `{number}` is `one`, `two`, `three`, `four`, etc. (0-based index converted to words, so the first step fires `step-one`).

**Examples:**

| Old Generic Name | New Form-Specific Name | When |
| ---------------- | ---------------------- | ---- |
| `form-start` | `birth-cert-start` | User clicks "Start now" for birth certificate form |
| `form-step-complete` | `birth-cert-step-one` | User completes the first step |
| `form-step-complete` | `birth-cert-step-two` | User completes the second step |
| `form-validation-error` | `birth-cert-validation-error` | Validation fails on a birth certificate form step |
| `form-submit` | `birth-cert-submit` | Form submitted successfully |
| `form-submit-error` | `birth-cert-submit-error` | Submission fails |
| *(new)* | `birth-cert-abandon` | User leaves the form without submitting |

### Event Data Properties

Every event includes structured data as key-value pairs. Property values must be `string`, `number`, or `boolean`.

| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| `form` | string | Short form identifier (see Form Identifiers table) | `"birth-cert"` |
| `category` | string | Service category short name | `"family"` |
| `step` | string | Step ID from the form schema | `"applicant-details"` |
| `field` | string | Dot-notation field name | `"applicant.email"` |
| `errorType` | string | Validation error type | `"required"` |
| `errorCount` | number | Number of errors in a single validation attempt | `3` |
| `duration` | number | Seconds from form load to submission (or abandonment) | `342` |

Not every property applies to every event. Only include properties relevant to the event.

---

## Form Identifiers

Short, consistent identifiers for each form. These are used as the `{form_id}` prefix in event names and in the `form` event data property.

| Short ID | Full Slug | Service Name |
| -------- | --------- | ------------ |
| `birth-cert` | `get-birth-certificate` | Get a birth certificate |
| `death-cert` | `get-death-certificate` | Get a death certificate |
| `marriage-cert` | `get-marriage-certificate` | Get a marriage certificate |
| `birth-reg` | `register-a-birth` | Register a birth |
| `textbook-grant` | `get-a-primary-school-textbook-grant` | Primary school textbook grant |
| `sports-training` | `register-for-community-sports-training-programme` | Community sports training programme |
| `protege-mentor` | `apply-to-be-a-project-protege-mentor` | Project Protege mentor |
| `jobstart-plus` | `apply-to-jobstart-plus-programme` | JobStart Plus programme |
| `conductor-licence` | `apply-for-conductor-licence` | Conductor licence |
| `mail-individual` | `post-office-redirection-individual` | Mail redirection (individual) |
| `mail-deceased` | `post-office-redirection-deceased` | Mail redirection (deceased) |
| `mail-business` | `post-office-redirection-business` | Mail redirection (business) |
| `beach-park-vendor` | `sell-goods-services-beach-park` | Sell goods/services at beach or park |
| `society-name` | `reserve-society-name` | Reserve a society name |
| `fire-inspection` | `request-a-fire-service-inspection` | Fire service inspection |
| `exit-survey` | `exit-survey` | Exit survey |

---

## Category Identifiers

| Short ID | Full Slug | Category Name |
| -------- | --------- | ------------- |
| `family` | `family-birth-relationships` | Family, birth and relationships |
| `employment` | `work-employment` | Work and employment |
| `financial` | `money-financial-support` | Money and financial support |
| `travel` | `travel-id-citizenship` | Travel, ID and citizenship |
| `business` | `business-trade` | Business and trade |
| `safety` | `public-safety` | Public safety |

---

## Step Number Words

Step completion events use English words instead of numeric indices to keep event names human-readable in the dashboard.

| Step Index (0-based) | Word | Example Event |
| -------------------- | ---- | ------------- |
| 0 | `one` | `birth-cert-step-one` |
| 1 | `two` | `birth-cert-step-two` |
| 2 | `three` | `birth-cert-step-three` |
| 3 | `four` | `birth-cert-step-four` |
| 4 | `five` | `birth-cert-step-five` |
| 5+ | `six`, `seven`, ... | `birth-cert-step-six` |

---

## Event Catalogue

### Form Start & Navigation Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-start` | User clicks "Start now" on a start page to enter the form | `form`, `category` |
| `{form_id}-step-{number}` | User passes validation and advances to the next step | `form`, `category`, `step` |
| `{form_id}-step-back` | User clicks the "Back" button to return to a previous step | `form`, `category`, `step` (the step they are leaving) |
| `{form_id}-step-edit` | User clicks "Change" on the review page to edit a completed step | `form`, `category`, `step` (the step being edited) |

### Submission Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-submit` | User successfully submits the form (receives a reference number) | `form`, `category`, `duration` (seconds from form load to submission) |
| `{form_id}-submit-error` | Form submission fails (API error) | `form`, `category` |

### Validation Error Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-validation-error` | User clicks Continue/Submit and validation fails | `form`, `category`, `step`, `errorCount`, `fields` (comma-separated list of failed field names), `errorTypes` (comma-separated list of error types) |

#### Error Types

| `errorType` value | Meaning | Example Trigger |
| ----------------- | ------- | --------------- |
| `required` | Field left empty or unchecked | Empty "First name" |
| `pattern` | Value doesn't match expected format | Invalid email address |
| `minLength` | Value too short | NIS number under required length |

#### Example Validation Error Event

```typescript
umami.track("birth-cert-validation-error", {
  form: "birth-cert",
  category: "family",
  step: "applicant-details",
  errorCount: 2,
  fields: "applicant.email,applicant.telephoneNumber",
  errorTypes: "pattern,required"
});
```

### Payment Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-payment-initiated` | User clicks "Continue to payment" (redirected to EZPay) | `form`, `category` |
| `{form_id}-payment-success` | User returns from EZPay with success status | `form`, `category` |
| `{form_id}-payment-failed` | User returns from EZPay with failed status | `form`, `category` |
| `{form_id}-payment-error` | Payment verification error | `form`, `category` |

### Abandonment Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-abandon` | User leaves the form (tab close, navigate away) without submitting. Uses `visibilitychange` with 30s debounce + `beforeunload` fallback. Sent via `sendBeacon` for reliability. | `form`, `category`, `step` (last step the user was on), `duration` (seconds from form load to abandonment) |

### Repeatable Step Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-add-another` | User selects "Yes" on the "add another" prompt (repeatable steps) | `form`, `category`, `step` |
| `{form_id}-remove-item` | User removes an item from a field array | `form`, `category`, `field` |

### Feedback Events

| Event Name Pattern | When Fired | Event Data |
| ------------------ | ---------- | ---------- |
| `{form_id}-feedback-start` | User clicks "Give feedback on this service" from the confirmation page | `form` |
| `feedback-submit` | User submits the exit survey or simple feedback form | `form`, `rating` (if applicable) |

### Page Navigation Events

These are automatically tracked by Umami's pageview auto-tracking. No custom events needed unless you want richer data.

| Event Name | When Fired | Event Data |
| ---------- | ---------- | ---------- |
| `page-service-view` | (Optional) User lands on a service info page (`index.md`) | `form`, `category` |
| `page-start-view` | (Optional) User lands on a start page (`start.md`) | `form`, `category` |

> **Note:** Umami auto-tracks page views including full URLs. These optional events are only needed if you want to attach the short form/category identifiers for easier filtering.

---

## Funnel Definitions

Umami funnels are **URL-based only** -- they track sequences of page visits, not custom events. To surface validation errors in funnels, we use a dual-tracking approach.

### Dual Tracking: Virtual Pageviews + Custom Events

When validation fails, fire **both** a virtual pageview (for funnel visibility) and a custom event (for field-level detail). The virtual pageview uses a synthetic URL that Umami treats as a real page visit, but the browser URL stays unchanged.

```typescript
// 1. Virtual pageview -- shows up in funnels
//    Only uses schema-defined constants (stepId), never user input
umami.track((props) => ({
  ...props,
  url: `${window.location.pathname}?step=${stepId}&validation=failed`,
}));

// 2. Custom event -- shows up in Events with field-level detail
umami.track("birth-cert-validation-error", {
  form: "birth-cert",
  category: "family",
  step: "applicant-details",
  errorCount: 2,
  fields: "applicant.email,applicant.telephoneNumber",
  errorTypes: "pattern,required",
});
```

### Funnel Tiers

**Tier 1 -- Overview funnels (deploy first).** One per form, tracking the happy path. Use these to identify which steps have the highest drop-off.

**Tier 2 -- Diagnostic funnels (add after reviewing Tier 1 data).** Add `&validation=failed` intermediate steps only for steps with high drop-off in Tier 1. This keeps funnels readable rather than adding an error step for every form step.

### Tier 1: Standard Form Funnel (Non-Payment)

| Funnel Step | URL Pattern |
| ----------- | ----------- |
| Service Page | `*/{form-slug}` |
| Start Page | `*/{form-slug}/start` |
| Form Entry | `*/{form-slug}/form` |
| Completion | `*/{form-slug}/form?step=confirmation` |

### Tier 1: Payment Form Funnel

| Funnel Step | URL Pattern |
| ----------- | ----------- |
| Service Page | `*/{form-slug}` |
| Start Page | `*/{form-slug}/start` |
| Form Entry | `*/{form-slug}/form` |
| Submission | `*/{form-slug}/form?step=confirmation` |
| Payment Success | `*/{form-slug}/form?step=confirmation&payment_status=Success` |

### Tier 2: Diagnostic Funnel Example (Birth Certificate)

Only add once Tier 1 data shows `applicant-details` has high drop-off:

| Funnel Step | URL Pattern |
| ----------- | ----------- |
| Form Entry | `*/get-birth-certificate/form` |
| Applicant Details (error) | `*/get-birth-certificate/form?step=applicant-details&validation=failed` |
| Applicant Details (passed) | `*/get-birth-certificate/form?step=birth-details` |
| Review | `*/get-birth-certificate/form?step=check-your-answers` |
| Completion | `*/get-birth-certificate/form?step=confirmation` |

### Forms with Payment

- `get-birth-certificate`
- `get-death-certificate`
- `get-marriage-certificate`
- `reserve-society-name`

---

## Dashboard Organisation

### Recommended Views

| Dashboard Filter | Purpose |
| ---------------- | ------- |
| Filter events matching `*-validation-error` | See which forms and steps cause the most friction |
| Group `*-validation-error` by `fields` | Find the most problematic individual fields |
| Filter events matching `*-submit` | Track overall form completion rates |
| Filter events matching `*-step-*` with `step=check-your-answers` | Users who reached the review stage |
| Filter events matching `*-payment-failed` | Monitor payment issues |
| Compare `*-start` vs `*-submit` counts per form | Measure form completion rate |
| Filter events matching `*-abandon` | See where and when users drop off |

### Key Metrics to Monitor

| Metric | How to Calculate |
| ------ | ---------------- |
| **Form completion rate** | `{form_id}-submit` count / `{form_id}-start` count |
| **Step drop-off rate** | Compare `{form_id}-step-{N}` counts between consecutive steps |
| **Validation failure rate** | `{form_id}-validation-error` count / total step completion count |
| **Most problematic fields** | `{form_id}-validation-error` events grouped by `fields` property |
| **Payment success rate** | `{form_id}-payment-success` count / `{form_id}-payment-initiated` count |
| **Average errors per attempt** | Average `errorCount` from `{form_id}-validation-error` events |
| **Average fill time** | Average `duration` from `{form_id}-submit` events (via Goals > Event Data > Average) |
| **Abandonment rate** | `{form_id}-abandon` count / `{form_id}-start` count |
| **Average time before abandonment** | Average `duration` from `{form_id}-abandon` events |
| **Most abandoned step** | `{form_id}-abandon` events grouped by `step` property |

---

## Abandonment Tracking Details

### How It Works

Form abandonment is tracked using two browser APIs for reliability:

1. **`visibilitychange` event** -- fires when the user switches tabs or minimises the browser. A 30-second timer starts; if the user doesn't return within 30 seconds, an abandonment event is sent. If they return sooner, the timer is cancelled (no false positive).

2. **`beforeunload` event** -- fires when the user closes the tab, closes the browser, or navigates to an external URL. The abandonment event fires immediately.

Both use `navigator.sendBeacon()` to reliably deliver the event during page unload, when normal `fetch` or XHR requests may be cancelled by the browser.

### What Prevents False Positives

- The 30-second debounce on `visibilitychange` filters out brief tab switches
- The `isSubmitted` flag prevents firing after a successful form submission
- The hook cleans up all listeners on component unmount (e.g. navigating away within the app to the confirmation page)

### sendBeacon Payload

The `sendBeacon` payload is sent directly to `https://cloud.umami.is/api/send` in the same format the Umami client script uses:

```json
{
  "type": "event",
  "payload": {
    "hostname": "alpha.gov.bb",
    "language": "en-US",
    "referrer": "",
    "screen": "1920x1080",
    "title": "Get a Birth Certificate",
    "url": "/family-birth-relationships/get-birth-certificate/form",
    "website": "<site-id>",
    "name": "birth-cert-abandon",
    "data": {
      "form": "birth-cert",
      "category": "family",
      "step": "applicant-details",
      "duration": 145
    }
  }
}
```

---

## Implementation Mapping

Where each event is instrumented in the codebase. All forms share `DynamicMultiStepForm`, so most events are in a single file.

| Event Pattern | File | Location |
| ------------- | ---- | -------- |
| `{form_id}-start` | `tracked-start-link.tsx` | On "Start now" link click |
| `{form_id}-step-{number}` | `multi-step-form.tsx` | Inside `nextStep()`, after `markStepComplete()` |
| `{form_id}-step-back` | `multi-step-form.tsx` | Inside `prevStep()` |
| `{form_id}-step-edit` | `multi-step-form.tsx` | Inside `handleEditFromReview()` |
| `{form_id}-validation-error` | `multi-step-form.tsx` (via `trackValidationErrors()` in `analytics.ts`) | Inside `nextStep()`, in the `else` branch when `!isValid` |
| `{form_id}-submit` | `multi-step-form.tsx` | Inside `onSubmit()`, after `markAsSubmitted()` |
| `{form_id}-submit-error` | `multi-step-form.tsx` | Inside `onSubmit()`, in the error/catch blocks |
| `{form_id}-abandon` | `multi-step-form.tsx` (via `useFormAbandonmentTracking()` in `analytics.ts`) | Hook registered once per form mount |
| `{form_id}-add-another` | `multi-step-form.tsx` | Inside `nextStep()`, when `addAnotherValue === "yes"` |
| `{form_id}-remove-item` | `dynamic-field-array.tsx` | Inside `handleRemove()` |
| `{form_id}-payment-initiated` | `payment-block.tsx` | On "Continue to payment" click |
| `{form_id}-payment-success` | `multi-step-form.tsx` | When `payment_status=Success` is detected |
| `{form_id}-payment-failed` | `multi-step-form.tsx` | When `payment_status=Failed` is detected |
| `{form_id}-payment-error` | `multi-step-form.tsx` | When `payment_status=error` is detected |
| `{form_id}-feedback-start` | `confirmation-step.tsx` | On "Give feedback" link click |
| `feedback-submit` | `simple-feedback-form.tsx` or exit survey `onSubmit` | After successful submission |

---

## Helper Functions (analytics.ts)

| Function | Purpose |
| -------- | ------- |
| `buildEventName(formId, action)` | Constructs `"{formId}-{action}"` event name |
| `getStepNumberWord(index)` | Converts 0-based index to English word (0 → "one", 4 → "five") |
| `getFormShortId(storageKey)` | Maps storageKey to short ID |
| `getFormShortIdFromSlug(urlSlug)` | Maps URL slug to short ID |
| `getCategoryShortId(categorySlug)` | Maps category slug to short ID |
| `trackEvent(name, data)` | Fires a custom Umami event (no-ops if script is blocked) |
| `trackVirtualPageview(url)` | Fires a virtual pageview for funnel visibility |
| `trackValidationErrors({...})` | Extracts PII-safe error metadata and fires both event + virtual pageview |
| `useFormAbandonmentTracking({...})` | React hook — registers `visibilitychange` + `beforeunload` listeners for abandonment detection |

---

## TypeScript Notes

Event names are now **dynamic strings** (e.g. `"birth-cert-step-one"`), not a fixed union type. The `trackEvent` function accepts `string` for the event name. The `buildEventName` helper enforces the `{formId}-{action}` pattern at the call site.

```typescript
type UmamiEventData = Record<string, string | number | boolean>;

// Event names are dynamic, no longer a fixed union
export function trackEvent(eventName: string, data?: UmamiEventData): void;

// Helper to construct consistent event names
export function buildEventName(formId: string, action: string): string;
```
