/**
 * Alerts & AI Recommendations Data
 */

export const mockAlerts = [
  {
    id: 'ALT-101',
    severity: 'critical', // critical | warning | info
    title: 'Production shortfall predicted',
    location: 'Block B-12',
    timestamp: '10 min ago',
    shortfallProbability: '78%',
    description: 'AI production model predicts a deficit of ~1,580 tonnes by month-end due to equipment availability bottlenecks in Block B-12.',
    recommendedAction: 'Review equipment availability & reallocate excavators EXC-01 from Block A.',
    acknowledged: false,
    category: 'Production'
  },
  {
    id: 'ALT-102',
    severity: 'warning',
    title: 'Drill-02 downtime risk is high',
    location: 'Block B-12',
    timestamp: '25 min ago',
    predictedDowntime: '14 hours',
    description: 'Vibration sensors on Drill DRL-02 detected abnormal harmonic frequencies indicating imminent bearing fatigue.',
    recommendedAction: 'Schedule preventive maintenance before the morning production cycle.',
    acknowledged: false,
    category: 'Equipment'
  },
  {
    id: 'ALT-103',
    severity: 'info',
    title: 'New high prospectivity zone identified',
    location: 'Block C-04',
    timestamp: '1 hour ago',
    prospectivityScore: '81%',
    description: 'Multi-spectral Sentinel-2 data fusion combined with NGDR borehole core logs flagged an unmapped manganese oxide outcrop.',
    recommendedAction: 'Consider detailed exploration plan and 3D ERT ground survey.',
    acknowledged: true,
    category: 'Exploration'
  },
  {
    id: 'ALT-104',
    severity: 'warning',
    title: 'Haul Truck HT-04 transmission overheat',
    location: 'Block B-12 Pit Road',
    timestamp: '2 hours ago',
    predictedDowntime: '10 hours',
    description: 'Torque converter temperature exceeded safety thresholds (112°C) during steep pit incline haulage.',
    recommendedAction: 'Reduce payload load limit to 70% and dispatch cooling unit.',
    acknowledged: false,
    category: 'Equipment'
  },
  {
    id: 'ALT-105',
    severity: 'info',
    title: 'Geological core sample synchronization',
    location: 'Balaghat District Registry',
    timestamp: '4 hours ago',
    description: '14 new borehole assays (BH-115 to BH-128) imported from GSI NGDR database with high manganese carbonate purity.',
    recommendedAction: 'Re-run regional prospectivity model for Block A-07.',
    acknowledged: true,
    category: 'Data Sync'
  }
];
