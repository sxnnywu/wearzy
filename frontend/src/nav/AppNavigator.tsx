import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import VerifyStatusScreen from "../screens/VerifyStatusScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PlaceholderScreen from "../screens/PlaceholderScreen";

export default function AppNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/verify-status" element={<VerifyStatusScreen />} />
        
        {/* Placeholder routes for referenced links */}
        <Route path="/forgot-password" element={<PlaceholderScreen title="Forgot Password" description="Password reset functionality coming soon!" />} />
        <Route path="/dashboard" element={<PlaceholderScreen title="Dashboard" description="Your Wearzy dashboard will be here soon!" />} />
        <Route path="/about" element={<PlaceholderScreen title="About Wearzy" description="Learn more about our mission to transform campus fashion." />} />
        <Route path="/how-it-works" element={<PlaceholderScreen title="How It Works" description="Discover how Wearzy makes clothing rental simple and fun." />} />
        <Route path="/support" element={<PlaceholderScreen title="Support" description="Get help with your Wearzy account and questions." />} />
        <Route path="/privacy" element={<PlaceholderScreen title="Privacy Policy" description="Your privacy and data protection information." />} />
        <Route path="/terms" element={<PlaceholderScreen title="Terms of Service" description="Terms and conditions for using Wearzy." />} />
        
        {/* 404 - Keep this as the last route */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}