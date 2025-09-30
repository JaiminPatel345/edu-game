import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  hasSkill?: boolean;
  proficiency?: number;
  showStatus?: boolean;
}

export function SkillBadge({ skill, hasSkill, proficiency, showStatus = false }: SkillBadgeProps) {
  return (
    <Badge 
      variant={hasSkill === false ? 'outline' : 'secondary'}
      className="gap-1"
      data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {showStatus && (
        hasSkill ? (
          <Check className="w-3 h-3 text-chart-2" />
        ) : (
          <X className="w-3 h-3 text-destructive" />
        )
      )}
      {skill}
      {proficiency && <span className="ml-1 font-mono text-xs">({proficiency}%)</span>}
    </Badge>
  );
}
