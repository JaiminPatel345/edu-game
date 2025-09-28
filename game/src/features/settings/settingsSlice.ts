import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LocaleCode, SettingsState } from "../../types/app";

const initialState: SettingsState = {
  locale: "en",
  showCaptions: true,
  playAudioNarration: true,
  askNanoOnline: true,
  offlineMode: false,
  quality: "medium",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<LocaleCode>) => {
      state.locale = action.payload;
    },
    toggleCaptions: (state) => {
      state.showCaptions = !state.showCaptions;
    },
    toggleNarration: (state) => {
      state.playAudioNarration = !state.playAudioNarration;
    },
    setAskNanoOnline: (state, action: PayloadAction<boolean>) => {
      state.askNanoOnline = action.payload;
    },
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.offlineMode = action.payload;
    },
    setQuality: (state, action: PayloadAction<SettingsState["quality"]>) => {
      state.quality = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setLocale,
  toggleCaptions,
  toggleNarration,
  setAskNanoOnline,
  setOfflineMode,
  setQuality,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
