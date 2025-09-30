import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Video, Sparkles, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { api } from '../api';
import type { MockInterview as MockInterviewType } from '../types';
import { useToast } from '@/hooks/use-toast';

export default function MockInterview() {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<'technical' | 'hr' | 'behavioral' | null>(null);
  const [interview, setInterview] = useState<MockInterviewType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(null);

  const startInterview = async (type: 'technical' | 'hr' | 'behavioral') => {
    setSelectedType(type);
    const interviewData = await api.getMockInterviewQuestions(type);
    setInterview(interviewData);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFeedback(null);
  };

  const handleSubmit = async () => {
    if (!interview) return;
    
    setIsSubmitting(true);
    try {
      const result = await api.submitMockInterviewAnswers(interview.id, answers);
      setFeedback(result);
      toast({
        title: 'Interview Completed!',
        description: `Your score: ${result.score}/100`,
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your interview.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = interview?.questions[currentQuestionIndex];

  if (feedback) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Interview Results</h1>
          <p className="text-muted-foreground mt-1">Here's your AI-powered feedback</p>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <CardTitle>Overall Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">AI Analysis Complete</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold font-mono text-primary">{feedback.score}</p>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">AI Feedback</h3>
              <p className="text-muted-foreground">{feedback.feedback}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => setFeedback(null)} data-testid="button-try-again">
                Try Another Interview
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/skill-development'}>
                Improve Skills
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedType || !interview) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-mock-interview-title">Mock Interview Simulator</h1>
          <p className="text-muted-foreground mt-1">
            Practice with AI-powered interviews and get instant feedback
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="hover-elevate cursor-pointer transition-all"
            onClick={() => startInterview('technical')}
            data-testid="card-interview-technical"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Technical Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Test your technical knowledge with coding and system design questions
              </p>
              <Badge variant="secondary">5 Questions</Badge>
            </CardContent>
          </Card>

          <Card 
            className="hover-elevate cursor-pointer transition-all"
            onClick={() => startInterview('hr')}
            data-testid="card-interview-hr"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-chart-4" />
              </div>
              <CardTitle>HR Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Practice behavioral and situational questions commonly asked by recruiters
              </p>
              <Badge variant="secondary">5 Questions</Badge>
            </CardContent>
          </Card>

          <Card 
            className="hover-elevate cursor-pointer transition-all"
            onClick={() => startInterview('behavioral')}
            data-testid="card-interview-behavioral"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3">
                <Video className="w-6 h-6 text-chart-2" />
              </div>
              <CardTitle>Behavioral Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Prepare for real-world scenarios and showcase your soft skills
              </p>
              <Badge variant="secondary">5 Questions</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold capitalize">{selectedType} Interview</h1>
          <p className="text-muted-foreground mt-1">
            Question {currentQuestionIndex + 1} of {interview.questions.length}
          </p>
        </div>
        <Badge variant="outline" className="font-mono">
          {Math.floor((currentQuestionIndex / interview.questions.length) * 100)}% Complete
        </Badge>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all"
          style={{ width: `${((currentQuestionIndex + 1) / interview.questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PlayCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Take your time to think and provide a detailed answer
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your answer here..."
            value={answers[currentQuestion?.id || ''] || ''}
            onChange={(e) => setAnswers({ ...answers, [currentQuestion?.id || '']: e.target.value })}
            className="min-h-[200px]"
            data-testid="textarea-interview-answer"
          />
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              data-testid="button-previous-question"
            >
              Previous
            </Button>
            
            {currentQuestionIndex < interview.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                disabled={!answers[currentQuestion?.id || '']}
                data-testid="button-next-question"
              >
                Next Question
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!answers[currentQuestion?.id || ''] || isSubmitting}
                data-testid="button-submit-interview"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Submit Interview
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
