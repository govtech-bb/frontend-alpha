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

export const PARISH_CENTRES: Record<string, Coordinates> = {
  "Christ Church": { lat: 13.075, lng: -59.55 },
  "St. Andrew": { lat: 13.192, lng: -59.553 },
  "St. George": { lat: 13.135, lng: -59.574 },
  "St. James": { lat: 13.167, lng: -59.635 },
  "St. John": { lat: 13.13, lng: -59.498 },
  "St. Joseph": { lat: 13.187, lng: -59.523 },
  "St. Lucy": { lat: 13.278, lng: -59.604 },
  "St. Michael": { lat: 13.112, lng: -59.612 },
  "St. Peter": { lat: 13.253, lng: -59.615 },
  "St. Philip": { lat: 13.08, lng: -59.482 },
  "St. Thomas": { lat: 13.162, lng: -59.602 },
};

const MILES_TO_KM = 1.609_34;

export function milesToKm(miles: number): number {
  return miles * MILES_TO_KM;
}

export function filterByRadiusKm(
  jps: JusticeOfThePeace[],
  origin: Coordinates,
  radiusKm: number
): JusticeOfThePeace[] {
  return jps.filter((jp) => haversineKm(origin, jp) <= radiusKm);
}
