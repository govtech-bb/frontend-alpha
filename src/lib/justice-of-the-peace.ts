import type { JusticeOfThePeace } from "@/types/justice-of-the-peace";

const EARTH_RADIUS_KM = 6371;

export interface Coordinates {
  lat: number;
  lng: number;
}

export function haversineKm(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const sinHalfLat = Math.sin(dLat / 2);
  const sinHalfLng = Math.sin(dLng / 2);
  const h =
    sinHalfLat * sinHalfLat +
    Math.cos(toRadians(a.lat)) *
      Math.cos(toRadians(b.lat)) *
      sinHalfLng *
      sinHalfLng;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function filterByParish(
  jps: JusticeOfThePeace[],
  parish: string
): JusticeOfThePeace[] {
  if (!parish) return jps;
  return jps.filter((jp) => jp.parish === parish);
}

export function sortByDistance(
  jps: JusticeOfThePeace[],
  origin: Coordinates
): JusticeOfThePeace[] {
  return [...jps].sort(
    (a, b) => haversineKm(origin, a) - haversineKm(origin, b)
  );
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function listParishes(jps: JusticeOfThePeace[]): string[] {
  return [...new Set(jps.map((jp) => jp.parish))].sort();
}
