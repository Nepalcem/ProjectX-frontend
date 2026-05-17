import type { FC } from "react";
import LoginForm from "@/components/LoginForm/LoginPlate";
import Logo from "@/components/Logo/Logo";
import "./home.css";

const Home: FC = () => {
  return (
    <div className="home-page">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default Home;
