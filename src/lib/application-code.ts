import "server-only";
import { randomInt } from "node:crypto";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 36 chars

/**
 * Catalogue of valid service prefixes. Using a const object gives us a
 * compile-time-checked union type, so passing an invalid prefix is a
 * TypeScript error — not a runtime surprise.
 */
export const SERVICES = {
  BYAC: "Barbados Youth Advance Corps",
  YDP: "Youth Development Programme",
  PATH: "Pathways Employability Programme",
  SPARKS: "Bright Sparks Educational Project 2.0",
  BRIDGE: "Bridge to the Future Workshop",
  CIP: "Community Impact Programme",
  BTU: "Block Transformation Unit (Project Dawn)",
  CYBER: "Cyber Security Training Workshop",
  WEBDEV: "Web Page Design and Maintenance for Entrepreneurs",
  CAP: "Community Arts Programme",
  YES: "Youth Entrepreneurship Scheme – First Contact",
  YAR: "Youth Achieving Results",
  CANVAS: "Community Canvas",
  CAMP: "National Summer Camp Programme",
  CEEP: "Community Engagement and Educational Programme",
  MISSION: "Mission Barbados",
  BLOOM: "Barbados is Blooming (Little Libraries)",
  CMC: "Centre Management Committee",
  JOY: "Spreading Joy at Christmas",
  BOOKING: "Book a Community Centre",
} as const;

export type ServiceCode = keyof typeof SERVICES;

function encodeBase36(n: number, width: number): string {
  if (n < 0) throw new Error("Counter must be non-negative");
  if (n >= 36 ** width) {
    throw new Error(`Counter ${n} exceeds capacity for width ${width}`);
  }
  return n.toString(36).toUpperCase().padStart(width, "0");
}

function randomSuffix(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return result;
}

function formatDDMM(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}${mm}`;
}

/**
 * Generate an application tracking code:
 *   <SERVICE>-<DDMM>-<counter><random>
 *
 * The ServiceCode type ensures only valid prefixes from SERVICES compile.
 */
export function generateApplicationCode(
  service: ServiceCode,
  applicationId: number,
  date: Date = new Date()
): string {
  const datePart = formatDDMM(date);
  const counterPart = encodeBase36(applicationId, 3);
  const randomPart = randomSuffix(4);
  return `${service}-${datePart}-${counterPart}${randomPart}`;
}
