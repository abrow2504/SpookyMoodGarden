import { useMemo } from "react";
import backgroundImg from "../assets/background.png";
import { MOOD_IMAGES } from "../constants/moods";
import { useLonelyAnimation } from "../hooks/useLonelyAnimation";
import "./Garden.css";

type Entry = {
  id: string;
  mood: string;
  note?: string;
};

export default function Garden({ entries }: { entries: Entry[]; loading: boolean }) {
  const lonelyEntries = useMemo(() => entries.filter(entry => entry.mood === "Lonely"), [entries]);
  const lonelyStates = useLonelyAnimation(lonelyEntries);


  const getRandomPosition = (idx: number, mood: string, id: string) => {
    if (mood === "Lonely" && lonelyStates[id]) {
      return { top: `${lonelyStates[id].pos.top}%`, left: `${lonelyStates[id].pos.left}%` };
    }
    const seed = idx * 9973;
    const rand = (min: number, max: number) => {
      const x = Math.sin(seed + min * 13 + max * 7) * 10000;
      return Math.abs(x - Math.floor(x));
    };
    let top: number;
    let left: number;
    if (mood === "Lonely") {
      top = 15 + rand(1, 100 + idx) * 65;
      left = 15 + rand(2, 200 + idx) * 70;
    } else {
      top = 65 + rand(1, 100 + idx) * 15;
      left = 5 + rand(2, 200 + idx) * 90;
    }
    return { top: `${top}%`, left: `${left}%` };
  };

  const getRandomFlip = (idx: number, id: string) => {
    // Use a different seed for flip to make it independent of position
    const seed = (idx * 7919) + id.charCodeAt(0);
    const x = Math.sin(seed) * 10000;
    const randValue = Math.abs(x - Math.floor(x));
    // 50% chance to flip vertically
    return randValue > 0.5 ? -1 : 1;
  };

  return (
    <div className="garden-bg-container">
      <div className="garden-bg">
        <img
          src={backgroundImg}
          alt="Garden background"
          className="garden-background-image"
        />
        {entries.length === 0 ? (
          <div className="garden-empty-state">
            <p className="garden-empty-message">
              The garden is shrouded in mist, awaiting your first feeling.<br />
              Plant a mood to let the blooms awaken.
            </p>
          </div>
        ) : (
          entries.map((entry, idx) => {
            const imgSrc = MOOD_IMAGES[entry.mood];
            const pos = getRandomPosition(idx, entry.mood, entry.id);
            const flipX = getRandomFlip(idx, entry.id);
            return imgSrc ? (
              <img
                key={entry.id}
                src={imgSrc}
                alt={entry.mood}
                className={`mood-plant${entry.mood === "Lonely" ? " lonely-ghost" : ""}${entry.note ? " has-note" : " no-note"}`}
                title={entry.note}
                style={{
                  ...pos,
                  transform: `translate(-50%, -50%) scaleX(${flipX})`,
                  transition:
                    entry.mood === "Lonely" && lonelyStates[entry.id]
                      ? `top ${lonelyStates[entry.id].transition}s cubic-bezier(.6,1.5,.6,1), left ${lonelyStates[entry.id].transition}s cubic-bezier(.6,1.5,.6,1)`
                      : undefined
                }}
              />
            ) : null;
          })
        )}
      </div>
    </div>
  );
}
