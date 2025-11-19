import type { FormData } from "@/lib/schema-generator";

type ApiResponse = {
  success: boolean;
  referenceNumber?: string;
  message?: string;
  error?: string;
};

export async function submitFormData(_data: FormData): Promise<ApiResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate a mock reference number
  const referenceNumber = `REF-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  // Simulate 90% success rate (optional - for testing error handling)
  const shouldSucceed = Math.random() > 0.1;

  if (shouldSucceed) {
    return {
      success: true,
      referenceNumber,
      message: "Form submitted successfully",
    };
  }
  return {
    success: false,
    error: "Mock error: Server temporarily unavailable",
  };
}
