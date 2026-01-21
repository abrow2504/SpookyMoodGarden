import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export type MoodEntry = {
  id: string;
  mood: string;
  note: string;
  timestamp: any;
};

/**
 * Custom hook that manages fetching and state for user mood entries
 */
export function useMoodEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMoods = useCallback(async () => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "moods"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        mood: d.mood,
        note: d.note,
        timestamp: d.timestamp
      };
    });
    setEntries(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchMoods();
  }, [user]);

  return { entries, loading, refetch: fetchMoods };
}
