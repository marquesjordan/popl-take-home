export interface Lead {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  title: string | null;
  phone: string | null;
  tags: string[];
  notes: string | null;
  createdAt: string;
}

export interface LeadForm {
  name: string;
  email: string;
  company: string;
  title: string;
  phone: string;
  tags: string;
  notes: string;
}
