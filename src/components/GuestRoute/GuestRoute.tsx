import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthToken, useCharacter } from "@/redux/hooks";

type Props = {
  children: ReactNode;
};

const GuestRoute: FC<Props> = ({ children }) => {
  const token = useAuthToken();
  const character = useCharacter();

  if (token) {
    return <Navigate to={character ? "/dashboard" : "/create-character"} replace />;
  }

  return children;
};

export default GuestRoute;
