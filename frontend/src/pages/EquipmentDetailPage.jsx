import React, { useState, useEffect } from 'react';
import { getEquipmentDetailById } from '../services/equipmentService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  PlusCircle,
  FileText
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function EquipmentDetailPage({ equipmentId = 'DRL-02', onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getEquipmentDetailById(equipmentId);
      setData(res);
      setLoading(false);
    }
    load();
  }, [equipmentId]);

  const handleCreateMaintenance = () => {
    addToast({
      title: 'Maintenance Work Order Generated',
      message: `Work Order #WO-2026-981 dispatched to Block B-12 mechanical crew for ${data.id}.`,
      type: 'success'
    });
  };

  if (loading || !data) {
    return <div className="p-8 text-slate-400 animate-pulse">Loading telemetry details for {equipmentId}...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Equipment Monitoring</span>
        </button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={FileText}>
            Maintenance History
          </Button>
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={handleCreateMaintenance}>
            Create Maintenance Action
          </Button>
        </div>
      </div>

      {/* Equipment Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>{data.type} • {data.location}</span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight">{data.name} ({data.id})</h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
            <span>Serial: <strong className="text-white">{data.serialNumber}</strong></span>
            <span>Manufacturer: <strong className="text-white">{data.manufacturer}</strong></span>
            <span>Operating Hours: <strong className="text-white">{data.operatingHours.toLocaleString()} hrs</strong></span>
          </div>
        </div>

        {/* Risk & Health Badges Box */}
        <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-xl text-center shrink-0 min-w-48 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Health Score</span>
          <div className="text-4xl font-black text-red-500 leading-none">{data.healthScore}%</div>
          <Badge status="critical" className="inline-block mt-1">{data.status}</Badge>
          <div className="text-xs text-amber-300 font-semibold pt-1 flex items-center justify-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Predicted Downtime: {data.predictedDowntime}</span>
          </div>
        </div>
      </div>

      {/* AI Telemetry Insight & Recommendation Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-950 text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>AI Predictive Diagnostic Insight</span>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-900">
          {data.aiInsight.map((item, i) => (
            <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold text-amber-950">
          <span>Action Recommendation: {data.recommendedAction}</span>
          <Button variant="primary" size="sm" onClick={handleCreateMaintenance}>
            Schedule Service
          </Button>
        </div>
      </div>

      {/* Charts Grid: Utilization & Vibration Trend (Left) & Downtime History (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">7-Day Telemetry Diagnostics</h3>
              <p className="text-xs text-slate-500">Utilization Rate (%) & Spindle Vibration (mm/s)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.utilizationTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, 110]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="utilization" stroke="#2563eb" strokeWidth={2.5} name="Utilization %" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="vibration" stroke="#dc2626" strokeWidth={2} strokeDasharray="4 4" name="Vibration (mm/s)" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Downtime Log History Card */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
            Recent Maintenance History
          </h3>

          <div className="space-y-3">
            {data.downtimeHistory.map((hist, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{hist.cause}</span>
                  <span className="text-[10px] font-mono text-slate-400">{hist.date}</span>
                </div>
                <div className="text-slate-500 flex items-center justify-between text-[11px]">
                  <span>Duration: {hist.durationHrs} hours</span>
                  <span>Location: {hist.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
