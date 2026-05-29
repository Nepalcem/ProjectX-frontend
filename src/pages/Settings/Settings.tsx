import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import SecondaryWoodenBtn from "@/components/ui/SecondaryWoodenBtn/SecondaryWoodenBtn";
import FormMessage from "@/components/LoginForm/FormMessage";
import { API_URL } from "@/api/constants";
import { useAppDispatch, useAuthToken, useAuthUser, useCharacter } from "@/redux/hooks";
import { clearCharacter } from "@/redux/characterSlice";
import "./settings.css";

const Settings: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAuthToken();
  const user = useAuthUser();
  const character = useCharacter();

  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCharacter = async () => {
    if (!character) return;

    const confirmed = window.confirm(
      `Delete ${character.nickname}? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeleteError("");
    setIsDeleting(true);

    try {
      await axios.delete(`${API_URL}/characters/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearCharacter());
      navigate("/create-character", { replace: true });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const serverMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message;
        setDeleteError(serverMessage || "Could not delete character");
      } else {
        setDeleteError("Could not delete character");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="settings-page">
      <YellowPlate>
        <h2 className="login-title mb-2 text-center">Settings</h2>
        <p className="login-subtitle mb-4 text-center">
          Account and game preferences.
        </p>

        <section className="settings-section" aria-label="Account">
          <h3 className="settings-section__title">Account</h3>
          {user?.email ? (
            <p className="settings-section__text">
              Signed in as <strong>{user.email}</strong>
            </p>
          ) : (
            <p className="settings-section__text">Signed in</p>
          )}
        </section>

        {character ? (
          <section
            className="settings-section settings-section--danger mt-3"
            aria-label="Character"
          >
            <h3 className="settings-section__title">Character</h3>
            <p className="settings-section__text">
              Playing as <strong>{character.nickname}</strong> ({character.race})
            </p>
            <FormMessage message={deleteError} className="mt-3 text-sm" />
            <SecondaryWoodenBtn
              type="button"
              className="settings-delete-btn mt-3 w-full"
              onClick={handleDeleteCharacter}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete character"}
            </SecondaryWoodenBtn>
          </section>
        ) : (
          <p className="settings-section__text mt-3 text-center">
            You have no character yet.
          </p>
        )}
      </YellowPlate>
    </div>
  );
};

export default Settings;
