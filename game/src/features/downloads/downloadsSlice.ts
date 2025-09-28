import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type DownloadStatus = "idle" | "queued" | "downloading" | "ready" | "failed";

export interface DownloadInfo {
  worldId: string;
  version: string;
  status: DownloadStatus;
  progress: number; // 0 - 1
  sizeMB: number;
  updatedAt: string;
  error?: string;
}

interface DownloadsState {
  packs: Record<string, DownloadInfo>;
}

const initialState: DownloadsState = {
  packs: {},
};

const downloadsSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {
    enqueueDownload: (
      state,
      action: PayloadAction<{ worldId: string; sizeMB: number; version: string }>,
    ) => {
      const { worldId, sizeMB, version } = action.payload;
      state.packs[worldId] = {
        worldId,
        sizeMB,
        version,
        status: "queued",
        progress: 0,
        updatedAt: new Date().toISOString(),
      };
    },
    setDownloadProgress: (
      state,
      action: PayloadAction<{ worldId: string; progress: number; status?: DownloadStatus }>,
    ) => {
      const { worldId, progress, status } = action.payload;
      const entry = state.packs[worldId];
      if (!entry) return;
      entry.progress = progress;
      entry.updatedAt = new Date().toISOString();
      if (status) {
        entry.status = status;
      }
    },
    markDownloadReady: (
      state,
      action: PayloadAction<{ worldId: string; version: string }>,
    ) => {
      const { worldId, version } = action.payload;
      const entry = state.packs[worldId];
      if (!entry) return;
      entry.status = "ready";
      entry.version = version;
      entry.progress = 1;
      entry.updatedAt = new Date().toISOString();
    },
    markDownloadFailed: (
      state,
      action: PayloadAction<{ worldId: string; reason: string }>,
    ) => {
      const { worldId, reason } = action.payload;
      const entry = state.packs[worldId];
      if (!entry) return;
      entry.status = "failed";
      entry.error = reason;
      entry.updatedAt = new Date().toISOString();
    },
    removeDownloadedPack: (state, action: PayloadAction<{ worldId: string }>) => {
      delete state.packs[action.payload.worldId];
    },
    resetDownloads: () => initialState,
  },
});

export const {
  enqueueDownload,
  setDownloadProgress,
  markDownloadReady,
  markDownloadFailed,
  removeDownloadedPack,
  resetDownloads,
} = downloadsSlice.actions;

export default downloadsSlice.reducer;
