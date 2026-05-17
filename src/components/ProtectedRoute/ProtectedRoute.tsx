import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthToken } from "@/redux/hooks";

type Props = {
  children: ReactNode;
};

const ProtectedRoute: FC<Props> = ({ children }) => {
  const token = useAuthToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
