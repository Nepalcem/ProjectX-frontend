import type { FC } from "react";
import UnderConstruction from "./pages/UnderConstruction";
import { Home } from "./main";

const App: FC = () => {
  return (
    <>
      <Home />
      <UnderConstruction />
    </>
  );
};

export default App;
