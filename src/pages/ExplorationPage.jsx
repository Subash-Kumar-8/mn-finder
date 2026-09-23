import React, { useState, useEffect } from 'react';
import { getProspectivityData, runAiProspectivityAnalysis } from '../services/prospectivityService';
import { GisMap } from '../components/common/GisMap';
import { ProspectivityModal } from '../components/prospectivity/ProspectivityModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Play, Filter, Layers, Database, Compass, CheckCircle2, ChevronRight } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function ExplorationPage({ onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState('B-12');
  const [selectedBlockForModal, setSelectedBlockForModal] = useState(null);

  // Filters state
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState('Bhandara');
  const [selectedBlockFilter, setSelectedBlockFilter] = useState('B-12');
  const [dataSourceFilter, setDataSourceFilter] = useState('Sentinel-2 Multispectral');

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

  const handleRunAiAnalysis = async () => {
    setAnalyzing(true);
    addToast({ title: 'AI Analysis Started', message: 'Fusing Sentinel-2 spectral bands with NGDR borehole core database...', type: 'info' });

    const result = await runAiProspectivityAnalysis({ blockId: selectedBlockFilter });
    setAnalyzing(false);

    addToast({
      title: 'Analysis Completed',
      message: `${result.analyzedBlock.name}: ${result.analyzedBlock.prospectivityScore}% Manganese Prospectivity Score.`,
      type: 'success'
    });

    setSelectedBlockId(result.analyzedBlock.id);
  };

  if (loading || !data) {
    return <div className="p-8 animate-pulse text-slate-400">Loading Exploration Intelligence GIS data...</div>;
  }

  const selectedBlock = data.blocks.find((b) => b.id === selectedBlockId) || data.blocks[0];

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Exploration Intelligence</h2>
        <p className="text-xs text-slate-500 mt-1">
          Identify potential manganese-bearing zones using multi-source geospatial information.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#0b2545]"
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Odisha">Odisha</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#0b2545]"
            >
              <option value="Bhandara">Bhandara</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Balaghat">Balaghat</option>
              <option value="Sundargarh">Sundargarh</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mining Block</label>
            <select
              value={selectedBlockFilter}
              onChange={(e) => {
                setSelectedBlockFilter(e.target.value);
                if (e.target.value !== 'ALL') setSelectedBlockId(e.target.value);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#0b2545]"
            >
              <option value="ALL">All Exploration Blocks</option>
              <option value="B-12">Block B-12 (Mansar South)</option>
              <option value="C-04">Block C-04 (Dongri Ext)</option>
              <option value="B-13">Block B-13 (Bhandara West)</option>
              <option value="A-07">Block A-07 (Tirodi North)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Data Source</label>
            <select
              value={dataSourceFilter}
              onChange={(e) => setDataSourceFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-[#0b2545]"
            >
              <option value="Sentinel-2 Multispectral">Sentinel-2 Multispectral</option>
              <option value="GSI Geological Map">GSI Geological 1:50k Map</option>
              <option value="NGDR Core Samples">NGDR Core Assay Records</option>
              <option value="Soil Moisture Index">Soil Moisture & Clay Anomaly</option>
            </select>
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            icon={Play}
            loading={analyzing}
            onClick={handleRunAiAnalysis}
          >
            {analyzing ? 'Analyzing Area...' : 'Run AI Analysis'}
          </Button>
        </div>
      </div>

      {/* Main Layout: 70% Map & 30% Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <GisMap
            blocks={data.blocks}
            boreholes={data.boreholes}
            mineralOccurrences={data.mineralOccurrences}
            selectedBlockId={selectedBlockId}
            onSelectBlock={(id) => setSelectedBlockId(id)}
            onOpenAnalysisModal={(block) => setSelectedBlockForModal(block)}
            height="h-[580px]"
          />
        </div>

        {/* 30% Analysis Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-wider block">
                  SELECTED EXPLORATION TARGET
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-0.5">{selectedBlock.name}</h3>
                <p className="text-xs text-slate-500">{selectedBlock.district} District • {selectedBlock.mineral}</p>
              </div>
              <Badge status={selectedBlock.prospectivityLevel === 'HIGH' ? 'critical' : 'warning'}>
                {selectedBlock.prospectivityLevel}
              </Badge>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Manganese Prospectivity Score
              </span>
              <div className="text-4xl font-black text-red-500 mt-1">{selectedBlock.prospectivityScore}%</div>
              <span className="text-xs text-slate-300 block mt-1">
                Model Confidence Rating: {selectedBlock.confidenceScore}%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider block text-[10px]">
                Multi-Source Geospatial Evidence
              </span>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Geological Suitability</span>
                <span className="font-bold text-slate-900">{selectedBlock.evidence.geologicalSuitability}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Satellite Spectroscopic</span>
                <span className="font-bold text-slate-900">{selectedBlock.evidence.satelliteIndicators}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600">Borehole Validation</span>
                <span className="font-bold text-slate-900">{selectedBlock.evidence.boreholeEvidence}%</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full"
                icon={ChevronRight}
                onClick={() => setSelectedBlockForModal(selectedBlock)}
              >
                View Detailed Analysis
              </Button>
            </div>
          </div>
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
