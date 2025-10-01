import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building, Calendar, Users } from 'lucide-react';

export default function StateGovPrograms() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MapPin className="w-8 h-8 text-primary" />
          State Government Programs
        </h1>
        <p className="text-muted-foreground mt-1">
          Discover internship and training programs offered by state governments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Maharashtra IT Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Internship program for IT development in Maharashtra state
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>6 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stipend:</span>
                <span className="text-green-600">₹18,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Karnataka Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Skill development initiative for emerging technologies
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>4 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stipend:</span>
                <span className="text-green-600">₹15,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Tamil Nadu E-Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Digital governance and e-services development program
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>5 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stipend:</span>
                <span className="text-green-600">₹20,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground">
          More state government internship programs will be added soon. Stay tuned for opportunities 
          from Gujarat, Rajasthan, Kerala, and other states.
        </p>
      </Card>
    </div>
  );
}