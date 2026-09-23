import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  MapPin,
  Crosshair,
  Search,
  ChevronRight,
  X,
  Loader2
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';
import { useToast } from '../../hooks/useToast';

/**
 * Full Interactive Leaflet GIS Map Component with real OpenStreetMap / Satellite tile layers,
 * real-time OpenStreetMap Nominatim Geocoding location search, polygon overlays, and borehole markers.
 */
export function GisMap({
  blocks = [],
  boreholes = [],
  mineralOccurrences = [],
  selectedBlockId = 'B-12',
  onSelectBlock,
  onOpenAnalysisModal,
  height = 'h-[580px]'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const searchMarkerRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [basemapTile, setBasemapTile] = useState('satellite'); // satellite | osm | dark
  const [activeLayers, setActiveLayers] = useState({
    blocks: true,
    boreholes: true,
    occurrences: true
  });

  // Location Geocoding Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const { addToast } = useToast();

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center over Bhandara / Balaghat manganese mining belt [lat, lng]
    const map = L.map(mapContainerRef.current, {
      center: [21.365, 79.524],
      zoom: 11,
      zoomControl: false
    });

    mapInstanceRef.current = map;
    layerGroupRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Tile Layer Switching (Satellite, OpenStreetMap, Dark Matter)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

    if (basemapTile === 'osm') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    } else if (basemapTile === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      attribution = '&copy; <a href="https://carto.com/attributions">CARTO</a>';
    }

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 18
    }).addTo(map);
  }, [basemapTile]);

  // Render Blocks, Boreholes & Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Render Exploration Block Polygons
    if (activeLayers.blocks) {
      blocks.forEach((block) => {
        const isSelected = block.id === selectedBlockId;
        const isHigh = block.prospectivityLevel === 'HIGH';

        const color = isHigh ? '#ef4444' : '#f59e0b';
        const fillOpacity = isSelected ? 0.45 : 0.25;

        // Custom polygon
        const polygon = L.polygon(block.polygon, {
          color: color,
          weight: isSelected ? 3.5 : 2,
          fillColor: color,
          fillOpacity: fillOpacity,
          dashArray: isSelected ? undefined : '4, 4'
        });

        polygon.on('click', () => {
          onSelectBlock(block.id);
          map.flyTo([block.coordinates.lat, block.coordinates.lng], 12, { duration: 0.8 });
        });

        // Polygon tooltip label
        polygon.bindTooltip(
          `<strong>${block.name}</strong><br/>Manganese Prospectivity: <strong style="color:${color}">${block.prospectivityScore}%</strong>`,
          { permanent: true, direction: 'center', className: 'gis-polygon-label' }
        );

        layerGroup.addLayer(polygon);
      });
    }

    // 2. Render Borehole Markers
    if (activeLayers.boreholes) {
      boreholes.forEach((bh) => {
        const customIcon = L.divIcon({
          className: 'custom-bh-marker',
          html: `<div style="background-color:#06b6d4; width:12px; height:12px; border-radius:50%; border:2px solid #ffffff; box-shadow:0 0 10px rgba(6,182,212,0.8);"></div>`,
          iconSize: [12, 12]
        });

        const marker = L.marker([bh.lat, bh.lng], { icon: customIcon });
        marker.bindPopup(
          `<div style="font-size:12px; font-weight:bold; color:#0f172a;">
            Borehole ${bh.id} (${bh.blockId})<br/>
            <span style="color:#0284c7;">Grade: ${bh.manganeseGrade}</span><br/>
            <span style="color:#64748b;">Depth: ${bh.depth}</span>
          </div>`
        );
        layerGroup.addLayer(marker);
      });
    }

    // 3. Render Mineral Deposit Occurrences
    if (activeLayers.occurrences) {
      mineralOccurrences.forEach((mo) => {
        const customIcon = L.divIcon({
          className: 'custom-mo-marker',
          html: `<div style="background:#dc2626; color:#ffffff; font-size:10px; font-weight:bold; width:22px; height:22px; border-radius:50%; border:2px solid #f59e0b; display:flex; align-items:center; justify-content:center; shadow:0 4px 10px rgba(0,0,0,0.5);">Mn</div>`,
          iconSize: [22, 22]
        });

        const marker = L.marker([mo.lat, mo.lng], { icon: customIcon });
        marker.bindPopup(
          `<div style="font-size:12px; font-weight:bold; color:#0f172a;">
            ${mo.name}<br/>
            <span style="color:#dc2626;">Ore: ${mo.type}</span><br/>
            <span style="color:#64748b;">Formation: ${mo.age}</span>
          </div>`
        );
        layerGroup.addLayer(marker);
      });
    }
  }, [blocks, boreholes, mineralOccurrences, selectedBlockId, activeLayers, onSelectBlock]);

  // Handle Search Input Change & Live Nominatim Geocoding
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);

      // 1. Search local mining blocks & boreholes first
      const q = searchQuery.toLowerCase();
      const localMatches = blocks
        .filter(
          (b) =>
            b.id.toLowerCase().includes(q) ||
            b.name.toLowerCase().includes(q) ||
            b.district.toLowerCase().includes(q) ||
            b.state.toLowerCase().includes(q)
        )
        .map((b) => ({
          type: 'Mining Block',
          name: b.name,
          lat: b.coordinates.lat,
          lng: b.coordinates.lng,
          blockId: b.id,
          subtitle: `${b.district} District, ${b.state} • ${b.prospectivityScore}% Prospectivity`
        }));

      // 2. Real-time OpenStreetMap Nominatim Geocoding API
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}&limit=5`
        );
        const geoData = await response.json();

        const remoteMatches = (geoData || []).map((item) => ({
          type: item.type ? item.type.toUpperCase() : 'LOCATION',
          name: item.display_name,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          subtitle: `Lat: ${parseFloat(item.lat).toFixed(4)}, Lng: ${parseFloat(
            item.lon
          ).toFixed(4)}`
        }));

        setSearchResults([...localMatches, ...remoteMatches]);
      } catch (err) {
        setSearchResults(localMatches);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, blocks]);

  // Select Search Location Result & Fly To Location
  const handleSelectLocation = (result) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (result.blockId) {
      onSelectBlock(result.blockId);
    }

    // Fly map to exact Lat/Lng coordinates
    map.flyTo([result.lat, result.lng], 13, { duration: 1.2 });

    // Drop temporary pin marker
    if (searchMarkerRef.current) {
      map.removeLayer(searchMarkerRef.current);
    }

    const searchIcon = L.divIcon({
      className: 'search-target-marker',
      html: `<div style="background-color:#ef4444; width:16px; height:16px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 15px #ef4444;" className="animate-bounce"></div>`,
      iconSize: [16, 16]
    });

    const marker = L.marker([result.lat, result.lng], { icon: searchIcon }).addTo(map);
    marker
      .bindPopup(
        `<div style="font-size:12px; font-weight:bold;">
          ${result.name}<br/>
          <span style="font-size:10px; color:#64748b;">${result.subtitle}</span>
        </div>`
      )
      .openPopup();

    searchMarkerRef.current = marker;

    addToast({
      title: 'Location Found & Centered',
      message: `Navigated to ${result.name}.`,
      type: 'success'
    });

    setSearchQuery(result.name.split(',')[0]);
    setShowSearchDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectLocation(searchResults[0]);
    } else if (searchQuery.trim()) {
      addToast({
        title: 'Searching GIS Map',
        message: `Locating "${searchQuery}" on map...`,
        type: 'info'
      });
    }
  };

  // Map Controls
  const handleZoomIn = () => mapInstanceRef.current && mapInstanceRef.current.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current && mapInstanceRef.current.zoomOut();
  const handleReset = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([21.365, 79.524], 11, { duration: 1 });
      setSearchQuery('');
    }
  };

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;
    if (!document.fullscreenElement) {
      mapContainerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[0];

  return (
    <div
      className={cn(
        'relative bg-[#0d1829] rounded-xl border border-slate-700/60 overflow-hidden select-none flex flex-col',
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : height
      )}
    >
      {/* Real-time OpenStreetMap Geocoding Location Search Box (Top Center Overlay) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] w-full max-w-md px-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/80 shadow-2xl flex items-center px-3.5 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-400 transition-all">
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
            ) : (
              <Search className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <input
              type="text"
              placeholder="Search ANY location, city (Nagpur, Balaghat), or block (B-12)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full bg-transparent border-0 px-2.5 py-0.5 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchDropdown(false);
                }}
                className="text-slate-400 hover:text-white p-0.5 mr-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-md shrink-0 transition-colors shadow-sm"
            >
              Locate
            </button>
          </div>

          {/* Real-Time Location Search Results Autocomplete Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[500] max-h-64 overflow-y-auto divide-y divide-slate-800 animate-in fade-in duration-150">
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectLocation(res)}
                  className="p-3 hover:bg-slate-800/90 cursor-pointer flex items-center justify-between transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate">{res.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{res.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700 shrink-0 ml-2">
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Leaflet Map DOM Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Zoom / Fullscreen Toolbar Overlay (Top Left) */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-700/80 shadow-lg p-1 flex flex-col gap-1 text-slate-300">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-slate-800 hover:text-white rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-slate-800 hover:text-white rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-slate-800 hover:text-white rounded transition-colors"
            title="Reset Map Center"
          >
            <Crosshair className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-slate-700 my-0.5" />
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-slate-800 hover:text-white rounded transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Layer Selector & Basemap Tile Switcher Overlay (Top Right) */}
      <div className="absolute top-4 right-4 z-[400]">
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg border border-slate-700/80 shadow-lg text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Map Layers</span>
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-3.5 z-[500] text-xs text-slate-200 animate-in fade-in duration-150">
              <div className="font-semibold text-white mb-2 pb-1 border-b border-slate-800 flex items-center justify-between">
                <span>Basemap Satellite Tiles</span>
                <span className="text-[10px] text-slate-400">SIH 2026 GIS</span>
              </div>
              <div className="space-y-1.5 mb-3">
                {[
                  { id: 'satellite', label: 'Esri World Satellite' },
                  { id: 'osm', label: 'OpenStreetMap Standard' },
                  { id: 'dark', label: 'CartoDB Dark GIS' }
                ].map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => setBasemapTile(tile.id)}
                    className={cn(
                      'w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between font-medium',
                      basemapTile === tile.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'hover:bg-slate-800 text-slate-300'
                    )}
                  >
                    <span>{tile.label}</span>
                    {basemapTile === tile.id && <span className="text-[10px]">ACTIVE</span>}
                  </button>
                ))}
              </div>

              <div className="font-semibold text-white mb-2 pb-1 border-b border-slate-800">
                Data Overlays
              </div>
              <div className="space-y-1.5">
                {[
                  { id: 'blocks', label: 'Mining Block Polygons' },
                  { id: 'boreholes', label: 'Boreholes' },
                  { id: 'occurrences', label: 'Mineral Occurrences' }
                ].map((lyr) => (
                  <label
                    key={lyr.id}
                    className="flex items-center justify-between p-1.5 hover:bg-slate-800/80 rounded cursor-pointer transition-colors"
                  >
                    <span className="text-slate-300 font-medium">{lyr.label}</span>
                    <input
                      type="checkbox"
                      checked={activeLayers[lyr.id]}
                      onChange={() =>
                        setActiveLayers((prev) => ({
                          ...prev,
                          [lyr.id]: !prev[lyr.id]
                        }))
                      }
                      className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prospectivity Color Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2.5 shadow-lg text-[11px] text-slate-300">
        <div className="font-semibold text-white mb-1.5 text-[10px] uppercase tracking-wider">Prospectivity</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-600" />
            <span>High (&gt; 75%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span>Medium (50-75%)</span>
          </div>
        </div>
      </div>

      {/* Coordinate Readout & Scale Bar (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 shadow-lg text-[11px] font-mono text-slate-300 flex items-center gap-3">
        <span>21.36° N, 79.52° E</span>
        <span className="text-slate-600">|</span>
        <span>Leaflet GIS</span>
      </div>

      {/* Selected Block Information Overlay Card */}
      {selectedBlock && (
        <div className="absolute left-1/2 bottom-16 -translate-x-1/2 z-[400] max-w-sm w-full px-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-slate-900 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{selectedBlock.name}</span>
                  <Badge status={selectedBlock.prospectivityLevel === 'HIGH' ? 'critical' : 'warning'}>
                    {selectedBlock.prospectivityLevel}
                  </Badge>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {selectedBlock.district} District, {selectedBlock.state}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-red-600 leading-none">
                  {selectedBlock.prospectivityScore}%
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Prospectivity
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <span className="text-slate-500 block text-[10px]">Model Confidence</span>
                <span className="font-bold text-slate-800">{selectedBlock.confidenceScore}%</span>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <span className="text-slate-500 block text-[10px]">Area Extent</span>
                <span className="font-bold text-slate-800">{selectedBlock.areaSqKm} km²</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => onOpenAnalysisModal && onOpenAnalysisModal(selectedBlock)}
                className="flex-1 bg-[#0b2545] hover:bg-[#091e36] text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View AI Explanation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
