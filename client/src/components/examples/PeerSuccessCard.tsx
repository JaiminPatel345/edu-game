import { PeerSuccessCard } from '../PeerSuccessCard';
import type { PeerSuccess } from '../../types';

const mockPeer: PeerSuccess = {
  id: 'peer-1',
  studentName: 'Priya Deshmukh',
  branch: 'Computer Science',
  company: 'Google',
  role: 'Software Engineer',
  package: 2800000,
  year: 2024,
  pathway: [
    {
      id: 'step-1',
      title: 'Started learning React',
      description: 'Completed React fundamentals course',
      date: '2023-06',
      type: 'skill'
    },
    {
      id: 'step-2',
      title: 'Built E-commerce project',
      description: 'Full-stack MERN application',
      date: '2023-09',
      type: 'project'
    },
  ]
};

export default function PeerSuccessCardExample() {
  return (
    <div className="p-6 max-w-md">
      <PeerSuccessCard 
        peer={mockPeer}
        onClick={() => console.log('Peer clicked')}
      />
    </div>
  );
}
