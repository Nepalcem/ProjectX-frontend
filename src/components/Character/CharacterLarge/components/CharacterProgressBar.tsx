import type { FC } from "react";

type Variant = "experience" | "health" | "fatigue";

type Props = {
  label: string;
  value: number;
  max: number;
  variant: Variant;
  valueLabel?: string;
};

const clampPercent = (value: number, max: number) => {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
};

const CharacterProgressBar: FC<Props> = ({
  label,
  value,
  max,
  variant,
  valueLabel,
}) => {
  const percent = clampPercent(value, max);
  const displayValue = valueLabel ?? `${Math.round(value)} / ${Math.round(max)}`;

  return (
    <div className={`character-progress character-progress--${variant}`}>
      <div className="character-progress__header">
        <span className="character-progress__label">{label}</span>
        <span className="character-progress__value">{displayValue}</span>
      </div>
      <div
        className="character-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="character-progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default CharacterProgressBar;
