
import { useState } from "react";
import { worldsCatalog } from "./content/worlds";
import type { LevelDefinition, WorldDefinition } from "./types/app";
import "./App.css";

function LevelCard({ level, onSelect, isPlayable }: { level: LevelDefinition; onSelect: () => void; isPlayable: boolean }) {
  return (
    <div className={`level-card ${isPlayable ? "playable" : "locked"}`} style={{ margin: "1rem", padding: "1rem", border: "1px solid #ddd", borderRadius: 8, background: isPlayable ? "#f0f8ff" : "#f8f8f8" }}>
      <h3>{level.title.en}</h3>
      <p>{level.summary.en}</p>
      <button disabled={!isPlayable} onClick={onSelect} style={{ marginTop: "0.5rem" }}>
        {isPlayable ? "Play Level" : "Locked"}
      </button>
    </div>
  );
}

function WorldCard({ world, onSelectLevel, selectedLevelId }: { world: WorldDefinition; onSelectLevel: (level: LevelDefinition) => void; selectedLevelId: string | null }) {
  return (
    <div className="world-card" style={{ margin: "2rem 0", padding: "1rem", border: `2px solid ${world.accentColor}`, borderRadius: 12 }}>
      <h2 style={{ color: world.accentColor }}>{world.title.en}</h2>
      <p>{world.summary.en}</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        {world.levels.map((level, idx) => (
          <LevelCard
            key={level.id}
            level={level}
            isPlayable={world.slug === "electromagnetism" && idx < 2}
            onSelect={() => onSelectLevel(level)}
          />
        ))}
      </div>
    </div>
  );
}

function TaskList({ level }: { level: LevelDefinition }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <h4>Tasks in {level.title.en}</h4>
      <ul>
        {level.tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{task.goal.en}</strong>
            <br />
            <span style={{ color: "#555" }}>{task.successCriteria.en}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  // Only allow playing first two levels of Electromagnetism
  const [selectedLevel, setSelectedLevel] = useState<LevelDefinition | null>(null);

  const handleSelectLevel = (level: LevelDefinition) => {
    setSelectedLevel(level);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h1>🌟 Nano Chacha STEM Adventure</h1>
      {!selectedLevel ? (
        <>
          <h2>Choose a Chapter</h2>
          {worldsCatalog.map((world) => (
            <WorldCard
              key={world.id}
              world={world}
              onSelectLevel={handleSelectLevel}
              selectedLevelId={selectedLevel?.id ?? null}
            />
          ))}
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedLevel(null)} style={{ marginBottom: "1rem" }}>
            ← Back to Chapters
          </button>
          <h2>{selectedLevel.title.en}</h2>
          <p>{selectedLevel.summary.en}</p>
          <TaskList level={selectedLevel} />
        </div>
      )}
    </div>
  );
}

export default App
