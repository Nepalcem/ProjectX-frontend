import type { FC } from "react";
import logoImage from "../../media/logo/logo-2-compressed.png";
import "./logo.css";

const Logo: FC = () => {
  return (
    <div className="logo-block">
      <img className="logo-image" src={logoImage} alt="Age of Battles logo" />
    </div>
  );
};

export default Logo;
