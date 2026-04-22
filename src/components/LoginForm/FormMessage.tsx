import type { CSSProperties, FC } from "react";

type Props = {
  message?: string;
  className?: string;
  style?: CSSProperties;
};

const FormMessage: FC<Props> = ({ message, className, style }) => {
  if (!message) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      className={className ?? "mb-3 text-sm "}
      style={{ ...style, color: "var(--main-red-accent)" }}
    >
      {message}
    </p>
  );
};

export default FormMessage;

