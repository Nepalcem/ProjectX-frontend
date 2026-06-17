import { type FC, useState } from "react";
import { Link } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { Mail } from "lucide-react";
import { API_URL } from "@/api/constants";
import Logo from "@/components/Logo/Logo";
import FormMessage from "@/components/LoginForm/FormMessage";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import MainTextInput from "@/components/ui/MainFormTextInput/MainFormTextInput";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import { emailRegExp } from "@/constants/regularExpressions";
import "@/components/LoginForm/loginform.css";
import "./auth.css";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: React.ComponentPropsWithoutRef<"form">["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!emailRegExp.test(email)) {
      setError("Invalid email format");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, {
        email: email.trim().toLowerCase(),
      });

      setSuccess(res.data.message || "Reset password email sent");
      setEmail("");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const serverMessage =
          (err.response?.data as { message?: string } | undefined)?.message;
        setError(serverMessage || "Failed to send reset email");
      } else {
        setError("Failed to send reset email");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Logo />
      <YellowPlate>
        <div className="login-card-header">
          <h2 className="login-title">Forgot password</h2>
          <p className="login-subtitle">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="auth-panel">
          <FormMessage variant="success" message={success} className="mb-3 text-sm" />
          <FormMessage message={error} className="mb-3 text-sm" />

          <form onSubmit={handleSubmit}>
            <MainTextInput
              type="email"
              name="forgot-password-email"
              placeholder="Your Email:"
              id="forgot-password-email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
            />

            <MainActionBtn type="submit" className="mt-4" disabled={isSubmitting}>
              Send reset link
            </MainActionBtn>
          </form>

          <p className="mb-0 mt-4 text-center">
            <Link to="/" className="link">
              Back to login
            </Link>
          </p>
        </div>
      </YellowPlate>
    </div>
  );
};

export default ForgotPassword;
