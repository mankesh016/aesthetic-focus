import { useState } from "react";
import type { SettingsData } from "../types";
import { RotateCcw, Settings } from "lucide-react";

interface TimerProps {
  settings: SettingsData;
}
type Mode = "pomodoro" | "shortBreak" | "longBreak";

export const Timer: React.FC<TimerProps> = ({ settings }) => {
  const [mode, setMode] = useState<Mode>("pomodoro");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-4">
        <div>Pomodoro</div>
        <div>short break</div>
        <div>long break</div>
      </div>
      <div className="text-[100px] font-semibold">25:00</div>
      <div className="flex justify-center items-center gap-3">
        <button>start</button>
        <RotateCcw size={18} />
        <Settings size={18} />
      </div>
    </div>
  );
};
