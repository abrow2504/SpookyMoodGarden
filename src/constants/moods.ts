import joyImg from "../assets/joy.png";
import melancholyImg from "../assets/melancholy.png";
import anxiousImg from "../assets/anxious.png";
import enragedImg from "../assets/enraged.png";
import lonelyImg from "../assets/lonely.png";

export const MOOD_OPTIONS = [
  "Joyful",
  "Melancholy",
  "Anxious",
  "Enraged",
  "Lonely"
] as const;

export type MoodType = typeof MOOD_OPTIONS[number];

export const MOOD_IMAGES: Record<string, string> = {
  Joyful: joyImg,
  Melancholy: melancholyImg,
  Anxious: anxiousImg,
  Enraged: enragedImg,
  Lonely: lonelyImg
};
