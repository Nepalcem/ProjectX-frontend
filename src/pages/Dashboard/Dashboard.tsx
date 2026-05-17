import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/authSlice";

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <YellowPlate>
        <h2 className="login-title mb-2 text-center">Inner hall</h2>
        <p className="login-subtitle mb-4 text-center">
          {user?.email
            ? `Welcome back, ${user.email}. You are logged in.`
            : "You are logged in."}
        </p>
        <MainActionBtn type="button" onClick={handleLogout}>
          Log out
        </MainActionBtn>
      </YellowPlate>
    </div>
  );
};

export default Dashboard;
