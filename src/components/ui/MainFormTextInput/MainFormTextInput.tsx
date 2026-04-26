import type { FC, InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
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
};

const MainTextInput: FC<Props> = ({
  className,
  icon: Icon,
  iconSize = 20,
  inputClassName,
  ...inputProps
}) => {
  return (
    <div
      className={
        className
          ? `main-text-input-group ${className}`
          : "main-text-input-group"
      }
    >
      <input
        {...inputProps}
        className={
          inputClassName
            ? `main-text-input-field ${inputClassName}`
            : "main-text-input-field"
        }
      />
      <span
        className="main-text-input-icon main-text-input-icon--lucide"
        aria-hidden
      >
        <Icon size={iconSize} strokeWidth={2} />
      </span>
    </div>
  );
};

export default MainTextInput;
