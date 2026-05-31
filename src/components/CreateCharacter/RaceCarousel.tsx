import type { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Race } from "@/types/character";
import { RACE_IMAGES, RACE_ORDER, getRaceById } from "@/constants/races";
import "./raceCarousel.css";

type Props = {
  selectedRace: Race;
  onSelectRace: (race: Race) => void;
};

const RaceCarousel: FC<Props> = ({ selectedRace, onSelectRace }) => {
  const currentIndex = RACE_ORDER.indexOf(selectedRace);
  const race = getRaceById(selectedRace);

  const selectByOffset = (offset: number) => {
    const nextIndex =
      (currentIndex + offset + RACE_ORDER.length) % RACE_ORDER.length;
    onSelectRace(RACE_ORDER[nextIndex]);
  };

  return (
    <div className="race-carousel">
      <div className="race-carousel__controls">
        <button
          type="button"
          className="race-carousel__arrow"
          onClick={() => selectByOffset(-1)}
          aria-label="Previous race"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        <div className="race-carousel__slide">
          <img
            className="race-carousel__image"
            src={RACE_IMAGES[selectedRace]}
            alt={`${race.label} character`}
          />
        </div>

        <button
          type="button"
          className="race-carousel__arrow"
          onClick={() => selectByOffset(1)}
          aria-label="Next race"
        >
          <ChevronRight size={28} strokeWidth={2.5} />
        </button>
      </div>

      <p className="race-carousel__selected-name">{race.label}</p>

      <div className="race-carousel__dots" role="tablist" aria-label="Choose race">
        {RACE_ORDER.map((raceId) => (
          <button
            key={raceId}
            type="button"
            role="tab"
            aria-selected={raceId === selectedRace}
            aria-label={getRaceById(raceId).label}
            className={
              raceId === selectedRace
                ? "race-carousel__dot race-carousel__dot--active"
                : "race-carousel__dot"
            }
            onClick={() => onSelectRace(raceId)}
          />
        ))}
      </div>
    </div>
  );
};

export default RaceCarousel;
