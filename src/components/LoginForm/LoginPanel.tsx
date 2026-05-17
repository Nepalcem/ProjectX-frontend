import { type ComponentPropsWithoutRef, type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { API_URL_LOCAL } from "@/api/constants";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/authSlice";
import { Lock, Mail } from "lucide-react";
import { emailRegExp, passwordRegExp } from "@/constants/regularExpressions";
import FormMessage from "./FormMessage";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import MainTextInput from "@/components/ui/MainFormTextInput/MainFormTextInput";

type FormOnSubmit = NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>;

type LoginResponse = {
  token: string;
  message: string;
  user: { email: string; id: string };
};

type Props = {
  emailVerifiedMessage?: string;
};

const LoginPanel: FC<Props> = ({
  emailVerifiedMessage,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const [showHintsAfterFailedSubmit, setShowHintsAfterFailedSubmit] =
    useState(false);

  const handleLoginSubmit: FormOnSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmittingLogin(true);
  
    try {
      if (!emailRegExp.test(loginEmail)) {
        setShowHintsAfterFailedSubmit(true);
        setLoginError("Invalid email format");
        return;
      }

      if (!passwordRegExp.test(loginPassword)) {
        setShowHintsAfterFailedSubmit(true);
        setLoginError("Invalid password format");
        return;
      }

      const res = await axios.post<LoginResponse>(`${API_URL_LOCAL}/auth/login`, {
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
      });

      const { token, user } = res.data;

      dispatch(setCredentials({ token, user }));

      setLoginEmail("");
      setLoginPassword("");
      navigate("/dashboard", { replace: true });

    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string } | undefined)?.message;
        setLoginError(serverMessage || "Login failed");
      } else {
        setLoginError("Login failed");
      }
      setShowHintsAfterFailedSubmit(true);
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  return (
    <div className="auth-panel">
      <h3 className="auth-panel-title">Log in</h3>
      <FormMessage
        variant="success"
        message={emailVerifiedMessage}
        className="mb-3 text-sm"
      />
      <FormMessage message={loginError} className="mb-3 text-sm" />
      <form onSubmit={handleLoginSubmit}>
        <MainTextInput
          type="email"
          name="login-email"
          placeholder="Your Email:"
          id="login-email"
          autoComplete="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          icon={Mail}
        />
        {showHintsAfterFailedSubmit ? (
          <p className="mt-2 text-left text-[0.6rem] leading-snug opacity-80">
            Email must have no spaces, and domain must be at least 2 characters.
          </p>
        ) : null}
        <MainTextInput
          className="mt-2"
          type="password"
          name="login-password"
          placeholder="Your Password:"
          id="login-password"
          autoComplete="current-password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          icon={Lock}
          showPasswordToggle
        />
        {showHintsAfterFailedSubmit ? (
          <p className="text-[0.6rem]">
            At least 8 characters, one uppercase letter, one lowercase letter,
            and one number or symbol
          </p>
        ) : null}
        <MainActionBtn type="submit" className="mt-4" disabled={isSubmittingLogin}>
          Enter
        </MainActionBtn>
      </form>
      <p className="mb-0 mt-4 text-center">
        <a href="#0" className="link">
          Forgot your password?
        </a>
      </p>
    </div>
  );
};

export default LoginPanel;

