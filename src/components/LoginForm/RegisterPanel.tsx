import { type FC, useState } from "react";
import FormMessage from "./FormMessage";
import axios, { isAxiosError } from "axios";
import { emailRegExp, passwordRegExp } from "../../constants/regularExpressions";

const API_URL = "http://localhost:3000";

const RegisterPanel: FC = () => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  const [showHintsAfterFailedSubmit, setShowHintsAfterFailedSubmit] =
    useState(false);

  const handleRegisterSubmit: NonNullable<
    React.ComponentPropsWithoutRef<"form">["onSubmit"]
  > = async (e) => {
    e.preventDefault();
    setRegisterError("");
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

      console.log("Data:", registrationEmail, registrationPassword);
      const res = await axios.post(`${API_URL}/auth/register`, {
        email: registrationEmail,
        password: registrationPassword,
      });

      const data = res.data;


      setRegistrationPassword("");
      setRegisterError(data.message || "Registered. Please verify your email.");
    } catch (error: unknown) {
      setShowHintsAfterFailedSubmit(true);
      if (isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string } | undefined)?.message;
        console.log(serverMessage ?? error.message);
        setRegisterError(serverMessage || "Registration failed");
      } else {
        console.log(error);
        setRegisterError("Registration failed");
      }
    } finally {
      setIsSubmittingRegister(false);
    }
  };

  return (
    <div className="auth-panel">
      <h3 className="auth-panel-title">Register</h3>
      <FormMessage message={registerError} className="mb-3 text-sm" />
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group mt-2">
          <input
            type="email"
            name="registration-email"
            className="form-style"
            placeholder="Your Email:"
            id="registration-email"
            autoComplete="off"
            value={registrationEmail}
            onChange={(e) => setRegistrationEmail(e.target.value)}
          />
          <i className="input-icon uil uil-at"></i>
        </div>
        {showHintsAfterFailedSubmit ? (
          <p className="mt-2 text-left text-[0.6rem] leading-snug opacity-80">
            Email must have no spaces, and domain must be at least 2 characters.
          </p>
        ) : null}
        <div className="form-group mt-2">
          <input
            type="password"
            name="registration-password"
            className="form-style"
            placeholder="Your Password:"
            id="registration-password"
            autoComplete="off"
            value={registrationPassword}
            onChange={(e) => setRegistrationPassword(e.target.value)}
          />
          <i className="input-icon uil uil-lock-alt"></i>
        </div>
        {showHintsAfterFailedSubmit ? (
          <p className="text-[0.6rem]">
            At least 8 characters, one uppercase letter, one lowercase letter,
            and one number or symbol
          </p>
        ) : null}
        <button type="submit" className="btn mt-4" disabled={isSubmittingRegister}>
          Pledge
        </button>
      </form>
    </div>
  );
};

export default RegisterPanel;

