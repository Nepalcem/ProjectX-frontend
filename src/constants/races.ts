import type { Race } from "@/types/character";

/** Keep base attributes in sync with backend `RACE_BASE_ATTRIBUTES`. */
export type RaceBaseAttributes = {
  strength: number;
  agility: number;
  luck: number;
  vitality: number;
};

export type RaceInfo = {
  id: Race;
  label: string;
  description: string;
  baseAttributes: RaceBaseAttributes;
};

export const HEALTH_PER_VITALITY = 6;
export const FULL_RECOVERY_MINUTES = 10;

export const RACE_ORDER: Race[] = ["human", "elf", "dwarf", "orc"];

export const RACES: RaceInfo[] = [
  {
    id: "human",
    label: "Human",
    description:
      "Balanced and adaptable. Humans are well known for their ability to deal critical damage due to their natural high luck.",
    baseAttributes: { strength: 4, agility: 4, luck: 5, vitality: 5 },
  },
  {
    id: "elf",
    label: "Elf",
    description:
      "Swift and precise. Elves rely on agility and evasion to avoid damage rather than brute force.",
    baseAttributes: { strength: 4, agility: 5, luck: 4, vitality: 5 },
  },
  {
    id: "dwarf",
    label: "Dwarf",
    description:
      "Sturdy and enduring. Dwarves withstand hardship with exceptional vitality and resilience.",
    baseAttributes: { strength: 4, agility: 4, luck: 4, vitality: 6 },
  },
  {
    id: "orc",
    label: "Orc",
    description:
      "Fierce and imposing. Orcs channel raw strength, trading finesse for devastating power.",
    baseAttributes: { strength: 5, agility: 4, luck: 4, vitality: 5 },
  },
];

export const getRaceById = (race: Race): RaceInfo =>
  RACES.find((r) => r.id === race) ?? RACES[0];
