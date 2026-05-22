"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Coordinates } from "@/lib/justice-of-the-peace";
import type { JusticeOfThePeace } from "@/types/justice-of-the-peace";

const BARBADOS_CENTER: L.LatLngTuple = [13.18, -59.555];
const DEFAULT_ZOOM = 11;
const FOCUS_ZOOM = 14;

const jpIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userLocationIcon = L.divIcon({
  className: "jp-user-location",
  html: '<span aria-hidden="true" style="display:block;width:18px;height:18px;border-radius:50%;background:#0F6E56;border:3px solid #fff;box-shadow:0 0 0 2px #0F6E56;"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

interface FinderMapProps {
  jps: JusticeOfThePeace[];
  selectedId: number | null;
  userLocation: Coordinates | null;
  onSelect: (id: number) => void;
}

export function FinderMap({
  jps,
  selectedId,
  userLocation,
  onSelect,
}: FinderMapProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markerByIdRef = useRef<Map<number, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const onSelectRef = useRef(onSelect);

  onSelectRef.current = onSelect;

  // Initialise the map once on mount.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: BARBADOS_CENTER,
      zoom: DEFAULT_ZOOM,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      markerByIdRef.current.clear();
      userMarkerRef.current = null;
    };
  }, []);

  // Sync markers whenever the JP set changes.
  useEffect(() => {
    const layer = markerLayerRef.current;
    if (!layer) return;

    layer.clearLayers();
    markerByIdRef.current.clear();

    for (const jp of jps) {
      const marker = L.marker([jp.lat, jp.lng], {
        icon: jpIcon,
        title: jp.name,
        alt: jp.name,
      });
      marker.bindPopup(buildPopupHtml(jp));
      marker.on("click", () => onSelectRef.current(jp.id));
      marker.addTo(layer);
      markerByIdRef.current.set(jp.id, marker);
    }
  }, [jps]);

  // Pan to selection.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedId === null) {
      map.closePopup();
      return;
    }
    const marker = markerByIdRef.current.get(selectedId);
    if (!marker) return;
    map.setView(marker.getLatLng(), Math.max(map.getZoom(), FOCUS_ZOOM), {
      animate: true,
    });
    marker.openPopup();
  }, [selectedId]);

  // Show the user's location pin and fit the view.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (!userLocation) return;

    const marker = L.marker([userLocation.lat, userLocation.lng], {
      icon: userLocationIcon,
      interactive: false,
      keyboard: false,
      alt: "Your location",
    });
    marker.addTo(map);
    userMarkerRef.current = marker;
    map.setView([userLocation.lat, userLocation.lng], DEFAULT_ZOOM, {
      animate: true,
    });
  }, [userLocation]);

  return (
    <section
      aria-label="Map of Justices of the Peace"
      className="h-[clamp(380px,70vh,620px)] w-full border border-grey-00"
      ref={containerRef}
    />
  );
}

function buildPopupHtml(jp: JusticeOfThePeace): string {
  const address = (jp.area || jp.business || "").trim();
  // Leaflet inserts this HTML inside an existing popup container — escape inputs.
  return `
    <strong>${escapeHtml(jp.name)}</strong>
    <div style="font-size:12px;color:#555;margin-top:2px;">${escapeHtml(jp.parish)}</div>
    ${address ? `<div style="font-size:12px;margin-top:6px;">${escapeHtml(address)}</div>` : ""}
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
