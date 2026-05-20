/** Body slots on Character.equipped (inventory item id or null). */
export const EQUIP_SLOTS = [
  "rightHand",
  "leftHand",
  "head",
  "chest",
  "hands",
  "legs",
  "feet",
  "ring",
  "earrings",
  "necklace",
] as const;

export type EquipSlot = (typeof EQUIP_SLOTS)[number];

export type Race = "human" | "elf" | "dwarf" | "orc";

export type CharacterStats = {
  strength: number;
  agility: number;
  luck: number;
  vitality: number;
  health: number;
  healthRecoveryRate: number;
  experience: number;
  fatigue: number;
  fatigueRecoveryRate: number;
  statPoints: number;
};

export type Equipped = Record<EquipSlot, string | null>;

/** Character document as returned by login and GET /characters/me. */
export type Character = {
  _id: string;
  nickname: string;
  race: Race;
  level: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  money: number;
  stats: CharacterStats;
  equipped: Equipped;
};
