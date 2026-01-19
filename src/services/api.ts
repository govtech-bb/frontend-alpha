import { convertDateObjects } from "@/lib/dates";
import type { FormData } from "@/lib/schema-generator";
import type { ApiResponse, JsonValue } from "@/types";

/**
 * Checks if an object has only numeric string keys (like "0", "1", "2")
 * This indicates it was created from indexed field names like minorDetails.0.firstName
 */
function hasOnlyNumericKeys(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj);
  if (keys.length === 0) return false;
  return keys.every((key) => /^\d+$/.test(key));
}

/**
 * Transforms objects with numeric keys into proper arrays
 * e.g., { "0": { firstName: "Jake" }, "1": { firstName: "John" } }
 * becomes: [{ firstName: "Jake" }, { firstName: "John" }]
 *
 * Also recursively processes nested objects
 */
function convertIndexedObjectsToArrays(
  data: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      result[key] = value;
    } else if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      const objValue = value as Record<string, unknown>;

      // Check if this object has only numeric keys - convert to array
      if (hasOnlyNumericKeys(objValue)) {
        const sortedKeys = Object.keys(objValue).sort(
          (a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10)
        );
        result[key] = sortedKeys.map((k) => {
          const item = objValue[k];
          // Recursively process nested objects within array items
          if (
            item &&
            typeof item === "object" &&
            !Array.isArray(item) &&
            !(item instanceof Date)
          ) {
            return convertIndexedObjectsToArrays(
              item as Record<string, unknown>
            );
          }
          return item;
        });
      } else {
        // Recursively process nested objects
        result[key] = convertIndexedObjectsToArrays(objValue);
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Removes temporary navigation fields that shouldn't be submitted
 * e.g., _addAnother_minorDetails_0, _addAnother_minorDetails_1, etc.
 * Also removes legacy addAnotherMinor0, addAnotherMinor1, etc.
 */
function removeNavigationFields(
  data: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    // Skip _addAnother_* fields (dynamic repeatable step navigation)
    if (key.startsWith("_addAnother_")) {
      continue;
    }
    // Skip legacy addAnotherMinor* fields (static approach - backwards compatibility)
    if (/^addAnotherMinor\d+$/.test(key)) {
      continue;
    }
    result[key] = value;
  }

  return result;
}

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

  // Remove temporary navigation fields (e.g., addAnotherMinor0)
  const cleanedData = removeNavigationFields(data as Record<string, unknown>);

  // Convert indexed objects to proper arrays (e.g., minorDetails.0 -> minorDetails[0])
  const arrayData = convertIndexedObjectsToArrays(cleanedData);

  // Convert DateObject instances to ISO date strings
  const convertedData = convertDateObjects(arrayData as JsonValue) as Record<
    string,
    unknown
  >;

  // Remove father.age field to avoid backend validation error
  if (convertedData.father && typeof convertedData.father === "object") {
    delete (convertedData.father as Record<string, unknown>).age;
  }

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
