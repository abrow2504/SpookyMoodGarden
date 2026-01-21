import { useEffect, useRef, useState } from "react";

type LonelyState = {
  pos: { top: number; left: number };
  transition: number;
};

const randomLonelyPosition = (): LonelyState["pos"] => ({
  top: 15 + Math.random() * 65,
  left: 15 + Math.random() * 70
});

const randomInterval = () => 4000 + Math.random() * 6000;

const randomTransition = () => 7 + Math.random() * 5;

/**
 * Custom hook that manages the wandering animation for "Lonely" mood entries
 */
export function useLonelyAnimation(lonelyEntries: { id: string }[]) {
  const [lonelyStates, setLonelyStates] = useState<Record<string, LonelyState>>({});
  const lonelyTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    // Initialize states for new lonely entries
    setLonelyStates(prev => {
      const next: typeof prev = {};
      for (const entry of lonelyEntries) {
        if (prev[entry.id]) {
          next[entry.id] = prev[entry.id];
        } else {
          next[entry.id] = { pos: randomLonelyPosition(), transition: randomTransition() };
        }
      }
      return next;
    });

    // Clear timers for removed lonely entries
    Object.keys(lonelyTimers.current).forEach(id => {
      if (!lonelyEntries.find(entry => entry.id === id)) {
        clearTimeout(lonelyTimers.current[id]);
        delete lonelyTimers.current[id];
      }
    });

    // Schedule movement for each lonely entry
    for (const entry of lonelyEntries) {
      if (!lonelyTimers.current[entry.id]) {
        const scheduleMove = () => {
          const interval = randomInterval();
          lonelyTimers.current[entry.id] = setTimeout(() => {
            setLonelyStates(prev => {
              if (!prev[entry.id]) return prev;
              return {
                ...prev,
                [entry.id]: {
                  pos: randomLonelyPosition(),
                  transition: randomTransition()
                }
              };
            });
            scheduleMove();
          }, interval);
        };
        scheduleMove();
      }
    }

    // Cleanup on unmount
    return () => {
      Object.values(lonelyTimers.current).forEach(clearTimeout);
      lonelyTimers.current = {};
    };
  }, [lonelyEntries]);

  return lonelyStates;
}
