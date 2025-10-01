import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SkillBadge } from '@/components/SkillBadge';
import { ProfileMatchBadge } from '@/components/ProfileMatchBadge';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Target
} from 'lucide-react';
import { api } from '../api';
import { addApplication } from '../store';
import type { Opportunity } from '../types';
import type { RootState } from '../store';
import { useToast } from '@/hooks/use-toast';

export default function JobDetails() {
  const [match, params] = useRoute('/opportunities/:id');
  const { toast } = useToast();
  const dispatch = useDispatch();
  const appliedOpportunities = useSelector((state: RootState) => state.app.appliedOpportunities);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (match && params?.id) {
      fetchOpportunityDetails(params.id);
      // Check if already applied from Redux store using array includes
      const isApplied = appliedOpportunities.includes(params.id);
      setHasApplied(isApplied);
    }
  }, [match, params?.id, appliedOpportunities]);

  const fetchOpportunityDetails = async (id: string) => {
    setIsLoading(true);
    try {
      const opportunities = await api.getOpportunities();
      const opp = opportunities.find(o => o.id === id);
      setOpportunity(opp || null);
    } catch (error) {
      console.error('Failed to fetch opportunity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async () => {
    if (!opportunity) return;
    
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
          description: 'Your application has been submitted. You will hear back from us soon.',
        });
      } catch (error) {
        toast({
          title: 'Application Failed',
          description: 'There was an error submitting your application. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsApplying(false);
      }
    }, 1000);
  };

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading job details..." />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="text-center py-16">
        <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Job not found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Opportunities
        </Button>
      </div>

      {/* Main Job Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-chart-3/5 space-y-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-foreground">{opportunity.title}</h1>
                  <ProfileMatchBadge percentage={92} />
                </div>
                <div className="flex items-center gap-2 text-xl text-muted-foreground">
                  <Building2 className="w-5 h-5" />
                  <span className="font-semibold">{opportunity.company}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    <span>{formatSalary(opportunity.stipend || 0)}/month</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <Badge variant="secondary" className="capitalize">
                      {opportunity.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex items-center gap-3">
            <Button 
              size="lg" 
              className="px-8 py-3 text-base font-semibold transition-all duration-200"
              onClick={handleApply}
              disabled={isApplying || hasApplied}
            >
              {isApplying ? (
                <>
                  <LoadingSpinner size="sm" />
                  Applying...
                </>
              ) : hasApplied ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                  Applied Successfully
                </>
              ) : (
                'Apply Now'
              )}
            </Button>
            {hasApplied && (
              <div className="text-sm text-muted-foreground animate-in fade-in-0 duration-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Application submitted on {new Date().toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200/20 dark:border-green-800/20">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-green-700 dark:text-green-300">PPO Chance</p>
                <p className="text-xl font-bold text-green-800 dark:text-green-200">{opportunity.ppoChance}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20 dark:border-blue-800/20">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Response Score</p>
                <p className="text-xl font-bold text-blue-800 dark:text-blue-200">{opportunity.responseScore}/100</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/20 dark:border-purple-800/20">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-purple-700 dark:text-purple-300">Work Culture</p>
                <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{opportunity.workCultureScore}/100</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-200/20 dark:border-orange-800/20">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-orange-700 dark:text-orange-300">Application Deadline</p>
                <p className="text-sm font-bold text-orange-800 dark:text-orange-200">{formatDate(opportunity.deadline)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Job Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              About This Role
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {opportunity.description}. Join TechCorp Solutions, a leading technology company that's transforming the digital landscape with innovative web solutions. As a Software Development Intern, you'll work alongside experienced developers on real-world projects that impact thousands of users.
            </p>
          </div>

          <Separator />

          {/* Skills Required */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-3">
              {opportunity.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
          </div>

          <Separator />

          {/* Responsibilities */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              What You'll Do
            </h2>
            <ul className="space-y-3">
              {opportunity.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{responsibility}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Participate in code reviews and learn best practices</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Contribute to open-source projects and documentation</span>
              </li>
            </ul>
          </div>

          <Separator />

          {/* Requirements */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              What We're Looking For
            </h2>
            <ul className="space-y-3">
              {opportunity.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground">Currently pursuing Computer Science or related degree</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground">Passion for learning new technologies and frameworks</span>
              </li>
            </ul>
          </div>

          <Separator />

          {/* Company Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              About TechCorp Solutions
            </h2>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                TechCorp Solutions is a fast-growing technology company specializing in web applications, mobile development, and cloud solutions. We serve clients across various industries and pride ourselves on delivering innovative, scalable solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Company Size</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">200-500 employees</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Industry</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Software Development</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Founded</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">2018</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Headquarters</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Timeline */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Application Process
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</div>
                <div>
                  <h4 className="font-semibold">Application Review</h4>
                  <p className="text-sm text-muted-foreground">We'll review your profile and resume (2-3 days)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</div>
                <div>
                  <h4 className="font-semibold">Technical Assessment</h4>
                  <p className="text-sm text-muted-foreground">Online coding test and technical questions (1 week)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</div>
                <div>
                  <h4 className="font-semibold">Interview Rounds</h4>
                  <p className="text-sm text-muted-foreground">Technical and HR interviews (1-2 weeks)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</div>
                <div>
                  <h4 className="font-semibold">Final Decision</h4>
                  <p className="text-sm text-muted-foreground">Offer letter and onboarding (3-5 days)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              Compensation & Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Monthly Stipend</span>
              <span className="font-semibold">{formatSalary(opportunity.stipend || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Performance Bonus</span>
              <span className="font-semibold">Up to ₹10K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Learning Resources</span>
              <span className="font-semibold">Provided</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Mentorship</span>
              <span className="font-semibold">1:1 Guidance</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Posted Date</span>
              <span className="font-semibold">{formatDate(opportunity.postedDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Application Deadline</span>
              <span className="font-semibold text-destructive">{formatDate(opportunity.deadline)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-semibold">March 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-semibold">6 months</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}