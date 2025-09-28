import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import profileReducer from "../features/profile/profileSlice";
import settingsReducer from "../features/settings/settingsSlice";
import progressReducer from "../features/progress/progressSlice";
import downloadsReducer from "../features/downloads/downloadsSlice";
import rewardsReducer from "../features/rewards/rewardsSlice";
import telemetryReducer from "../features/telemetry/telemetrySlice";

const rootReducer = combineReducers({
  profile: profileReducer,
  settings: settingsReducer,
  progress: progressReducer,
  downloads: downloadsReducer,
  rewards: rewardsReducer,
  telemetry: telemetryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile", "settings", "progress", "downloads", "rewards"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
