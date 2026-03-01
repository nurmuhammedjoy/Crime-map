"use client";

// I just vibe coded the page.tsx coz I don't know why it's working or why it is not working, specially maplibre

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import CrimeDetail from "@/components/CrimeDetail";
import ReportModal from "@/components/ReportModal";
import {
  STATIC_CRIMES,
  CRIME_TYPE_COLORS,
  type Crime,
} from "@/lib/crime-data";


export default function HomePage() {
  const [crimes] = useState<Crime[]>(STATIC_CRIMES);
  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const r = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !mapContainer.current || map.current) return;
    let cancelled = false;

    const initMap = async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");

      if (cancelled || !mapContainer.current) return;

      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            "osm-tiles": {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap contributors",
            },
          },
          layers: [
            {
              id: "osm-tiles-layer",
              type: "raster",
              source: "osm-tiles",
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        },
        center: [90.4125, 23.8103],
        zoom: 7,
        maxZoom: 18,
        attributionControl: false,
      });


      popupRef.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: "200px",
        offset: 14,
        className: "crime-popup",
      });

      mapInstance.on("load", () => {
        if (cancelled) return;

        const geojson: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: crimes.map((crime) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [crime.lng, crime.lat],
            },
            properties: {
              id: crime.id,
              title: crime.title,
              location: crime.location,
              severity: crime.severity,
              status: crime.status,
              type: crime.type,
              color: CRIME_TYPE_COLORS[crime.type],
            },
          })),
        };

        mapInstance.addSource("crimes", { type: "geojson", data: geojson });

        mapInstance.addLayer({
          id: "crimes-glow",
          type: "circle",
          source: "crimes",
          filter: ["==", ["get", "severity"], "critical"],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              5, 14,
              10, 20,
              15, 28,
            ],
            "circle-color": ["get", "color"],
            "circle-opacity": 0.15,
            "circle-stroke-width": 0,
          },
        });

        mapInstance.addLayer({
          id: "crimes-pulse",
          type: "circle",
          source: "crimes",
          filter: ["==", ["get", "status"], "active"],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              5, 10,
              10, 16,
              15, 22,
            ],
            "circle-color": ["get", "color"],
            "circle-opacity": 0.1,
            "circle-stroke-width": 1,
            "circle-stroke-color": ["get", "color"],
            "circle-stroke-opacity": 0.2,
          },
        });

        mapInstance.addLayer({
          id: "crimes-circle",
          type: "circle",
          source: "crimes",
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              5, ["match", ["get", "severity"], "critical", 6, "high", 5, "medium", 4, 3],
              10, ["match", ["get", "severity"], "critical", 10, "high", 8, "medium", 6, 5],
              15, ["match", ["get", "severity"], "critical", 14, "high", 11, "medium", 9, 7],
            ],
            "circle-color": ["get", "color"],
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": [
              "interpolate", ["linear"], ["zoom"],
              5, 1,
              10, 2,
              15, 2.5,
            ],
            "circle-opacity": [
              "match", ["get", "status"],
              "resolved", 0.5,
              "investigating", 0.75,
              0.9,
            ],
          },
        });

        mapInstance.addLayer({
          id: "crimes-inner-dot",
          type: "circle",
          source: "crimes",
          filter: ["==", ["get", "severity"], "critical"],
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              5, 2,
              10, 3,
              15, 4,
            ],
            "circle-color": "#ffffff",
            "circle-opacity": 0.9,
          },
        });

        mapInstance.on("mouseenter", "crimes-circle", () => {
          mapInstance.getCanvas().style.cursor = "pointer";
        });
        mapInstance.on("mouseleave", "crimes-circle", () => {
          mapInstance.getCanvas().style.cursor = "";
          popupRef.current?.remove();
        });

        mapInstance.on("mousemove", "crimes-circle", (e: any) => {
          if (!e.features?.length) return;
          const f = e.features[0];
          const coords = (f.geometry as any).coordinates.slice();
          const p = f.properties;

          const severityColor =
            p.severity === "critical" ? "#ef4444" :
            p.severity === "high" ? "#f59e0b" :
            p.severity === "medium" ? "#3b82f6" : "#6b7280";

          const statusIcon =
            p.status === "active" ? "🔴" :
            p.status === "investigating" ? "🟡" : "🟢";

          popupRef.current
            ?.setLngLat(coords)
            .setHTML(
              `<div style="font-family:system-ui,sans-serif;padding:8px 10px;line-height:1.4;">
                <div style="font-size:13px;font-weight:700;color:#111;margin-bottom:4px;">${p.title}</div>
                <div style="font-size:11px;color:#666;margin-bottom:6px;">📍 ${p.location}</div>
                <div style="display:flex;gap:6px;align-items:center;">
                  <span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:2px 6px;border-radius:4px;background:${severityColor}15;color:${severityColor};border:1px solid ${severityColor}30;">${p.severity}</span>
                  <span style="font-size:10px;color:#888;">${statusIcon} ${p.status}</span>
                </div>
              </div>`
            )
            .addTo(mapInstance);
        });

        mapInstance.on("click", "crimes-circle", (e: any) => {
          if (!e.features?.length) return;
          const crimeId = e.features[0].properties.id;
          const crime = crimes.find((c) => c.id === crimeId);
          if (crime) setSelectedCrime(crime);
        });

        mapInstance.on("click", (e: any) => {
          const features = mapInstance.queryRenderedFeatures(e.point, {
            layers: ["crimes-circle"],
          });
          if (!features.length) {
            setSelectedCrime(null);
          }
        });

        setMapReady(true);
      });

      map.current = mapInstance;
    };

    initMap();

    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      setMapReady(false);
    };
  }, [mounted, crimes]);

  useEffect(() => {
    if (!map.current || !mapReady || !selectedCrime) return;
    map.current.flyTo({
      center: [selectedCrime.lng, selectedCrime.lat],
      zoom: 14,
      speed: 1.2,
      curve: 1.4,
      essential: true,
    });
  }, [selectedCrime, mapReady]);

  useEffect(() => {
    if (!map.current || !mapReady) return;
    const timeout = setTimeout(() => {
      map.current?.resize();
    }, 350);
    return () => clearTimeout(timeout);
  }, [sidebarOpen, mapReady]);

  const stats = {
    total: crimes.length,
    active: crimes.filter((c) => c.status === "active").length,
    investigating: crimes.filter((c) => c.status === "investigating").length,
    resolved: crimes.filter((c) => c.status === "resolved").length,
    critical: crimes.filter((c) => c.severity === "critical").length,
  };

  const handleCrimeSelect = useCallback((crime: Crime) => {
    setSelectedCrime(crime);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-black">
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        crimes={crimes}
        selectedCrime={selectedCrime}
        onCrimeSelect={handleCrimeSelect}
        isOpen={isDesktop || sidebarOpen}
        onClose={() => {
          if (!isDesktop) setSidebarOpen(false);
        }}
        stats={stats}
      />

      <main className="relative flex-1 h-full overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {!isDesktop && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 bg-black/70 backdrop-blur-md border-white/15 hover:bg-black/80 rounded-lg shadow-lg"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          )}

          <div className="flex items-center gap-1.5 lg:hidden">
            <span className="font-bold text-white text-sm tracking-wider uppercase bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 shadow-lg">
              NONE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-xs text-white/50 uppercase tracking-wider">Total</span>
            <span className="text-sm font-bold font-mono text-white">{stats.total}</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-xs text-white/50 uppercase tracking-wider">Active</span>
            <span className="text-sm font-bold font-mono text-white">{stats.active}</span>
          </div>
        </div>
      </div>
        <div ref={mapContainer} className="w-full h-full" />

        <CrimeDetail
          crime={selectedCrime}
          onClose={() => setSelectedCrime(null)}
        />

        <button
          onClick={() => setShowReportModal(true)}
          className="absolute bottom-6 right-6 z-10 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-white/90 transition-all duration-200 hover:scale-105"
          aria-label="Report incident"
        >
          <Plus className="w-6 h-6" />
        </button>

        <ReportModal
          open={showReportModal}
          onClose={() => setShowReportModal(false)}
        />
      </main>
    </div>
  );
}
