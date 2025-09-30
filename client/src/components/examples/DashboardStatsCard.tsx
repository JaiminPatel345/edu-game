import { DashboardStatsCard } from '../DashboardStatsCard';
import { FileText, CheckCircle2, Video, Award } from 'lucide-react';

export default function DashboardStatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <DashboardStatsCard
        title="Applications"
        value={12}
        icon={FileText}
        trend={{ value: 15, isPositive: true }}
        color="primary"
      />
      <DashboardStatsCard
        title="Shortlisted"
        value={5}
        icon={CheckCircle2}
        color="chart-2"
      />
      <DashboardStatsCard
        title="Interviews"
        value={3}
        icon={Video}
        color="chart-4"
      />
      <DashboardStatsCard
        title="Offers"
        value={1}
        icon={Award}
        color="chart-3"
      />
    </div>
  );
}
