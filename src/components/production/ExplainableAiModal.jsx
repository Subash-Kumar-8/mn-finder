import React from 'react';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AlertTriangle, BrainCircuit, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export function ExplainableAiModal({ isOpen, onClose, data }) {
  if (!data) return null;

  const chartColors = ['#dc2626', '#ea580c', '#d97706', '#64748b'];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Explainable AI Decision Support"
      subtitle="Model Inference Attribution (SHAP / LIME Analysis)"
      width="max-w-xl"
    >
      <div className="space-y-6">
        {/* Model Attribution Badge */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900 text-xs">Model-Generated Decision Support</span>
              <Badge status="warning">78% SHORTFALL RISK</Badge>
            </div>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Model PSM-TimeX-v2.1 evaluated operational parameters to generate this explanation.
            </p>
          </div>
        </div>

        {/* Primary Interpretation Callout */}
        <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            <BrainCircuit className="w-4 h-4 text-blue-400" />
            <span>AI Interpretation Summary</span>
          </div>
          <p className="text-sm font-medium text-slate-100 leading-relaxed italic">
            "{data.summary || 'Reduced equipment availability and increased downtime are the primary contributors to the predicted production shortfall.'}"
          </p>
        </div>

        {/* Feature Contribution Visualization Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Shortfall Contributing Factors</h4>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.contributingFactors || []}
                  dataKey="contribution"
                  nameKey="factor"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={3}
                  label={({ contribution }) => `${contribution}%`}
                >
                  {(data.contributingFactors || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val}% Contribution`, 'Factor Weight']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '11px' }}
                />
                <Legend tick={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Impact Root Causes */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Root Cause Impact Drivers</h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {data.explainability?.impactBreakdown?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded border border-slate-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actionable Recommended Interventions */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
          <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider mb-2">Recommended Operational Interventions</h4>
          <ul className="space-y-2 text-xs text-emerald-900">
            {data.explainability?.recommendedMitigations?.map((mit, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{mit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Acknowledge Explanation
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
