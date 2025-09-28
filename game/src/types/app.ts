export type LocaleCode = "en" | "hi" | "pa" | "gu";

export type LocalizedText = Record<LocaleCode | string, string>;

export type Stream = "science" | "commerce";
export type ScienceBranch = "math" | "bio" | "both";

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  language: LocaleCode;
  grade: 6 | 7 | 8 | 9 | 10 | 11 | 12;
  stream: Stream;
  scienceBranch: ScienceBranch | null;
  schoolCode?: string;
  classCode?: string;
  createdAt: string;
  lastSyncedAt?: string;
}

export interface Objective {
  conceptKey: string;
  description: LocalizedText;
}

export interface Hint {
  id: string;
  text: LocalizedText;
  cost: number;
}

export interface RewardBundle {
  coins: number;
  badges: string[];
  gear?: string[];
}

export interface MasteryFormula {
  components: ("accuracy" | "time" | "hintUsage")[];
  weights: Partial<Record<"accuracy" | "time" | "hintUsage", number>>;
  thresholds: {
    advance: number;
    badge: number;
  };
}

export type QuizOption = {
  id: string;
  text: LocalizedText;
  isCorrect: boolean;
};

export interface QuizItem {
  id: string;
  prompt: LocalizedText;
  rationale: LocalizedText;
  options: QuizOption[];
  skillTag: string;
  timeLimitSeconds?: number;
}

export interface QuizDefinition {
  id: string;
  title: LocalizedText;
  levelId: string;
  items: QuizItem[];
}

export interface LevelTask {
  id: string;
  type:
    | "drag-drop"
    | "arrangement"
    | "simulation"
    | "calculation"
    | "scenario";
  goal: LocalizedText;
  successCriteria: LocalizedText;
  phaserScene: string;
  hints: Hint[];
}

export interface LevelDefinition {
  id: string;
  sequence: number;
  worldId: string;
  slug: string;
  gradeBand: "6-8" | "9-10" | "11-12";
  stream: Stream;
  branch?: ScienceBranch | "general";
  title: LocalizedText;
  summary: LocalizedText;
  objectives: Objective[];
  prerequisites: string[];
  learnKey: string;
  codexEntryId: string;
  rewards: RewardBundle;
  hintCost: number;
  masteryFormula: MasteryFormula;
  tasks: LevelTask[];
  quizId: string;
  estimatedDurationMinutes: number;
}

export interface WorldDefinition {
  id: string;
  slug: string;
  title: LocalizedText;
  gradeBand: "6-8" | "9-10" | "11-12";
  stream: Stream;
  branch?: ScienceBranch | "general";
  accentColor: string;
  summary: LocalizedText;
  icon: string;
  offlineSizeMB: number;
  mentorIntroKey: string;
  prerequisites: string[];
  levels: LevelDefinition[];
}

export interface CodexEntry {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  keyIdeas: LocalizedText[];
  formulas?: { label: LocalizedText; expression: string }[];
  glossary: { term: LocalizedText; definition: LocalizedText }[];
  practicePrompts: LocalizedText[];
  worldId: string;
  levelId: string;
}

export interface LevelProgress {
  levelId: string;
  status: "locked" | "unlocked" | "in-progress" | "completed";
  stars: number;
  masteryScore: number;
  bestTimeMs?: number;
  attempts: number;
  lastPlayedAt?: string;
  hintsUsed: number;
  coinsEarned: number;
}

export interface WorldProgress {
  worldId: string;
  levels: Record<string, LevelProgress>;
  downloaded: boolean;
  downloadedVersion: string | null;
}

export interface RewardsState {
  coins: number;
  badges: string[];
  streakDays: number;
  lastPlayedDate?: string;
  gearUnlocked: string[];
  pendingMailboxItems: MailboxItem[];
}

export interface MailboxItem {
  id: string;
  type: "assignment" | "reward" | "announcement";
  title: LocalizedText;
  body: LocalizedText;
  createdAt: string;
  read: boolean;
}

export interface SettingsState {
  locale: LocaleCode;
  showCaptions: boolean;
  playAudioNarration: boolean;
  askNanoOnline: boolean;
  offlineMode: boolean;
  quality: "low" | "medium" | "high";
}

export interface TelemetryEvent {
  type:
    | "session_start"
    | "level_enter"
    | "level_complete"
    | "puzzle_interaction"
    | "quiz_submit"
    | "ask_nano"
    | "sync_complete";
  timestamp: string;
  payload: Record<string, unknown>;
}

export interface TelemetryState {
  queue: TelemetryEvent[];
  syncing: boolean;
  lastSyncAttempt?: string;
}
