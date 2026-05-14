"use server";

import { randomInt } from "node:crypto";
import {
  generateApplicationCode,
  SERVICES,
  type ServiceCode,
} from "@/lib/application-code";

const COUNTER_CAPACITY = 36 ** 3;

function isServiceCode(value: string): value is ServiceCode {
  return value in SERVICES;
}

/**
 * Server action that issues a fresh application tracking code. The 3-char
 * base36 counter slot is filled with a CSPRNG random integer (no persistent
 * counter is currently wired up); the trailing 4-char random suffix from
 * `generateApplicationCode` keeps collision risk negligible.
 */
// biome-ignore lint/suspicious/useAwait: Next.js server actions must be async even when the implementation is synchronous.
export async function generateApplicationCodeForService(
  service: string
): Promise<
  { success: true; code: string } | { success: false; error: string }
> {
  if (!isServiceCode(service)) {
    return {
      success: false,
      error: `Unknown service code: ${service}`,
    };
  }

  const applicationId = randomInt(0, COUNTER_CAPACITY);
  const code = generateApplicationCode(service, applicationId);

  return { success: true, code };
}
