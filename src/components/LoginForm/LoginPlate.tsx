import {
  type FC,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import "./loginform.css";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import LoginPanel from "./LoginPanel";
import RegisterPanel from "./RegisterPanel";

const EMAIL_VERIFIED_MSG =
  "Email verification completed. Please log in.";

const readEmailVerifiedFromUrl = () =>
  new URLSearchParams(window.location.search).get("emailVerified") === "1";

const LoginForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [emailVerifiedMessage] = useState<string | undefined>(() =>
    readEmailVerifiedFromUrl() ? EMAIL_VERIFIED_MSG : undefined,
  );

  useEffect(() => {
    if (searchParams.get("emailVerified") !== "1") return;
    const next = new URLSearchParams(searchParams);
    next.delete("emailVerified");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);



  return (
    <YellowPlate>
        <div className="login-card-header">
          <h2 className="login-title">Welcome, traveler</h2>
          <p className="login-subtitle">Enter the hall or pledge your name.</p>
        </div>

        <div className="login-tabs" role="tablist" aria-label="Authentication">
          <button
            type="button"
            role="tab"
            className={activeTab === "login" ? "login-tab is-active" : "login-tab"}
            aria-selected={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            <UserRoundCheck className="login-tab__icon" aria-hidden />
            Log in
          </button>
          <button
            type="button"
            role="tab"
            className={
              activeTab === "register" ? "login-tab is-active" : "login-tab"
            }
            aria-selected={activeTab === "register"}
            onClick={() => setActiveTab("register")}
          >
            <UserRoundPlus className="login-tab__icon" aria-hidden />
            Register
          </button>
        </div>

        <div className="login-panel" role="tabpanel">
          {activeTab === "login" ? (
            <LoginPanel
              emailVerifiedMessage={emailVerifiedMessage}
            />
          ) : (
            <RegisterPanel />
          )}
        </div>
    </YellowPlate>
  );
};

export default LoginForm;
