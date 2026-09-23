import React, { useState, useEffect } from 'react';
import { getProductionIntelligence, recalculateProductionForecast } from '../services/productionService';
import { ExplainableAiModal } from '../components/production/ExplainableAiModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import {
  TrendingDown,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  ArrowDownRight,
  ShieldAlert
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function ProductionPage({ onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getProductionIntelligence();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleRecalculate = async () => {
    setRecalculating(true);
    addToast({ title: 'Recalculating ML Forecast', message: 'Ingesting IoT telemetry from Block B drills & trucks...', type: 'info' });

    await recalculateProductionForecast();
    setRecalculating(false);

    addToast({ title: 'Forecast Updated', message: 'Model updated: Shortfall risk remains at 78% (1,580 T deficit).', type: 'warning' });
  };

  if (loading || !data) {
    return <div className="p-8 text-slate-400 animate-pulse">Loading Production Intelligence model...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Production Intelligence</h2>
          <p className="text-xs text-slate-500 mt-1">
            Shortfall risk prediction and pit output trajectory analysis.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} loading={recalculating} onClick={handleRecalculate}>
            Recalculate Forecast
          </Button>
          <Button variant="primary" size="sm" icon={Sparkles} onClick={() => setShowExplainModal(true)}>
            Explain Prediction
          </Button>
        </div>
      </div>

      {/* KPI Cards Strip (5 KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {kpi.label}
            </span>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              {kpi.formatted}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 truncate">{kpi.subtext}</p>
          </div>
        ))}
      </div>

      {/* Prominent AI Prediction Panel Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold uppercase tracking-wider">
              HIGH RISK
            </span>
            <span className="text-slate-400 text-xs">• Model PSM-TimeX-v2.1</span>
          </div>

          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            AI Shortfall Prediction: 78% Probability
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Expected deficit of <strong className="text-red-400 font-bold">1,580 tonnes</strong> against the September target of 10,000 tonnes. Primary bottleneck identified in Block B-12 haulage and drill rig availability.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-md"
            icon={HelpCircle}
            onClick={() => setShowExplainModal(true)}
          >
            Explain Prediction
          </Button>
        </div>
      </div>

      {/* Main Grid: Production Trajectory Chart (Left) & Contributing Factors (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Target vs Actual vs Predicted Cumulative Output</h3>
              <p className="text-xs text-slate-500">Includes 'Today' operational milestone line</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, 11000]} />
                <Tooltip
                  formatter={(val) => [`${val ? val.toLocaleString() : 'N/A'} Tonnes`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
                />
                <ReferenceLine x="Day 23 (Today)" stroke="#dc2626" strokeDasharray="4 4" label={{ value: 'TODAY', fill: '#dc2626', fontSize: 10, fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="targetCum" stroke="#0f172a" fill="#f1f5f9" strokeWidth={2} name="Target" />
                <Area type="monotone" dataKey="actualCum" stroke="#16a34a" fill="#dcfce7" strokeWidth={2.5} name="Actual" />
                <Area type="monotone" dataKey="predictedCum" stroke="#d97706" fill="#fef3c7" strokeWidth={2} strokeDasharray="4 4" name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contributing Factors Card */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Shortfall Contributing Factors
            </h3>
            <p className="text-xs text-slate-500 mt-2 mb-4">
              Relative operational bottleneck impact values inferred by SHAP.
            </p>

            <div className="space-y-3 text-xs">
              {data.contributingFactors.map((factor, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium truncate">{factor.factor}</span>
                    <span className="font-bold text-slate-900">{factor.contribution}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${factor.contribution}%`, backgroundColor: factor.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            icon={HelpCircle}
            onClick={() => setShowExplainModal(true)}
          >
            Explain Prediction Details
          </Button>
        </div>
      </div>

      {/* Explainable AI Modal */}
      <ExplainableAiModal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        data={{
          ...data,
          contributingFactors: data.contributingFactors,
          explainability: data.explainability
        }}
      />
    </div>
  );
}
