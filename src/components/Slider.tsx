import { useRef, useState } from "react";

export type SliderProps = {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (newValue: number) => void;
};

export const Slider = ({ min, max, defaultValue, onChange }: SliderProps) => {
  const [newValue, setNewValue] = useState(0);
  const dragValue = useRef(newValue);

  const mouseUp = () => {
    setNewValue(dragValue.current);
    onChange(dragValue.current);
  };

  return (
    <input
      type="range"
      onChange={(e) => {
        dragValue.current = Number(e.target.value);
      }}
      onMouseUp={mouseUp}
      onTouchEnd={mouseUp}
      min={min.toString()}
      max={max.toString()}
      defaultValue={defaultValue}
    />
  );
};
