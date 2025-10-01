import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardStatsCard } from '@/components/DashboardStatsCard';
import { OpportunityCard } from '@/components/OpportunityCard';
import { ApplicationStatusCard } from '@/components/ApplicationStatusCard';
import { IndustryHeatmap } from '@/components/IndustryHeatmap';
import { PeerSuccessCard } from '@/components/PeerSuccessCard';
import { Feedback } from '@/components/ui/feedback';
import { FileText, CheckCircle2, Video, Award, TrendingUp, Users, UserCheck, BarChart3, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '../api';
import type { DashboardStats, Opportunity, Application, IndustryDemand, PeerSuccess } from '../types';
import { useLocation } from 'wouter';
import type { RootState } from '../store';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();
  const currentRole = useSelector((state: RootState) => state.app.currentRole);
  const applications = useSelector((state: RootState) => state.app.applications);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topOpportunities, setTopOpportunities] = useState<Opportunity[]>([]);
  const [industryDemand, setIndustryDemand] = useState<IndustryDemand[]>([]);
  const [peerSuccess, setPeerSuccess] = useState<PeerSuccess[]>([]);

  useEffect(() => {
    // Fetch all dashboard data
    const fetchData = async () => {
      setIsLoading(true);
      const [statsData, opportunities, demand, peers] = await Promise.all([
        api.getDashboardStats('student-1'),
        api.getOpportunities(),
        api.getIndustryDemand(),
        api.getPeerSuccessStories()
      ]);

      setStats(statsData);
      setTopOpportunities(opportunities.slice(0, 3));
      // Don't load applications initially - start fresh
      setIndustryDemand(demand);
      setPeerSuccess(peers);
      setIsLoading(false);
    };

    fetchData();
  }, []);



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Role-based dashboard content
  const getFacultyDashboard = () => (
    <div className="space-y-8">
      {/* Faculty Header */}
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Faculty Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage students and track placement analytics</p>
      </div>

      {/* Faculty Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatsCard
          title="Total Students"
          value={156}
          icon={GraduationCap}
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        <DashboardStatsCard
          title="Placed Students"
          value={89}
          icon={CheckCircle2}
          color="chart-2"
        />
        <DashboardStatsCard
          title="Active Drives"
          value={8}
          icon={BarChart3}
          color="chart-4"
        />
        <DashboardStatsCard
          title="Companies"
          value={24}
          icon={Users}
          color="chart-3"
        />
      </div>

      {/* Faculty specific content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Student Activities</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="font-medium">5 new applications submitted</p>
                <p className="text-sm text-muted-foreground">Students applied to TCS, Infosys, Wipro</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">3 students shortlisted</p>
                <p className="text-sm text-muted-foreground">For Amazon, Google interviews</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Placement Analytics</h2>
            <IndustryHeatmap data={industryDemand} />
          </div>
        </div>
      </div>
    </div>
  );

  const getStudentDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Welcome back, Student!</h1>
        <p className="text-muted-foreground mt-1">Here's your placement journey overview</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardStatsCard
            title="Total Applications"
            value={applications.length + 5}
            icon={FileText}
            trend={applications.length > 0 ? { value: Math.min(applications.length * 5, 50), isPositive: true } : undefined}
            color="primary"
          />
          <DashboardStatsCard
            title="Shortlisted"
            value={stats.shortlisted}
            icon={CheckCircle2}
            color="chart-2"
          />
          <DashboardStatsCard
            title="Interviews"
            value={stats.interviews}
            icon={Video}
            color="chart-4"
          />
          <DashboardStatsCard
            title="Offers"
            value={stats.offers}
            icon={Award}
            color="chart-3"
          />
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Matches */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Top Matches for You</h2>
                <p className="text-sm text-muted-foreground">Based on your skills and profile</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setLocation('/opportunities')}
                data-testid="button-view-all-opportunities"
              >
                View All
              </Button>
            </div>
            <div className="grid gap-4">
              {topOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  matchPercentage={Math.floor(Math.random() * 30) + 70}
                  onViewDetails={() => setLocation(`/opportunities/${opp.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Recent Applications</h2>
                <p className="text-sm text-muted-foreground">Track your application status</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setLocation('/applications')}
                data-testid="button-view-all-applications"
              >
                View All
              </Button>
            </div>
            <div className="grid gap-4">
              {applications.slice(0, 3).map((app: Application) => (
                <ApplicationStatusCard
                  key={app.id}
                  application={app}
                  onClick={() => setLocation(`/applications/${app.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completeness */}
          <div className="bg-gradient-to-br from-primary/10 to-chart-4/10 rounded-lg p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Profile Strength</h3>
                <p className="text-sm text-muted-foreground">Looking good!</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completeness</span>
                <span className="font-mono font-semibold">{stats?.profileCompleteness}%</span>
              </div>
              <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${stats?.profileCompleteness}%` }}
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setLocation('/profile')}
              data-testid="button-complete-profile"
            >
              Complete Profile
            </Button>
          </div>

          {/* Peer Success */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Peer Success Stories</h3>
            </div>
            <div className="space-y-3">
              {peerSuccess.slice(0, 2).map((peer) => (
                <PeerSuccessCard
                  key={peer.id}
                  peer={peer}
                  onClick={() => setLocation(`/success-stories/${peer.id}`)}
                />
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="w-full mt-3"
              onClick={() => setLocation('/success-stories')}
              data-testid="button-view-all-stories"
            >
              View All Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Industry Demand Heatmap */}
      <IndustryHeatmap data={industryDemand} />

      {/* Feedback Section */}
      <div className="flex justify-end">
        <Feedback />
      </div>
    </div>
  );

  // Render based on role
  if (currentRole === 'faculty' || currentRole === 'placement_cell') {
    return getFacultyDashboard();
  }

  return getStudentDashboard();
}
