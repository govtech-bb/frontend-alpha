import { convertDateObjects } from "@/lib/dates";
import type { FormData } from "@/lib/schema-generator";
import type { ApiResponse, JsonValue } from "@/types";

export type FileUploadResponse = {
  success: boolean;
  data?: {
    fileId: string;
    filename: string;
    url?: string;
  };
  message?: string;
  error?: string;
};

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  const PROCESSING_API = process.env.NEXT_PUBLIC_PROCESSING_API;

  const formData = new globalThis.FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${PROCESSING_API}/file/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return {
        success: false,
        message:
          errorBody.message ?? `Upload failed with status ${response.status}`,
        error: errorBody.error,
      };
    }

    return response.json() as Promise<FileUploadResponse>;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "File upload failed",
      error: "UPLOAD_ERROR",
    };
  }
}

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
