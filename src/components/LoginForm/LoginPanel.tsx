import type { ComponentPropsWithoutRef, FC } from "react";
import FormMessage from "./FormMessage";

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
        <div className="form-group">
          <input
            type="email"
            name="login-email"
            className="form-style"
            placeholder="Your Email:"
            id="login-email"
            autoComplete="off"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <i className="input-icon uil uil-at"></i>
        </div>
        <div className="form-group mt-2">
          <input
            type="password"
            name="login-password"
            className="form-style"
            placeholder="Your Password:"
            id="login-password"
            autoComplete="off"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <i className="input-icon uil uil-lock-alt"></i>
        </div>
        <button type="submit" className="btn mt-4" disabled={isSubmitting}>
          Enter
        </button>
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

