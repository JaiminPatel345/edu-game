import { ApplicationStatusCard } from '../ApplicationStatusCard';
import type { Application, Opportunity } from '../../types';

const mockOpportunity: Opportunity = {
  id: 'opp-1',
  companyId: 'comp-1',
  company: 'TechCorp Solutions',
  title: 'Software Development Intern',
  type: 'internship',
  department: ['CS'],
  location: 'Bangalore',
  stipend: 25000,
  skills: ['React', 'Node.js'],
  description: '',
  responsibilities: [],
  requirements: [],
  ppoChance: 85,
  postedDate: '2025-01-15',
  deadline: '2025-02-28',
  responseScore: 92,
  workCultureScore: 88
};

const mockApplication: Application = {
  id: 'app-1',
  studentId: 'student-1',
  opportunityId: 'opp-1',
  opportunity: mockOpportunity,
  status: 'shortlisted',
  appliedDate: '2025-01-20',
  lastUpdated: '2025-01-25',
  matchPercentage: 82,
  skillAlignment: [
    { skill: 'React', hasSkill: true, proficiency: 85 },
    { skill: 'Node.js', hasSkill: true, proficiency: 80 },
  ]
};

export default function ApplicationStatusCardExample() {
  return (
    <div className="p-6 max-w-2xl">
      <ApplicationStatusCard 
        application={mockApplication}
        onClick={() => console.log('Application clicked')}
      />
    </div>
  );
}
