import React, { useState, useEffect } from 'react';
import { getProspectivityData } from '../services/prospectivityService';
import { GisMap } from '../components/common/GisMap';
import { ProspectivityModal } from '../components/prospectivity/ProspectivityModal';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Layers, MapPin, Sparkles, Filter, ShieldCheck, CheckCircle2, ChevronRight, Play, Search, X } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function ProspectivityPage({ onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBlockId, setSelectedBlockId] = useState('B-12');
  const [selectedBlockForModal, setSelectedBlockForModal] = useState(null);
  const [locationSearchInput, setLocationSearchInput] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getProspectivityData();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleQuickLocationSelect = (blockId, locationName) => {
    setSelectedBlockId(blockId);
    setLocationSearchInput(locationName);
    addToast({
      title: 'Location Selected',
      message: `Map centered on ${locationName}. Reviewing prospectivity parameters...`,
      type: 'success'
    });
  };

  if (loading || !data) {
    return <div className="p-8 text-slate-400 animate-pulse">Initializing Hero Prospectivity GIS Engine...</div>;
  }

  const selectedBlock = data.blocks.find((b) => b.id === selectedBlockId) || data.blocks[0];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0b2545] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI Decision Support System</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Manganese Prospectivity Map
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            AI-ranked exploration blocks synthesized from satellite multispectral imagery, regional geology, soil geochemistry, and borehole evidence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Filter}>
            Filters
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Play}
            onClick={() => {
              addToast({ title: 'AI Analysis Initiated', message: 'Re-evaluating prospectivity weights...', type: 'info' });
            }}
          >
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Hero GIS Map Showcase (Large visual centerpiece) */}
      <div className="relative space-y-3">
        {/* Quick Data Indicators & Location Jump Strip above Map */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Satellite Data</div>
              <div className="text-[10px] text-slate-500">Sentinel-2 & ASTER</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Geology</div>
              <div className="text-[10px] text-slate-500">Lithology & faults</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Soil</div>
              <div className="text-[10px] text-slate-500">Moisture & chemistry</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Boreholes</div>
              <div className="text-[10px] text-slate-500">146 validated records</div>
            </div>
          </div>
        </div>

        {/* Location Quick Jump Tag Pills */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-blue-600" /> Quick Location Jumps:
          </span>
          {[
            { id: 'B-12', label: 'Block B-12 (Mansar South)' },
            { id: 'C-04', label: 'Block C-04 (Dongri Ext)' },
            { id: 'B-13', label: 'Block B-13 (Bhandara West)' },
            { id: 'A-07', label: 'Block A-07 (Tirodi North)' }
          ].map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleQuickLocationSelect(loc.id, loc.label)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedBlockId === loc.id
                  ? 'bg-[#0b2545] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        {/* Hero Full GIS Map Component with Integrated Search */}
        <GisMap
          blocks={data.blocks}
          boreholes={data.boreholes}
          mineralOccurrences={data.mineralOccurrences}
          selectedBlockId={selectedBlockId}
          onSelectBlock={(id) => setSelectedBlockId(id)}
          onOpenAnalysisModal={(block) => setSelectedBlockForModal(block)}
          height="h-[620px]"
        />
      </div>

      {/* Target Exploration Blocks Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Ranked Exploration Blocks Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.blocks.map((block) => {
            const isSelected = block.id === selectedBlockId;
            const isHigh = block.prospectivityLevel === 'HIGH';

            return (
              <div
                key={block.id}
                onClick={() => setSelectedBlockId(block.id)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-white ${
                  isSelected
                    ? 'ring-2 ring-[#0b2545] border-[#0b2545] shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">{block.id}</span>
                  <Badge status={isHigh ? 'critical' : 'warning'}>{block.prospectivityLevel}</Badge>
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1 truncate">{block.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{block.district}, {block.state}</div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Prospectivity</span>
                    <span className={`text-xl font-black ${isHigh ? 'text-red-600' : 'text-amber-600'}`}>
                      {block.prospectivityScore}%
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlockForModal(block);
                    }}
                  >
                    Analyze &rarr;
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prospectivity Analysis Modal */}
      {selectedBlockForModal && (
        <ProspectivityModal
          isOpen={!!selectedBlockForModal}
          onClose={() => setSelectedBlockForModal(null)}
          block={selectedBlockForModal}
        />
      )}
    </div>
  );
}
