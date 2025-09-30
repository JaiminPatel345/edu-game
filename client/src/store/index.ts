import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, StudentProfile, Opportunity, Application } from '../types';

interface AppState {
  user: User | null;
  currentRole: 'student' | 'faculty' | 'placement_cell' | 'recruiter';
  studentProfile: StudentProfile | null;
  opportunities: Opportunity[];
  applications: Application[];
  theme: 'light' | 'dark';
}

const initialState: AppState = {
  user: null,
  currentRole: 'student',
  studentProfile: null,
  opportunities: [],
  applications: [],
  theme: 'light'
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setCurrentRole: (state, action: PayloadAction<'student' | 'faculty' | 'placement_cell' | 'recruiter'>) => {
      state.currentRole = action.payload;
    },
    setStudentProfile: (state, action: PayloadAction<StudentProfile | null>) => {
      state.studentProfile = action.payload;
    },
    setOpportunities: (state, action: PayloadAction<Opportunity[]>) => {
      state.opportunities = action.payload;
    },
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const { 
  setUser, 
  setCurrentRole, 
  setStudentProfile, 
  setOpportunities, 
  setApplications,
  toggleTheme
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
