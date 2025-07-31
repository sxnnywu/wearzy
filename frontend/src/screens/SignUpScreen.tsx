import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";

interface SignUpForm {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const universityDomains = [
  'edu', 'ac.uk', 'edu.au', 'edu.ca', 'ac.in', 'edu.sg', 'ac.za'
];

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<SignUpForm>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    if (!email.includes('@')) return 'Please enter a valid email address';
    
    const domain = email.split('@')[1];
    const isUniversityEmail = universityDomains.some(uniDomain => 
      domain?.endsWith(`.${uniDomain}`) || domain === uniDomain
    );
    
    if (!isUniversityEmail) {
      return 'Please use your university email address (.edu, .ac.uk, etc.)';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpForm> = {};

    newErrors.email = validateEmail(form.email);
    newErrors.username = !form.username ? 'Username is required' : '';
    newErrors.firstName = !form.firstName ? 'First name is required' : '';
    newErrors.lastName = !form.lastName ? 'Last name is required' : '';
    newErrors.password = validatePassword(form.password);
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create account');
      }

      setSuccessMessage('Verification email sent! Please check your inbox and verify your email before signing in.');
      
      // Clear form
      setForm({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      });

    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = (field: keyof SignUpForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const passwordStrength = form.password.length > 0 ? {
    length: form.password.length >= 8,
    lowercase: /(?=.*[a-z])/.test(form.password),
    uppercase: /(?=.*[A-Z])/.test(form.password),
    number: /(?=.*\d)/.test(form.password),
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Wearzy</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Campus clothing rental made simple</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Create your account</CardTitle>
            <CardDescription className="text-center">
              Join your campus clothing sharing community
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <Alert className="mb-6 border-success/20 bg-success/5">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success font-medium">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            {apiError && (
              <Alert className="mb-6 border-destructive/20 bg-destructive/5">
                <AlertDescription className="text-destructive">
                  {apiError}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={updateForm('firstName')}
                    className={errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={updateForm('lastName')}
                    className={errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">University email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={form.email}
                  onChange={updateForm('email')}
                  className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Use your .edu, .ac.uk, or other university email domain
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={updateForm('username')}
                  className={errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={updateForm('password')}
                    className={errors.password ? 'border-destructive focus-visible:ring-destructive pr-10' : 'pr-10'}
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
                
                {passwordStrength && (
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className={`${passwordStrength.length ? 'text-success' : 'text-muted-foreground'}`}>
                        ✓ 8+ characters
                      </span>
                      <span className={`${passwordStrength.lowercase ? 'text-success' : 'text-muted-foreground'}`}>
                        ✓ lowercase
                      </span>
                      <span className={`${passwordStrength.uppercase ? 'text-success' : 'text-muted-foreground'}`}>
                        ✓ uppercase
                      </span>
                      <span className={`${passwordStrength.number ? 'text-success' : 'text-muted-foreground'}`}>
                        ✓ number
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={updateForm('confirmPassword')}
                    className={errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive pr-10' : 'pr-10'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
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
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:text-wearzy-700 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}