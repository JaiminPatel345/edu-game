import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building, Users, TrendingUp } from 'lucide-react';

export default function PSUOpportunities() {
  const psuCompanies = [
    {
      name: 'ONGC',
      fullName: 'Oil and Natural Gas Corporation',
      sector: 'Energy',
      positions: 12,
      type: 'Maharatna'
    },
    {
      name: 'NTPC',
      fullName: 'National Thermal Power Corporation',
      sector: 'Power',
      positions: 8,
      type: 'Maharatna'
    },
    {
      name: 'BHEL',
      fullName: 'Bharat Heavy Electricals Limited',
      sector: 'Manufacturing',
      positions: 15,
      type: 'Maharatna'
    },
    {
      name: 'SAIL',
      fullName: 'Steel Authority of India Limited',
      sector: 'Steel',
      positions: 10,
      type: 'Maharatna'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Briefcase className="w-8 h-8 text-primary" />
          PSU Opportunities
        </h1>
        <p className="text-muted-foreground mt-1">
          Public Sector Undertaking internships and career opportunities
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">PSU Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">200+</p>
                <p className="text-sm text-muted-foreground">Open Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Placement Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">₹8-15L</p>
                <p className="text-sm text-muted-foreground">Avg Package</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured PSUs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Featured PSU Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {psuCompanies.map((company, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <p className="text-muted-foreground">{company.fullName}</p>
                  </div>
                  <Badge variant="secondary">{company.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sector:</span>
                  <span className="font-medium">{company.sector}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Open Positions:</span>
                  <Badge variant="outline">{company.positions} roles</Badge>
                </div>
                <Button className="w-full">
                  View Opportunities
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Why Choose PSU Internships?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Benefits</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Job security and stability</li>
              <li>• Competitive compensation packages</li>
              <li>• Comprehensive benefits and perks</li>
              <li>• Professional development programs</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Sectors</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Oil & Gas, Power, Mining</li>
              <li>• Railways, Aviation, Shipping</li>
              <li>• Banking, Insurance, Finance</li>
              <li>• Defense, Space, Technology</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}