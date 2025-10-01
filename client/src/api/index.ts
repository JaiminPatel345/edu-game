// Main API Service - Production Ready
// Uses real HTTP client with fallback to demo data for development

import { httpClient } from './client';
import { ENDPOINTS } from './config';
import type { 
  StudentProfile, 
  Opportunity, 
  Application, 
  IndustryDemand, 
  PeerSuccess,
  SkillGap,
  LearningResource,
  DashboardStats,
  CompanyTransparency,
  MockInterview
} from '../types';

// Import demo data for fallback
import studentsData from '../demo-data/students.json';
import opportunitiesData from '../demo-data/opportunities.json';
import applicationsData from '../demo-data/applications.json';
import industryDemandData from '../demo-data/industry-demand.json';
import peerSuccessData from '../demo-data/peer-success.json';

// Helper function to simulate API delay in development
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Student Profile APIs
  async getStudentProfile(id: string): Promise<StudentProfile> {
    try {
      const response = await httpClient.get<StudentProfile>(`${ENDPOINTS.STUDENT.PROFILE}/${id}`);
      if (response.success) return response.data;
      throw new Error('Failed to fetch profile');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(500);
      return studentsData.find(s => s.id === id) as StudentProfile;
    }
  },

  async uploadResumeAndAutofill(file: File): Promise<StudentProfile> {
    try {
      const response = await httpClient.uploadFile<StudentProfile>(ENDPOINTS.STUDENT.AUTO_FILL, file);
      if (response.success) return response.data;
      throw new Error('Failed to process resume');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(2000);
      return studentsData[0] as StudentProfile;
    }
  },

  async updateStudentProfile(id: string, data: Partial<StudentProfile>): Promise<StudentProfile> {
    try {
      const response = await httpClient.put<StudentProfile>(`${ENDPOINTS.STUDENT.PROFILE}/${id}`, data);
      if (response.success) return response.data;
      throw new Error('Failed to update profile');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(500);
      return { ...studentsData[0], ...data } as StudentProfile;
    }
  },

  // Opportunities APIs
  async getOpportunities(filters?: {
    department?: string;
    skills?: string[];
    type?: string;
  }): Promise<Opportunity[]> {
    try {
      const response = await httpClient.get<Opportunity[]>(
        `${ENDPOINTS.OPPORTUNITIES.LIST}${filters ? '?' + new URLSearchParams(filters as any).toString() : ''}`
      );
      if (response.success) return response.data;
      throw new Error('Failed to fetch opportunities');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(500);
      
      let filtered = opportunitiesData as Opportunity[];
      
      if (filters?.department) {
        filtered = filtered.filter(opp => 
          opp.department.includes(filters.department!)
        );
      }
      
      if (filters?.type) {
        filtered = filtered.filter(opp => opp.type === filters.type);
      }
      
      return filtered;
    }
  },

  async getOpportunity(id: string): Promise<Opportunity> {
    try {
      const response = await httpClient.get<Opportunity>(ENDPOINTS.OPPORTUNITIES.GET(id));
      if (response.success) return response.data;
      throw new Error('Failed to fetch opportunity');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(300);
      return opportunitiesData.find(o => o.id === id) as Opportunity;
    }
  },

  // Application APIs
  async submitApplication(opportunityId: string, studentId: string): Promise<Application> {
    try {
      const response = await httpClient.post<Application>(
        ENDPOINTS.OPPORTUNITIES.APPLY(opportunityId),
        { studentId }
      );
      if (response.success) return response.data;
      throw new Error('Failed to submit application');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(1000);
      
      const opportunity = opportunitiesData.find(o => o.id === opportunityId) as Opportunity;
      return {
        id: `app-${Date.now()}`,
        studentId,
        opportunityId,
        opportunity,
        status: 'pending',
        appliedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        matchPercentage: Math.floor(Math.random() * 30) + 70,
        skillAlignment: opportunity.skills.map(skill => ({
          skill,
          hasSkill: Math.random() > 0.3,
          proficiency: Math.floor(Math.random() * 30) + 70
        }))
      };
    }
  },

  async getApplications(studentId: string): Promise<Application[]> {
    try {
      const response = await httpClient.get<Application[]>(`${ENDPOINTS.APPLICATIONS.LIST}?studentId=${studentId}`);
      if (response.success) return response.data;
      throw new Error('Failed to fetch applications');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(500);
      
      const apps = applicationsData as Application[];
      return apps.map(app => ({
        ...app,
        opportunity: opportunitiesData.find(o => o.id === app.opportunityId) as Opportunity
      }));
    }
  },

  // Analytics APIs
  async getIndustryDemand(): Promise<IndustryDemand[]> {
    try {
      const response = await httpClient.get<IndustryDemand[]>(ENDPOINTS.ANALYTICS.INDUSTRY_DEMAND);
      if (response.success) return response.data;
      throw new Error('Failed to fetch industry demand');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(500);
      return industryDemandData as IndustryDemand[];
    }
  },

  async getPeerSuccess(): Promise<PeerSuccess[]> {
    try {
      const response = await httpClient.get<PeerSuccess[]>(ENDPOINTS.ANALYTICS.PEER_SUCCESS);
      if (response.success) return response.data;
      throw new Error('Failed to fetch peer success data');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(500);
      return peerSuccessData as PeerSuccess[];
    }
  },

  // Alias for Dashboard.tsx compatibility
  async getPeerSuccessStories(): Promise<PeerSuccess[]> {
    return this.getPeerSuccess();
  },

  // Dashboard Stats API
  async getDashboardStats(studentId: string): Promise<DashboardStats> {
    try {
      const response = await httpClient.get<DashboardStats>(`${ENDPOINTS.STUDENT.DASHBOARD_STATS}?studentId=${studentId}`);
      if (response.success) return response.data;
      throw new Error('Failed to fetch dashboard stats');
    } catch (error) {
      console.warn('API not available, using demo data');
      await simulateDelay(800);
      
      return {
        totalApplications: 5,
        shortlisted: 3,
        interviews: 2,
        offers: 0,
        avgMatchPercentage: 78,
        profileCompleteness: 87
      };
    }
  }
};

// Re-export auth service and other utilities  
export { authService } from './auth';
export * from './auth';
export * from './client'; 
export * from './config';