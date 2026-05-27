import type { FC } from "react";
import type { CharacterStats as Stats } from "@/types/character";
import { getExperienceToNextLevel } from "@/constants/experience";
import CharacterProgressBar from "./CharacterProgressBar";

type Props = {
  level: number;
  money: number;
  stats: Stats;
};

const CharacterStats: FC<Props> = ({ level, money, stats }) => {
  const xpMax = getExperienceToNextLevel(level);

  return (
    <section className="character-stats" aria-label="Character statistics">
      <div className="character-stats__columns">
        <ul className="character-stats__attributes">
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

        <ul className="character-stats__meta">
          <li>
            <span className="character-stats__label">Level</span>
            <span className="character-stats__value">{level}</span>
          </li>
          <li>
            <span className="character-stats__label">Money (Ducats)</span>
            <span className="character-stats__value">{money}</span>
          </li>
        </ul>
      </div>

      <CharacterProgressBar
        label="Experience"
        value={stats.experience}
        max={xpMax}
        variant="experience"
      />
    </section>
  );
};

export default CharacterStats;
