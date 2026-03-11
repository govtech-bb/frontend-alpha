/**
 * Pattern Loader Service
 * Fetches pattern and service contract JSON files from S3/CloudFront or local public directory
 */

const PATTERNS_BASE_URL =
  process.env.NEXT_PUBLIC_PATTERNS_CDN_URL || "/patterns";
const SERVICE_CONTRACTS_BASE_URL =
  process.env.NEXT_PUBLIC_SERVICE_CONTRACTS_CDN_URL || "/service-contracts";

export interface PatternDefinition {
  id: string;
  version: string;
  name: string;
  description: string;
  category: string;
  fields: Array<{
    name: string;
    type: string;
    label: string;
    validation: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  metadata?: Record<string, unknown>;
}

export interface ServiceContract {
  id: string;
  version: string;
  name: string;
  description: string;
  pages: Array<{
    id: string;
    title: string;
    sections: Array<{
      id: string;
      patternRef?: string;
      fields?: unknown[];
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  }>;
  metadata?: Record<string, unknown>;
}

/**
 * Fetches a pattern definition from the CDN or local public directory
 */
export async function fetchPattern(
  patternId: string
): Promise<PatternDefinition> {
  const url = `${PATTERNS_BASE_URL}/${patternId}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch pattern ${patternId}: ${response.status} ${response.statusText}`
      );
    }

    const pattern = (await response.json()) as PatternDefinition;
    return pattern;
  } catch (error) {
    console.error(`Error fetching pattern ${patternId}:`, error);
    throw error;
  }
}

/**
 * Fetches a service contract from the CDN or local public directory
 */
export async function fetchServiceContract(
  contractId: string
): Promise<ServiceContract> {
  const url = `${SERVICE_CONTRACTS_BASE_URL}/service-contract-${contractId}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch service contract ${contractId}: ${response.status} ${response.statusText}`
      );
    }

    const contract = (await response.json()) as ServiceContract;
    return contract;
  } catch (error) {
    console.error(`Error fetching service contract ${contractId}:`, error);
    throw error;
  }
}

/**
 * Fetches multiple patterns in parallel
 */
export async function fetchPatterns(
  patternIds: string[]
): Promise<Map<string, PatternDefinition>> {
  const patternPromises = patternIds.map((id) =>
    fetchPattern(id).then((pattern) => ({ id, pattern }))
  );

  const results = await Promise.allSettled(patternPromises);
  const patternMap = new Map<string, PatternDefinition>();

  for (const result of results) {
    if (result.status === "fulfilled") {
      patternMap.set(result.value.id, result.value.pattern);
    } else {
      console.error("Failed to fetch pattern:", result.reason);
    }
  }

  return patternMap;
}

/**
 * Cache for loaded patterns to avoid redundant fetches
 */
const patternCache = new Map<string, PatternDefinition>();

/**
 * Fetches a pattern with caching
 */
export async function fetchPatternCached(
  patternId: string
): Promise<PatternDefinition> {
  if (patternCache.has(patternId)) {
    return patternCache.get(patternId)!;
  }

  const pattern = await fetchPattern(patternId);
  patternCache.set(patternId, pattern);
  return pattern;
}

/**
 * Clears the pattern cache (useful for testing or forced refresh)
 */
export function clearPatternCache(): void {
  patternCache.clear();
}
