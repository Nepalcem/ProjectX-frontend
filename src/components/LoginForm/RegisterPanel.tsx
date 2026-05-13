import { type FC, useState } from "react";
import { Lock, Mail } from "lucide-react";
import axios, { isAxiosError } from "axios";
import { API_URL_LOCAL } from "@/api/constants";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import MainTextInput from "@/components/ui/MainFormTextInput/MainFormTextInput";
import { emailRegExp, passwordRegExp } from "@/constants/regularExpressions";
import FormMessage from "./FormMessage";


const RegisterPanel: FC = () => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  const [showHintsAfterFailedSubmit, setShowHintsAfterFailedSubmit] =
    useState(false);

  const handleRegisterSubmit: NonNullable<
    React.ComponentPropsWithoutRef<"form">["onSubmit"]
  > = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    setIsSubmittingRegister(true);

    try {
      if (!emailRegExp.test(registrationEmail)) {
        setShowHintsAfterFailedSubmit(true);
        setRegisterError("Invalid email format");
        return;
      }

      if (!passwordRegExp.test(registrationPassword)) {
        setShowHintsAfterFailedSubmit(true);
        setRegisterError("Invalid password format");
        return;
      }

      const res = await axios.post(`${API_URL_LOCAL}/auth/register`, {
        email: registrationEmail,
        password: registrationPassword,
      });

      const data = res.data;


      setRegistrationPassword("");
      setRegisterSuccess(
        data.message || "Registered. Please verify your email.",
      );
    } catch (error: unknown) {
      setShowHintsAfterFailedSubmit(true);
      setRegisterSuccess("");
      if (isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string } | undefined)?.message;
        setRegisterError(serverMessage || "Registration failed");
      } else {
        setRegisterError("Registration failed");
      }
    } finally {
      setIsSubmittingRegister(false);
    }
  };

  return (
    <div className="auth-panel">
      <h3 className="auth-panel-title">Register</h3>
      <FormMessage
        variant="success"
        message={registerSuccess}
        className="mb-3 text-sm"
      />
      <FormMessage message={registerError} className="mb-3 text-sm" />
      <form onSubmit={handleRegisterSubmit}>
        <MainTextInput
          className="mt-2"
          type="email"
          name="registration-email"
          placeholder="Your Email:"
          id="registration-email"
          autoComplete="off"
          value={registrationEmail}
          onChange={(e) => setRegistrationEmail(e.target.value)}
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
          name="registration-password"
          placeholder="Your Password:"
          id="registration-password"
          autoComplete="off"
          value={registrationPassword}
          onChange={(e) => setRegistrationPassword(e.target.value)}
          icon={Lock}
          showPasswordToggle
        />
        {showHintsAfterFailedSubmit ? (
          <p className="text-[0.6rem]">
            At least 8 characters, one uppercase letter, one lowercase letter,
            and one number or symbol
          </p>
        ) : null}
        <MainActionBtn
          type="submit"
          className="mt-4"
          disabled={isSubmittingRegister}
        >
          Pledge
        </MainActionBtn>
      </form>
    </div>
  );
};

export default RegisterPanel;

