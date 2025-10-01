import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Briefcase, Calendar, Users, ExternalLink } from 'lucide-react';

export default function CentralGovInternships() {
  const [internships] = useState([
    {
      id: 1,
      title: 'Digital India Internship Program',
      organization: 'Ministry of Electronics & IT',
      duration: '6 months',
      stipend: '₹25,000/month',
      location: 'New Delhi',
      deadline: '2025-02-15',
      type: 'Central Government',
      description: 'Work on digital transformation projects across various government departments.',
      skills: ['React', 'Node.js', 'Python', 'Digital Marketing']
    },
    {
      id: 2,
      title: 'Smart Cities Mission Internship',
      organization: 'Ministry of Urban Development',
      duration: '4 months',
      stipend: '₹20,000/month',
      location: 'Multiple Cities',
      deadline: '2025-01-30',
      type: 'Central Government',
      description: 'Contribute to smart city initiatives and urban planning projects.',
      skills: ['Urban Planning', 'IoT', 'Data Analytics', 'GIS']
    },
    {
      id: 3,
      title: 'Make in India Research Internship',
      organization: 'NITI Aayog',
      duration: '3 months',
      stipend: '₹30,000/month',
      location: 'New Delhi',
      deadline: '2025-02-28',
      type: 'Central Government',
      description: 'Research and analysis for manufacturing policy development.',
      skills: ['Research', 'Policy Analysis', 'Economics', 'Statistics']
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="w-8 h-8 text-primary" />
          Central Government Internships
        </h1>
        <p className="text-muted-foreground mt-1">
          Explore prestigious internship opportunities with central government ministries and departments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{internships.length}</p>
                <p className="text-sm text-muted-foreground">Active Programs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Ministries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">3-6</p>
                <p className="text-sm text-muted-foreground">Months Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Internships List */}
      <div className="grid gap-6">
        {internships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{internship.title}</CardTitle>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="w-4 h-4" />
                    {internship.organization}
                  </p>
                </div>
                <Badge variant="secondary">{internship.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{internship.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Duration</p>
                  <p>{internship.duration}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Stipend</p>
                  <p className="text-green-600 font-medium">{internship.stipend}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Location</p>
                  <p className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {internship.location}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Deadline</p>
                  <p className="text-red-600">{new Date(internship.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-muted-foreground mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">
                  Apply Now
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}