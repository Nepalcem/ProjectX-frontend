import { type ComponentPropsWithoutRef, type FC, useState } from "react";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import "./loginform.css";
import YellowPlate from "../ui/YellowPlate/YellowPlate";
import LoginPanel from "./LoginPanel";
import RegisterPanel from "./RegisterPanel";

type FormOnSubmit = NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>;

const LoginForm: FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  const handleLoginSubmit: FormOnSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmittingLogin(true);

    try {
      // Login wiring not implemented yet; keep current behavior.
      console.log(email, password);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmittingLogin(false);
    }
  };

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
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleLoginSubmit}
              isSubmitting={isSubmittingLogin}
              message={loginError}
            />
          ) : (
            <RegisterPanel />
          )}
        </div>
    </YellowPlate>
  );
};

export default LoginForm;
