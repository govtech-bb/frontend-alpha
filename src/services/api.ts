import { convertDateObjects } from "@/lib/dates";
import type { FormData } from "@/lib/schema-generator";
import type { ApiResponse, JsonValue } from "@/types";

export async function submitFormData({
  data,
  formKey,
}: {
  data: FormData;
  formKey: string;
}): Promise<ApiResponse> {
  // Form data is already validated by the form component before submission
  //TODO: Validate env variables using zod
  const PROCESSING_API = process.env.NEXT_PUBLIC_PROCESSING_API;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Convert DateObject instances to ISO date strings
  const convertedData = convertDateObjects(data as JsonValue);

  const response = await fetch(`${PROCESSING_API}/forms/${formKey}/submit`, {
    method: "POST",
    body: JSON.stringify(convertedData),
    headers: myHeaders,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    return {
      success: false,
      message:
        errorBody.message ?? `Request failed with status ${response.status}`,
      errors: errorBody.errors,
    };
  }

  return response.json() as Promise<ApiResponse>;
}
