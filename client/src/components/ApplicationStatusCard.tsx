import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Calendar, CheckCircle2, Clock, XCircle, Video } from 'lucide-react';
import type { Application } from '../types';

interface ApplicationStatusCardProps {
  application: Application;
  onClick?: () => void;
}

export function ApplicationStatusCard({ application, onClick }: ApplicationStatusCardProps) {
  const statusConfig = {
    pending: { 
      label: 'Under Review', 
      color: 'bg-chart-3 text-white hover:bg-chart-3',
      icon: Clock 
    },
    shortlisted: { 
      label: 'Shortlisted', 
      color: 'bg-chart-4 text-white hover:bg-chart-4',
      icon: CheckCircle2 
    },
    rejected: { 
      label: 'Not Selected', 
      color: 'bg-destructive text-destructive-foreground hover:bg-destructive',
      icon: XCircle 
    },
    interview_scheduled: { 
      label: 'Interview Scheduled', 
      color: 'bg-primary text-primary-foreground hover:bg-primary',
      icon: Video 
    },
    offered: { 
      label: 'Offer Received', 
      color: 'bg-chart-2 text-white hover:bg-chart-2',
      icon: CheckCircle2 
    },
    accepted: { 
      label: 'Offer Accepted', 
      color: 'bg-chart-2 text-white hover:bg-chart-2',
      icon: CheckCircle2 
    },
  };

  const config = statusConfig[application.status];
  const StatusIcon = config.icon;

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all"
      onClick={onClick}
      data-testid={`card-application-${application.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate" data-testid="text-application-title">
                {application.opportunity.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">{application.opportunity.company}</p>
            </div>
          </div>
          <Badge className={config.color} data-testid={`badge-status-${application.status}`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
          </div>
          <Badge variant="outline" className="font-mono">
            {application.matchPercentage}% Match
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {application.skillAlignment.slice(0, 3).map((alignment) => (
            <Badge 
              key={alignment.skill}
              variant={alignment.hasSkill ? 'secondary' : 'outline'}
              className="text-xs"
            >
              {alignment.skill}
            </Badge>
          ))}
          {application.skillAlignment.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{application.skillAlignment.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
