// src/types/certificates.ts

export type CertificateCategory =
  | 'Security'
  | 'Hackathon'
  | 'Academic'
  | 'Full-Stack'
  | 'Design'
  | 'Workshop'
  | 'AI / Systems';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  description: string;
  imageUrl: string;
  credentialUrl?: string;
  credentialId?: string;
  skills?: string[];
}

