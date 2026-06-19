export const playSynthesizedAlarm = (soundName: string, volume: number) => {
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (soundName === "digital") {
      // Classic digital alarm: 4 rapid beeps
      osc.type = "square";
      osc.frequency.setValueAtTime(2000, now);

      gain.gain.setValueAtTime(0, now);
      for (let i = 0; i < 4; i++) {
        const start = now + i * 0.25;
        const end = start + 0.12;
        gain.gain.setValueAtTime(volume, start);
        gain.gain.setValueAtTime(0, end);
      }

      osc.start(now);
      osc.stop(now + 1.0);
    } else if (soundName === "bell") {
      // Bell: fundamental tone with a higher harmonic and soft decay
      osc.type = "sine";
      osc.frequency.setValueAtTime(329.63, now); // E4 note

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(659.25, now); // E5 note (octave higher)

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      gain2.gain.setValueAtTime(volume * 0.4, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.start(now);
      osc.stop(now + 1.8);
      osc2.start(now);
      osc2.stop(now + 1.8);
    } else if (soundName === "chimes") {
      // Chimes: arpeggio of light, high-pitched sine tones
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      osc.type = "sine";

      gain.gain.setValueAtTime(0, now);
      osc.start(now);

      notes.forEach((freq, index) => {
        const time = now + index * 0.15;
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
      });

      osc.stop(now + 1.0);
    }
  } catch (err) {
    console.error("Audio synthesis failed:", err);
  }
};
