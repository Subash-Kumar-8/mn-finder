/**
 * Prospectivity & Exploration Mock Data for Manganese Mining Intelligence Platform
 */

export const explorationBlocks = [
  {
    id: 'B-12',
    name: 'BLOCK B-12 (Mansar South)',
    district: 'Bhandara',
    state: 'Maharashtra',
    mineral: 'Manganese Ore (Pyrolusite/Psilomelane)',
    prospectivityScore: 84,
    prospectivityLevel: 'HIGH',
    confidenceScore: 87,
    coordinates: { lat: 21.365, lng: 79.524 },
    polygon: [
      [21.380, 79.510],
      [21.385, 79.535],
      [21.355, 79.545],
      [21.350, 79.518]
    ],
    areaSqKm: 14.2,
    evidence: {
      geologicalSuitability: 82,
      satelliteIndicators: 79,
      soilIndicators: 76,
      boreholeEvidence: 88
    },
    featureContributions: [
      { feature: 'Geological Lithology & Structure', value: 31, color: '#1e3a8a' },
      { feature: 'Satellite Spectroscopic Indicators', value: 24, color: '#2563eb' },
      { feature: 'Borehole Ore Grade Samples', value: 19, color: '#0284c7' },
      { feature: 'Soil Geochemistry & Moisture', value: 14, color: '#0d9488' },
      { feature: 'Geophysical Gravity Anomaly', value: 12, color: '#64748b' }
    ],
    recommendations: [
      'Detailed 3D electrical resistivity tomography (ERT) survey',
      'Infill borehole drilling program (12 planned drill holes)',
      'Ground validation & petrographic core analysis'
    ]
  },
  {
    id: 'C-04',
    name: 'BLOCK C-04 (Dongri Extension)',
    district: 'Nagpur',
    state: 'Maharashtra',
    mineral: 'Manganese Carbonate/Oxide',
    prospectivityScore: 81,
    prospectivityLevel: 'HIGH',
    confidenceScore: 83,
    coordinates: { lat: 21.412, lng: 79.645 },
    polygon: [
      [21.425, 79.630],
      [21.430, 79.660],
      [21.400, 79.665],
      [21.395, 79.635]
    ],
    areaSqKm: 18.6,
    evidence: {
      geologicalSuitability: 85,
      satelliteIndicators: 82,
      soilIndicators: 71,
      boreholeEvidence: 86
    },
    featureContributions: [
      { feature: 'Geological Lithology & Structure', value: 35, color: '#1e3a8a' },
      { feature: 'Satellite Spectroscopic Indicators', value: 22, color: '#2563eb' },
      { feature: 'Borehole Ore Grade Samples', value: 20, color: '#0284c7' },
      { feature: 'Soil Geochemistry & Moisture', value: 13, color: '#0d9488' },
      { feature: 'Geophysical Gravity Anomaly', value: 10, color: '#64748b' }
    ],
    recommendations: [
      'Topographic LIDAR mapping & trenching',
      'Hydrological impact study'
    ]
  },
  {
    id: 'B-13',
    name: 'BLOCK B-13 (Bhandara West)',
    district: 'Bhandara',
    state: 'Maharashtra',
    mineral: 'Braunite-Gondite Horizon',
    prospectivityScore: 71,
    prospectivityLevel: 'MEDIUM',
    confidenceScore: 78,
    coordinates: { lat: 21.320, lng: 79.480 },
    polygon: [
      [21.335, 79.465],
      [21.340, 79.495],
      [21.305, 79.500],
      [21.300, 79.470]
    ],
    areaSqKm: 12.8,
    evidence: {
      geologicalSuitability: 74,
      satelliteIndicators: 68,
      soilIndicators: 69,
      boreholeEvidence: 73
    },
    featureContributions: [
      { feature: 'Geological Lithology & Structure', value: 28, color: '#1e3a8a' },
      { feature: 'Satellite Spectroscopic Indicators', value: 26, color: '#2563eb' },
      { feature: 'Borehole Ore Grade Samples', value: 18, color: '#0284c7' },
      { feature: 'Soil Geochemistry & Moisture', value: 15, color: '#0d9488' },
      { feature: 'Geophysical Gravity Anomaly', value: 13, color: '#64748b' }
    ],
    recommendations: [
      'Secondary satellite hyper-spectral review',
      'Exploratory pitting & shallow sampling'
    ]
  },
  {
    id: 'A-07',
    name: 'BLOCK A-07 (Tirodi North)',
    district: 'Balaghat',
    state: 'Madhya Pradesh',
    mineral: 'High-grade Mn Oxide',
    prospectivityScore: 64,
    prospectivityLevel: 'MEDIUM',
    confidenceScore: 72,
    coordinates: { lat: 21.540, lng: 79.710 },
    polygon: [
      [21.555, 79.695],
      [21.560, 79.725],
      [21.525, 79.730],
      [21.520, 79.700]
    ],
    areaSqKm: 21.1,
    evidence: {
      geologicalSuitability: 68,
      satelliteIndicators: 62,
      soilIndicators: 60,
      boreholeEvidence: 66
    },
    featureContributions: [
      { feature: 'Geological Lithology & Structure', value: 30, color: '#1e3a8a' },
      { feature: 'Satellite Spectroscopic Indicators', value: 20, color: '#2563eb' },
      { feature: 'Borehole Ore Grade Samples', value: 22, color: '#0284c7' },
      { feature: 'Soil Geochemistry & Moisture', value: 14, color: '#0d9488' },
      { feature: 'Geophysical Gravity Anomaly', value: 14, color: '#64748b' }
    ],
    recommendations: [
      'Regional magnetic anomaly mapping',
      'Structural fault displacement analysis'
    ]
  }
];

export const boreholesData = [
  { id: 'BH-101', blockId: 'B-12', depth: '142 m', manganeseGrade: '44.8% Mn', status: 'High Ore Intersect', lat: 21.368, lng: 79.520 },
  { id: 'BH-102', blockId: 'B-12', depth: '185 m', manganeseGrade: '41.2% Mn', status: 'High Ore Intersect', lat: 21.362, lng: 79.530 },
  { id: 'BH-103', blockId: 'B-12', depth: '110 m', manganeseGrade: '38.5% Mn', status: 'Moderate Ore Intersect', lat: 21.372, lng: 79.515 },
  { id: 'BH-104', blockId: 'C-04', depth: '198 m', manganeseGrade: '46.1% Mn', status: 'High Ore Intersect', lat: 21.415, lng: 79.648 },
  { id: 'BH-105', blockId: 'C-04', depth: '160 m', manganeseGrade: '43.0% Mn', status: 'High Ore Intersect', lat: 21.408, lng: 79.640 },
  { id: 'BH-106', blockId: 'B-13', depth: '125 m', manganeseGrade: '32.4% Mn', status: 'Low-Medium Ore Intersect', lat: 21.322, lng: 79.482 },
  { id: 'BH-107', blockId: 'A-07', depth: '210 m', manganeseGrade: '29.7% Mn', status: 'Trace Ore Intersect', lat: 21.542, lng: 79.712 }
];

export const mineralOccurrences = [
  { id: 'MO-01', name: 'Dongri Buzurg Mine Deposit', type: 'Pyrolusite Ore', age: 'Proterozoic Sausar Group', lat: 21.430, lng: 79.650 },
  { id: 'MO-02', name: 'Mansar Ore Belt', type: 'Psilomelane / Braunite', age: 'Mansar Formation', lat: 21.370, lng: 79.525 },
  { id: 'MO-03', name: 'Ukwa Deposit Horizon', type: 'Metamorphic Mn Carbonate', age: 'Sausar Belt', lat: 21.550, lng: 79.720 }
];

export const defaultMapLayers = [
  { id: 'sentinel2', name: 'Sentinel-2 Multispectral', active: true, category: 'Satellite' },
  { id: 'geology', name: 'Geological Map (GSI 1:50k)', active: true, category: 'Geology' },
  { id: 'soil', name: 'Soil Moisture & Clay Index', active: true, category: 'Environmental' },
  { id: 'ndvi', name: 'NDVI Vegetation Anomaly', active: false, category: 'Satellite' },
  { id: 'ngdr', name: 'NGDR Mineral Occurrences', active: true, category: 'Database' },
  { id: 'boreholes', name: 'Borehole Drilling Records', active: true, category: 'Subsurface' },
  { id: 'prospectivity', name: 'AI Prospectivity Prediction', active: true, category: 'AI Inference' }
];
