export interface User {
  chroma_id: string; // The Hex Code
  joinedAt: number;
}

export interface Stain {
  id: string;
  authorHex: string;
  x: number; // Percentage relative to container width
  y: number; // Percentage relative to container height
  timestamp: number;
}

export interface Post {
  id: string;
  authorHex: string;
  content: string;
  timestamp: number;
  stains: Stain[];
}

export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  SPECTRUM = 'SPECTRUM',
  MONOLITH = 'MONOLITH',
}