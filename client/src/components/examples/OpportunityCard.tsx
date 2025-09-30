import { OpportunityCard } from '../OpportunityCard';
import type { Opportunity } from '../../types';

const mockOpportunity: Opportunity = {
  id: 'opp-1',
  companyId: 'comp-1',
  company: 'TechCorp Solutions',
  title: 'Software Development Intern',
  type: 'internship',
  department: ['Computer Science', 'IT'],
  location: 'Bangalore',
  stipend: 25000,
  skills: ['React', 'Node.js', 'JavaScript', 'Git', 'MongoDB'],
  description: 'Join our dynamic team',
  responsibilities: [],
  requirements: [],
  ppoChance: 85,
  postedDate: '2025-01-15',
  deadline: '2025-02-28',
  responseScore: 92,
  workCultureScore: 88
};

export default function OpportunityCardExample() {
  return (
    <div className="p-6 max-w-2xl">
      <OpportunityCard 
        opportunity={mockOpportunity}
        matchPercentage={82}
        onApply={() => console.log('Apply clicked')}
        onViewDetails={() => console.log('View details clicked')}
      />
    </div>
  );
}
