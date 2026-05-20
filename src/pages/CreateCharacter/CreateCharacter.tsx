import { type FormEvent, type FC, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { User } from "lucide-react";
import YellowPlate from "@/components/ui/YellowPlate/YellowPlate";
import MainActionBtn from "@/components/ui/MainActionBtn/MainActionBtn";
import MainTextInput from "@/components/ui/MainFormTextInput/MainFormTextInput";
import FormMessage from "@/components/LoginForm/FormMessage";
import RaceCarousel from "@/components/CreateCharacter/RaceCarousel";
import { API_URL } from "@/api/constants";
import { nicknameRegExp } from "@/constants/regularExpressions";
import {
  getRaceById,
} from "@/constants/races";
import type { Character, Race } from "@/types/character";
import { useAppDispatch, useAuthToken, useCharacter } from "@/redux/hooks";
import { setCharacter } from "@/redux/characterSlice";
import "./createCharacter.css";

type CreateCharacterResponse = {
  message: string;
  character: Character;
};

const CreateCharacter: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAuthToken();
  const existingCharacter = useCharacter();

  const [nickname, setNickname] = useState("");
  const [selectedRace, setSelectedRace] = useState<Race>("human");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (existingCharacter) {
    return <Navigate to="/dashboard" replace />;
  }

  const raceInfo = getRaceById(selectedRace);
  const { strength, agility, luck, vitality } = raceInfo.baseAttributes;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedNickname = nickname.trim();
    if (!nicknameRegExp.test(trimmedNickname)) {
      setError(
        "Nickname must be 3–24 characters and use only letters, numbers, and underscores",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post<CreateCharacterResponse>(
        `${API_URL}/characters/create`,
        { nickname: trimmedNickname, race: selectedRace },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      dispatch(setCharacter(res.data.character));
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const serverMessage = (
          err.response?.data as { message?: string } | undefined
        )?.message;
        setError(serverMessage || "Could not create character");
      } else {
        setError("Could not create character");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-character-page">
      <YellowPlate>
        <h2 className="login-title mb-2 text-center">Create your character</h2>
        <p className="login-subtitle mb-4 text-center">
          Choose a race, name your hero, and enter the hall.
        </p>

        <form className="create-character-form" onSubmit={handleSubmit}>
          <RaceCarousel
            selectedRace={selectedRace}
            onSelectRace={setSelectedRace}
          />

          <section className="create-character-race-details" aria-live="polite">
            <h3 className="create-character-race-details__title">
              {raceInfo.label}
            </h3>
            <p className="create-character-race-details__description">
              {raceInfo.description}
            </p>
            <ul className="create-character-stats">
              <li className="font-bold">Strength: {strength}</li>
              <li className="font-bold">Agility: {agility}</li>
              <li className="font-bold">Luck: {luck}</li>
              <li className="font-bold">Vitality: {vitality}</li>
            </ul>
          </section>

          <MainTextInput
            className="mt-2"
            name="character-nickname"
            id="character-nickname"
            placeholder="Character name:"
            autoComplete="off"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            icon={User}
            maxLength={24}
          />
          <p className="create-character-hint">
            3–24 characters: letters, numbers, and underscores only.
          </p>

          <FormMessage message={error} className="mt-3 text-sm" />

          <MainActionBtn
            type="submit"
            className="mt-4 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating…" : "Create character"}
          </MainActionBtn>
        </form>
      </YellowPlate>
    </div>
  );
};

export default CreateCharacter;
