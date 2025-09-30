import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Calendar, TrendingUp, Briefcase } from 'lucide-react';
import { ProfileMatchBadge } from './ProfileMatchBadge';
import { SkillBadge } from './SkillBadge';
import type { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  matchPercentage?: number;
  onApply?: () => void;
  onViewDetails?: () => void;
}

export function OpportunityCard({ opportunity, matchPercentage, onApply, onViewDetails }: OpportunityCardProps) {
  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all"
      onClick={onViewDetails}
      data-testid={`card-opportunity-${opportunity.id}`}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate" data-testid="text-opportunity-title">
                {opportunity.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{opportunity.company}</p>
            </div>
          </div>
          {matchPercentage && <ProfileMatchBadge percentage={matchPercentage} />}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span className="capitalize">{opportunity.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {opportunity.type === 'internship' ? 'Stipend' : 'Salary'}
            </p>
            <p className="text-xl font-bold font-mono text-foreground">
              {formatSalary(opportunity.stipend || opportunity.salary || 0)}
              {opportunity.type === 'internship' && '/month'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">PPO Chance</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-chart-2" />
              <p className="text-lg font-bold font-mono">{opportunity.ppoChance}%</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {opportunity.skills.slice(0, 4).map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
          {opportunity.skills.length > 4 && (
            <Badge variant="outline">+{opportunity.skills.length - 4} more</Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onApply?.();
            }}
            data-testid="button-apply"
          >
            Apply Now
          </Button>
          <Button 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
            }}
            data-testid="button-view-details"
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
