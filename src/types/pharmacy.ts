export type PharmacyType = "government" | "private-sbs" | "unconfirmed";

export interface PharmacyHourWindow {
  days: number[];
  open: number;
  close: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  type: PharmacyType;
  address: string;
  parish: string;
  phone: string;
  hours: PharmacyHourWindow[];
  hoursText: string;
  notes: string;
  routes: string;
  lat?: number;
  lng?: number;
}
