export interface ScenarioPreset {
  id: string;
  title: string;
  icon: string;
  text: string;
  startingValue: string;
  passMark: 60 | 70 | 80;
  decayInterval: string;
  owner: string;
}

export interface HumanAccountabilityParams {
  startingValue: string;
  passMark: 60 | 70 | 80;
  decayInterval: string;
  owner: string;
}

export type LaboratoryTab = 'intake' | 'pipeline' | 'dials' | 'tiers' | 'loop';
