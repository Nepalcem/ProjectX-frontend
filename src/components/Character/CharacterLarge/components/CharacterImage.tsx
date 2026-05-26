import type { FC } from "react";
import type { Race } from "@/types/character";
import { getRaceById } from "@/constants/races";

type Props = {
  race: Race;
};

const CharacterImage: FC<Props> = ({ race }) => {
  const raceLabel = getRaceById(race).label;

  return (
    <div className="character-image" aria-label={`${raceLabel} portrait`}>
      <div className="character-image__placeholder">
        <span className="character-image__label">{raceLabel}</span>
        <span className="character-image__hint">Portrait soon</span>
      </div>
    </div>
  );
};

export default CharacterImage;
