import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MailboxItem, RewardsState } from "../../types/app";

const initialState: RewardsState = {
  coins: 0,
  badges: [],
  streakDays: 0,
  gearUnlocked: [],
  pendingMailboxItems: [],
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    },
    consumeCoins: (state, action: PayloadAction<number>) => {
      state.coins = Math.max(0, state.coins - action.payload);
    },
    grantBadge: (state, action: PayloadAction<string>) => {
      if (!state.badges.includes(action.payload)) {
        state.badges.push(action.payload);
      }
    },
    updateStreak: (state, action: PayloadAction<{ date: string }>) => {
      const today = new Date().toISOString().split("T")[0];
      const lastPlayed = state.lastPlayedDate?.split("T")[0];
      if (lastPlayed === today) return;
      if (lastPlayed) {
        const previous = new Date(state.lastPlayedDate!);
        const diff = Math.floor(
          (new Date(action.payload.date).getTime() - previous.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        state.streakDays = diff === 1 ? state.streakDays + 1 : 1;
      } else {
        state.streakDays = 1;
      }
      state.lastPlayedDate = action.payload.date;
    },
    unlockGear: (state, action: PayloadAction<string>) => {
      if (!state.gearUnlocked.includes(action.payload)) {
        state.gearUnlocked.push(action.payload);
      }
    },
    pushMailboxItem: (state, action: PayloadAction<MailboxItem>) => {
      state.pendingMailboxItems.unshift(action.payload);
    },
    markMailboxItemRead: (state, action: PayloadAction<string>) => {
      const item = state.pendingMailboxItems.find((m) => m.id === action.payload);
      if (item) {
        item.read = true;
      }
    },
    clearRewards: () => initialState,
  },
});

export const {
  addCoins,
  consumeCoins,
  grantBadge,
  updateStreak,
  unlockGear,
  pushMailboxItem,
  markMailboxItemRead,
  clearRewards,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
