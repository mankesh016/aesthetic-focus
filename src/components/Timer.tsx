import { useEffect, useRef, useState } from "react";
import type { SettingsData } from "../types";
import { RotateCcw, Settings } from "lucide-react";
import { playSynthesizedAlarm } from "../utils/audio";
import { DEFAULT_BREAK_QUOTES, DEFAULT_STOPPED_QUOTES } from "../constants";

interface TimerProps {
  settings: SettingsData;
  onOpenSettings: () => void;
}
type Mode = "pomodoro" | "shortBreak" | "longBreak";

export const Timer: React.FC<TimerProps> = ({ settings, onOpenSettings }) => {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroTime * 60);

  const timerRef = useRef<any>(null);
  const [quote, setQuote] = useState("");

  // Manage motivational quote selection and rotation
  useEffect(() => {
    const updateQuote = () => {
      // Hide quote when focus timer is running to maintain deep focus
      const isFocusRunning = isRunning && mode === "pomodoro";
      if (isFocusRunning) {
        setQuote("");
        return;
      }
      let pool: string[] = DEFAULT_STOPPED_QUOTES;
      if (isRunning) {
        pool = DEFAULT_BREAK_QUOTES;
      }
      if (pool.length > 0) {
        setQuote((prev) => {
          const available = pool.filter((q) => q !== prev);
          const activePool = available.length > 0 ? available : pool;
          const randomIndex = Math.floor(Math.random() * activePool.length);
          return activePool[randomIndex];
        });
      } else {
        setQuote("");
      }
    };
    updateQuote();

    const isFocusRunning = isRunning && mode === "pomodoro";
    if (isFocusRunning) return;
    // Rotate every 20 seconds
    const intervalId = setInterval(updateQuote, 20000);
    return () => clearInterval(intervalId);
  }, [isRunning, mode]);

  // Handle countdown
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, mode]);

  // Sync timer when settings change and timer is NOT running
  useEffect(() => {
    if (!isRunning) {
      resetTimer(mode);
    }
  }, [settings.pomodoroTime, settings.shortBreakTime, settings.longBreakTime]);

  // Update browser tab title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    const modeLabel = mode === "pomodoro" ? "Focus" : "Break";
    document.title = `${minutes}:${seconds} | ${modeLabel}`;
  }, [timeLeft, mode]);

  const resetTimer = (newMode = mode) => {
    setIsRunning(false);
    setMode(newMode);

    let mins = settings.pomodoroTime;
    if (newMode === "shortBreak") mins = settings.shortBreakTime;
    if (newMode === "longBreak") mins = settings.longBreakTime;

    setTimeLeft(mins * 60);
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    playAlarm();
    // Auto switch modes
    if (mode === "pomodoro") {
      const nextMode = settings.shortBreakTime > 0 ? "shortBreak" : "longBreak";
      setMode(nextMode);
      setTimeLeft(
        (nextMode === "shortBreak"
          ? settings.shortBreakTime
          : settings.longBreakTime) * 60,
      );
      if (settings.autoStartBreaks) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    } else {
      setMode("pomodoro");
      setTimeLeft(settings.pomodoroTime * 60);
      if (settings.autoStartPomodoros) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    }
  };

  const playAlarm = () => {
    playSynthesizedAlarm(settings.alarmSound, settings.alarmVolume);
  };

  const handleModeChange = (newMode: Mode) => {
    resetTimer(newMode);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Format time display
  const formatTime = () => {
    // prettier-ignore
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center animate-fade-in relative pb-22">
      {/* Tabs */}
      <div className="flex justify-around items-center gap-3 bg-black/20 p-2 rounded-full text-white/80">
        <button
          className={`glass-button ${mode === "pomodoro" ? "active" : ""}`}
          onClick={() => handleModeChange("pomodoro")}
        >
          pomodoro
        </button>
        <button
          className={`glass-button ${mode === "shortBreak" ? "active" : ""}`}
          onClick={() => handleModeChange("shortBreak")}
        >
          short break
        </button>
        <button
          className={`glass-button ${mode === "longBreak" ? "active" : ""}`}
          onClick={() => handleModeChange("longBreak")}
        >
          long break
        </button>
      </div>

      {/* Timer */}
      <div className="text-[120px] font-semibold leading-none m-4 tabular-nums [text-shadow:0_10px_20px_rgba(0,0,0,0.2)]">
        {formatTime()}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={toggleTimer}
          className="glass-button active text-lg px-6 py-2 min-w-25"
        >
          {isRunning ? "pause" : "start"}
        </button>

        <button
          onClick={() => resetTimer(mode)}
          className="glass-icon-btn"
          title="Reset timer"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={onOpenSettings}
          className="glass-icon-btn"
          title="Open settings"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Motivational Quote Container */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-120 max-w-[90vw] h-18 flex items-center justify-center">
        {quote && (
          <div
            key={quote}
            className="animate-fade-in font-hand text-[28px] font-medium text-center text-white/95 leading-normal [text-shadow:0_4px_10px_rgba(0,0,0,0.7)] px-5"
          >
            {quote}
          </div>
        )}
      </div>
    </div>
  );
};
