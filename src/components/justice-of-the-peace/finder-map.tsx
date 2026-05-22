"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Coordinates } from "@/lib/justice-of-the-peace";
import type { JusticeOfThePeace } from "@/types/justice-of-the-peace";

const BARBADOS_CENTER: L.LatLngTuple = [13.18, -59.555];
const BARBADOS_BOUNDS: L.LatLngBoundsLiteral = [
  [12.99, -59.72],
  [13.36, -59.4],
];
const DEFAULT_ZOOM = 11;
const FOCUS_ZOOM = 14;

// Bounding boxes used to place the parish pill labels near the top of each
// parish (where there's typically less marker density).
const PARISH_BOUNDS: Record<string, L.LatLngBoundsLiteral> = {
  "Christ Church": [
    [13.045, -59.625],
    [13.115, -59.49],
  ],
  "St. Andrew": [
    [13.155, -59.595],
    [13.235, -59.515],
  ],
  "St. George": [
    [13.095, -59.615],
    [13.175, -59.535],
  ],
  "St. James": [
    [13.115, -59.66],
    [13.22, -59.61],
  ],
  "St. John": [
    [13.09, -59.535],
    [13.175, -59.465],
  ],
  "St. Joseph": [
    [13.15, -59.565],
    [13.225, -59.485],
  ],
  "St. Lucy": [
    [13.21, -59.66],
    [13.34, -59.55],
  ],
  "St. Michael": [
    [13.065, -59.655],
    [13.16, -59.57],
  ],
  "St. Peter": [
    [13.19, -59.655],
    [13.315, -59.575],
  ],
  "St. Philip": [
    [13.04, -59.54],
    [13.125, -59.425],
  ],
  "St. Thomas": [
    [13.115, -59.645],
    [13.21, -59.56],
  ],
};

function jpDivIcon(selected: boolean): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="jp-marker${selected ? " jp-marker--selected" : ""}" aria-hidden="true">JP</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

const userLocationIcon = L.divIcon({
  className: "jp-user-location",
  html: '<span aria-hidden="true" style="display:block;width:18px;height:18px;border-radius:50%;background:#0F6E56;border:3px solid #fff;box-shadow:0 0 0 2px #0F6E56;"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

interface FinderMapProps {
  jps: JusticeOfThePeace[];
  selectedId: number | null;
  selectedParish: string;
  userLocation: Coordinates | null;
  radiusAnchor: Coordinates | null;
  radiusKm: number | null;
  onSelect: (id: number) => void;
  onParishSelect: (parish: string) => void;
}

export function FinderMap({
  jps,
  selectedId,
  selectedParish,
  userLocation,
  radiusAnchor,
  radiusKm,
  onSelect,
  onParishSelect,
}: FinderMapProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const markerByIdRef = useRef<Map<number, L.Marker>>(new Map());
  const parishMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);
  const onSelectRef = useRef(onSelect);
  const onParishSelectRef = useRef(onParishSelect);

  onSelectRef.current = onSelect;
  onParishSelectRef.current = onParishSelect;

  // Initialise the map once on mount.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: BARBADOS_CENTER,
      zoom: DEFAULT_ZOOM,
      minZoom: 10,
      maxZoom: 16,
      maxBounds: BARBADOS_BOUNDS,
      maxBoundsViscosity: 1.0,
      scrollWheelZoom: false,
    });

    // CARTO Voyager tiles render road and place labels more clearly than raw
    // OSM. Falls back to OSM if Carto tiles fail to load.
    const cartoTiles = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        minZoom: 10,
        maxZoom: 16,
      }
    );
    const osmTiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 10,
        maxZoom: 16,
      }
    );
    cartoTiles.on("tileerror", () => {
      if (!map.hasLayer(osmTiles)) osmTiles.addTo(map);
    });
    cartoTiles.addTo(map);

    markerLayerRef.current = L.layerGroup().addTo(map);

    // Dedicated pane so parish labels always sit above the JP icons.
    map.createPane("parishLabels");
    const pane = map.getPane("parishLabels");
    if (pane) {
      pane.style.zIndex = "650";
      pane.style.pointerEvents = "auto";
    }

    for (const [parish, bounds] of Object.entries(PARISH_BOUNDS)) {
      const [[minLat, minLng], [maxLat, maxLng]] = bounds;
      const labelLat = maxLat - (maxLat - minLat) * 0.18;
      const labelLng = (minLng + maxLng) / 2;
      const marker = L.marker([labelLat, labelLng], {
        pane: "parishLabels",
        interactive: true,
        keyboard: false,
        icon: L.divIcon({
          className: "",
          html: `<button type="button" class="jp-parish-btn"><span class="jp-parish-label" data-parish="${parish}">${parish}</span></button>`,
          iconSize: undefined as unknown as L.PointExpression,
          iconAnchor: [0, 0],
        }),
      });
      marker.on("click", () => onParishSelectRef.current(parish));
      marker.addTo(map);
      parishMarkersRef.current.set(parish, marker);
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      markerByIdRef.current.clear();
      parishMarkersRef.current.clear();
      userMarkerRef.current = null;
    };
  }, []);

  // Sync JP markers whenever the visible JP set changes.
  useEffect(() => {
    const layer = markerLayerRef.current;
    if (!layer) return;

    layer.clearLayers();
    markerByIdRef.current.clear();

    for (const jp of jps) {
      const marker = L.marker([jp.lat, jp.lng], {
        icon: jpDivIcon(false),
        title: jp.name,
        alt: jp.name,
      });
      marker.bindPopup(buildPopupHtml(jp));
      marker.on("click", () => onSelectRef.current(jp.id));
      marker.addTo(layer);
      markerByIdRef.current.set(jp.id, marker);
    }
  }, [jps]);

  // Highlight the selected JP marker and pan to it.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    for (const [id, marker] of markerByIdRef.current) {
      marker.setIcon(jpDivIcon(id === selectedId));
    }

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

  // Apply active class on the parish pill matching the current filter, and
  // zoom to the parish bounds when one is selected from outside the map.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    for (const [parish, marker] of parishMarkersRef.current) {
      const el = marker.getElement()?.querySelector(".jp-parish-label");
      el?.classList.toggle(
        "jp-parish-label--active",
        parish === selectedParish
      );
    }

    if (selectedParish && PARISH_BOUNDS[selectedParish]) {
      map.fitBounds(PARISH_BOUNDS[selectedParish], { padding: [30, 30] });
    }
  }, [selectedParish]);

  // Draw a dashed radius ring around the anchor when a finite radius is set.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (radiusCircleRef.current) {
      map.removeLayer(radiusCircleRef.current);
      radiusCircleRef.current = null;
    }
    if (!radiusAnchor || radiusKm === null) return;

    const circle = L.circle([radiusAnchor.lat, radiusAnchor.lng], {
      radius: radiusKm * 1000,
      color: "#00654a",
      weight: 2,
      fillColor: "#00654a",
      fillOpacity: 0.06,
      dashArray: "6 4",
      interactive: false,
    });
    circle.addTo(map);
    radiusCircleRef.current = circle;
    // Only fit if we're not also fitting to a parish or zooming to a selected pin.
    if (!selectedParish && selectedId === null) {
      map.fitBounds(circle.getBounds(), { padding: [20, 20] });
    }
  }, [radiusAnchor, radiusKm, selectedParish, selectedId]);

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
      keyboard: false,
      alt: "Your location",
    });
    marker.bindTooltip("You are here", {
      permanent: true,
      direction: "top",
      offset: [0, -8],
      className: "jp-here-tooltip",
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
  const homeAddress = jp.area?.trim() ?? "";
  const workAddress = jp.business?.trim() ?? "";
  const address = homeAddress || workAddress;
  const workTag =
    !homeAddress && workAddress
      ? '<em style="color:#666;">Work address.</em> '
      : "";
  return `
    <strong style="font-size:13px;display:block;margin-bottom:3px;">${escapeHtml(jp.name)}</strong>
    <span style="font-size:12px;color:#555;display:block;">${escapeHtml(jp.parish)}</span>
    ${address ? `<span style="font-size:12px;display:block;margin:2px 0 6px;">${workTag}${escapeHtml(address)}</span>` : ""}
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
