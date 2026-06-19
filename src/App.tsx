import { useEffect, useState } from "react";
import { UI_TEXT } from "./constants";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { AmbientMixer } from "./components/AmbientMixer";
import type { SettingsData } from "./types";
import { Timer } from "./components/Timer";
import { SettingsModal } from "./components/SettingsModal";
import { StickyNotes } from "./components/StickyNotes";

import cityDusk from "./assets/city-dusk.png";
import cozyRain from "./assets/cozy-rain.png";
import greenForest from "./assets/green-forest.png";

const DEFAULT_SETTINGS: SettingsData = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  backgroundId: "city-dusk",
  spotifyUrl: "https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK",
  alarmSound: "digital",
  alarmVolume: 0.5,
};

function App() {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-settings-v1");
    if (saved) {
      try {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...JSON.parse(saved),
        });
      } catch (e) {
        console.error("Failed to parse settings:", e);
      }
    }
  }, []);
  const handleSaveSettings = (newSettings: SettingsData) => {
    setSettings(newSettings);
    localStorage.setItem("pomodoro-settings-v1", JSON.stringify(newSettings));
  };

  // Get background image mapping
  const getBackgroundImage = () => {
    switch (settings.backgroundId) {
      case "city-dusk":
        return cityDusk;
      case "cozy-rain":
        return cozyRain;
      case "green-forest":
        return greenForest;
      default:
        return cityDusk;
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-cover bg-center">
      <div
        className="bg-container z-[-2]"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      />
      <div className="bg-overlay z-[-1]" />

      {/* Heading block */}
      <div className="absolute top-6 left-6 z-10 text-white select-none">
        <h1 className="font-hand text-3xl font-semibold leading-none tracking-[1px]">
          {UI_TEXT.APP_TITLE}
        </h1>
        <p className="font-main text-xs tracking-[2px] uppercase mt-1 ml-1">
          {UI_TEXT.APP_DESCRIPTION}
        </p>
      </div>

      {/* timer block */}
      <Timer
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* spotify block */}
      <SpotifyPlayer playlistUrl={settings.spotifyUrl} />

      {/* ambient mixer */}
      <AmbientMixer />

      {/* sticky notes */}
      <StickyNotes />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}

export default App;
