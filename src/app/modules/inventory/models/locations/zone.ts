import { Section } from './section';

export interface Zone {
  Id: number;
  name: string;
  maxCapacity: number;
  sections: Section[];
  mts2: number;
}
