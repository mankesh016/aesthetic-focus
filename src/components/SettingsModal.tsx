import React, { useState } from "react";
import { X, Clock, Settings, Music, Image, Volume2 } from "lucide-react";
import type { SettingsData } from "../types";
import NumberInput from "./ui/NumberInput";
import { playSynthesizedAlarm } from "../utils/audio";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsData;
  onSave: (settings: SettingsData) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<SettingsData>({ ...settings });

  if (!isOpen) return null;

  const handleChange = (key: keyof SettingsData, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  // Preview an alarm sound
  const playAlarmPreview = (soundName: string) => {
    playSynthesizedAlarm(soundName, formData.alarmVolume);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-135 max-w-[90%] max-h-[90vh] overflow-y-auto p-8 border border-white/20 flex flex-col gap-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Settings size={22} />
            <h2 className="text-2xl font-semibold font-main">settings</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-white/60 cursor-pointer hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Section: Time Settings */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-white/70">
              <Clock size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                time (minutes)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <NumberInput
                label="pomodoro"
                value={formData.pomodoroTime}
                min={1}
                max={120}
                defaultValue={25}
                onChange={(val) => handleChange("pomodoroTime", val)}
              />

              <NumberInput
                label="short break"
                value={formData.shortBreakTime}
                min={1}
                max={60}
                defaultValue={5}
                onChange={(val) => handleChange("shortBreakTime", val)}
              />

              <NumberInput
                label="long break"
                value={formData.longBreakTime}
                min={1}
                max={60}
                defaultValue={15}
                onChange={(val) => handleChange("longBreakTime", val)}
              />
            </div>
          </div>

          {/* Auto Start Options */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={formData.autoStartBreaks}
                onChange={(e) =>
                  handleChange("autoStartBreaks", e.target.checked)
                }
                className="w-4 h-4 accent-white"
              />
              auto start breaks
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={formData.autoStartPomodoros}
                onChange={(e) =>
                  handleChange("autoStartPomodoros", e.target.checked)
                }
                className="w-4 h-4 accent-white"
              />
              auto start focus
            </label>
          </div>

          <hr className="border-none border-t border-white/10" />

          {/* Section: Backgrounds */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-white/70">
              <Image size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                theme background
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "city-dusk", name: "City Dusk" },
                { id: "cozy-rain", name: "Cozy Rain" },
                { id: "green-forest", name: "Green Forest" },
              ].map((bg) => (
                <button
                  type="button"
                  key={bg.id}
                  onClick={() => handleChange("backgroundId", bg.id)}
                  className={`rounded-lg p-3 text-xs text-center cursor-pointer transition-all duration-300 ${formData.backgroundId === bg.id ? "bg-white/10 border border-white font-semibold" : "bg-white/5 border border-white/10 font-normal hover:bg-white/10"}`}
                >
                  {bg.name}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-none border-t border-white/10" />

          {/* Section: Alarm Sounds */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-white/70">
              <Volume2 size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                alarm sound
              </span>
            </div>
            <div className="flex gap-3 mb-3">
              {["digital", "bell", "chimes"].map((sound) => (
                <button
                  type="button"
                  key={sound}
                  onClick={() => {
                    handleChange("alarmSound", sound);
                    playAlarmPreview(sound);
                  }}
                  className={`flex-grow border-none rounded-lg py-2 px-3 text-xs cursor-pointer transition-all duration-300 ${formData.alarmSound === sound ? "bg-white text-black font-semibold" : "bg-white/5 text-white font-normal"}`}
                >
                  {sound}
                </button>
              ))}
            </div>
            <div>
              <div>
                <div className="flex justify-between text-[11px] text-white/50 mb-1">
                  <span>alarm volume</span>
                  <span>{Math.round(formData.alarmVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={formData.alarmVolume}
                  onChange={(e) =>
                    handleChange("alarmVolume", parseFloat(e.target.value))
                  }
                  className="glass-range"
                />
              </div>
            </div>
          </div>

          <hr className="border-none border-t border-white/10" />

          {/* Section: Spotify Playlist URL */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-white/70">
              <Music size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Spotify Playlist Link
              </span>
            </div>
            <input
              type="text"
              placeholder="Paste Spotify Playlist URL..."
              value={formData.spotifyUrl}
              onChange={(e) => handleChange("spotifyUrl", e.target.value)}
              className="glass-input w-full"
            />
          </div>
          <hr className="border-none border-t border-white/10" />

          {/* Save Button */}
          <button
            type="submit"
            className="bg-white text-black border-none rounded-xl py-3 px-4 font-semibold text-sm cursor-pointer mt-3"
          >
            save preferences
          </button>
        </form>
      </div>
    </div>
  );
};
