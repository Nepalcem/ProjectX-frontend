import type { FC, PropsWithChildren } from "react";
import "./yellowPlate.css";

type Props = PropsWithChildren<{
  className?: string;
  cardClassName?: string;
}>;

const YellowPlate: FC<Props> = ({ children }) => {
  return (
    <section className="yellow-plate-shell">
      <div className="yellow-plate-card">
        {children}
      </div>
    </section>
  );
};

export default YellowPlate;

