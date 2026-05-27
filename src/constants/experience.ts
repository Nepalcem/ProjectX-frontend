export type ExperienceLevelConfig = {
  level: number;
  /** Base XP reward */
  baseExperience: number;
  /** Duel vs player coefficient */
  duelPlayerCoefficient: number;
  /** Duel vs bot coefficient */
  duelBotCoefficient: number;
  /** XP required to reach the next level */
  experienceToNextLevel: number;
};

/** Keep in sync with game design / backend when duel XP is implemented. */
export const EXPERIENCE_LEVELS: ExperienceLevelConfig[] = [
  {
    level: 0,
    baseExperience: 10,
    duelPlayerCoefficient: 1,
    duelBotCoefficient: 0.75,
    experienceToNextLevel: 30,
  },
  {
    level: 1,
    baseExperience: 15,
    duelPlayerCoefficient: 1,
    duelBotCoefficient: 0.74,
    experienceToNextLevel: 150,
  },
  {
    level: 2,
    baseExperience: 20,
    duelPlayerCoefficient: 1,
    duelBotCoefficient: 0.73,
    experienceToNextLevel: 400,
  },
  {
    level: 3,
    baseExperience: 25,
    duelPlayerCoefficient: 1,
    duelBotCoefficient: 0.72,
    experienceToNextLevel: 800,
  },
];

export const getExperienceLevelConfig = (
  level: number,
): ExperienceLevelConfig | undefined =>
  EXPERIENCE_LEVELS.find((row) => row.level === level);

export const getExperienceToNextLevel = (level: number): number =>
  getExperienceLevelConfig(level)?.experienceToNextLevel ?? 0;
