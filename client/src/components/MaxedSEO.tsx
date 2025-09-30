import { Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MaxedSEOProps {
  onComplete: () => void;
}

export function MaxedSEO({ onComplete }: MaxedSEOProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Sparkles, label: 'Extracting Personal Information', color: 'text-primary' },
    { icon: Zap, label: 'Analyzing Skills & Experience', color: 'text-chart-3' },
    { icon: CheckCircle2, label: 'Optimizing Profile Match', color: 'text-chart-2' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 33 && progress < 66) {
      setCurrentStep(1);
    } else if (progress >= 66) {
      setCurrentStep(2);
    }
  }, [progress]);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="relative" data-testid="maxed-seo">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-50 blur-3xl" />
      
      <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-xl p-8 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Animated icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <CurrentIcon className={`w-10 h-10 ${steps[currentStep].color} relative z-10`} />
          </div>

          {/* Current step */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">AI Resume Analysis</h3>
            <p className="text-sm text-muted-foreground">
              {steps[currentStep].label}
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary via-chart-3 to-chart-2 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{progress}% complete</p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-primary/10 border border-primary/20'
                      : index < currentStep
                      ? 'bg-chart-2/10 border border-chart-2/20'
                      : 'bg-muted/50 border border-transparent'
                  }`}
                >
                  <StepIcon 
                    className={`w-3 h-3 ${
                      index === currentStep
                        ? step.color
                        : index < currentStep
                        ? 'text-chart-2'
                        : 'text-muted-foreground'
                    }`}
                  />
                  {index < currentStep && (
                    <CheckCircle2 className="w-3 h-3 text-chart-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
