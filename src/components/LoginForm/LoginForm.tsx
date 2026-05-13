import {
  type ComponentPropsWithoutRef,
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

type FormOnSubmit = NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>;

const EMAIL_VERIFIED_MSG =
  "Email verification completed. Please log in.";

const LoginForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [emailVerifiedMessage, setEmailVerifiedMessage] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    if (searchParams.get("emailVerified") !== "1") return;
    setEmailVerifiedMessage(EMAIL_VERIFIED_MSG);
    setActiveTab("login");
    const next = new URLSearchParams(searchParams);
    next.delete("emailVerified");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

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
