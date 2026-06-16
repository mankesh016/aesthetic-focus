import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AmbientSound {
  id: string;
  name: string;
  url: string;
}

const SOUNDS: AmbientSound[] = [
  {
    id: "rain",
    name: "Rain",
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/rain.mp3",
  },
  {
    id: "forest",
    name: "Forest Birds",
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/forest.mp3",
  },
  {
    id: "campfire",
    name: "Campfire",
    url: "https://raw.githubusercontent.com/karthiknvd/noctune/main/sounds/campfire.mp3",
  },
  {
    id: "river",
    name: "River Flow",
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

  return (
    <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end">
      {isOpen && (
        <div className="bg-gray-200 text-black w-[260px] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[15px] font-semibold tracking-wider">
              ambient sounds
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {SOUNDS.map((sound) => (
              <div key={sound.id} className="flex flex-col">
                <div className="flex justify-between">
                  <span className="text-sm">{sound.name}</span>
                  <span>{Math.round(volumes[sound.id] * 100)}</span>
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
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-white cursor-pointer bg-gray-500 p-2 rounded-full"
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
