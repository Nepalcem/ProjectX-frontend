import type { FC, PropsWithChildren } from "react";
import "./yellowPlate.css";

type Props = PropsWithChildren<{
  variant?: "card" | "bar";
}>;

const YellowPlate: FC<Props> = ({ children, variant = "card" }) => {
  const bar = variant === "bar";
  return (
    <section className={bar ? "yellow-plate-shell yellow-plate-shell--bar" : "yellow-plate-shell"}>
      <div className={bar ? "yellow-plate-card yellow-plate-card--bar" : "yellow-plate-card"}>
        {children}
      </div>
    </section>
  );
};

export default YellowPlate;
