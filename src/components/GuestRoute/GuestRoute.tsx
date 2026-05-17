import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthToken } from "@/redux/hooks";

type Props = {
  children: ReactNode;
};

const GuestRoute: FC<Props> = ({ children }) => {
  const token = useAuthToken();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
