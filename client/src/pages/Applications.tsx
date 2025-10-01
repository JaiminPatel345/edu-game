import { useState, useEffect } from 'react';
import { ApplicationStatusCard } from '@/components/ApplicationStatusCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { api } from '../api';
import type { Application } from '../types';

export default function Applications() {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      const data = await api.getApplications('student-1');
      setApplications(data);
      setIsLoading(false);
    };
    fetchApplications();
  }, []);

  const getFilteredApplications = () => {
    if (activeTab === 'all') return applications;
    if (activeTab === 'active') {
      return applications.filter(app => 
        ['pending', 'shortlisted', 'interview_scheduled'].includes(app.status)
      );
    }
    if (activeTab === 'completed') {
      return applications.filter(app => 
        ['rejected', 'offered', 'accepted'].includes(app.status)
      );
    }
    return applications;
  };

  const filteredApplications = getFilteredApplications();

  const statusCounts = {
    all: applications.length,
    active: applications.filter(app => 
      ['pending', 'shortlisted', 'interview_scheduled'].includes(app.status)
    ).length,
    completed: applications.filter(app => 
      ['rejected', 'offered', 'accepted'].includes(app.status)
    ).length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading your applications..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-applications-title">My Applications</h1>
          <p className="text-muted-foreground mt-1">
            Track all your job applications in one place
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold font-mono">{applications.length + 5}</p>
              <p className="text-sm text-muted-foreground">Total Applied</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/20">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-chart-3" />
            <div>
              <p className="text-2xl font-bold font-mono">
                {applications.filter(a => a.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-chart-2" />
            <div>
              <p className="text-2xl font-bold font-mono">
                {applications.filter(a => ['shortlisted', 'interview_scheduled', 'offered'].includes(a.status)).length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold font-mono">
                {applications.filter(a => a.status === 'rejected').length}
              </p>
              <p className="text-sm text-muted-foreground">Not Selected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all-applications">
            All
            <Badge variant="secondary" className="ml-2">{statusCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" data-testid="tab-active-applications">
            Active
            <Badge variant="secondary" className="ml-2">{statusCounts.active}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed-applications">
            Completed
            <Badge variant="secondary" className="ml-2">{statusCounts.completed}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((app) => (
              <ApplicationStatusCard
                key={app.id}
                application={app}
                onClick={() => console.log('View application:', app.id)}
              />
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">No applications found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {activeTab === 'all' 
                  ? "You haven't applied to any opportunities yet" 
                  : `No ${activeTab} applications`}
              </p>
              <Button className="mt-4" onClick={() => window.location.href = '/opportunities'}>
                Browse Opportunities
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
