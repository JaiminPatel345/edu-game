// API layer for easy backend integration
// Currently fetches from demo-data, can be easily switched to real API endpoints

import studentsData from '../demo-data/students.json';
import opportunitiesData from '../demo-data/opportunities.json';
import applicationsData from '../demo-data/applications.json';
import industryDemandData from '../demo-data/industry-demand.json';
import peerSuccessData from '../demo-data/peer-success.json';
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

// Helper function to simulate API delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Student Profile APIs
  async getStudentProfile(id: string): Promise<StudentProfile> {
    await sleep(500);
    return studentsData.find(s => s.id === id) as StudentProfile;
  },

  async uploadResumeAndAutofill(file: File): Promise<StudentProfile> {
    // Simulate 2-second processing for resume autofill
    await sleep(2000);
    // Return pre-populated demo data
    return studentsData[0] as StudentProfile;
  },

  async updateStudentProfile(id: string, data: Partial<StudentProfile>): Promise<StudentProfile> {
    await sleep(500);
    return { ...studentsData[0], ...data } as StudentProfile;
  },

  // Opportunities APIs
  async getOpportunities(filters?: {
    department?: string;
    skills?: string[];
    type?: string;
  }): Promise<Opportunity[]> {
    await sleep(500);
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
  },

  async getOpportunity(id: string): Promise<Opportunity> {
    await sleep(300);
    return opportunitiesData.find(o => o.id === id) as Opportunity;
  },

  // Application APIs
  async submitApplication(opportunityId: string, studentId: string): Promise<Application> {
    await sleep(1000);
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
  },

  async getApplications(studentId: string): Promise<Application[]> {
    await sleep(500);
    const apps = applicationsData as Application[];
    return apps.map(app => ({
      ...app,
      opportunity: opportunitiesData.find(o => o.id === app.opportunityId) as Opportunity
    }));
  },

  async getApplicationById(id: string): Promise<Application> {
    await sleep(300);
    const app = applicationsData.find(a => a.id === id) as Application;
    return {
      ...app,
      opportunity: opportunitiesData.find(o => o.id === app.opportunityId) as Opportunity
    };
  },

  // Industry Demand APIs
  async getIndustryDemand(): Promise<IndustryDemand[]> {
    await sleep(500);
    return industryDemandData as IndustryDemand[];
  },

  // Peer Success APIs
  async getPeerSuccessStories(): Promise<PeerSuccess[]> {
    await sleep(500);
    return peerSuccessData as PeerSuccess[];
  },

  // Skill Gap Analysis APIs
  async analyzeSkillGaps(studentId: string, opportunityId?: string): Promise<SkillGap[]> {
    await sleep(800);
    const demoGaps: SkillGap[] = [
      {
        skill: 'Docker',
        importance: 'high',
        learningResources: [
          {
            id: 'res-1',
            title: 'Docker Mastery Course',
            provider: 'Udemy',
            type: 'course',
            url: '#',
            duration: '12 hours',
            free: false
          },
          {
            id: 'res-2',
            title: 'Docker Official Documentation',
            provider: 'Docker',
            type: 'documentation',
            url: '#',
            free: true
          }
        ]
      },
      {
        skill: 'Kubernetes',
        importance: 'medium',
        learningResources: [
          {
            id: 'res-3',
            title: 'Kubernetes for Beginners',
            provider: 'SWAYAM',
            type: 'government_scheme',
            url: '#',
            duration: '8 weeks',
            free: true
          }
        ]
      }
    ];
    return demoGaps;
  },

  // Mock Interview APIs
  async getMockInterviewQuestions(type: 'technical' | 'hr' | 'behavioral'): Promise<MockInterview> {
    await sleep(1000);
    const questions = {
      technical: [
        { id: 'q1', question: 'Explain the concept of closures in JavaScript' },
        { id: 'q2', question: 'What is the difference between SQL and NoSQL databases?' },
        { id: 'q3', question: 'Describe the SOLID principles in OOP' }
      ],
      hr: [
        { id: 'q1', question: 'Tell me about yourself' },
        { id: 'q2', question: 'Why do you want to join our company?' },
        { id: 'q3', question: 'Where do you see yourself in 5 years?' }
      ],
      behavioral: [
        { id: 'q1', question: 'Describe a challenging project you worked on' },
        { id: 'q2', question: 'How do you handle conflicts in a team?' },
        { id: 'q3', question: 'Tell me about a time you failed' }
      ]
    };

    return {
      id: `interview-${Date.now()}`,
      studentId: 'student-1',
      type,
      questions: questions[type].map(q => ({ ...q, answer: '', feedback: '', score: 0 }))
    };
  },

  async submitMockInterviewAnswers(interviewId: string, answers: any): Promise<{ score: number; feedback: string }> {
    await sleep(1500);
    return {
      score: Math.floor(Math.random() * 30) + 70,
      feedback: 'Good understanding of concepts. Work on providing more real-world examples and improving communication clarity.'
    };
  },

  // Dashboard APIs
  async getDashboardStats(studentId: string): Promise<DashboardStats> {
    await sleep(500);
    return {
      totalApplications: 12,
      shortlisted: 5,
      interviews: 3,
      offers: 1,
      avgMatchPercentage: 78,
      profileCompleteness: 85
    };
  },

  // Company Transparency APIs
  async getCompanyTransparency(companyId: string): Promise<CompanyTransparency> {
    await sleep(500);
    return {
      companyId,
      company: 'TechCorp Solutions',
      responseScore: 92,
      workCultureScore: 88,
      averageResponseTime: 3,
      alumniReviews: [
        {
          id: 'rev-1',
          alumniName: 'Sneha Kulkarni',
          role: 'Software Engineer',
          joinDate: '2022-07',
          rating: 4.5,
          review: 'Great learning experience with supportive team members'
        }
      ],
      placementHistory: [
        { year: 2024, studentsPlaced: 25, averagePackage: 850000 },
        { year: 2023, studentsPlaced: 20, averagePackage: 780000 }
      ]
    };
  }
};
