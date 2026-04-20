import { NavLink } from "react-router-dom";
import type { FC } from "react";

const TopBar: FC = () => {
  return (
    <header className="top-bar" role="banner">
      <NavLink
        to="/"
        className={({ isActive }) =>
          [
            "text-sm font-medium transition-colors",
            isActive
              ? "text-[var(--main-red-accent)]"
              : "text-slate-50/85 hover:text-white",
          ].join(" ")
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/devlog"
        className={({ isActive }) =>
          [
            "text-sm font-medium transition-colors",
            isActive
              ? "text-[var(--main-red-accent)]"
              : "text-slate-50/85 hover:text-white",
          ].join(" ")
        }
      >
        Dev log
      </NavLink>
      
    </header>
  );
};

export default TopBar;
