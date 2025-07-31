import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Icon } from "lucide-react";
import { coatHanger } from "@lucide/lab";

interface PlaceholderScreenProps {
  title: string;
  description: string;
}

export default function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3 sm:py-4 flex items-center justify-between max-w-sm mx-auto sm:max-w-md md:max-w-2xl lg:max-w-6xl">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-wearzy-700 rounded-lg flex items-center justify-center">
              <Icon iconNode={coatHanger} className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-primary">Wearzy</span>
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm text-foreground hover:bg-muted">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="text-xs sm:text-sm bg-primary hover:bg-wearzy-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-3 sm:p-4">
        <Card className="w-full max-w-sm sm:max-w-md shadow-xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              This page is currently under development. Check back soon for updates!
            </p>
            <div className="space-y-2">
              <Link to="/" className="block">
                <Button className="w-full bg-primary hover:bg-wearzy-700 text-primary-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/signup" className="block">
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  Get Started with Wearzy
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}