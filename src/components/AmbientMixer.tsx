import { CloudRain, Flame, Trees, Volume2, VolumeX, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AmbientSound {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
}

const SOUNDS: AmbientSound[] = [
  {
    id: "rain",
    name: "Rain",
    icon: <CloudRain size={18} />,
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/rain.mp3",
  },
  {
    id: "forest",
    name: "Forest Birds",
    icon: <Trees size={18} />,
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/forest.mp3",
  },
  {
    id: "campfire",
    name: "Campfire",
    icon: <Flame size={18} />,
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/campfire.mp3",
  },
  {
    id: "river",
    name: "River Flow",
    icon: <Waves size={18} />,
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/river.mp3",
  },
];

export const AmbientMixer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [volumes, setVolumes] = useState<Record<string, number>>({
    rain: 0,
    forest: 0,
    campfire: 0,
    river: 0,
  });
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    // preload audio on mount
    SOUNDS.forEach((sound) => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[sound.id] = audio;
    });
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
        }
      });
    };
  }, []);

  const handleVolumeChange = (id: string, volume: number) => {
    const newVolumes = { ...volumes, [id]: volume };
    setVolumes(newVolumes);

    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = volume;
      if (volume > 0) {
        if (audio.paused) {
          audio
            .play()
            .catch((err) => console.log("Audio play blocked by browser:", err));
        }
      } else {
        audio.pause();
      }
    }
  };

  const isAnyPlaying = Object.values(volumes).some((v) => v > 0);

  const muteAll = () => {
    const newVolumes = { ...volumes };
    Object.keys(newVolumes).forEach((key) => {
      newVolumes[key] = 0;
      const audio = audioRefs.current[key];
      if (audio) {
        audio.volume = 0;
        audio.pause();
      }
    });
    setVolumes(newVolumes);
  };

  return (
    <div className="fixed bottom-6 right-6 z-95 flex flex-col items-end">
      {isOpen && (
        <div className="backdrop-blur-[12px] glass-panel w-65 p-5 mb-2 flex flex-col gap-4 animate-fade-in">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[15px] font-semibold tracking-wider">
              Ambient Sounds
            </span>
            {isAnyPlaying && (
              <button
                onClick={muteAll}
                className="border-none text-white/80 cursor-pointer text-[11px] flex items-center gap-1 hover:text-white"
              >
                <VolumeX size={12} /> mute all
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {SOUNDS.map((sound) => (
              <div key={sound.id} className="flex items-center gap-3">
                <div
                  className={`w-6 flex justify-center ${volumes[sound.id] > 0 ? "text-white/80" : "text-white/40"}`}
                >
                  {sound.icon}
                </div>
                <div key={sound.id} className="flex-grow flex flex-col gap-2">
                  <div className="flex justify-between text-[12px] text-white/90">
                    <span className="text-sm">{sound.name}</span>
                    <span>{Math.round(volumes[sound.id] * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volumes[sound.id]}
                    onChange={(e) =>
                      handleVolumeChange(sound.id, parseFloat(e.target.value))
                    }
                    className="glass-range"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel border border-white/20 flex items-center justify-center text-white cursor-pointer w-12 h-12 rounded-full"
        title="Ambient Mixer"
      >
        {isAnyPlaying ? (
          <Volume2 size={22} />
        ) : (
          <VolumeX size={22} className="opacity-70" />
        )}
      </button>
    </div>
  );
};
