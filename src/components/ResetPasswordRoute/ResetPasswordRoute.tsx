import type { FC, ReactNode } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ResetPasswordRoute: FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const resetToken = searchParams.get("resetToken");

  if (!email || !resetToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ResetPasswordRoute;
