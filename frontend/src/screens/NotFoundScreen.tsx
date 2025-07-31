import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold text-primary mb-4">404</CardTitle>
          <CardTitle className="text-2xl text-foreground">Page Not Found</CardTitle>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Link to="/" className="block">
              <Button className="w-full bg-primary hover:bg-wearzy-700 text-primary-foreground">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full border-border text-foreground hover:bg-muted"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}