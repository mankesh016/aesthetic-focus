export interface SettingsData {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  backgroundId: string;
  spotifyUrl: string;
  alarmSound: string;
  alarmVolume: number;
}

export type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

export interface StickyNote {
  id: string;
  text: string;
  color: NoteColor;
  isPinned: boolean;
  createdAt: number;
}
