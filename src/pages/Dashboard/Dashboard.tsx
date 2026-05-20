import type { FC } from "react";
import axios, { isAxiosError } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import { useAppDispatch, useAppSelector, useCharacter } from "@/redux/hooks";
import { logout } from "@/redux/authSlice";
import { clearCharacter } from "@/redux/characterSlice";
import { API_URL } from "@/api/constants";


const Dashboard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const character = useCharacter();

  if (!character) {
    return <Navigate to="/create-character" replace />;
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logout());
      dispatch(clearCharacter());
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string } | undefined)?.message;
        console.error(serverMessage);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <YellowPlate>
        <h2 className="login-title mb-2 text-center">Inner hall</h2>
        <p className="login-subtitle mb-4 text-center">
          {user?.email
            ? `Welcome back, ${user.email}.`
            : "You are logged in."}
        </p>
        <p className="login-subtitle mb-4 text-center">
          Playing as <strong>{character.nickname}</strong> ({character.race})
        </p>
        <MainActionBtn type="button" onClick={handleLogout}>
          Log out
        </MainActionBtn>
      </YellowPlate>
    </div>
  );
};

export default Dashboard;
