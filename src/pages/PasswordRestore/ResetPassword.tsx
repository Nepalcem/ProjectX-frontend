import { type FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { Lock } from "lucide-react";
import { API_URL } from "@/api/constants";
import Logo from "@/components/Logo/Logo";
import FormMessage from "@/components/LoginForm/FormMessage";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import MainTextInput from "@/components/ui/MainFormTextInput/MainFormTextInput";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/authSlice";
import { clearCharacter } from "@/redux/characterSlice";
import { passwordRegExp } from "@/constants/regularExpressions";
import "@/components/LoginForm/loginform.css";
import "./auth.css";

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") ?? "";
  const resetToken = searchParams.get("resetToken") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleSubmit: React.ComponentPropsWithoutRef<"form">["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();
    setError("");

    if (!passwordRegExp.test(newPassword)) {
      setShowHints(true);
      setError("Invalid password format");
      return;
    }

    if (newPassword !== confirmPassword) {
      setShowHints(true);
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        email: email.trim().toLowerCase(),
        resetToken,
        newPassword,
      });

      dispatch(logout());
      dispatch(clearCharacter());
      navigate("/?passwordReset=1", { replace: true });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const serverMessage =
          (err.response?.data as { message?: string } | undefined)?.message;
        setError(serverMessage || "Failed to reset password");
      } else {
        setError("Failed to reset password");
      }
      setShowHints(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Logo />
      <YellowPlate>
        <div className="login-card-header">
          <h2 className="login-title">Reset password</h2>
          <p className="login-subtitle">
            Choose a new password for <strong>{email}</strong>.
          </p>
        </div>

        <div className="auth-panel">
          <FormMessage message={error} className="mb-3 text-sm" />

          <form onSubmit={handleSubmit}>
            <MainTextInput
              type="password"
              name="new-password"
              placeholder="New password:"
              id="new-password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={Lock}
              showPasswordToggle
            />
            <MainTextInput
              className="mt-2"
              type="password"
              name="confirm-password"
              placeholder="Confirm new password:"
              id="confirm-password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={Lock}
              showPasswordToggle
            />
            {showHints ? (
              <p className="mt-2 text-left text-[0.6rem] leading-snug opacity-80">
                At least 8 characters, one uppercase letter, one lowercase letter,
                and one number or symbol
              </p>
            ) : null}

            <MainActionBtn type="submit" className="mt-4" disabled={isSubmitting}>
              Update password
            </MainActionBtn>
          </form>
        </div>
      </YellowPlate>
    </div>
  );
};

export default ResetPassword;
