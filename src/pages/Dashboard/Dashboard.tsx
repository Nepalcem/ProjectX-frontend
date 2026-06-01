import type { FC } from "react";
import { Navigate } from "react-router-dom";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import CharacterLarge from "@/components/Character/CharacterLarge/CharacterLarge";
import Intro from "@/pages/Dashboard/Intro";
import { useCharacter } from "@/redux/hooks";
import "./dashboard.css";

const Dashboard: FC = () => {
  const character = useCharacter();

  if (!character) {
    return <Navigate to="/create-character" replace />;
  }

  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__character character-large-card">
        <YellowPlate>
          <CharacterLarge character={character} />
        </YellowPlate>
      </div>

      <aside className="dashboard-layout__intro">
        <YellowPlate>
          <Intro />
        </YellowPlate>
      </aside>
    </div>
  );
};

export default Dashboard;
