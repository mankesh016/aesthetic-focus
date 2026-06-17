import { useState } from "react";
import bgImage from "./assets/city-dusk.png";
import { UI_TEXT } from "./constants";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { AmbientMixer } from "./components/AmbientMixer";
import type { SettingsData } from "./types";
import { Timer } from "./components/Timer";

const DEFAULT_SETTINGS: SettingsData = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  spotifyUrl: "https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK",
};

function App() {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-cover bg-center">
      <div
        className="bg-container z-[-2]"
        style={{ backgroundImage: `url(${bgImage})` }}
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
      <Timer settings={settings} />

      {/* spotify block */}
      <SpotifyPlayer playlistUrl={settings.spotifyUrl} />

      {/* ambient mixer */}
      <AmbientMixer />
    </div>
  );
}

export default App;
