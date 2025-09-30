import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { IndustryHeatmap } from '@/components/IndustryHeatmap';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Target
} from 'lucide-react';
import { api } from '../api';
import type { SkillGap, IndustryDemand } from '../types';

export default function SkillDevelopment() {
  const [isLoading, setIsLoading] = useState(true);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [industryDemand, setIndustryDemand] = useState<IndustryDemand[]>([]);
  const [currentSkills] = useState(['React', 'Node.js', 'Python', 'SQL', 'Git', 'JavaScript']);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [gaps, demand] = await Promise.all([
        api.analyzeSkillGaps('student-1'),
        api.getIndustryDemand()
      ]);
      setSkillGaps(gaps);
      setIndustryDemand(demand);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const getImportanceColor = (importance: 'high' | 'medium' | 'low') => {
    switch (importance) {
      case 'high':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive';
      case 'medium':
        return 'bg-chart-3 text-white hover:bg-chart-3';
      case 'low':
        return 'bg-chart-4 text-white hover:bg-chart-4';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Analyzing your skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-skill-development-title">Skill Development</h1>
        <p className="text-muted-foreground mt-1">
          Identify gaps and improve your skillset
        </p>
      </div>

      {/* Current Skills Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-chart-2" />
            <CardTitle>Your Current Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                <CheckCircle2 className="w-3 h-3 mr-1 text-chart-2" />
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Gaps Analysis */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Recommended Skills to Learn</h2>
        </div>
        <div className="grid gap-4">
          {skillGaps.map((gap) => (
            <Card key={gap.skill}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{gap.skill}</h3>
                      <Badge className={getImportanceColor(gap.importance)}>
                        {gap.importance} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on job market demand and your career path
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Learning Resources
                  </h4>
                  <div className="space-y-2">
                    {gap.learningResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover-elevate cursor-pointer"
                        onClick={() => console.log('Open resource:', resource.url)}
                      >
                        <div className="flex items-center gap-3">
                          {resource.type === 'government_scheme' ? (
                            <Award className="w-5 h-5 text-chart-2" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-primary" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.provider}
                              {resource.duration && ` • ${resource.duration}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {resource.free && (
                            <Badge variant="outline" className="text-xs">Free</Badge>
                          )}
                          {resource.type === 'government_scheme' && (
                            <Badge className="bg-chart-2 text-white hover:bg-chart-2 text-xs">
                              Government
                            </Badge>
                          )}
                          <Button size="sm" variant="ghost" data-testid={`button-open-resource-${resource.id}`}>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Industry Demand Trends */}
      <IndustryHeatmap data={industryDemand} />

      {/* AI Recommendations */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle>AI-Powered Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Focus on Cloud Technologies</p>
              <p className="text-sm text-muted-foreground mt-1">
                Based on 85% of recent job postings requiring cloud skills, we recommend prioritizing AWS or Azure certification
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Machine Learning is Trending</p>
              <p className="text-sm text-muted-foreground mt-1">
                ML roles offer 40% higher packages. Consider taking SWAYAM's free ML course to get started
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
