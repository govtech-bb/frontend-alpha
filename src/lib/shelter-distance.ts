/**
 * Distance helpers for the emergency shelter finder.
 * --------------------------------------------------------------
 * Barbados is small (~21 × 14 km), so for the 21 shelters without a geocoded
 * point we fall back to the parish centroid — good enough for "nearest first"
 * ordering. Pure functions; no DOM or browser APIs.
 */

import {
  type LatLon,
  PARISH_CENTROIDS,
  type Shelter,
} from "@/data/emergency-shelters";

const EARTH_RADIUS_KM = 6371;

/**
 * Largest distance between any two points in Barbados is ~30 km. If the user
 * is further than this from every parish centroid, they are not on the island
 * and distance ordering is meaningless.
 */
const MAX_PLAUSIBLE_DISTANCE_KM = 50;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/** Great-circle distance between two points in kilometres. */
export function haversineKm(a: LatLon, b: LatLon): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export interface ShelterDistance {
  km: number;
  /** True when measured from the shelter's own coordinates, false when from the parish centre. */
  exact: boolean;
}

/** Distance from the user to a shelter, or null if it cannot be determined. */
export function shelterDistance(
  shelter: Shelter,
  user: LatLon | null
): ShelterDistance | null {
  if (!user) {
    return null;
  }
  if (shelter.coords) {
    return { km: haversineKm(user, shelter.coords), exact: true };
  }
  const centroid = PARISH_CENTROIDS[shelter.parish];
  return centroid ? { km: haversineKm(user, centroid), exact: false } : null;
}

/** True when the user's position is close enough to Barbados for distances to mean anything. */
export function userIsOnIsland(user: LatLon): boolean {
  let nearest = Number.POSITIVE_INFINITY;
  for (const centroid of Object.values(PARISH_CENTROIDS)) {
    nearest = Math.min(nearest, haversineKm(user, centroid));
  }
  return nearest <= MAX_PLAUSIBLE_DISTANCE_KM;
}

const VERY_CLOSE_KM = 0.5;

/** Human-readable distance, e.g. "2.4 km away" or "In your parish". */
export function formatDistance(distance: ShelterDistance): string {
  if (distance.km < VERY_CLOSE_KM) {
    return distance.exact ? "Very close" : "In your parish";
  }
  const value = `${distance.km.toFixed(1)} km`;
  return distance.exact ? `${value} away` : `${value} from your parish`;
}
