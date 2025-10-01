import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GridBeam } from '@/components/ui/grid-beam';
import { MaxedSEO } from '@/components/MaxedSEO';
import { Award, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, Sparkles, Zap } from 'lucide-react';
import { useLocation } from 'wouter';
import { useDispatch } from 'react-redux';
import { setUser, setCurrentRole } from '../store';
import { authenticateUser } from '../demo-data/auth';

export default function Login() {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await authenticateUser({ email, password });
      
      if (user) {
        // Show analysis for demo effect
        setShowAnalysis(true);
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleAnalysisComplete = () => {
    const user = authenticateUser({ email, password }).then(user => {
      if (user) {
        dispatch(setUser({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }));
        dispatch(setCurrentRole(user.role === 'teacher' ? 'faculty' : user.role === 'company' ? 'recruiter' : 'student'));
        setLocation('/');
      }
    });
  };

  if (showAnalysis) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <GridBeam className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/20 to-chart-3/10" />
        
        <div className="relative z-10 w-full max-w-lg p-6">
          <MaxedSEO onComplete={handleAnalysisComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background */}
      <GridBeam className="opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900" />
      
      {/* Floating elements for visual appeal */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="mb-8 text-center space-y-4">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-chart-3 flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                PlaceMe
              </h1>
              <p className="text-sm text-muted-foreground">Smart Placement Platform</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">
              Accelerate your career journey with AI-powered insights
            </p>
          </div>

          {/* Demo accounts info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm space-y-1">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              Demo Accounts
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• <strong>jaimin-student@gmail.com</strong> (Student)</div>
              <div>• <strong>teacher@demo.com</strong> (Faculty)</div>
              <div>• <strong>xyz@demo.com</strong> (Company)</div>
            </div>
          </div>
        </div>

        <Card className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-900/10">
          <CardContent className="p-8">
            {error && (
              <Alert className="mb-6 border-destructive/20 bg-destructive/5">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 h-11 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary focus:bg-white dark:focus:bg-slate-800 transition-all"
                    required
                    data-testid="input-login-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 h-11 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus:border-primary focus:bg-white dark:focus:bg-slate-800 transition-all"
                    required
                    data-testid="input-login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 hover:underline transition-colors"
                  onClick={() => console.log('Forgot password')}
                >
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-chart-3 hover:from-primary/90 hover:to-chart-3/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                disabled={isLoading}
                data-testid="button-login-submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Sign In & Analyze
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-800 px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">New to PlaceMe? </span>
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
                  onClick={() => setLocation('/register')}
                  data-testid="button-go-to-register"
                >
                  Create your account →
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>Secure • AI-Powered • Government Integrated</span>
            <Sparkles className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
