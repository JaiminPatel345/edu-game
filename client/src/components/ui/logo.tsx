import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: 'gap-2',
      icon: 'w-6 h-6 rounded-lg p-1',
      iconSize: 'w-4 h-4',
      text: 'text-lg',
      subtitle: 'text-xs'
    },
    md: {
      container: 'gap-3',
      icon: 'w-10 h-10 rounded-xl p-2',
      iconSize: 'w-6 h-6',
      text: 'text-xl',
      subtitle: 'text-sm'
    },
    lg: {
      container: 'gap-4',
      icon: 'w-12 h-12 rounded-xl p-2',
      iconSize: 'w-8 h-8',
      text: 'text-2xl',
      subtitle: 'text-sm'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={cn('inline-flex items-center', classes.container, className)}>
      <div className={cn('bg-primary flex items-center justify-center', classes.icon)}>
        <Award className={cn('text-primary-foreground', classes.iconSize)} />
      </div>
      {showText && (
        <div className="text-left">
          <h1 className={cn('font-bold text-foreground', classes.text)}>
            PlaceMe
          </h1>
          <p className={cn('text-muted-foreground', classes.subtitle)}>
            Smart Placement Platform
          </p>
        </div>
      )}
    </div>
  );
}