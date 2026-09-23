import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { ShieldCheck, CheckCircle2, FileSpreadsheet, PlusCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useToast } from '../../hooks/useToast';

export function ProspectivityModal({ isOpen, onClose, block }) {
  const { addToast } = useToast();

  if (!block) return null;

  const handleAddToExplorationPlan = () => {
    addToast({
      title: 'Added to Exploration Plan',
      message: `${block.name} has been queued for 3D ERT Ground Validation & Infill Drilling.`,
      type: 'success'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Prospectivity Analysis" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Block Header Banner */}
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{block.district} District</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">{block.mineral}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight mt-1">{block.name}</h3>
            <p className="text-xs text-slate-400 mt-1">
              Geo-location: {block.coordinates.lat}°N, {block.coordinates.lng}°E • Extent: {block.areaSqKm} sq km
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-center shrink-0 min-w-36">
            <div className="text-3xl font-black text-red-500 leading-none">{block.prospectivityScore}%</div>
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-1">HIGH POTENTIAL</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Model Confidence: {block.confidenceScore}%</div>
          </div>
        </div>

        {/* Feature Contribution Breakdown Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-bold text-slate-900 text-sm mb-1">Feature Contribution Breakdown (SHAP / Feature Attribution)</h4>
          <p className="text-xs text-slate-500 mb-4">Relative weight of geological, satellite, and subsurface inputs to model score</p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={block.featureContributions} margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="feature" tick={{ fontSize: 11 }} width={160} />
                <Tooltip
                  formatter={(value) => [`${value}% Contribution`, 'Importance']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {block.featureContributions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#2563eb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evidence Breakdown & AI Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Geospatial Evidence Indicators</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Geological Suitability</span>
                <span className="font-bold text-slate-900">{block.evidence.geologicalSuitability}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-900 h-full" style={{ width: `${block.evidence.geologicalSuitability}%` }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600">Satellite Multispectral Indicators</span>
                <span className="font-bold text-slate-900">{block.evidence.satelliteIndicators}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${block.evidence.satelliteIndicators}%` }} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-600">Borehole Core Evidence</span>
                <span className="font-bold text-slate-900">{block.evidence.boreholeEvidence}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-600 h-full" style={{ width: `${block.evidence.boreholeEvidence}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-blue-50/60 rounded-xl border border-blue-200 p-4">
            <h4 className="font-bold text-blue-950 text-xs uppercase tracking-wider mb-3">AI Actionable Recommendations</h4>
            <ul className="space-y-2 text-xs text-blue-900">
              {block.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" icon={PlusCircle} onClick={handleAddToExplorationPlan}>
            Add to Exploration Plan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
