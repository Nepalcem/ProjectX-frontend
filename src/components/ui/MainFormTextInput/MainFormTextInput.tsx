import { useState, type FC, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import "./mainFormTextInput.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  /**
   * Extra classes on the root wrapper. The base class `main-text-input-group`
   * is always applied first.
   */
  className?: string;
  /** Lucide icon on the left (required). */
  icon: LucideIcon;
  /** Pixel size for the Lucide icon (default `20`). */
  iconSize?: number;
  /** Optional extra classes on the `<input>`. */
  inputClassName?: string;
  /** When `true` and `type="password"`, shows an eye toggle to reveal or hide the value. */
  showPasswordToggle?: boolean;
};

const MainTextInput: FC<Props> = ({
  className,
  icon: Icon,
  iconSize = 20,
  inputClassName,
  showPasswordToggle,
  type = "text",
  ...inputProps
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const withPasswordToggle = Boolean(showPasswordToggle && type === "password");
  const inputType = withPasswordToggle
    ? passwordVisible
      ? "text"
      : "password"
    : type;

  const groupClass = [
    "main-text-input-group",
    withPasswordToggle && "main-text-input-group--with-password-toggle",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const fieldClass = inputClassName
    ? `main-text-input-field ${inputClassName}`
    : "main-text-input-field";

  return (
    <div className={groupClass}>
      <input {...inputProps} type={inputType} className={fieldClass} />
      <span
        className="main-text-input-icon main-text-input-icon--lucide"
        aria-hidden
      >
        <Icon size={iconSize} strokeWidth={2} />
      </span>
      {withPasswordToggle ? (
        <button
          type="button"
          className="main-text-input-toggle"
          aria-label={passwordVisible ? "Hide password" : "Show password"}
          aria-pressed={passwordVisible}
          onClick={() => setPasswordVisible((v) => !v)}
        >
          {passwordVisible ? (
            <EyeOff size={iconSize} strokeWidth={2} />
          ) : (
            <Eye size={iconSize} strokeWidth={2} />
          )}
        </button>
      ) : null}
    </div>
  );
};

export default MainTextInput;
