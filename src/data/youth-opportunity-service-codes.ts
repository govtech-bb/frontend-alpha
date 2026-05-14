import type { ServiceCode } from "@/lib/application-code";

/**
 * Maps a youth opportunity ID (from `opportunities.json`) to the SERVICE_CODE
 * expected by the downstream case-management webhook. Values are typed against
 * the canonical `ServiceCode` union from `@/lib/application-code`, so an
 * unknown service prefix is a compile-time error.
 */
export const YOUTH_OPPORTUNITY_SERVICE_CODES: Record<string, ServiceCode> = {
  byac: "BYAC",
  ydp: "YDP",
  pathways: "PATH",
  "bright-sparks-2": "SPARKS",
  "bridge-to-future-2025": "BRIDGE",
  cip: "CIP",
  btu: "BTU",
  "cyber-security-training": "CYBER",
  "web-design-entrepreneurs": "WEBDEV",
  cap: "CAP",
  yes: "YES",
  yar: "YAR",
  "community-canvas": "CANVAS",
  "national-summer-camp": "CAMP",
  ceep: "CEEP",
  "mission-barbados": "MISSION",
  "barbados-blooming-libraries": "BLOOM",
  cmc: "CMC",
  "spreading-joy-2025": "JOY",
  "centre-access": "BOOKING",
};

export function getYouthOpportunityServiceCode(
  opportunityId: string
): ServiceCode | null {
  return YOUTH_OPPORTUNITY_SERVICE_CODES[opportunityId] ?? null;
}
