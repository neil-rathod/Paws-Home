
export type EnergyLevel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type Size = 'Small' | 'Medium' | 'Large' | 'Extra Large';
export type Age = 'Puppy' | 'Young' | 'Adult' | 'Senior';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: Age;
  size: Size;
  energyLevel: EnergyLevel;
  description: string;
  imageUrl: string;
  tags: string[];
  location: string;
  gender: 'Male' | 'Female';
  weight: string;
  color: string;
  compatibility: {
    cats: boolean;
    dogs: boolean;
    kids: boolean;
  };
}

export interface FilterState {
  age: Age[];
  size: Size[];
  gender: ('Male' | 'Female')[];
  search: string;
}
