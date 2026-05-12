import { NavLink } from "react-router-dom";
import type { FC } from "react";
import YellowPlate from "../ui/YellowPlate/YellowPlate";
import "./TopBar.css";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-sm font-medium transition-colors",
    isActive
      ? "text-[var(--main-red-accent)]"
      : "text-amber-950/80 hover:text-amber-950",
  ].join(" ");

const TopBar: FC = () => {
  return (
    <header className="top-bar">
      <YellowPlate variant="bar">
        <nav
          className="flex flex-1 items-center gap-4"
          aria-label="Primary navigation"
        >
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/devlog" className={linkClass}>
            Dev log
          </NavLink>
        </nav>
      </YellowPlate>
    </header>
  );
};

export default TopBar;
