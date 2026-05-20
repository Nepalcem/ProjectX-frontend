import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/variables/variables.css";
import "./index.css";
import App from "@/App.tsx";
import DevLogPage from "@/pages/DevLog/DevLogPage";
import Home from "@/pages/Home/Home";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CreateCharacter from "@/pages/CreateCharacter/CreateCharacter";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute/GuestRoute";
import { persistor, store } from "@/redux/store";

export const About = () => <h1>About</h1>;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                <GuestRoute>
                  <Home />
                </GuestRoute>
              }
            />
            <Route path="devlog" element={<DevLogPage />} />
            <Route
              path="create-character"
              element={
                <ProtectedRoute>
                  <CreateCharacter />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
