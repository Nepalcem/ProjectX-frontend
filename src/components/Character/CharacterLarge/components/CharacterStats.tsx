import type { FC } from "react";
import type { CharacterStats as Stats } from "@/types/character";
import CharacterProgressBar from "./CharacterProgressBar";

type Props = {
  level: number;
  money: number;
  stats: Stats;
};

/** Placeholder until backend defines XP thresholds per level. */
const experienceToNextLevel = (level: number) => (level + 1) * 100;

const CharacterStats: FC<Props> = ({ level, money, stats }) => {
  const xpMax = experienceToNextLevel(level);

  return (
    <section className="character-stats" aria-label="Character statistics">
      <div className="character-stats__block">
        <ul className="character-stats__grid">
          <li>
            <span className="character-stats__label">Strength</span>
            <span className="character-stats__value">{stats.strength}</span>
          </li>
          <li>
            <span className="character-stats__label">Agility</span>
            <span className="character-stats__value">{stats.agility}</span>
          </li>
          <li>
            <span className="character-stats__label">Luck</span>
            <span className="character-stats__value">{stats.luck}</span>
          </li>
          <li>
            <span className="character-stats__label">Vitality</span>
            <span className="character-stats__value">{stats.vitality}</span>
          </li>
        </ul>
      </div>

      <div className="character-stats__block">
        <ul className="character-stats__list">
          <li>
            <span className="character-stats__label">Level:</span>
            <span className="character-stats__value">{level}</span>
          </li>
          <li>
            <span className="character-stats__label">Money:</span>
            <span className="character-stats__value">{money} Ducats</span>
          </li>
        </ul>
        <CharacterProgressBar
          label="Experience"
          value={stats.experience}
          max={xpMax}
          variant="experience"
        />
      </div>
    </section>
  );
};

export default CharacterStats;
