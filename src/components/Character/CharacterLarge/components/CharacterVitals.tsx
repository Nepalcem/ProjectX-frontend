import type { FC } from "react";
import type { CharacterStats } from "@/types/character";
import { HEALTH_PER_VITALITY } from "@/constants/races";
import CharacterProgressBar from "./CharacterProgressBar";

const MAX_FATIGUE = 100;

type Props = {
  stats: CharacterStats;
};

const CharacterVitals: FC<Props> = ({ stats }) => {
  const maxHealth = stats.vitality * HEALTH_PER_VITALITY;

  return (
    <section className="character-vitals" aria-label="Health and fatigue">
      <CharacterProgressBar
        label="Health"
        value={stats.health}
        max={maxHealth}
        variant="health"
      />
      <CharacterProgressBar
        label="Fatigue"
        value={stats.fatigue}
        max={MAX_FATIGUE}
        variant="fatigue"
      />
    </section>
  );
};

export default CharacterVitals;
