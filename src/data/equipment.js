/**
 * Equipment Intelligence Mock Data
 */

export const equipmentKpis = [
  { id: 'total', label: 'Total Fleet Units', value: 42, status: 'info', icon: 'Truck' },
  { id: 'healthy', label: 'Healthy (Nominal)', value: 29, status: 'healthy', icon: 'CheckCircle2' },
  { id: 'attention', label: 'Needs Attention', value: 9, status: 'warning', icon: 'AlertTriangle' },
  { id: 'critical', label: 'Critical Risk', value: 4, status: 'critical', icon: 'AlertOctagon' }
];

export const equipmentList = [
  {
    id: 'DRL-02',
    name: 'Heavy Hydraulic Drill DRL-02',
    type: 'Drill Rig',
    location: 'Block B-12',
    operatingHours: 4870,
    availability: '68%',
    healthStatus: 'Critical',
    downtimeRisk: 'High',
    predictedDowntimeHrs: 14,
    healthScore: 61,
    lastService: '2026-08-14',
    nextServiceDue: 'Overdue by 3 days',
    telemetryAlert: 'Hydraulic pump pressure pulsation anomaly & high spindle bearing vibration'
  },
  {
    id: 'EXC-01',
    name: 'Crawler Excavator EXC-01',
    type: 'Excavator',
    location: 'Block A-07',
    operatingHours: 4280,
    availability: '92%',
    healthStatus: 'Healthy',
    downtimeRisk: 'Low',
    predictedDowntimeHrs: 0,
    healthScore: 94,
    lastService: '2026-09-02',
    nextServiceDue: 'In 24 days',
    telemetryAlert: 'All sensor parameters within nominal parameters'
  },
  {
    id: 'EXC-02',
    name: 'Crawler Excavator EXC-02',
    type: 'Excavator',
    location: 'Block B-12',
    operatingHours: 5120,
    availability: '81%',
    healthStatus: 'Needs Attention',
    downtimeRisk: 'Medium',
    predictedDowntimeHrs: 6,
    healthScore: 78,
    lastService: '2026-08-28',
    nextServiceDue: 'In 8 days',
    telemetryAlert: 'Engine coolant temp running 6°C above average baseline'
  },
  {
    id: 'HT-04',
    name: 'Dump Haul Truck HT-04',
    type: 'Haul Truck',
    location: 'Block B-12',
    operatingHours: 3920,
    availability: '76%',
    healthStatus: 'Needs Attention',
    downtimeRisk: 'High',
    predictedDowntimeHrs: 10,
    healthScore: 71,
    lastService: '2026-08-19',
    nextServiceDue: 'In 3 days',
    telemetryAlert: 'Transmission torque converter slip ratio warning'
  },
  {
    id: 'HT-01',
    name: 'Dump Haul Truck HT-01',
    type: 'Haul Truck',
    location: 'Block A-07',
    operatingHours: 2850,
    availability: '95%',
    healthStatus: 'Healthy',
    downtimeRisk: 'Low',
    predictedDowntimeHrs: 0,
    healthScore: 96,
    lastService: '2026-09-10',
    nextServiceDue: 'In 30 days',
    telemetryAlert: 'Optimal performance metrics'
  },
  {
    id: 'CRU-01',
    name: 'Primary Ore Crusher CRU-01',
    type: 'Crusher',
    location: 'Central Plant',
    operatingHours: 8410,
    availability: '88%',
    healthStatus: 'Healthy',
    downtimeRisk: 'Low',
    predictedDowntimeHrs: 2,
    healthScore: 87,
    lastService: '2026-09-01',
    nextServiceDue: 'In 18 days',
    telemetryAlert: 'Vibration frequency slightly elevated on secondary jaw'
  },
  {
    id: 'DRL-01',
    name: 'Blastholes Rotary Drill DRL-01',
    type: 'Drill Rig',
    location: 'Block C-04',
    operatingHours: 3100,
    availability: '89%',
    healthStatus: 'Healthy',
    downtimeRisk: 'Low',
    predictedDowntimeHrs: 0,
    healthScore: 91,
    lastService: '2026-09-05',
    nextServiceDue: 'In 21 days',
    telemetryAlert: 'Operating normally'
  },
  {
    id: 'LOAD-03',
    name: 'Wheel Loader LOAD-03',
    type: 'Loader',
    location: 'Block C-04',
    operatingHours: 6200,
    availability: '64%',
    healthStatus: 'Critical',
    downtimeRisk: 'High',
    predictedDowntimeHrs: 18,
    healthScore: 58,
    lastService: '2026-08-01',
    nextServiceDue: 'Overdue by 12 days',
    telemetryAlert: 'Hydraulic cylinder fluid leakage & control valve stickiness'
  }
];

export const detailedEquipmentDRL02 = {
  id: 'DRL-02',
  name: 'Heavy Hydraulic Drill DRL-02',
  type: 'Drill Rig',
  location: 'Block B-12 (Mansar South)',
  serialNumber: 'KAT-MNG-DRL-2023-88',
  manufacturer: 'Sandvik Mining Systems',
  operatingHours: 4870,
  availability: '68%',
  healthScore: 61,
  status: 'HIGH DOWNTIME RISK',
  predictedDowntime: '14 hours',
  failureProbability: '84%',
  primaryComponentAtRisk: 'Spindle Bearing & Hydraulic Feed Cylinder',
  
  utilizationTrend: [
    { day: 'Mon', utilization: 88, temp: 72, vibration: 2.1 },
    { day: 'Tue', utilization: 84, temp: 75, vibration: 2.8 },
    { day: 'Wed', utilization: 79, temp: 81, vibration: 3.9 },
    { day: 'Thu', utilization: 72, temp: 88, vibration: 5.4 },
    { day: 'Fri', utilization: 64, temp: 94, vibration: 7.1 },
    { day: 'Sat', utilization: 58, temp: 98, vibration: 8.6 },
    { day: 'Sun (Today)', utilization: 48, temp: 104, vibration: 9.8 }
  ],

  downtimeHistory: [
    { date: '2026-07-12', cause: 'Hydraulic hose rupture', durationHrs: 8, location: 'Block B' },
    { date: '2026-05-28', cause: 'Drill bit teeth replacement', durationHrs: 4, location: 'Block A' },
    { date: '2026-03-14', cause: 'Engine oil filter overhaul', durationHrs: 12, location: 'Central Workshop' }
  ],

  aiInsight: [
    'Operating hours (4,870 hrs) approaching major 5,000-hour bearing overhaul threshold.',
    'Hydraulic pressure fluctuation variance expanded by 34% over last 72 hours.',
    'Spindle vibration harmonics indicate premature spalling on main bearing race.',
    'High operational load during hard gondite rock drilling accelerated component degradation.'
  ],

  recommendedAction: 'Schedule emergency preventive maintenance shift before tomorrow morning 06:00 AM production cycle to prevent total spindle lockup.'
};
