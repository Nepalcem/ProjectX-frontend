import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import "./mainActionBtn.css";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  }
>;

const MainActionBtn: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={
        className ? `main-action-btn ${className}` : "main-action-btn"
      }
    >
      {children}
    </button>
  );
};

export default MainActionBtn;

