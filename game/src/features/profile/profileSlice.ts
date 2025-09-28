import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  Profile,
  LocaleCode,
  Stream,
  ScienceBranch,
} from "../../types/app";

export interface ProfileState {
  profile: Profile | null;
  hasCompletedOnboarding: boolean;
}

const initialState: ProfileState = {
  profile: null,
  hasCompletedOnboarding: false,
};

interface CreateProfilePayload {
  name: string;
  language: LocaleCode;
  grade: Profile["grade"];
  stream: Stream;
  scienceBranch: ScienceBranch | null;
  schoolCode?: string;
  classCode?: string;
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    createProfile: (state, action: PayloadAction<CreateProfilePayload>) => {
      const now = new Date().toISOString();
      state.profile = {
        id: nanoid(),
        avatar: "default",
        createdAt: now,
        ...action.payload,
      } satisfies Profile;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (!state.profile) return;
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
    },
    completeOnboarding: (state) => {
      state.hasCompletedOnboarding = true;
    },
    resetProfile: () => initialState,
  },
});

export const { createProfile, updateProfile, completeOnboarding, resetProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
