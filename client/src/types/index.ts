export type UserRole = 'student' | 'faculty' | 'placement_cell' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: number;
  cgpa: number;
  skills: string[];
  resume?: string;
  coverLetter?: string;
  projects: Project[];
  certifications: Certification[];
  academicRecords: AcademicRecord[];
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verified: boolean;
}

export interface AcademicRecord {
  id: string;
  degree: string;
  institution: string;
  year: number;
  score: number;
  scoreType: 'CGPA' | 'Percentage';
}

export interface Opportunity {
  id: string;
  companyId: string;
  company: string;
  companyLogo?: string;
  title: string;
  type: 'internship' | 'full-time' | 'part-time';
  department: string[];
  location: string;
  stipend?: number;
  salary?: number;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  ppoChance: number;
  postedDate: string;
  deadline: string;
  responseScore: number;
  workCultureScore: number;
}

export interface Application {
  id: string;
  studentId: string;
  opportunityId: string;
  opportunity: Opportunity;
  status: 'pending' | 'shortlisted' | 'rejected' | 'interview_scheduled' | 'offered' | 'accepted';
  appliedDate: string;
  lastUpdated: string;
  matchPercentage: number;
  skillAlignment: SkillAlignment[];
}

export interface SkillAlignment {
  skill: string;
  hasSkill: boolean;
  proficiency?: number;
}

export interface MockInterview {
  id: string;
  studentId: string;
  type: 'technical' | 'hr' | 'behavioral';
  questions: InterviewQuestion[];
  completedAt?: string;
  score?: number;
  feedback?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer?: string;
  feedback?: string;
  score?: number;
}

export interface SkillGap {
  skill: string;
  importance: 'high' | 'medium' | 'low';
  learningResources: LearningResource[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'tutorial' | 'documentation' | 'government_scheme';
  url: string;
  duration?: string;
  free: boolean;
}

export interface CompanyTransparency {
  companyId: string;
  company: string;
  responseScore: number;
  workCultureScore: number;
  averageResponseTime: number;
  alumniReviews: AlumniReview[];
  placementHistory: PlacementHistory[];
}

export interface AlumniReview {
  id: string;
  alumniName: string;
  role: string;
  joinDate: string;
  rating: number;
  review: string;
  avatar?: string;
}

export interface PlacementHistory {
  year: number;
  studentsPlaced: number;
  averagePackage: number;
}

export interface PeerSuccess {
  id: string;
  studentName: string;
  branch: string;
  company: string;
  role: string;
  package: number;
  year: number;
  pathway: PathwayStep[];
  avatar?: string;
}

export interface PathwayStep {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'skill' | 'project' | 'certification' | 'achievement';
}

export interface IndustryDemand {
  skill: string;
  demandScore: number;
  trendDirection: 'up' | 'down' | 'stable';
  avgSalaryRange: {
    min: number;
    max: number;
  };
  jobs: number;
  region?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application_update' | 'interview_reminder' | 'skill_recommendation' | 'hr_followup';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalApplications: number;
  shortlisted: number;
  interviews: number;
  offers: number;
  avgMatchPercentage: number;
  profileCompleteness: number;
}

export interface RejectionAnalysis {
  applicationId: string;
  opportunity: Opportunity;
  reasons: string[];
  improvementRoadmap: ImprovementStep[];
}

export interface ImprovementStep {
  id: string;
  category: 'skills' | 'projects' | 'experience' | 'certifications';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  resources: LearningResource[];
}
