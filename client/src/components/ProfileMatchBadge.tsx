import { Badge } from '@/components/ui/badge';

interface ProfileMatchBadgeProps {
  percentage: number;
  size?: 'sm' | 'default';
}

export function ProfileMatchBadge({ percentage, size = 'default' }: ProfileMatchBadgeProps) {
  const getColor = () => {
    if (percentage >= 80) return 'bg-chart-2 text-white hover:bg-chart-2';
    if (percentage >= 50) return 'bg-chart-3 text-white hover:bg-chart-3';
    return 'bg-destructive text-destructive-foreground hover:bg-destructive';
  };

  return (
    <Badge 
      className={`${getColor()} font-mono font-medium`}
      data-testid={`badge-match-${percentage}`}
    >
      {percentage}% Match
    </Badge>
  );
}
