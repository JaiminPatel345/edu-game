import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Building2, MapPin, Calendar, TrendingUp, Briefcase, CheckCircle2 } from 'lucide-react';
import { ProfileMatchBadge } from './ProfileMatchBadge';
import { SkillBadge } from './SkillBadge';
import type { Opportunity } from '../types';
import type { RootState } from '../store';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addApplication } from '../store';
import { useToast } from '@/hooks/use-toast';

interface OpportunityCardProps {
  opportunity: Opportunity;
  matchPercentage?: number;
  onViewDetails?: () => void;
}

export function OpportunityCard({ opportunity, matchPercentage, onViewDetails }: OpportunityCardProps) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const appliedOpportunities = useSelector((state: RootState) => state.app.appliedOpportunities);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Check if this opportunity is already applied to using array includes
  useEffect(() => {
    const isApplied = appliedOpportunities.includes(opportunity.id);
    setHasApplied(isApplied);
  }, [appliedOpportunities, opportunity.id]);

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasApplied || isApplying) return;
    
    setIsApplying(true);
    
    // Show loader for 1 second
    setTimeout(() => {
      try {
        // Create mock application without API call
        const newApplication = {
          id: `app-${Date.now()}`,
          studentId: 'student-1',
          opportunityId: opportunity.id,
          opportunity,
          status: 'pending' as const,
          appliedDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          matchPercentage: Math.floor(Math.random() * 30) + 70,
          skillAlignment: opportunity.skills.map(skill => ({
            skill,
            hasSkill: Math.random() > 0.3,
            proficiency: Math.floor(Math.random() * 30) + 70
          }))
        };
        
        dispatch(addApplication(newApplication));
        setHasApplied(true);
        toast({
          title: 'Application Submitted Successfully! 🎉',
          description: 'Your application has been submitted. You will hear back soon.',
        });
      } catch (error) {
        console.log(error);
        toast({
          title: 'Application Failed',
          description: 'There was an error submitting your application.',
          variant: 'destructive',
        });
      } finally {
        setIsApplying(false);
      }
    }, 1000);
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
            variant={hasApplied ? "secondary" : "default"}
            className="flex-1 transition-all duration-200"
            onClick={handleApply}
            disabled={isApplying || hasApplied}
            data-testid="button-apply"
          >
            {isApplying ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Applying...</span>
              </>
            ) : hasApplied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                <span className="animate-in fade-in-0 duration-500">Applied</span>
              </>
            ) : (
              'Apply Now'
            )}
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
