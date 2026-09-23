import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';

export function ProductionOverviewChart({ data = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Monthly Production Trajectory</h3>
          <p className="text-xs text-slate-500">Target vs Actual vs AI ML Predicted Output (Tonnes)</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-800" />
            <span>Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-600" />
            <span>Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-500 stroke-dasharray-2" />
            <span>AI Predicted</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" domain={[0, 12000]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(val) => [`${val ? val.toLocaleString() : 'N/A'} Tonnes`, '']}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#0f172a"
              strokeWidth={2}
              dot={{ r: 3, fill: '#0f172a' }}
              name="Target"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#16a34a"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#16a34a' }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#d97706"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#d97706' }}
              name="AI Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
