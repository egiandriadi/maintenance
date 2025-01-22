export interface MaintenanceRequest {
  id: string;
  title: string;
  urgency: string;
  status: string;
  date: string;
}

export interface Urgency {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  name: string;
}