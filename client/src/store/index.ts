import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, StudentProfile, Opportunity, Application } from '../types';

interface AppState {
  user: User | null;
  currentRole: 'student' | 'faculty' | 'placement_cell' | 'recruiter';
  studentProfile: StudentProfile | null;
  opportunities: Opportunity[];
  applications: Application[];
  theme: 'light' | 'dark';
  appliedOpportunities: string[]; // Track applied opportunity IDs for quick lookup
}

const initialState: AppState = {
  user: null,
  currentRole: 'student',
  studentProfile: null,
  opportunities: [],
  applications: [],
  theme: 'light',
  appliedOpportunities: []
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      // Clear applications when user logs in to start fresh
      if (action.payload) {
        state.applications = [];
        state.appliedOpportunities = [];
      }
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
      // Update appliedOpportunities array for quick lookup - handles empty arrays correctly
      state.appliedOpportunities = action.payload.map(app => app.opportunityId);
    },
    addApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload);
      // Add to appliedOpportunities array if not already present
      if (!state.appliedOpportunities.includes(action.payload.opportunityId)) {
        state.appliedOpportunities.push(action.payload.opportunityId);
      }
    },
    clearApplications: (state) => {
      state.applications = [];
      state.appliedOpportunities = [];
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
  addApplication,
  clearApplications,
  toggleTheme
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
