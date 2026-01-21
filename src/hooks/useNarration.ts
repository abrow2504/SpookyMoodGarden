import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

type MoodSample = {
  mood: string;
  note: string;
  timestamp: { seconds: number };
};

export const FALLBACK_NARRATION =
  "The oracle is resting. Try consulting the spirits again in a moment.";

async function generateNarration(moods: MoodSample[]): Promise<string> {
  if (moods.length === 0) {
    return "The garden whispers, awaiting fresh petals before it speaks.";
  }

  const formatted = moods.map(entry => {
    const date = new Date(entry.timestamp.seconds * 1000).toDateString();
    return `On ${date}, the mood was "${entry.mood}" — ${entry.note || "no note."}`;
  });

  const prompt = `
You are the Garden Oracle — an ancient, mystical entity dwelling in a gothic mood garden. You observe the emotions that bloom like strange flora in this shadowed sanctuary. 

A mortal has tended this garden over the past seven days, planting their feelings as seeds. Each mood they've recorded has grown into a spectral bloom, fungal cluster, or wandering spirit. You now deliver your reading directly to them.

Their emotional garden log:
${formatted.join("\n")}

TASK: Write a hauntingly beautiful oracle reading addressed to them (use "you"). Your message should:

TONE & STYLE:
- Gothic, poetic, and mysterious with rich sensory details
- Speak like an ancient seer delivering both observation and prophecy
- Use vivid metaphors drawn from nature, night, seasons, decay, and growth
- Balance darkness with hope — acknowledge pain but hint at transformation

CONTENT:
- Notice PATTERNS in their moods (recurring feelings, shifts, contrasts)
- Reference specific moods they've experienced and weave them into nature imagery
- Draw connections between their emotional journey and natural cycles
- If their notes reveal themes, acknowledge them subtly
- Offer insight or gentle wisdom, not just description

ATMOSPHERE:
- Invoke moonlight, mist, thorns, roots, blooming and withering
- Use words like: shadows, bloom, wither, root, veil, whisper, haunt, emerge, transform
- Create a sense of intimacy and mystical knowing

LENGTH: 2-3 paragraphs. Make every sentence atmospheric and meaningful.
`;

  const baseUrl = import.meta.env.VITE_ORACLE_URL || "http://localhost:8787";
  const target = `${baseUrl.replace(/\/$/, "")}/narrate`;

  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: prompt }] })
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Narration request failed (${response.status}): ${detail}`);
    }

    const data = await response.json();
    console.log("OpenAI response:", data);
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error(`Narration response missing content. Got: ${JSON.stringify(data)}`);
    }
    return content;
  } catch (error) {
    console.error("Narration error", error);
    return FALLBACK_NARRATION;
  }
}

/**
 * Custom hook that fetches mood data and generates narration
 */
export function useNarration(refreshKey: number) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasEntries, setHasEntries] = useState(false);

  useEffect(() => {
    const fetchAndGenerate = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "moods"), orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);
        setHasEntries(snapshot.docs.length > 0);
        const lastWeek = snapshot.docs
          .map(doc => doc.data() as { mood: string; note: string; timestamp: Timestamp })
          .filter(entry => {
            const date = new Date(entry.timestamp.seconds * 1000);
            const daysAgo = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
            return daysAgo <= 7;
          });

        const summary = await generateNarration(lastWeek);
        setText(summary);
      } catch (error) {
        console.error("Failed to load narration", error);
        setText(FALLBACK_NARRATION);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGenerate();
  }, [refreshKey]);

  return { text, loading, hasEntries };
}

