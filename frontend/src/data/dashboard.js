/**
 * Dashboard Mock Data for Manganese Mining Intelligence Platform
 * @typedef {Object} DashboardKpi
 * @property {string} id
 * @property {string} label
 * @property {string|number} value
 * @property {string} trend
 * @property {string} status - healthy | warning | critical | info
 * @property {string} iconName
 * @property {string} subtext
 */

export const dashboardKpis = [
  {
    id: 'active_areas',
    label: 'Active Mining Areas',
    value: 24,
    trend: '+2 this month',
    status: 'healthy',
    iconName: 'Pickaxe',
    subtext: 'Balaghat & Bhandara Belts'
  },
  {
    id: 'prospectivity_zones',
    label: 'High Prospectivity Zones',
    value: 8,
    trend: '3 new identified',
    status: 'info',
    iconName: 'MapPin',
    subtext: '> 75% Manganese Potential'
  },
  {
    id: 'production_target',
    label: 'Production Target',
    value: '10,000 T',
    trend: 'Monthly Target',
    status: 'info',
    iconName: 'Target',
    subtext: 'Target set for Sep 2026'
  },
  {
    id: 'predicted_production',
    label: 'Predicted Production',
    value: '8,420 T',
    trend: '-15.8% vs Target',
    status: 'warning',
    iconName: 'TrendingDown',
    subtext: 'AI ML Forecast Model'
  },
  {
    id: 'shortfall_risk',
    label: 'Shortfall Risk',
    value: '78%',
    trend: 'High Risk Level',
    status: 'critical',
    iconName: 'AlertTriangle',
    subtext: 'Shortfall of ~1,580 T expected'
  },
  {
    id: 'equipment_availability',
    label: 'Equipment Availability',
    value: '86%',
    trend: '-4% from benchmark',
    status: 'warning',
    iconName: 'Activity',
    subtext: '4 units require critical service'
  }
];

export const dashboardProductionTrend = [
  { month: 'Apr', target: 9500, actual: 9400, predicted: 9450 },
  { month: 'May', target: 9800, actual: 9650, predicted: 9700 },
  { month: 'Jun', target: 10000, actual: 9850, predicted: 9800 },
  { month: 'Jul', target: 10000, actual: 9100, predicted: 9200 },
  { month: 'Aug', target: 10000, actual: 8600, predicted: 8650 },
  { month: 'Sep (Current)', target: 10000, actual: 7950, predicted: 8420 },
  { month: 'Oct (Forecast)', target: 10500, actual: null, predicted: 8900 }
];

export const dashboardRecentActivity = [
  {
    id: 'act-1',
    time: '09:42 AM',
    title: 'Prospectivity analysis completed',
    description: 'Block C-04 satellite anomaly cross-referenced with NGDR borehole logs.',
    type: 'prospectivity',
    badge: 'NEW ZONE'
  },
  {
    id: 'act-2',
    time: '09:18 AM',
    title: 'Equipment risk detected',
    description: 'Drill DRL-02 telemetry indicates bearing wear. 14 hrs downtime predicted.',
    type: 'equipment',
    badge: 'HIGH RISK'
  },
  {
    id: 'act-3',
    time: '08:52 AM',
    title: 'Production prediction updated',
    description: 'Recalculated shortfall risk to 78% due to equipment bottleneck in Block B.',
    type: 'production',
    badge: 'AI FORECAST'
  },
  {
    id: 'act-4',
    time: '07:30 AM',
    title: 'Geological survey imported',
    description: 'Bhandara sector 12 core samples synced to geological database.',
    type: 'exploration',
    badge: 'DATA SYNC'
  }
];
