import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function VerifyStatusScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState('');

  useEffect(() => {
    checkVerificationStatus();
    
    // Check localStorage for user info
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const user = JSON.parse(userProfile);
        setUserEmail(user.email);
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, []);

  const checkVerificationStatus = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/auth/verify-status', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('authToken');
          localStorage.removeItem('userProfile');
          navigate('/login');
          return;
        }
        throw new Error('Failed to check verification status');
      }

      const data = await response.json();
      setIsVerified(data.isEmailVerified);
      
      // If verified, redirect to dashboard
      if (data.isEmailVerified) {
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      navigate('/login');
      return;
    }

    setIsResending(true);
    setError('');
    setResendSuccess('');

    try {
      const response = await fetch('/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to resend verification email');
      }

      setResendSuccess('Verification email resent! Please check your inbox.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100 flex items-center justify-center p-3 sm:p-4">
        <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <p className="text-center mt-4 text-muted-foreground">
              Checking verification status...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Wearzy</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Almost there!</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-wearzy-100 rounded-full flex items-center justify-center">
              {isVerified ? (
                <CheckCircle className="h-8 w-8 text-success" />
              ) : (
                <Mail className="h-8 w-8 text-primary" />
              )}
            </div>
            <CardTitle className="text-xl">
              {isVerified ? 'Email Verified!' : 'Verify Your Email'}
            </CardTitle>
            <CardDescription>
              {isVerified 
                ? 'Your email has been successfully verified.' 
                : 'We sent a verification link to your email address.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-destructive/20 bg-destructive/5">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {resendSuccess && (
              <Alert className="border-success/20 bg-success/5">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success font-medium">
                  {resendSuccess}
                </AlertDescription>
              </Alert>
            )}

            {!isVerified && (
              <>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Check your email{userEmail && (
                      <span className="font-medium text-foreground"> {userEmail}</span>
                    )} and click the verification link.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Don't forget to check your spam folder!
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={resendVerificationEmail}
                    disabled={isResending}
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-muted"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Resend verification email
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={checkVerificationStatus}
                    className="w-full bg-primary hover:bg-wearzy-700 text-primary-foreground"
                  >
                    I've verified my email
                  </Button>
                </div>
              </>
            )}

            {isVerified && (
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-primary hover:bg-wearzy-700 text-primary-foreground"
              >
                Continue to Wearzy
              </Button>
            )}

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wrong email?</span>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-wearzy-700 hover:bg-muted"
                >
                  Sign out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Need help?{' '}
            <Link to="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}