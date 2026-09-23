import { simulateNetworkDelay } from './apiConfig';
import {
  productionKpis,
  productionChartData,
  shortfallContributingFactors,
  shortfallExplainabilityText
} from '../data/production';

/**
 * Fetch production intelligence data & shortfall forecast
 */
export async function getProductionIntelligence() {
  await simulateNetworkDelay(350);
  return {
    kpis: productionKpis,
    chartData: productionChartData,
    contributingFactors: shortfallContributingFactors,
    explainability: shortfallExplainabilityText
  };
}

/**
 * Trigger production forecast recalculation
 */
export async function recalculateProductionForecast() {
  await simulateNetworkDelay(1000);
  return {
    success: true,
    predictedProduction: 8420,
    expectedShortfall: 1580,
    shortfallProbability: 78,
    recalculatedAt: new Date().toLocaleTimeString()
  };
}
