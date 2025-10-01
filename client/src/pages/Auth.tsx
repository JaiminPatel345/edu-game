import { useState } from 'react';
import { Account } from '@/components/ui/account';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GridBeam } from '@/components/ui/grid-beam';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, User, GraduationCap, Building, UserCheck, Users } from 'lucide-react';
import { useLocation } from 'wouter';
import { useDispatch } from 'react-redux';
import { setUser, setCurrentRole } from '../store';
import { authService } from '../api/auth';
import type { UserRole } from '../types';

export default function Auth() {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('student');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Register form state  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    department: ''
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError('');

    try {
      const user = await authService.login({ email: loginEmail, password: loginPassword });
      
      // Map demo roles to application roles
      const mappedRole: UserRole = user.role === 'teacher' ? 'faculty' : 
                                   user.role === 'company' ? 'recruiter' : 'student';
      
      authService.saveUserData(user);
      dispatch(setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        role: mappedRole
      }));
      dispatch(setCurrentRole(mappedRole));
      setLocation('/');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid email or password. Please try again.');
      setIsLoginLoading(false);
    }
  };



  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError('');

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match');
      setIsRegisterLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      setIsRegisterLoading(false);
      return;
    }

    try {
      // Map UserRole to demo-data compatible roles
      const demoRole = registerData.role === 'faculty' ? 'teacher' : 
                       registerData.role === 'recruiter' || registerData.role === 'placement_cell' ? 'company' : 'student';
      
      const user = await authService.register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        role: demoRole,
        department: registerData.department
      });
      
      // Direct redirect after successful registration
      authService.saveUserData(user);
      dispatch(setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        role: registerData.role // Use the original UserRole selection
      }));
      dispatch(setCurrentRole(registerData.role));
      setLocation('/');
    } catch (err: any) {
      setRegisterError(err.message || 'Something went wrong. Please try again.');
      setIsRegisterLoading(false);
    }
  };



  const SignInForm = (
    <div className="p-6 space-y-6">
      {loginError && (
        <Alert className="border-destructive/20 bg-destructive/5">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {loginError}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="pl-9 h-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="signin-password"
              type={showLoginPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="pl-9 pr-10 h-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowLoginPassword(!showLoginPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-role" className="text-sm font-medium">Login as</Label>
          <Select value={loginRole} onValueChange={(value: UserRole) => setLoginRole(value)}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </div>
              </SelectItem>
              <SelectItem value="faculty">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Faculty
                </div>
              </SelectItem>
              <SelectItem value="recruiter">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Recruiter
                </div>
              </SelectItem>
              <SelectItem value="placement_cell">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Placement Cell
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          type="submit" 
          className="w-full h-11" 
          disabled={isLoginLoading}
        >
          {isLoginLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </div>
  );

  const SignUpForm = (
    <div className="p-6 space-y-6">
      {registerError && (
        <Alert className="border-destructive/20 bg-destructive/5">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {registerError}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              className="pl-9 h-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="pl-9 h-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-role" className="text-sm font-medium">Account Type</Label>
          <Select 
            value={registerData.role} 
            onValueChange={(value: UserRole) => 
              setRegisterData({ ...registerData, role: value })
            }
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </div>
              </SelectItem>
              <SelectItem value="faculty">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Faculty
                </div>
              </SelectItem>
              <SelectItem value="recruiter">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Recruiter
                </div>
              </SelectItem>
              <SelectItem value="placement_cell">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Placement Cell
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {registerData.role === 'student' && (
          <div className="space-y-2">
            <Label htmlFor="signup-department" className="text-sm font-medium">Department/Branch</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="signup-department"
                type="text"
                placeholder="e.g., Computer Science"
                value={registerData.department}
                onChange={(e) => setRegisterData({ ...registerData, department: e.target.value })}
                className="pl-9 h-11"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="signup-password"
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                className="pl-9 pr-10 h-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirm</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="signup-confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                className="pl-9 pr-10 h-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-11" 
          disabled={isRegisterLoading}
        >
          {isRegisterLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-grid-slate-200 dark:bg-grid-slate-700/50">
      <GridBeam className="w-full h-full">
        <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background/80 to-background/60">
          {/* Theme Toggle */}
          <div className="absolute top-6 right-6 z-20">
            <ThemeToggle />
          </div>
          
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Your Career Journey Starts Here
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    Connect with top companies, showcase your skills, and land your dream job. 
                    Our AI-powered platform matches you with opportunities that fit your profile perfectly.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Smart Resume Analysis
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Real-time Job Matching
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Interview Preparation
                  </div>
                </div>
              </div>
              
              {/* Auth Card */}
              <div className="w-full max-w-md mx-auto">
                <div className="bg-background/95 backdrop-blur-sm border border-border rounded-2xl shadow-xl p-8">
                  <div className="mb-8 text-center space-y-4">
                    <div className="mb-6">
                      <Logo size="lg" />
                    </div>
                  </div>

                  <Account
                    defaultTab={0}
                    firstTab={SignInForm}
                    secondTab={SignUpForm}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </GridBeam>
    </div>
  );
}