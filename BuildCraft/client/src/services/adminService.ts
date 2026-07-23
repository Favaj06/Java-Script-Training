import axios from "axios";
import type { ApiResponse, PlanRequestData, DiscoveryCallData } from "../types/api";

export const getPlans = async (): Promise<ApiResponse<PlanRequestData[]>> => {
  const response = await axios.get<ApiResponse<PlanRequestData[]>>("/api/plan");
  return response.data;
};

export const getDiscoveryCalls = async (): Promise<ApiResponse<DiscoveryCallData[]>> => {
  const response = await axios.get<ApiResponse<DiscoveryCallData[]>>("/api/discovery");
  return response.data;
};
