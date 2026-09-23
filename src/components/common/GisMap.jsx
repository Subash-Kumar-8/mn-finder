import React, { useState, useEffect, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Layers,
  MapPin,
  Compass,
  Check,
  Eye,
  EyeOff,
  Crosshair,
  Search,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';

/**
 * High-performance Interactive GIS Map Component with dynamic layer switching,
 * block polygon overlays, borehole markers, and prospectivity heatmaps.
 */
export function GisMap({
  blocks = [],
  boreholes = [],
  mineralOccurrences = [],
  layers = [],
  selectedBlockId = 'B-12',
  onSelectBlock,
  onOpenAnalysisModal,
  height = 'h-[540px]'
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [activeLayerState, setActiveLayerState] = useState({
    sentinel2: true,
    geology: true,
    soil: true,
    ndvi: false,
    ngdr: true,
    boreholes: true,
    prospectivity: true
  });
  const mapContainerRef = useRef(null);

  // Toggle map layer visibility
  const toggleLayer = (layerId) => {
    setActiveLayerState((prev) => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.35, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.35, 0.7));
  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
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

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || blocks[0];

  return (
    <div
      ref={mapContainerRef}
      className={cn(
        'relative bg-[#0d1829] rounded-xl border border-slate-700/60 overflow-hidden select-none flex flex-col',
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : height
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dynamic GIS Basemap Render Canvas */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing relative transition-transform duration-75"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Synthetic Satellite Grid Imagery Layer */}
        <div
          className="absolute inset-0 bg-[#0f1d30]"
          style={{
            backgroundImage: activeLayerState.sentinel2
              ? `radial-gradient(circle at 40% 40%, rgba(30, 58, 138, 0.4) 0%, transparent 60%),
                 radial-gradient(circle at 70% 60%, rgba(13, 148, 136, 0.25) 0%, transparent 50%),
                 linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`
              : 'none',
            backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px'
          }}
        />

        {/* Geological Structures / Soil Moisture Layer */}
        {activeLayerState.geology && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1000 600">
            {/* Structural Geological Fault Lines */}
            <path d="M 120 180 Q 300 240, 500 190 T 880 320" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M 220 420 Q 450 350, 750 480" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Lithology Formations */}
            <path d="M 200 100 Q 400 150 650 120 T 900 200 L 950 50 L 150 50 Z" fill="#1e293b" opacity="0.4" />
          </svg>
        )}

        {/* AI Prospectivity Heatmap Layer */}
        {activeLayerState.prospectivity && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1000 600">
            <defs>
              <radialGradient id="heat-high" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#ea580c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heat-medium" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* B-12 High Potential Heat anomaly */}
            <circle cx="340" cy="270" r="140" fill="url(#heat-high)" />
            {/* C-04 High Potential Heat anomaly */}
            <circle cx="680" cy="340" r="130" fill="url(#heat-high)" />
            {/* B-13 Medium Heat anomaly */}
            <circle cx="560" cy="220" r="110" fill="url(#heat-medium)" />
          </svg>
        )}

        {/* Mining Exploration Block Polygons SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600">
          {/* Block B-12 (Mansar South - HIGH) */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBlock('B-12');
            }}
          >
            <polygon
              points="240,200 420,180 440,320 260,340"
              fill={selectedBlockId === 'B-12' ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.25)'}
              stroke="#ef4444"
              strokeWidth={selectedBlockId === 'B-12' ? '3' : '2'}
              strokeDasharray={selectedBlockId === 'B-12' ? 'none' : '4 2'}
            />
            <text x="340" y="260" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              BLOCK B-12
            </text>
            <text x="340" y="278" fill="#fca5a5" fontSize="11" fontWeight="600" textAnchor="middle">
              84% (HIGH)
            </text>
          </g>

          {/* Block C-04 (Dongri Extension - HIGH) */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBlock('C-04');
            }}
          >
            <polygon
              points="580,280 780,250 810,400 600,420"
              fill={selectedBlockId === 'C-04' ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.25)'}
              stroke="#ef4444"
              strokeWidth={selectedBlockId === 'C-04' ? '3' : '2'}
            />
            <text x="690" y="340" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              BLOCK C-04
            </text>
            <text x="690" y="358" fill="#fca5a5" fontSize="11" fontWeight="600" textAnchor="middle">
              81% (HIGH)
            </text>
          </g>

          {/* Block B-13 (Bhandara West - MEDIUM) */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBlock('B-13');
            }}
          >
            <polygon
              points="480,140 640,130 660,260 500,270"
              fill={selectedBlockId === 'B-13' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.25)'}
              stroke="#f59e0b"
              strokeWidth={selectedBlockId === 'B-13' ? '3' : '2'}
            />
            <text x="570" y="195" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              BLOCK B-13
            </text>
            <text x="570" y="212" fill="#fde68a" fontSize="10" fontWeight="600" textAnchor="middle">
              71% (MED)
            </text>
          </g>

          {/* Block A-07 (Tirodi North - MEDIUM) */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelectBlock('A-07');
            }}
          >
            <polygon
              points="140,360 280,340 300,480 150,500"
              fill={selectedBlockId === 'A-07' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.25)'}
              stroke="#f59e0b"
              strokeWidth={selectedBlockId === 'A-07' ? '3' : '2'}
            />
            <text x="215" y="420" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              BLOCK A-07
            </text>
            <text x="215" y="437" fill="#fde68a" fontSize="10" fontWeight="600" textAnchor="middle">
              64% (MED)
            </text>
          </g>
        </svg>

        {/* Borehole & Mineral Markers Layer */}
        {activeLayerState.boreholes && (
          <div className="absolute inset-0 pointer-events-none">
            {/* BH-101 */}
            <div className="absolute top-[230px] left-[310px] pointer-events-auto group">
              <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-white shadow-lg flex items-center justify-center animate-ping-slow">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="absolute left-5 top-0 bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                BH-101: 44.8% Mn (142m)
              </div>
            </div>

            {/* BH-104 */}
            <div className="absolute top-[320px] left-[660px] pointer-events-auto group">
              <div className="w-4 h-4 rounded-full bg-cyan-500 border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="absolute left-5 top-0 bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                BH-104: 46.1% Mn (198m)
              </div>
            </div>

            {/* Mineral Deposit Occurrence Marker */}
            {activeLayerState.ngdr && (
              <div className="absolute top-[280px] left-[380px] pointer-events-auto group">
                <div className="w-6 h-6 rounded-full bg-red-600/80 border-2 border-amber-400 flex items-center justify-center shadow-lg text-[10px] font-bold text-white">
                  Mn
                </div>
                <div className="absolute left-7 top-0 bg-slate-900 text-white text-[10px] p-2 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700">
                  <div className="font-bold text-amber-300">Mansar Deposit Deposit</div>
                  <div className="text-slate-300">Pyrolusite / Psilomelane Ore</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Control Toolbar Overlay (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
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
            title="Reset Center"
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

      {/* Layer Toggle Floating Button (Top Right) */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700/80 shadow-lg text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Map Layers</span>
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-3 z-30 text-xs text-slate-200 animate-in fade-in duration-150">
              <div className="font-semibold text-white mb-2 pb-1 border-b border-slate-800 flex items-center justify-between">
                <span>Geospatial Data Layers</span>
                <span className="text-[10px] text-slate-400">SIH 2026 GIS</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { id: 'sentinel2', label: 'Sentinel-2 Imagery' },
                  { id: 'geology', label: 'Geological Map' },
                  { id: 'soil', label: 'Soil Moisture' },
                  { id: 'ndvi', label: 'NDVI Index' },
                  { id: 'ngdr', label: 'NGDR Mineral Occurrences' },
                  { id: 'boreholes', label: 'Boreholes' },
                  { id: 'prospectivity', label: 'Prospectivity Prediction' }
                ].map((lyr) => (
                  <label
                    key={lyr.id}
                    className="flex items-center justify-between p-1.5 hover:bg-slate-800/80 rounded cursor-pointer transition-colors"
                  >
                    <span className="text-slate-300 font-medium">{lyr.label}</span>
                    <input
                      type="checkbox"
                      checked={activeLayerState[lyr.id]}
                      onChange={() => toggleLayer(lyr.id)}
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
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2.5 shadow-lg text-[11px] text-slate-300">
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
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-500" />
            <span>Low (&lt; 50%)</span>
          </div>
        </div>
      </div>

      {/* Coordinate Readout & Scale Bar (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg px-3 py-1.5 shadow-lg text-[11px] font-mono text-slate-300 flex items-center gap-3">
        <span>21.36° N, 79.52° E</span>
        <span className="text-slate-600">|</span>
        <span>Scale 1:50,000</span>
      </div>

      {/* Interactive Selected Block Popup (If selected block exists) */}
      {selectedBlock && (
        <div className="absolute left-1/2 bottom-16 -translate-x-1/2 z-20 max-w-sm w-full px-4 animate-in slide-in-from-bottom-4 duration-200">
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
