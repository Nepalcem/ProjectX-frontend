import type { CSSProperties, FC } from "react";

type Props = {
  message?: string;
  className?: string;
  style?: CSSProperties;
  /** Default `error` keeps existing red styling for validation / server errors. */
  variant?: "error" | "success";
};

const FormMessage: FC<Props> = ({
  message,
  className,
  style,
  variant = "error",
}) => {
  if (!message) return null;

  const color =
    variant === "success" ? "var(--main-green-accent)" : "var(--main-red-accent)";

  return (
    <p
      role="status"
      aria-live="polite"
      className={className ?? "mb-3 text-sm "}
      style={{ ...style, color }}
    >
      {message}
    </p>
  );
};

export default FormMessage;

