import type { FC } from "react";
import { Navigate } from "react-router-dom";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import CharacterLarge from "@/components/Character/CharacterLarge/CharacterLarge";
import { useCharacter } from "@/redux/hooks";

const Dashboard: FC = () => {
  const character = useCharacter();

  if (!character) {
    return <Navigate to="/create-character" replace />;
  }

  return (
    <div className="flex w-full flex-col items-stretch gap-4">
      <YellowPlate>
        <CharacterLarge character={character} />
      </YellowPlate>
    </div>
  );
};

export default Dashboard;
