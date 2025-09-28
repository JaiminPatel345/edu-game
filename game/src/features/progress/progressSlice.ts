import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LevelProgress, WorldProgress } from "../../types/app";

interface ProgressState {
  worlds: Record<string, WorldProgress>;
}

const initialState: ProgressState = {
  worlds: {},
};

interface PrimeWorldPayload {
  world: WorldProgress;
}

interface UpdateLevelPayload {
  worldId: string;
  levelId: string;
  changes: Partial<LevelProgress>;
}

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    primeWorld: (state, action: PayloadAction<PrimeWorldPayload>) => {
      const { world } = action.payload;
      state.worlds[world.worldId] = world;
    },
    updateLevelProgress: (state, action: PayloadAction<UpdateLevelPayload>) => {
      const { worldId, levelId, changes } = action.payload;
      const world = state.worlds[worldId];
      if (!world) return;
      const level = world.levels[levelId];
      if (!level) return;
      world.levels[levelId] = {
        ...level,
        ...changes,
      };
    },
    registerAttempt: (
      state,
      action: PayloadAction<{ worldId: string; levelId: string; success: boolean; timeMs: number; hintsUsed: number; coinsEarned: number; masteryDelta: number }>,
    ) => {
      const { worldId, levelId, success, timeMs, hintsUsed, coinsEarned, masteryDelta } = action.payload;
      const world = state.worlds[worldId];
      if (!world) return;
      const level = world.levels[levelId];
      if (!level) return;
      level.attempts += 1;
      level.hintsUsed += hintsUsed;
      level.coinsEarned += coinsEarned;
      level.masteryScore = Math.min(1, Math.max(0, level.masteryScore + masteryDelta));
      level.lastPlayedAt = new Date().toISOString();
      if (success) {
        level.status = "completed";
        level.stars = Math.max(level.stars, Math.round(level.masteryScore * 3));
        level.bestTimeMs = level.bestTimeMs ? Math.min(level.bestTimeMs, timeMs) : timeMs;
      } else if (level.status === "locked") {
        level.status = "in-progress";
      }
    },
    unlockLevel: (state, action: PayloadAction<{ worldId: string; levelId: string }>) => {
      const { worldId, levelId } = action.payload;
      const world = state.worlds[worldId];
      if (!world) return;
      const level = world.levels[levelId];
      if (!level) return;
      if (level.status === "locked") {
        level.status = "unlocked";
      }
    },
    resetProgress: () => initialState,
  },
});

export const { primeWorld, updateLevelProgress, registerAttempt, unlockLevel, resetProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
