import React, { useState, useEffect, useRef } from "react";
import { StickyNote as NoteIcon, X, Plus, Pin, Trash2 } from "lucide-react";
import type { StickyNote, NoteColor } from "../types";

const COLOR_CONFIGS: Record<
  NoteColor,
  { bg: string; border: string; text: string; circle: string }
> = {
  yellow: {
    bg: "rgba(234, 179, 8, 0.09)",
    border: "rgba(234, 179, 8, 0.90)",
    text: "#facc15",
    circle: "#eab330",
  },
  pink: {
    bg: "rgba(236, 72, 153, 0.09)",
    border: "rgba(236, 72, 153, 0.90)",
    text: "#f472b6",
    circle: "#ec4899",
  },
  blue: {
    bg: "rgba(14, 165, 233, 0.09)",
    border: "rgba(14, 165, 233, 0.90)",
    text: "#38bdf8",
    circle: "#38bdf8",
  },
  green: {
    bg: "rgba(34, 197, 94, 0.09)",
    border: "rgba(34, 197, 94, 0.90)",
    text: "#4ade80",
    circle: "#22c55e",
  },
  purple: {
    bg: "rgba(168, 85, 247, 0.09)",
    border: "rgba(168, 85, 247, 0.90)",
    text: "#c084fc",
    circle: "#c084fc",
  },
};

const COLOR_KEYS: NoteColor[] = ["yellow", "pink", "blue", "green", "purple"];

export const StickyNotes: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [inputText, setInputText] = useState("");
  const [inputColor, setInputColor] = useState<NoteColor>("yellow");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load notes from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("aesthetic-focus-notes");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save notes helper
  const saveNotes = (updated: StickyNote[]) => {
    setNotes(updated);
    localStorage.setItem("aesthetic-focus-notes", JSON.stringify(updated));
  };

  const handleAddNote = () => {
    if (!inputText.trim()) return;
    const newNote: StickyNote = {
      id: Date.now().toString(),
      text: inputText.trim(),
      color: inputColor,
      isPinned: true,
      createdAt: Date.now(),
    };
    saveNotes([newNote, ...notes]);
    setInputText("");
    textareaRef.current?.focus();
  };

  const handleDeleteNote = (id: string) =>
    saveNotes(notes.filter((n) => n.id !== id));

  const handleTogglePin = (id: string) => {
    saveNotes(
      notes.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n)),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const pinnedNotes = notes.filter((n) => n.isPinned);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-panel border border-white/20 flex items-center justify-center text-white cursor-pointer w-[54px] h-[54px] rounded-full fixed top-6 right-6 z-[80] hover:scale-105 active:scale-95 transition-all shadow-lg"
        title="Sticky Notes"
      >
        <NoteIcon size={24} />
      </button>

      {/* Pinned Notes Overlay (Flowing on the right) */}
      {pinnedNotes.length > 0 && (
        <div className="fixed top-24 right-6 z-[70] flex flex-col gap-3 max-h-[calc(100vh-180px)] overflow-y-auto w-[280px] pointer-events-none custom-scrollbar select-none">
          {pinnedNotes.map((note) => {
            const config = COLOR_CONFIGS[note.color];
            return (
              <div
                key={note.id}
                style={{
                  backgroundColor: config.bg,
                  borderColor: config.border,
                  color: config.text,
                }}
                className="backdrop-blur-[5px] border rounded-2xl p-5 pr-10 relative pointer-events-auto shadow-md animate-fade-in transition-all duration-300 w-full"
              >
                <button
                  onClick={() => handleTogglePin(note.id)}
                  style={{ color: config.text }}
                  className="absolute top-4 right-4 cursor-pointer hover:scale-110 active:scale-95 transition-all opacity-70 hover:opacity-100"
                  title="Unpin Note"
                >
                  <Pin size={15} className="rotate-45 fill-current" />
                </button>
                <div className="font-main text-[15px] font-semibold leading-relaxed break-words whitespace-pre-wrap">
                  {note.text}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sidebar Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-[90] transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-[#0d0d12]/50 backdrop-blur-2xl border-l border-white/10 z-[100] shadow-2xl p-6 flex flex-col transition-transform duration-300 ease-out select-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 text-white">
            <NoteIcon size={22} className="opacity-90" />
            <span className="font-main text-2xl font-bold tracking-tight lowercase">
              sticky notes
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            title="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Create Note Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col shadow-inner">
          <textarea
            ref={textareaRef}
            rows={3}
            placeholder="Write a sticky note..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none text-white placeholder-white/30 focus:outline-none resize-none font-main text-[15px] leading-relaxed"
          />
          <div className="flex items-center justify-between mt-4">
            {/* Color circles selection */}
            <div className="flex gap-2">
              {COLOR_KEYS.map((color) => {
                const config = COLOR_CONFIGS[color];
                const isSelected = inputColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setInputColor(color)}
                    style={{ backgroundColor: config.circle }}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-all ${
                      isSelected
                        ? "ring-2 ring-white scale-110"
                        : "opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                    title={`Select ${color}`}
                  />
                );
              })}
            </div>

            {/* Add note button */}
            <button
              onClick={handleAddNote}
              disabled={!inputText.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                inputText.trim()
                  ? "bg-white text-[#0d0d12] hover:bg-white/90"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
              title="Add Note"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable list of existing notes */}
        <div className="flex-grow overflow-y-auto mt-6 pr-1 flex flex-col gap-4 custom-scrollbar">
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-white/30 h-40">
              <NoteIcon size={32} className="opacity-20 mb-2" />
              <p className="font-main text-sm">No notes yet</p>
            </div>
          ) : (
            notes.map((note) => {
              const config = COLOR_CONFIGS[note.color];
              return (
                <div
                  key={note.id}
                  style={{
                    backgroundColor: config.bg,
                    borderColor: config.border,
                  }}
                  className="border rounded-2xl p-4 pr-18 relative transition-all duration-300 min-h-[64px] flex items-center"
                >
                  <div
                    style={{ color: config.text }}
                    className="font-main text-[15px] font-semibold leading-relaxed break-words whitespace-pre-wrap px-1 w-full"
                  >
                    {note.text}
                  </div>

                  {/* Action Buttons in Top Right */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePin(note.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                        note.isPinned
                          ? "text-white/90 hover:bg-white/10"
                          : "text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                      title={note.isPinned ? "Unpin Note" : "Pin Note"}
                    >
                      <Pin
                        size={14}
                        className={note.isPinned ? "fill-current" : ""}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all cursor-pointer"
                      title="Delete Note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
