import type { FC } from "react";
import Home from "./pages/Home/Home";
import "./App.css";

const App: FC = () => {
  return (
    <main className="page-wrapper">
      <div className="app-container">
        <Home />
        {/* <UnderConstruction /> */}
      </div>
    </main>
  );
};

export default App;
