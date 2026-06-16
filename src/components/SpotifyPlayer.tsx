export const SpotifyPlayer: React.FC<{ playlistUrl: string }> = ({
  playlistUrl,
}) => {
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
    <div className="fixed bottom-6 left-6 font-main z-10 text-xl text-white">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src={getEmbedUrl(playlistUrl)}
        width="100%"
        height="200px"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};
