import { NavLink, useNavigate } from "react-router-dom";
import type { FC } from "react";
import axios, { isAxiosError } from "axios";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import { useAppDispatch, useAuthToken } from "@/redux/hooks";
import { logout } from "@/redux/authSlice";
import { clearCharacter } from "@/redux/characterSlice";
import { API_URL } from "@/api/constants";
import "./TopBar.css";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-sm font-medium transition-colors",
    isActive
      ? "text-[var(--main-red-accent)]"
      : "text-amber-950/80 hover:text-amber-950",
  ].join(" ");

const TopBar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAuthToken();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch(logout());
      dispatch(clearCharacter());
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const serverMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message;
        console.error(serverMessage);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <header className="top-bar">
      <YellowPlate variant="bar">
        <div className="top-bar__inner">
          <nav className="top-bar__nav" aria-label="Primary navigation">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            {token ? (
              <NavLink to="/settings" className={linkClass}>
                Settings
              </NavLink>
            ) : (
              <NavLink to="/devlog" className={linkClass}>
                Dev log
              </NavLink>
            )}
          </nav>
          {token ? (
            <div className="top-bar__actions">
              <MainActionBtn
                type="button"
                className="top-bar__logout"
                onClick={handleLogout}
              >
                Log out
              </MainActionBtn>
            </div>
          ) : null}
        </div>
      </YellowPlate>
    </header>
  );
};

export default TopBar;
