import { simulateNetworkDelay } from './apiConfig';
import { mockAlerts } from '../data/alerts';

export async function getAlerts() {
  await simulateNetworkDelay(250);
  return mockAlerts;
}

export async function acknowledgeAlert(alertId) {
  await simulateNetworkDelay(200);
  return { success: true, alertId };
}
