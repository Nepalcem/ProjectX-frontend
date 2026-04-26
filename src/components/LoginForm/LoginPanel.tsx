import type { ComponentPropsWithoutRef, FC } from "react";
import { Lock, Mail } from "lucide-react";
import FormMessage from "./FormMessage";
import MainActionBtn from "../ui/MainActionBtn/MainActionBtn";
import MainTextInput from "../ui/MainFormTextInput/MainFormTextInput";

type FormOnSubmit = NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]>;

type Props = {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: FormOnSubmit;
  isSubmitting: boolean;
  message?: string;
};

const LoginPanel: FC<Props> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isSubmitting,
  message,
}) => {
  return (
    <div className="auth-panel">
      <h3 className="auth-panel-title">Log in</h3>
      <FormMessage message={message} className="mb-3 text-sm" />
      <form onSubmit={onSubmit}>
        <MainTextInput
          type="email"
          name="login-email"
          placeholder="Your Email:"
          id="login-email"
          autoComplete="off"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          icon={Mail}
        />
        <MainTextInput
          className="mt-2"
          type="password"
          name="login-password"
          placeholder="Your Password:"
          id="login-password"
          autoComplete="off"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          icon={Lock}
        />
        <MainActionBtn type="submit" className="mt-4" disabled={isSubmitting}>
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

