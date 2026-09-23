import { simulateNetworkDelay } from './apiConfig';
import { equipmentKpis, equipmentList, detailedEquipmentDRL02 } from '../data/equipment';

/**
 * Fetch equipment fleet overview & KPI metrics
 */
export async function getEquipmentFleet() {
  await simulateNetworkDelay(300);
  return {
    kpis: equipmentKpis,
    list: equipmentList
  };
}

/**
 * Fetch single equipment details by ID
 * @param {string} id 
 */
export async function getEquipmentDetailById(id) {
  await simulateNetworkDelay(350);
  if (id === 'DRL-02' || !id) {
    return detailedEquipmentDRL02;
  }
  const basic = equipmentList.find((e) => e.id === id);
  if (!basic) return detailedEquipmentDRL02;

  // Construct mock detail
  return {
    ...basic,
    serialNumber: `KAT-MNG-${basic.id}-2024`,
    manufacturer: 'Caterpillar Heavy Machinery',
    failureProbability: basic.healthStatus === 'Critical' ? '82%' : '24%',
    primaryComponentAtRisk: basic.healthStatus === 'Critical' ? 'Hydraulic Pump / Bearing Assembly' : 'Standard Routine Wear',
    utilizationTrend: detailedEquipmentDRL02.utilizationTrend,
    downtimeHistory: detailedEquipmentDRL02.downtimeHistory,
    aiInsight: [
      `Unit ${basic.id} currently operating in ${basic.location}.`,
      `Health status evaluated at ${basic.healthStatus} with ${basic.operatingHours} operating hours.`,
      `Telemetry report: ${basic.telemetryAlert}.`
    ],
    recommendedAction: `Inspect ${basic.id} during the next shift scheduled check.`
  };
}
