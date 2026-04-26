import type { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import "./secondaryWoodenBtn.css";

type Props = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  }
>;

const SecondaryWoodenBtn: FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={
        className ? `secondary-wooden-btn ${className}` : "secondary-wooden-btn"
      }
    >
      {children}
    </button>
  );
};

export default SecondaryWoodenBtn;

