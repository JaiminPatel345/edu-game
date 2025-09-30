import { IndustryHeatmap } from '../IndustryHeatmap';
import type { IndustryDemand } from '../../types';

const mockData: IndustryDemand[] = [
  {
    skill: 'React',
    demandScore: 95,
    trendDirection: 'up',
    avgSalaryRange: { min: 600000, max: 1500000 },
    jobs: 2500,
    region: 'All India'
  },
  {
    skill: 'Python',
    demandScore: 92,
    trendDirection: 'up',
    avgSalaryRange: { min: 500000, max: 1400000 },
    jobs: 2800,
  },
  {
    skill: 'Node.js',
    demandScore: 85,
    trendDirection: 'stable',
    avgSalaryRange: { min: 550000, max: 1300000 },
    jobs: 1800,
  }
];

export default function IndustryHeatmapExample() {
  return (
    <div className="p-6 max-w-4xl">
      <IndustryHeatmap data={mockData} />
    </div>
  );
}
