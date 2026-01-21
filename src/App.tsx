import "./App.css";
import FloatyLights from "./components/FloatyLights";
import MoodEntry from "./components/MoodEntry";
import Garden from "./components/Garden";
import UserButton from "./components/UserButton";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Narration from "./components/Narration";
import { useSparkleCursor } from "./hooks/useSparkleCursor";
import { useMoodEntries } from "./hooks/useMoodEntries";



function App() {
  const { loading: authLoading } = useAuth();
  const { entries, loading, refetch: fetchMoods } = useMoodEntries();
  const [narrationRefreshKey, setNarrationRefreshKey] = useState(0);
  
  useSparkleCursor();

  return (
    <div className="app-container" style={{ position: "relative" }}>
      <FloatyLights />
      <header>
        <div className="header-content">
          <div className="header-main">
            <h1> Mood Garden</h1>
            <p className="tagline">Tend to your emotions.</p>
          </div>
          <UserButton />
        </div>
      </header>

      <main>
        {authLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#8b5a6b' }}>
            Loading...
          </div>
        ) : (
          <>
            <MoodEntry refreshMoods={fetchMoods} />
            <div style={{ position: 'relative' }}>
              <Garden entries={entries} loading={loading} />
              <Narration refreshKey={narrationRefreshKey} refreshNarration={() => setNarrationRefreshKey(k => k + 1)} />
 
            </div>
          </>
        )}
      </main>

      <footer>
        <p>Crafted with 🌑 and React</p>
      </footer>
    </div>
  );
}

export default App;

