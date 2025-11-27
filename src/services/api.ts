import { type FormData, formSchema } from "@/lib/schema-generator";

type ApiResponse = {
  success: boolean;
  data?: {
    submissionId: string;
    formId: string;
    status: string;
    processedAt: string;
  };
  errors?: { field: string; message: string; code: string }[];
  message?: string;
};

export async function submitFormData({
  data,
  formKey,
}: {
  data: FormData;
  formKey: string;
}): Promise<ApiResponse> {
  const validatedData = formSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
    return { success: false, errors };
  }
  //TODO: Validate env variables using zod
  const PROCESSING_API = process.env.NEXT_PUBLIC_PROCESSING_API;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(`${PROCESSING_API}/forms/${formKey}/submit`, {
    method: "POST",
    body: JSON.stringify(data),
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
