import { type FC, useId, useState } from "react";
import "./loginform.css";

const LoginForm: FC = () => {
  const checkboxId = useId();
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="section">
      <div className="section pb-5 pt-5 pt-sm-2 text-center">
        <h6 className="login-form-tabs mb-0">
          <span
            role="button"
            onClick={() => setIsSignUp(false)}
            style={{
              cursor: "pointer",
              color: isSignUp ? "#f2f2f2" : "var(--main-red-accent)",
            }}
          >
            Log In{" "}
          </span>
          <span
            role="button"
            onClick={() => setIsSignUp(true)}
            style={{
              cursor: "pointer",
              color: isSignUp ? "var(--main-red-accent)" : "#f2f2f2",
            }}
          >
            Sign Up
          </span>
        </h6>
        <input
          className="checkbox"
          type="checkbox"
          id={checkboxId}
          name="reg-log"
          checked={isSignUp}
          onChange={(e) => setIsSignUp(e.target.checked)}
        />
        <label htmlFor={checkboxId}></label>
        <div className="card-3d-wrap mx-auto">
          <div className="card-3d-wrapper rounded-md">
            {/* Login Form */}
            <div className="card-front">
              <div className="center-wrap">
                <div className="section text-center">
                  <h4 className="mb-4 pb-3 text-white">Log In</h4>
                  <div className="form-group">
                    <input
                      type="email"
                      name="login-email"
                      className="form-style text-white"
                      placeholder="Your Email:"
                      id="login-email"
                      autoComplete="off"
                    />
                    <i className="input-icon uil uil-at"></i>
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="password"
                      name="login-password"
                      className="form-style text-white"
                      placeholder="Your Password:"
                      id="login-password"
                      autoComplete="off"
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <a href="#" className="btn mt-4">
                    submit
                  </a>
                  <p className="mb-0 mt-4 text-center">
                    <a href="#0" className="link">
                      Forgot your password?
                    </a>
                  </p>
                </div>
              </div>
            </div>
            {/* Registration Form */}
            <div className="card-back">
              <div className="center-wrap">
                <div className="section text-center">
                  <h4 className="mb-4 pb-3">Sign Up</h4>
                  <div className="form-group mt-2">
                    <input
                      type="email"
                      name="registration-email"
                      className="form-style"
                      placeholder="Your Email"
                      id="registration-email"
                      autoComplete="off"
                    />
                    <i className="input-icon uil uil-at"></i>
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="password"
                      name="registration-password"
                      className="form-style"
                      placeholder="Your Password"
                      id="registration-password"
                      autoComplete="off"
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <a href="#" className="btn mt-4">
                    submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
