# aesthetic-focus 🎧✨

A beautifully designed Pomodoro productivity timer with ambient vibes, Spotify integration, and a few personal touches that make grinding actually feel good.

🌐 Live at → **[study.aftercp.com](https://study.aftercp.com)**

---

## 💡 Inspiration

Heavily inspired by the chill vibes of **[studywithme.io](https://studywithme.io/aesthetic-pomodoro-timer/)**. I coded this up entirely from scratch to get some reps in and build muscle memory, tossing in a few of my own custom tweaks along the way. 🎧✌️

---

## Features

- 🍅 Pomodoro timer — customizable 25/5/15 cycle, alarm sounds
- 🎵 Spotify integration — paste your playlist, stays in the tab
- 🎚️ Ambient sound mixer — Rain, Forest Birds, Campfire, River Flow
- 🌆 3 background themes — City Dusk, Cozy Rain, Green Forest
- 🗒️ **Sticky Notes** — Jot down thoughts without leaving your flow

---

## 🛠️ Tools

`⚛️ React 19`
`🟦 TypeScript`
`⚡ Vite`
`🎨 Tailwind CSS`
`🧁 Bun`

---

## 🚀 Run Locally (Bun)

> Make sure you have [Bun](https://bun.sh) installed.

```bash
# 1. Clone the repo
git clone https://github.com/mankesh016/aesthetic-focus.git

# 2. Navigate into the project
cd aesthetic-focus

# 3. Install dependencies
bun install

# 4. Start the dev server
bun run dev
```

🌐 Open your browser at → **http://localhost:5173**

---

## 🐳 Run with Docker Compose

> Make sure you have [Docker](https://www.docker.com/get-started) installed and the Docker daemon is running.

```bash
# 1. Clone the repo
git clone https://github.com/mankesh016/aesthetic-focus.git

# 2. Navigate into the project
cd aesthetic-focus

# 3. Start with Docker Compose
docker compose up
```

🌐 Open your browser at → **http://localhost:8080**

To stop the container:

```bash
docker compose down
```

---

## 🐋 Run with Docker (Dockerfile)

> Make sure you have [Docker](https://www.docker.com/get-started) installed and the Docker daemon is running.

```bash
# 1. Clone the repo
git clone https://github.com/mankesh016/aesthetic-focus.git

# 2. Navigate into the project
cd aesthetic-focus

# 3. Build the image
docker build -t aesthetic-focus .

# 4. Run the container
docker run -p 8080:80 aesthetic-focus
```

🌐 Open your browser at → **http://localhost:8080**

---

## 📁 Project Structure

```
aesthetic-focus/
├── public/                      # Static public assets
|   └── backgrouns.png           # Background theme
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   │   └── NumberInput.tsx  # Reusable number input component
│   │   ├── AmbientMixer.tsx     # 🎚️ Ambient sound controls
│   │   ├── SettingsModal.tsx    # ⚙️ Settings modal
│   │   ├── SpotifyPlayer.tsx    # 🎵 Spotify embed player
│   │   ├── StickyNotes.tsx      # 🗒️ Sticky notes widget
│   │   └── Timer.tsx            # 🍅 Core Pomodoro timer
│   ├── utils/
│   │   └── audio.ts             # Audio utility alarm
│   ├── App.tsx                  # Root app component
│   ├── constants.ts             # App-wide constants
│   ├── index.css                # Global styles
│   ├── main.tsx                 # App entry point
│   └── types.ts                 # TypeScript interfaces definitions
├── .dockerignore
├── .gitignore
├── bun.lock
├── docker-compose.yml           # 🐳 Docker Compose config
├── Dockerfile                   # 🐋 Docker build instructions
├── index.html                   # HTML entry point
├── LICENSE
├── package.json
├── tsconfig.json
└── vite.config.ts               # ⚡ Vite configuration
```

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open an issue for bugs or feature ideas. 💡

---

## 📄 License

MIT © [Mankesh Meena](https://github.com/mankesh016)

---

<p align="center">Made with 🖤 for the late-night grinders</p>
