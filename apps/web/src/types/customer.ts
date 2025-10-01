export interface Customer {
  id: string;
  name: string;
  curp: string | null;
  rfc: string | null;
  country: string | null;
  occupation: string | null;
  riskScore: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
