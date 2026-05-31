import type { FC } from "react";
import type { Race } from "@/types/character";
import { RACE_IMAGES, getRaceById } from "@/constants/races";

type Props = {
  race: Race;
};

const CharacterImage: FC<Props> = ({ race }) => {
  const raceLabel = getRaceById(race).label;

  return (
    <div className="character-image">
      <img
        className="character-image__img"
        src={RACE_IMAGES[race]}
        alt={`${raceLabel} character`}
      />
    </div>
  );
};

export default CharacterImage;
