/**
 * Emergency shelters — Barbados
 * --------------------------------------------------------------
 * Single source of truth for the shelter finder at
 * /health-and-emergency-services/find-an-emergency-shelter/find.
 *
 * Records come from the 2026 Emergency Shelter Booklet (Department of
 * Emergency Management). Coordinates and addresses (49 of 70 shelters) are
 * geocoded from OpenStreetMap via Nominatim and stored inline in
 * emergency-shelters.json. The rest fall back to the parish centroid for
 * distance ordering and show no street address. © OpenStreetMap contributors.
 */

// biome-ignore-all lint/style/useNumericSeparators: latitude/longitude read more clearly without digit grouping
import shelterData from "./emergency-shelters.json";

export const PARISHES = [
  "Christ Church",
  "St. Andrew",
  "St. George",
  "St. James",
  "St. John",
  "St. Joseph",
  "St. Lucy",
  "St. Michael",
  "St. Peter",
  "St. Philip",
  "St. Thomas",
] as const;

export type Parish = (typeof PARISHES)[number];

export interface LatLon {
  lat: number;
  lon: number;
}

export interface Shelter {
  name: string;
  parish: Parish;
  /** 1 = used during a hurricane; 2 = used after one has passed. */
  category: 1 | 2;
  ownership: "Public" | "Privately Owned";
  /** Booklet planning figure — not live availability. */
  capacity: number;
  /** Has potable water on site. */
  water: boolean;
  /** Has a bathroom suitable for people who use a wheelchair. */
  access: boolean;
  notes?: string;
  /** Eligibility restriction, e.g. "Women and children only". */
  restriction?: string;
  /** Geocoded coordinates, when available. */
  coords?: LatLon;
  /** Street address, when geocoded. */
  address?: string;
}

export const STORM_SEASON_LABEL = "1 June to 30 November";
export const SHELTERS_LAST_UPDATED = "2026-05-27";
export const SHELTERS_NEXT_REVIEW = "2027-05-01";

/**
 * Approximate centre of each parish, used to estimate distance for the
 * shelters without a geocoded point. Barbados is small (~21 × 14 km), so
 * parish-centre accuracy is fine for "near me" ordering.
 * Coordinates from OpenStreetMap parish boundary centroids.
 */
export const PARISH_CENTROIDS: Record<Parish, LatLon> = {
  "Christ Church": { lat: 13.0689, lon: -59.5469 },
  "St. Andrew": { lat: 13.2167, lon: -59.5667 },
  "St. George": { lat: 13.1564, lon: -59.5294 },
  "St. James": { lat: 13.1833, lon: -59.6333 },
  "St. John": { lat: 13.1833, lon: -59.4833 },
  "St. Joseph": { lat: 13.2167, lon: -59.55 },
  "St. Lucy": { lat: 13.3, lon: -59.6167 },
  "St. Michael": { lat: 13.1, lon: -59.6167 },
  "St. Peter": { lat: 13.2667, lon: -59.6333 },
  "St. Philip": { lat: 13.15, lon: -59.45 },
  "St. Thomas": { lat: 13.1833, lon: -59.5833 },
};

export const EMERGENCY_SHELTERS = shelterData as Shelter[];
export const SHELTER_COUNT = EMERGENCY_SHELTERS.length;
