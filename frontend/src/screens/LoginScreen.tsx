import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

export default function LoginScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Redirect to verification status or dashboard
      navigate('/verify-status');
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!form.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }

      // Store auth token and user profile
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userProfile', JSON.stringify(data.user));

      // Redirect based on email verification status
      if (data.user.isEmailVerified) {
        navigate('/dashboard');
      } else {
        navigate('/verify-status');
      }

    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid credentials') || error.message.includes('password')) {
          setApiError('Invalid email or password. Please try again.');
        } else if (error.message.includes('not found') || error.message.includes('user')) {
          setApiError('No account found with this email address.');
        } else {
          setApiError(error.message);
        }
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Wearzy</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Welcome back to your campus wardrobe</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Access your clothing rental account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {apiError && (
              <Alert className="mb-6 border-destructive/20 bg-destructive/5">
                <AlertDescription className="text-destructive">
                  {apiError}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={form.email}
                  onChange={updateForm('email')}
                  className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-wearzy-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={updateForm('password')}
                    className={errors.password ? 'border-destructive focus-visible:ring-destructive pr-10' : 'pr-10'}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-wearzy-700 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Don't have an account?
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link to="/signup">
                  <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                    Create account
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}