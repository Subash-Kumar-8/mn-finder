import { simulateNetworkDelay } from './apiConfig';
import { mockReports } from '../data/reports';

export async function getReports() {
  await simulateNetworkDelay(300);
  return mockReports;
}

export async function generateNewReport(reportType) {
  await simulateNetworkDelay(1500);
  return {
    success: true,
    reportId: `REP-${Math.floor(100 + Math.random() * 900)}`,
    title: `${reportType} Executive Summary`,
    generatedAt: new Date().toISOString()
  };
}
