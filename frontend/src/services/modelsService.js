import { simulateNetworkDelay } from './apiConfig';
import { mockAiModels } from '../data/models';

export async function getAiModels() {
  await simulateNetworkDelay(300);
  return mockAiModels;
}
