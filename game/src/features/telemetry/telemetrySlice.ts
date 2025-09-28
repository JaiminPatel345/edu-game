import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TelemetryEvent, TelemetryState } from "../../types/app";

const initialState: TelemetryState = {
  queue: [],
  syncing: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    enqueueTelemetry: (state, action: PayloadAction<TelemetryEvent>) => {
      state.queue.push(action.payload);
    },
    markSyncing: (state, action: PayloadAction<boolean>) => {
      state.syncing = action.payload;
      state.lastSyncAttempt = new Date().toISOString();
    },
    clearTelemetry: (state) => {
      state.queue = [];
      state.syncing = false;
    },
  },
});

export const { enqueueTelemetry, markSyncing, clearTelemetry } = telemetrySlice.actions;

export default telemetrySlice.reducer;
