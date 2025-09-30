import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, TrendingUp, GraduationCap } from 'lucide-react';
import type { PeerSuccess } from '../types';

interface PeerSuccessCardProps {
  peer: PeerSuccess;
  onClick?: () => void;
}

export function PeerSuccessCard({ peer, onClick }: PeerSuccessCardProps) {
  const initials = peer.studentName.split(' ').map(n => n[0]).join('');

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all"
      onClick={onClick}
      data-testid={`card-peer-${peer.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold" data-testid="text-peer-name">{peer.studentName}</h3>
            <p className="text-sm text-muted-foreground">{peer.branch}</p>
          </div>
          <Badge variant="secondary" className="font-mono">
            {peer.year}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{peer.company}</span>
        </div>

        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{peer.role}</span>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t">
          <TrendingUp className="w-4 h-4 text-chart-2" />
          <span className="text-lg font-bold font-mono">
            ₹{(peer.package / 100000).toFixed(1)}L
          </span>
          <span className="text-sm text-muted-foreground">per annum</span>
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground mb-2">Success Pathway</p>
          <div className="flex gap-1">
            {peer.pathway.slice(0, 4).map((step) => (
              <div 
                key={step.id} 
                className="h-1.5 flex-1 rounded-full bg-chart-2"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
