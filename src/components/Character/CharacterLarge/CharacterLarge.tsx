import type { FC } from "react";
import type { Character } from "@/types/character";
import { useCharacter } from "@/redux/hooks";
import CharacterName from "./components/CharacterName";
import CharacterImage from "./components/CharacterImage";
import CharacterStats from "./components/CharacterStats";
import CharacterVitals from "./components/CharacterVitals";
import "./characterLarge.css";

type Props = {
  character?: Character | null;
};

const CharacterLarge: FC<Props> = ({ character: characterProp }) => {
  const characterFromStore = useCharacter();
  const character = characterProp ?? characterFromStore;

  if (!character) {
    return null;
  }

  return (
    <article className="character-large">
      <div className="character-large__top">
        <CharacterName
          nickname={character.nickname}
        />
        <CharacterImage race={character.race} />
      </div>

      <CharacterStats
        level={character.level}
        money={character.money}
        stats={character.stats}
      />

      <CharacterVitals stats={character.stats} />
    </article>
  );
};

export default CharacterLarge;
