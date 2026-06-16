import { useState } from "react";
import bgImage from "./assets/city-dusk.png";
import { UI_TEXT } from "./constants";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { AmbientMixer } from "./components/AmbientMixer";

interface SettingsData {
  spotifyUrl: string;
}

const DEFAULT_SETTINGS: SettingsData = {
  spotifyUrl: "https://open.spotify.com/playlist/4Zjli1P13J5mmSCD5iKAXK",
};

function App() {
  const [settings, setsettings] = useState<SettingsData>(DEFAULT_SETTINGS);

  return (
    <div
      className="relative w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-6 left-6 z-10 text-white select-none">
        <h1 className="font-hand text-3xl font-semibold leading-none tracking-[1px]">
          {UI_TEXT.APP_TITLE}
        </h1>
        <p className="font-main text-xs tracking-[2px] uppercase mt-1 ml-1">
          {UI_TEXT.APP_DESCRIPTION}
        </p>
      </div>

      {/* timer block */}
      <div className="font-main z-10 text-6xl text-white">25:00</div>

      {/* spotify block */}
      <SpotifyPlayer playlistUrl={settings.spotifyUrl} />

      {/* ambient mixer */}
      <AmbientMixer />
    </div>
  );
}

export default App;
