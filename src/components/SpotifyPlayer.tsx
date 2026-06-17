import { ChevronDown, Music } from "lucide-react";
import { useState } from "react";

export const SpotifyPlayer: React.FC<{ playlistUrl: string }> = ({
  playlistUrl,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getEmbedUrl = (url: string) => {
    if (url.includes("spotify.com/embed/")) {
      return url;
    }
    const playlistIdMatch = url.match(/playlist\/([a-zA-Z0-9]+)/);
    if (playlistIdMatch && playlistIdMatch[1]) {
      return `https://open.spotify.com/embed/playlist/${playlistIdMatch[1]}?utm_source=generator&theme=0`;
    }
    return url;
  };
  return (
    <div
      className={`glass-panel flex flex-col fixed bottom-6 left-6 z-[50] overflow-hidden ${isOpen ? "w-[340px] h-[152px] rounded-2xl" : "w-[50px] h-[50px] rounded-[25px] border border-white/20 items-center justify-center"}`}
    >
      {isOpen ? (
        <div className="relative w-full h-full">
          <iframe
            title="Spotify Player"
            data-testid="embed-iframe"
            src={getEmbedUrl(playlistUrl)}
            className="w-full h-[152px]"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 bg-black/60 border border-white/60 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer z-[60]"
            title="Close Spotify Player"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center cursor-pointer"
          title="Open Spotify Player"
        >
          <Music size={22} />
        </button>
      )}
    </div>
  );
};
