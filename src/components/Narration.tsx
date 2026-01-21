import { useNarration } from "../hooks/useNarration";
import "./Narration.css";

export default function Narration({ refreshKey, refreshNarration }: { refreshKey: number; refreshNarration?: () => void }) {
  const { text, loading, hasEntries } = useNarration(refreshKey);


  return (
    <div className="narration-box">
      <h2>📜 Garden Oracle</h2>
      {/* Button for refreshing Garden Oracle, only if moods exist */}
      {typeof refreshNarration === "function" && hasEntries && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button
            type="button"
            style={{ background: "#caa6df", color: "#222", borderRadius: "0.5rem", padding: "0.5rem 1.2rem", fontWeight: "bold", border: "none", cursor: "pointer", display: "inline-block" }}
            onClick={refreshNarration}
          >
            Consult the Spirits 🔮
          </button>
        </div>
      )}
      {loading ? <p>Consulting the shadows...</p> : <p>{text}</p>}
    </div>
  );
}

