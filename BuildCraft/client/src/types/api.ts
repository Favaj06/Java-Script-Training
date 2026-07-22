export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}

export interface PlanRequestFormData {
  name: string;
  email: string;
  business_name: string;
  industry: string;
  message: string;
}

export interface DiscoveryFormData {
  name: string;
  email: string;
  business_name: string;
  phone: string;
  message: string;
  preferredDate: string;
  timeSlot: string;
}

export interface PlanRequestData extends PlanRequestFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface DiscoveryCallData extends DiscoveryFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}
