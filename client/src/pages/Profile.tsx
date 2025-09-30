import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ResumeUploadZone } from '@/components/ResumeUploadZone';
import { MaxedSEO } from '@/components/MaxedSEO';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Code, 
  Award, 
  Briefcase,
  Plus,
  Check
} from 'lucide-react';
import { api } from '../api';
import type { StudentProfile } from '../types';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await api.getStudentProfile('student-1');
      setProfile(data);
      setHasExistingProfile(true);
    };
    fetchProfile();
  }, []);

  const handleResumeUpload = async (file: File) => {
    setIsUploading(true);
  };

  const handleUploadComplete = async () => {
    try {
      const data = await api.uploadResumeAndAutofill(new File([], ''));
      setProfile(data);
      setIsUploading(false);
      toast({
        title: 'Resume Uploaded Successfully!',
        description: 'Your profile has been auto-filled with resume data.',
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your resume.',
        variant: 'destructive',
      });
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    
    try {
      await api.updateStudentProfile(profile.id, profile);
      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error saving your profile.',
        variant: 'destructive',
      });
    }
  };

  // Show MaxedSEO animation when uploading (for both new and existing profiles)
  if (isUploading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <MaxedSEO onComplete={handleUploadComplete} />
      </div>
    );
  }

  // If no profile exists yet, show initial upload screen
  if (!profile || !hasExistingProfile) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Create Your Profile</h1>
          <p className="text-muted-foreground mt-1">Upload your resume to get started with AI-powered analysis</p>
        </div>
        <ResumeUploadZone onUpload={handleResumeUpload} isLoading={false} />
      </div>
    );
  }

  const initials = profile.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-profile-title">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} data-testid="button-save-profile">
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} data-testid="button-edit-profile">
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold" data-testid="text-profile-name">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.branch} • Year {profile.year}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono">CGPA: {profile.cgpa}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              <CardTitle>Skills</CardTitle>
            </div>
            {isEditing && (
              <Button size="sm" variant="outline" data-testid="button-add-skill">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <CardTitle>Projects</CardTitle>
            </div>
            {isEditing && (
              <Button size="sm" variant="outline" data-testid="button-add-project">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.projects.map((project) => (
              <div key={project.id} className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <CardTitle>Certifications</CardTitle>
            </div>
            {isEditing && (
              <Button size="sm" variant="outline" data-testid="button-add-certification">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profile.certifications.map((cert) => (
              <div key={cert.id} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
                {cert.verified && (
                  <Badge className="bg-chart-2 text-white hover:bg-chart-2">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume Re-upload */}
      <Card>
        <CardHeader>
          <CardTitle>Update Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResumeUploadZone onUpload={handleResumeUpload} isLoading={false} />
        </CardContent>
      </Card>
    </div>
  );
}
