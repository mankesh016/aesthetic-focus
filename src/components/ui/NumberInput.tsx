import React from "react";

interface NumberInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  min,
  max,
  defaultValue,
  onChange,
}) => {
  return (
    <div>
      <label className="text-[12px] text-white/50 block mb-1.5 capitalize">
        {label}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || defaultValue)}
        className="glass-input w-full"
      />
    </div>
  );
};

export default NumberInput;
