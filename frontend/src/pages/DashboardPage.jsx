import React, { useState, useEffect } from 'react';
import { getDashboardOverview } from '../services/dashboardService';
import { getProspectivityData } from '../services/prospectivityService';
import { KpiCard } from '../components/dashboard/KpiCard';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { ProductionOverviewChart } from '../components/dashboard/ProductionOverviewChart';
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline';
import { GisMap } from '../components/common/GisMap';
import { ProspectivityModal } from '../components/prospectivity/ProspectivityModal';
import { Button } from '../components/common/Button';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function DashboardPage({ onNavigate }) {
  const [data, setData] = useState(null);
  const [prospectivityData, setProspectivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBlockId, setSelectedBlockId] = useState('B-12');
  const [selectedBlockForModal, setSelectedBlockForModal] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [dash, prosp] = await Promise.all([
        getDashboardOverview(),
        getProspectivityData()
      ]);
      setData(dash);
      setProspectivityData(prosp);
      setLoading(false);
    }
    load();
  }, []);

  const handleRefresh = async () => {
    addToast({ title: 'Refreshing Intelligence Feed', message: 'Syncing with GSI NGDR & telemetry streams...', type: 'info' });
    setLoading(true);
    const dash = await getDashboardOverview();
    setData(dash);
    setLoading(false);
  };

  if (loading || !data || !prospectivityData) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl" />
          ))}
        </div>
        <div className="h-96 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mining Intelligence Overview</h2>
          <p className="text-xs text-slate-500 mt-1">
            AI-driven insights for manganese exploration and mining operations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={handleRefresh}>
            Sync Feed
          </Button>
          <Button variant="primary" size="sm" icon={ExternalLink} onClick={() => onNavigate('/prospectivity')}>
            Open Prospectivity Map
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid (6 cards as specified) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.kpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            status={kpi.status}
            iconName={kpi.iconName}
            subtext={kpi.subtext}
            onClick={() => {
              if (kpi.id === 'prospectivity_zones') onNavigate('/prospectivity');
              if (kpi.id === 'predicted_production' || kpi.id === 'shortfall_risk') onNavigate('/production');
              if (kpi.id === 'equipment_availability') onNavigate('/equipment');
            }}
          />
        ))}
      </div>

      {/* Main Grid Section: GIS Map (Left 70%) & AI Alerts (Right 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Manganese Prospectivity Overview</h3>
              <p className="text-xs text-slate-500">Interactive GIS map showing active mining blocks and mineral occurrences</p>
            </div>
            <button
              onClick={() => onNavigate('/prospectivity')}
              className="text-xs font-semibold text-[#0b2545] hover:underline"
            >
              Full Map &rarr;
            </button>
          </div>
          <GisMap
            blocks={prospectivityData.blocks}
            boreholes={prospectivityData.boreholes}
            mineralOccurrences={prospectivityData.mineralOccurrences}
            selectedBlockId={selectedBlockId}
            onSelectBlock={(id) => setSelectedBlockId(id)}
            onOpenAnalysisModal={(block) => setSelectedBlockForModal(block)}
            height="h-[440px]"
          />
        </div>

        <div className="lg:col-span-4">
          <AlertsPanel onNavigateToAlerts={() => onNavigate('/alerts')} />
        </div>
      </div>

      {/* Bottom Grid Section: Production Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProductionOverviewChart data={data.productionTrend} />
        </div>
        <div className="lg:col-span-4">
          <ActivityTimeline activities={data.recentActivity} />
        </div>
      </div>

      {/* Analysis Modal */}
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
