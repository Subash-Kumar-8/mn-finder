/**
 * AI Models Insights Mock Data
 */

export const mockAiModels = [
  {
    id: 'MOD-PROSPECTIVITY',
    name: 'Manganese Prospectivity Model',
    code: 'MPM-GeoNet-v3.2',
    purpose: 'Predict manganese ore mineral deposit probability using multi-spectral satellite imagery (Sentinel-2/ASTER), NGDR core samples, soil moisture, and geological fault vectors.',
    type: 'Multi-Modal CNN + Gradient Boosting Ensemble',
    accuracy: '89.4%',
    precision: '91.2%',
    recall: '87.6%',
    f1Score: '89.36%',
    aucRoc: '0.942',
    lastUpdated: '2026-09-15',
    datasetSize: '14,850 Geo-referenced Boreholes & Spectral Bands',
    status: 'Active / Deployed',
    featureImportance: [
      { name: 'Lithology & Structural Geology', importance: 31 },
      { name: 'Multispectral Band Ratios (SWIR/NDVI)', importance: 24 },
      { name: 'Borehole Core Assay Grade (% Mn)', importance: 19 },
      { name: 'Soil Geochemistry & Hydro-Moisture', importance: 14 },
      { name: 'Airborne Gravity Anomaly', importance: 12 }
    ]
  },
  {
    id: 'MOD-SHORTFALL',
    name: 'Production Shortfall Model',
    code: 'PSM-TimeX-v2.1',
    purpose: 'Forecast monthly mine output, identify target deviations, and calculate production shortfall probability based on pit operating efficiency and haulage logistics.',
    type: 'Bi-directional LSTM Time-Series + XGBoost Regressor',
    accuracy: '92.1%',
    precision: '89.8%',
    recall: '93.5%',
    f1Score: '91.61%',
    aucRoc: '0.958',
    lastUpdated: '2026-09-18',
    datasetSize: '36 Months Daily Production Telemetry',
    status: 'Active / Deployed',
    featureImportance: [
      { name: 'Equipment Downtime Hours', importance: 42 },
      { name: 'Haulage Cycle & Transport Delays', importance: 27 },
      { name: 'Pit Bench & Weather Conditions', importance: 18 },
      { name: 'Crusher Feed Throughput Rate', importance: 13 }
    ]
  },
  {
    id: 'MOD-EQUIPMENT',
    name: 'Equipment Downtime Model',
    code: 'EDM-VibraPulse-v4.0',
    purpose: 'Predict failure probability and remaining useful life (RUL) of drill rigs, excavators, and haul trucks using IoT telemetry (vibration, hydraulic pressure, engine temp).',
    type: 'Temporal Convolutional Network (TCN) + Random Forest',
    accuracy: '94.8%',
    precision: '93.6%',
    recall: '95.2%',
    f1Score: '94.39%',
    aucRoc: '0.971',
    lastUpdated: '2026-09-21',
    datasetSize: '2.4M Sensor Telemetry Records (1-min frequency)',
    status: 'Active / Deployed',
    featureImportance: [
      { name: 'Spindle/Bearing Vibration Harmonics', importance: 38 },
      { name: 'Hydraulic System Pressure Variance', importance: 29 },
      { name: 'Engine Oil Temperature Spike Rate', importance: 19 },
      { name: 'Cumulative Heavy Load Operating Hours', importance: 14 }
    ]
  }
];
