import type { FC } from "react";
import UnderConstruction from "./pages/UnderConstruction";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm/LoginForm";

const App: FC = () => {
  return (
    <>
      <Home />
      <UnderConstruction />
      <LoginForm />
    </>
  );
};

export default App;
