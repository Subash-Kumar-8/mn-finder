import { simulateNetworkDelay } from './apiConfig';
import { dashboardKpis, dashboardProductionTrend, dashboardRecentActivity } from '../data/dashboard';

/**
 * Fetch overview dashboard metrics
 */
export async function getDashboardOverview() {
  await simulateNetworkDelay(300);
  return {
    kpis: dashboardKpis,
    productionTrend: dashboardProductionTrend,
    recentActivity: dashboardRecentActivity
  };
}
