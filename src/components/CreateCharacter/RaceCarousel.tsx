import type { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Race } from "@/types/character";
import { RACE_ORDER, getRaceById } from "@/constants/races";
import humanImage from "@/media/characters/human_base.png";
import orcImage from "@/media/characters/orc_base.png";
import "./raceCarousel.css";

const RACE_IMAGES: Partial<Record<Race, string>> = {
  human: humanImage,
  orc: orcImage,
};

type Props = {
  selectedRace: Race;
  onSelectRace: (race: Race) => void;
};

const RaceCarousel: FC<Props> = ({ selectedRace, onSelectRace }) => {
  const currentIndex = RACE_ORDER.indexOf(selectedRace);
  const race = getRaceById(selectedRace);

  const goToIndex = (index: number) => {
    onSelectRace(RACE_ORDER[index]);
  };

  const goPrev = () => {
    goToIndex((currentIndex - 1 + RACE_ORDER.length) % RACE_ORDER.length);
  };

  const goNext = () => {
    goToIndex((currentIndex + 1) % RACE_ORDER.length);
  };

  return (
    <div className="race-carousel">
      <div className="race-carousel__controls">
        <button
          type="button"
          className="race-carousel__arrow"
          onClick={goPrev}
          aria-label="Previous race"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        <button
          type="button"
          className="race-carousel__slide"
          onClick={() => onSelectRace(selectedRace)}
          aria-label={`Select ${race.label}`}
          aria-pressed
        >
          {RACE_IMAGES[selectedRace] ? (
            <img
              className="race-carousel__image"
              src={RACE_IMAGES[selectedRace]}
              alt={`${race.label} character`}
            />
          ) : (
            <div className="race-carousel__image-placeholder" aria-hidden>
              <span className="race-carousel__placeholder-label">{race.label}</span>
              <span className="race-carousel__placeholder-hint">Portrait soon</span>
            </div>
          )}
        </button>

        <button
          type="button"
          className="race-carousel__arrow"
          onClick={goNext}
          aria-label="Next race"
        >
          <ChevronRight size={28} strokeWidth={2.5} />
        </button>
      </div>

      <p className="race-carousel__selected-name">{race.label}</p>

      <div className="race-carousel__dots" role="tablist" aria-label="Choose race">
        {RACE_ORDER.map((raceId, index) => (
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
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RaceCarousel;
