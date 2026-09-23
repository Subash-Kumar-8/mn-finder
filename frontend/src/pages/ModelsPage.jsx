import React, { useState, useEffect } from 'react';
import { getAiModels } from '../services/modelsService';
import { Badge } from '../components/common/Badge';
import { BrainCircuit, Cpu, Database, Activity, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export function ModelsPage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getAiModels();
      setModels(res);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-8 text-slate-400 animate-pulse">Loading AI Models Evaluation Metrics...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Title & Prototype Tag Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Model Insights</h2>
          <p className="text-xs text-slate-500 mt-1">
            Machine Learning architecture specifications, evaluation benchmarks, and feature importance rankings.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <BrainCircuit className="w-4 h-4 text-amber-600" />
          <span>Prototype / Demonstration Data</span>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="space-y-6">
        {models.map((model) => (
          <div key={model.id} className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-blue-900 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {model.code}
                  </span>
                  <Badge status="healthy">{model.status}</Badge>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1.5">{model.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">{model.purpose}</p>
              </div>

              <div className="text-xs text-slate-500 space-y-1 shrink-0 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>Model Type: <strong className="text-slate-800">{model.type}</strong></div>
                <div>Training Set: <strong className="text-slate-800">{model.datasetSize}</strong></div>
                <div>Last Updated: <strong className="text-slate-800">{model.lastUpdated}</strong></div>
              </div>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accuracy</span>
                <span className="text-xl font-black text-slate-900">{model.accuracy}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Precision</span>
                <span className="text-xl font-black text-slate-900">{model.precision}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recall</span>
                <span className="text-xl font-black text-slate-900">{model.recall}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">F1 Score</span>
                <span className="text-xl font-black text-slate-900">{model.f1Score}</span>
              </div>
            </div>

            {/* Feature Importance Chart */}
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Feature Importance Weighting</h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={model.featureImportance} margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                    <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={180} />
                    <Tooltip
                      formatter={(val) => [`${val}% Weight`, 'Importance']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="importance" fill="#0b2545" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
