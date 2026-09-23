import { simulateNetworkDelay } from './apiConfig';
import { explorationBlocks, boreholesData, mineralOccurrences, defaultMapLayers } from '../data/prospectivity';

/**
 * Get all prospectivity blocks and map layers
 */
export async function getProspectivityData() {
  await simulateNetworkDelay(400);
  return {
    blocks: explorationBlocks,
    boreholes: boreholesData,
    mineralOccurrences: mineralOccurrences,
    layers: defaultMapLayers
  };
}

/**
 * Get single block details for analysis popup/drawer
 * @param {string} blockId 
 */
export async function getBlockDetails(blockId) {
  await simulateNetworkDelay(250);
  return explorationBlocks.find((b) => b.id === blockId) || explorationBlocks[0];
}

/**
 * Trigger AI prospectivity analysis simulation
 * @param {Object} filterParams 
 */
export async function runAiProspectivityAnalysis(filterParams = {}) {
  await simulateNetworkDelay(1200); // realistic AI inference delay
  return {
    success: true,
    message: 'AI Prospectivity Inference executed successfully using Sentinel-2 + NGDR dataset.',
    analyzedBlock: filterParams.blockId ? explorationBlocks.find(b => b.id === filterParams.blockId) : explorationBlocks[0],
    timestamp: new Date().toISOString()
  };
}
