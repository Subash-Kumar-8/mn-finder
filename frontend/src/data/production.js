/**
 * Production Intelligence Mock Data
 */

export const productionKpis = [
  {
    id: 'target',
    label: 'Production Target',
    value: 10000,
    unit: 'Tonnes',
    formatted: '10,000 T',
    subtext: 'Monthly quota set by Ministry',
    status: 'info'
  },
  {
    id: 'actual',
    label: 'Actual Production (To Date)',
    value: 7950,
    unit: 'Tonnes',
    formatted: '7,950 T',
    subtext: '79.5% target achieved (Day 23)',
    status: 'info'
  },
  {
    id: 'predicted',
    label: 'Predicted Month-End Total',
    value: 8420,
    unit: 'Tonnes',
    formatted: '8,420 T',
    subtext: 'AI ML Forecast Projection',
    status: 'warning'
  },
  {
    id: 'shortfall',
    label: 'Expected Production Shortfall',
    value: 1580,
    unit: 'Tonnes',
    formatted: '1,580 T',
    subtext: 'Deficit relative to monthly target',
    status: 'critical'
  },
  {
    id: 'probability',
    label: 'Shortfall Risk Probability',
    value: 78,
    unit: '%',
    formatted: '78%',
    subtext: 'HIGH RISK (Requires operational mitigation)',
    status: 'critical'
  }
];

export const productionChartData = [
  { day: 'Day 1', targetCum: 333, actualCum: 340, predictedCum: 340 },
  { day: 'Day 4', targetCum: 1333, actualCum: 1350, predictedCum: 1350 },
  { day: 'Day 8', targetCum: 2666, actualCum: 2600, predictedCum: 2610 },
  { day: 'Day 12', targetCum: 4000, actualCum: 3910, predictedCum: 3900 },
  { day: 'Day 16', targetCum: 5333, actualCum: 5120, predictedCum: 5150 },
  { day: 'Day 20', targetCum: 6666, actualCum: 6300, predictedCum: 6350 },
  { day: 'Day 23 (Today)', targetCum: 7666, actualCum: 7950, predictedCum: 7950 },
  { day: 'Day 26 (Fcst)', targetCum: 8666, actualCum: null, predictedCum: 8180 },
  { day: 'Day 30 (Fcst)', targetCum: 10000, actualCum: null, predictedCum: 8420 }
];

export const shortfallContributingFactors = [
  { factor: 'Equipment Downtime (Drill DRL-02 & HT-04)', contribution: 42, color: '#dc2626' },
  { factor: 'Haulage & Transport Delays', contribution: 27, color: '#ea580c' },
  { factor: 'Operational & Bench Condition Constraints', contribution: 18, color: '#d97706' },
  { factor: 'Weather & Unexpected Rainfall Impact', contribution: 13, color: '#64748b' }
];

export const shortfallExplainabilityText = {
  summary: "Reduced heavy mining equipment availability (Drill-02 breakdown & Haul Truck HT-04 transmission overheat warning) is the primary driver of the predicted 1,580 T production deficit.",
  impactBreakdown: [
    "Drill DRL-02 unscheduled maintenance will lose 14 operating hours (~680 T of un-blasted ore face).",
    "Haul Truck HT-04 capacity reduction drops pit-to-crusher cycle velocity by 18% (~430 T delay).",
    "Bench 3 flooding in Block B-12 creates haul road congestion (~470 T operational lag)."
  ],
  recommendedMitigations: [
    "Reallocate Excavator EXC-01 and spare Haul Truck HT-06 to Block B-12 immediately.",
    "Schedule overnight preventive maintenance for DRL-02 drill assembly.",
    "Bypass secondary crusher bottleneck by activating backup portable jaw crusher."
  ]
};
