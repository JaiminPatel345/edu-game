import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { IndustryDemand } from '../types';

interface IndustryHeatmapProps {
  data: IndustryDemand[];
}

export function IndustryHeatmap({ data }: IndustryHeatmapProps) {
  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-chart-2" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getDemandColor = (score: number) => {
    if (score >= 90) return 'bg-chart-2/20 border-chart-2';
    if (score >= 75) return 'bg-chart-4/20 border-chart-4';
    if (score >= 60) return 'bg-chart-3/20 border-chart-3';
    return 'bg-muted border-border';
  };

  return (
    <Card data-testid="card-industry-heatmap">
      <CardHeader>
        <CardTitle>Industry Skill Demand</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.map((item) => (
            <div
              key={item.skill}
              className={`p-4 rounded-lg border ${getDemandColor(item.demandScore)} hover-elevate transition-all`}
              data-testid={`heatmap-item-${item.skill.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{item.skill}</h4>
                {getTrendIcon(item.trendDirection)}
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold font-mono">{item.demandScore}</span>
                <span className="text-sm text-muted-foreground">demand score</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  ₹{(item.avgSalaryRange.min / 100000).toFixed(1)}L - ₹{(item.avgSalaryRange.max / 100000).toFixed(1)}L
                </p>
                <p>{item.jobs.toLocaleString()} jobs available</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
