import type { FC } from "react";

type Props = {
  nickname: string;
};

const CharacterName: FC<Props> = ({ nickname }) => {

  return (
    <header className="character-name">
      <h2 className="character-name__title">{nickname}</h2>
    </header>
  );
};

export default CharacterName;
