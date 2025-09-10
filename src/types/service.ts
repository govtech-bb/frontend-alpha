export type ServiceStep = {
  title: string;
  description: string;
  duration: string;
  required: boolean;
};

export type ServiceContact = {
  name: string;
  phone: string;
  email: string | null;
};

export type ServiceCost = {
  item: string;
  fee: string;
};

export type ServiceTimeline = {
  deadline?: string;
  processing: string;
  urgentProcessing?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  overview: string;
  steps: ServiceStep[];
  contacts: ServiceContact[];
  lastUpdated: string;
  requirements?: string[];
  costs?: ServiceCost[];
  timeline?: ServiceTimeline;
  importantNotes?: string[];
};
