# Primary School Textbook Grant — School select and email routing

## What’s in place

1. **School data** (`src/data/primary-schools.ts`)
   - `primarySchoolsSelectOptions`: `SelectOption[]` for the school dropdown (label = school name, value = stable slug).
   - `primarySchoolEmailBySlug`: `Record<string, string>` mapping slug → principal email. Use this when sending the application.

2. **Form schema** (`src/schema/primary-school-textbook-grant.ts`)
   - A **“Child’s school”** select field in the first step (“Tell us about the child”), after “Which class are they currently in?”.
   - Because the step is repeatable (`beneficiaries`), each child has their own school selection.
   - Submitted data includes `beneficiaries[].school` with the selected slug (e.g. `"adacostaedwardsprimary"`).

## Sending the application to the school’s email

The form posts to your processing API (`NEXT_PUBLIC_PROCESSING_API/forms/primary-school-textbook-grant/submit`). To send the application to the correct school:

1. **Read the selected school(s)** from the request body:
   - `beneficiaries` is an array; each item has a `school` property (the slug).

2. **Resolve slug → email** using the same mapping:
   - In this repo you can import:  
     `import { primarySchoolEmailBySlug } from "@/data/primary-schools";`  
     then `primarySchoolEmailBySlug[slug]` gives the principal email.
   - If the processing API is a separate service, either:
     - Copy the `primarySchoolEmailBySlug` map (or generate it from the same CSV), or
     - Call an endpoint on this app that returns the map, or
     - Store slug→email in a shared config/DB.

3. **Send the application email** to that address:
   - For each beneficiary (or the primary one, depending on your business rule), get `email = primarySchoolEmailBySlug[beneficiary.school]`.
   - If `email` is missing (invalid slug), treat as error and do not send.
   - Use your normal email path (e.g. SES like `src/app/api/send-feedback/route.ts`): one email per school, or one email per application to the first child’s school, as required.

## Example (in this app)

If you add a **form-specific submit handler** in this repo (e.g. a route that runs when `formKey === "primary-school-textbook-grant"`):

```ts
import { primarySchoolEmailBySlug } from "@/data/primary-schools";

// In your handler:
const body = await request.json();
const beneficiaries = body.beneficiaries ?? [];
const firstBeneficiary = beneficiaries[0];
const schoolSlug = firstBeneficiary?.school;
const toEmail = schoolSlug ? primarySchoolEmailBySlug[schoolSlug] : undefined;

if (!toEmail) {
  return NextResponse.json(
    { success: false, message: "Invalid or missing school" },
    { status: 400 }
  );
}

// Build HTML/text from body and send via SES to toEmail
await sendEmail({ to: toEmail, subject: "...", html: "..." });
```

You can either:
- Have the client post to this app’s submit route for this form only (e.g. by `formKey` in the URL and a branch in `src/app/forms/[formKey]/submit/route.ts`), or
- Keep posting to the processing API and implement the lookup and send logic there.

## Updating the school list

Edit `src/data/primary-schools.ts`: update the `schoolsWithEmails` array (add/remove/change rows). The select options and `primarySchoolEmailBySlug` are derived from that array. The slug is the email local part in lower case; keep emails unique so slugs stay unique.
