import React, { useState, useEffect } from 'react';
import { getEquipmentFleet } from '../services/equipmentService';
import { EquipmentTable } from '../components/equipment/EquipmentTable';
import { Truck, CheckCircle2, AlertTriangle, AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../hooks/useToast';

export function EquipmentPage({ onSelectEquipment }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getEquipmentFleet();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  const handleSyncTelemetry = async () => {
    addToast({ title: 'Syncing IoT Telemetry', message: 'Fetching real-time vibration & hydraulic sensor feeds...', type: 'info' });
    setLoading(true);
    const res = await getEquipmentFleet();
    setData(res);
    setLoading(false);
  };

  if (loading || !data) {
    return <div className="p-8 text-slate-400 animate-pulse">Loading Equipment Telemetry Fleet...</div>;
  }

  const iconMap = {
    Truck,
    CheckCircle2,
    AlertTriangle,
    AlertOctagon
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Equipment Intelligence</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time IoT telemetry monitoring and predictive maintenance analytics for mining fleet.
          </p>
        </div>
        <div>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={handleSyncTelemetry}>
            Sync Telemetry
          </Button>
        </div>
      </div>

      {/* KPI Strip (4 KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpis.map((kpi) => {
          const Icon = iconMap[kpi.icon] || Truck;
          const isCritical = kpi.status === 'critical';
          const isWarning = kpi.status === 'warning';
          const isHealthy = kpi.status === 'healthy';

          return (
            <div
              key={kpi.id}
              className={`p-5 rounded-xl border bg-white shadow-2xs flex items-center justify-between ${
                isCritical
                  ? 'border-red-200'
                  : isWarning
                  ? 'border-amber-200'
                  : isHealthy
                  ? 'border-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {kpi.label}
                </span>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {kpi.value}
                </div>
              </div>

              <div
                className={`p-3 rounded-xl ${
                  isCritical
                    ? 'bg-red-50 text-red-600'
                    : isWarning
                    ? 'bg-amber-50 text-amber-600'
                    : isHealthy
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-blue-50 text-blue-600'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Equipment Table Component */}
      <EquipmentTable
        equipmentList={data.list}
        onSelectEquipment={(id) => onSelectEquipment(id)}
      />
    </div>
  );
}
