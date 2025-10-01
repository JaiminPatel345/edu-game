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
  const [isLoading, setIsLoading] = useState(true);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  // Helper functions for tricky behavior: show basic data initially, full data after resume upload
  const getDisplayedSkills = () => {
    if (!profile) return [];
    if (!resumeUploaded) {
      // Basic skills only (before resume upload)
      return ['Java', 'React'];
    }
    // Full skills (after resume upload)
    return profile.skills;
  };

  const getDisplayedProjects = () => {
    if (!profile) return [];
    if (!resumeUploaded) {
      // No projects initially
      return [];
    }
    // Full projects (after resume upload)
    return profile.projects;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await api.getStudentProfile('student-1');
        setProfile(data);
        
        // Always start with basic profile (resumeUploaded stays false)
        // This creates the "tricky" behavior by default
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
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
      setResumeUploaded(true); // Enable full profile view
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



  // Show loading state while fetching profile
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show MaxedSEO animation when uploading resume
  if (isUploading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <MaxedSEO onComplete={handleUploadComplete} />
      </div>
    );
  }

  // If no profile data, show error
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load profile. Please try again.</p>
        </div>
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
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">Manage your personal information</p>
            {resumeUploaded && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                Resume Processed
              </Badge>
            )}
          </div>
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
            {getDisplayedSkills().map((skill) => (
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
            {getDisplayedProjects().length > 0 ? (
              getDisplayedProjects().map((project) => (
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
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Upload your resume to showcase your projects</p>
              </div>
            )}
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
              <div key={cert.id} className="flex items-start justify-between p-5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/30 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div>
                  <h3 className="font-bold text-amber-900 dark:text-amber-100">{cert.name}</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">{cert.issuer}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                </div>
                {cert.verified && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-sm">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resume Upload - Single Location */}
      <Card className={!resumeUploaded ? "border-dashed border-2 border-primary/50 bg-primary/5" : ""}>
        <CardHeader>
          <div className="text-center">
            {!resumeUploaded ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full mb-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">🚀 Unlock Your Full Profile</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload your resume to reveal all your skills, projects, and get personalized recommendations
                </p>
              </>
            ) : (
              <>
                <CardTitle>Update Resume</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a new resume to update your profile information
                </p>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ResumeUploadZone onUpload={handleResumeUpload} isLoading={isUploading} />
        </CardContent>
      </Card>
    </div>
  );
}
