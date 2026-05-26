"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import {
  buildDirectionsHref,
  closingMinutes,
  formatMinutesAsTime,
  openStatus,
} from "@/lib/open-pharmacy";
import type { Pharmacy, PharmacyType } from "@/types/pharmacy";

const BARBADOS_CENTER: L.LatLngTuple = [13.15, -59.62];
const DEFAULT_ZOOM = 11;

const TYPE_COLOURS: Record<PharmacyType, string> = {
  government: "#00267f",
  "private-sbs": "#e8a833",
  unconfirmed: "#c8cdd3",
};

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
      className="h-[clamp(380px,60vh,560px)] w-full border border-grey-00"
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
          return `<span style="color:#00654a;font-weight:700;">● Open now${escapeHtml(note)}</span>`;
        })()
      : status === false
        ? '<span style="color:#a42c2c;font-weight:700;">● Closed now</span>'
        : '<span style="color:#888;">○ Hours unconfirmed</span>';

  const typeLabel = {
    government: "Government · Free",
    "private-sbs": "Private SBS · Fee applies",
    unconfirmed: "SBS unconfirmed",
  }[pharmacy.type];

  const phoneHtml = pharmacy.phone
    ? `<div style="margin-top:4px;"><a href="tel:+1${pharmacy.phone.replace(/\D/g, "")}">${escapeHtml(pharmacy.phone)}</a></div>`
    : "";

  return `
    <strong>${escapeHtml(pharmacy.name)}</strong>
    <div style="font-size:12px;color:#555;margin-top:2px;">${escapeHtml(typeLabel)}</div>
    <div style="margin-top:6px;">${statusHtml}</div>
    <div style="font-size:12px;margin-top:6px;">${escapeHtml(pharmacy.address)}</div>
    ${phoneHtml}
    <div style="font-size:12px;margin-top:4px;">${escapeHtml(pharmacy.hoursText)}</div>
    <div style="margin-top:8px;">
      <a href="${buildDirectionsHref(pharmacy)}" target="_blank" rel="noopener">Directions ↗</a>
    </div>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
