"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import {
  buildDirectionsHref,
  closingMinutes,
  formatMinutesAsTime,
  openStatus,
  TYPE_COLOURS,
} from "@/lib/open-pharmacy";
import type { Pharmacy, PharmacyType } from "@/types/pharmacy";

const BARBADOS_CENTER: L.LatLngTuple = [13.15, -59.62];
const DEFAULT_ZOOM = 11;

interface FinderMapProps {
  pharmacies: Pharmacy[];
  day: number;
  minutes: number;
}

export function FinderMap({ pharmacies, day, minutes }: FinderMapProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: BARBADOS_CENTER,
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const layer = markerLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    for (const pharmacy of pharmacies) {
      if (pharmacy.lat === undefined || pharmacy.lng === undefined) continue;
      const status = openStatus(pharmacy, day, minutes);
      const marker = L.marker([pharmacy.lat, pharmacy.lng], {
        icon: buildMarkerIcon(pharmacy.type, status),
        title: pharmacy.name,
        alt: pharmacy.name,
      });
      marker.bindPopup(buildPopupHtml(pharmacy, day, minutes), {
        maxWidth: 300,
      });
      marker.addTo(layer);
    }
  }, [pharmacies, day, minutes]);

  return (
    <section
      aria-label="Map of pharmacies"
      className="isolate h-[clamp(380px,60vh,560px)] w-full border border-grey-00"
      ref={containerRef}
    />
  );
}

function buildMarkerIcon(
  type: PharmacyType,
  status: boolean | null
): L.DivIcon {
  const bg = TYPE_COLOURS[type];
  const dot =
    status === true ? "#00654a" : status === false ? "#a42c2c" : "#aaaaaa";
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${bg};border:2.5px solid white;box-shadow:0 1px 5px rgba(0,0,0,0.35);position:relative;">
      <div style="width:7px;height:7px;border-radius:50%;background:${dot};border:1.5px solid white;position:absolute;bottom:-3px;right:-3px;"></div>
    </div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -12],
  });
}

function buildPopupHtml(
  pharmacy: Pharmacy,
  day: number,
  minutes: number
): string {
  const status = openStatus(pharmacy, day, minutes);
  const statusHtml =
    status === true
      ? (() => {
          const cl = closingMinutes(pharmacy, day, minutes);
          const note =
            cl === null ? "" : ` · closes ${formatMinutesAsTime(cl)}`;
          return statusBadgeHtml("#00654a", `Open now${escapeHtml(note)}`);
        })()
      : status === false
        ? statusBadgeHtml("#a42c2c", "Closed now")
        : statusBadgeHtml("#595959", "Hours unconfirmed");

  const typeLabel = {
    government: "Government · Free",
    "private-sbs": "Private SBS · Fee applies",
    unconfirmed: "SBS unconfirmed",
  }[pharmacy.type];

  const phoneHtml = pharmacy.phone
    ? `<div style="display:flex;align-items:center;gap:8px;margin-top:10px;font-size:16px;">📞 <a style="color:#0e5f64;font-weight:700;text-decoration:none;" href="tel:+1${pharmacy.phone.replace(/\D/g, "")}">${escapeHtml(pharmacy.phone)}</a></div>`
    : "";

  return `
    <div style="font-size:20px;font-weight:700;color:#000;line-height:1.2;">${escapeHtml(pharmacy.name)}</div>
    <div style="font-size:13px;color:#595959;margin-top:4px;">${escapeHtml(typeLabel)}</div>
    <div style="margin-top:12px;">${statusHtml}</div>
    <div style="display:flex;align-items:flex-start;gap:8px;margin-top:12px;font-size:15px;color:#000;">📍 <span>${escapeHtml(pharmacy.address)}</span></div>
    ${phoneHtml}
    <div style="display:flex;align-items:flex-start;gap:8px;margin-top:10px;font-size:14px;color:#595959;">🕐 <span>${escapeHtml(pharmacy.hoursText)}</span></div>
    <div style="margin-top:14px;">
      <a style="display:inline-block;background:#0e5f64;color:#ffffff;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:6px;font-size:15px;" href="${buildDirectionsHref(pharmacy)}" target="_blank" rel="noopener">Directions</a>
    </div>
  `;
}

// A coloured status dot followed by a label, matching the list-card design.
function statusBadgeHtml(colour: string, label: string): string {
  return `<span style="display:inline-flex;align-items:center;gap:8px;color:${colour};font-weight:700;font-size:15px;"><span style="width:10px;height:10px;border-radius:9999px;background:${colour};display:inline-block;"></span>${label}</span>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
