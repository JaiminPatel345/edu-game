import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, GraduationCap, TrendingUp, Calendar, Award, Code, Briefcase, CheckCircle2 } from 'lucide-react';
import { api } from '../api';
import type { PeerSuccess } from '../types';

export default function SuccessStories() {
  const [isLoading, setIsLoading] = useState(true);
  const [peers, setPeers] = useState<PeerSuccess[]>([]);
  const [selectedPeer, setSelectedPeer] = useState<PeerSuccess | null>(null);

  useEffect(() => {
    const fetchPeers = async () => {
      setIsLoading(true);
      const data = await api.getPeerSuccessStories();
      setPeers(data);
      setIsLoading(false);
    };
    fetchPeers();
  }, []);

  if (selectedPeer) {
    const initials = selectedPeer.studentName.split(' ').map(n => n[0]).join('');
    const typeIcons = {
      skill: Code,
      project: Briefcase,
      certification: Award,
      achievement: CheckCircle2
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPeer(null)}
            data-testid="button-back-to-stories"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold">Success Story</h1>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold" data-testid="text-story-name">{selectedPeer.studentName}</h2>
                <p className="text-muted-foreground">{selectedPeer.branch}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{selectedPeer.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedPeer.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-chart-2" />
                    <span className="font-mono font-semibold">
                      ₹{(selectedPeer.package / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div>
          <h3 className="text-xl font-semibold mb-4">Journey to Success</h3>
          <div className="space-y-4">
            {selectedPeer.pathway.map((step, index) => {
              const Icon = typeIcons[step.type];
              return (
                <Card key={step.id} className="relative">
                  {index !== selectedPeer.pathway.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-primary/20" />
                  )}
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          <Badge variant="outline" className="text-xs capitalize">
                            {step.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(step.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-success-stories-title">Peer Success Stories</h1>
        <p className="text-muted-foreground mt-1">
          Get inspired by fellow students who made it to top companies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {peers.map((peer) => {
          const initials = peer.studentName.split(' ').map(n => n[0]).join('');
          return (
            <Card 
              key={peer.id}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => setSelectedPeer(peer)}
              data-testid={`card-story-${peer.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{peer.studentName}</h3>
                    <p className="text-sm text-muted-foreground">{peer.branch}</p>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {peer.year}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{peer.company}</span>
                </div>

                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{peer.role}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-chart-2" />
                    <span className="text-lg font-bold font-mono">
                      ₹{(peer.package / 100000).toFixed(1)}L
                    </span>
                  </div>
                  <Badge variant="outline">{peer.pathway.length} steps</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
