import type { FC } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import "./App.css";

const App: FC = () => {
  return (
    <main className="page-wrapper">
      <TopBar />
      <div className="page-wrapper__content">
        <div className="app-container">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default App;
