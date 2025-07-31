import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-native"; // React Native Router Dom alternative
import { tailwind } from "nativewind";
import { Users, Recycle, Shield, Star, ArrowRight } from "lucide-react-native";
import { CoatHanger } from "lucide-react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeScreen() {
  return (
    <ScrollView
      style={tailwind("flex-1 bg-gradient-to-br from-background via-wearzy-50 to-wearzy-100")}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={tailwind("relative z-10 bg-card/80 border-b border-border")}>
        <View style={tailwind("container mx-auto px-4 py-4 flex-row items-center justify-between")}>
          <View style={tailwind("flex-row items-center space-x-2")}>
            <View style={tailwind("w-8 h-8 bg-gradient-to-br from-primary to-wearzy-700 rounded-lg flex items-center justify-center")}>
              <CoatHanger color="white" size={20} />
            </View>
            <Text style={tailwind("text-2xl font-bold text-primary")}>Wearzy</Text>
          </View>

          <View style={tailwind("flex-row items-center space-x-3")}>
            <Link to="/login" component={TouchableOpacity}>
              <Button variant="ghost" style={tailwind("text-foreground")}>
                Sign in
              </Button>
            </Link>
            <Link to="/signup" component={TouchableOpacity}>
              <Button style={tailwind("bg-primary text-white")}>
                Get Started
              </Button>
            </Link>
          </View>
        </View>
      </View>

      {/* Hero Section */}
      <View style={tailwind("relative py-20 px-4")}>
        <View style={tailwind("container mx-auto text-center")}>
          <View style={tailwind("max-w-3xl mx-auto")}>
            <Text style={tailwind("text-5xl font-bold text-foreground mb-6 leading-tight")}>
              Your Campus{" "}
              <Text style={tailwind("text-transparent bg-clip-text bg-gradient-to-r from-primary to-wearzy-800")}>
                Wardrobe
              </Text>{" "}
              Sharing Community
            </Text>
            <Text style={tailwind("text-xl text-muted-foreground mb-8 leading-relaxed")}>
              Discover, rent, and share amazing clothing with fellow students. Sustainable fashion made simple, affordable, and social.
            </Text>

            <View style={tailwind("flex-row justify-center gap-4")}>
              <Link to="/signup" component={TouchableOpacity}>
                <Button size="lg" style={tailwind("bg-primary text-white px-8 py-3 text-lg flex-row items-center justify-center")}>
                  <Text>Join Your Campus</Text>
                  <ArrowRight color="white" size={20} style={{ marginLeft: 8 }} />
                </Button>
              </Link>

              <Link to="/login" component={TouchableOpacity}>
                <Button size="lg" variant="outline" style={tailwind("border-border text-foreground px-8 py-3 text-lg")}>
                  Sign In
                </Button>
              </Link>
            </View>
          </View>
        </View>

        {/* Floating Cards */}
        <View style={[tailwind("absolute top-20 left-10 hidden lg:block"), { display: "none" }]}>
          {/* React Native doesn't support 'hidden lg:block', 
              you’ll handle this with conditional rendering or Dimensions API */}
          <Card style={tailwind("w-48 shadow-lg rotate-12 bg-card/90 backdrop-blur-sm")}>
            <CardContent style={tailwind("p-4")}>
              <View style={tailwind("flex-row items-center space-x-2 mb-2")}>
                <View style={tailwind("w-8 h-8 bg-wearzy-100 rounded-full flex items-center justify-center")}>
                  <CoatHanger color="#somePrimaryColor" size={16} />
                </View>
                <Text style={tailwind("font-semibold text-sm")}>Designer Dress</Text>
              </View>
              <Text style={tailwind("text-xs text-muted-foreground")}>Perfect for formal events</Text>
              <Text style={tailwind("text-sm font-bold text-primary mt-1")}>$15/day</Text>
            </CardContent>
          </Card>
        </View>

        {/* Repeat Floating Cards similarly with conditional visibility */}

      </View>

      {/* Features Section */}
      <View style={tailwind("py-16 px-4")}>
        <View style={tailwind("container mx-auto")}>
          <View style={tailwind("text-center mb-12")}>
            <Text style={tailwind("text-3xl font-bold text-foreground mb-4")}>Why Students Love Wearzy</Text>
            <Text style={tailwind("text-lg text-muted-foreground max-w-2xl mx-auto")}>
              Join thousands of students who are revolutionizing campus fashion
            </Text>
          </View>

          <View style={tailwind("grid md:grid-cols-3 gap-8")}>
            <Card style={tailwind("text-center border-0 shadow-lg bg-card/70 backdrop-blur-sm hover:shadow-xl transition-shadow")}>
              <CardContent style={tailwind("p-8")}>
                <View style={tailwind("w-16 h-16 bg-gradient-to-br from-primary to-wearzy-600 rounded-full flex items-center justify-center mx-auto mb-4")}>
                  <CoatHanger color="white" size={32} />
                </View>
                <Text style={tailwind("text-xl font-semibold text-foreground mb-3")}>Endless Variety</Text>
                <Text style={tailwind("text-muted-foreground")}>
                  Access hundreds of clothing items from your campus community. From casual to formal, find the perfect outfit for any occasion.
                </Text>
              </CardContent>
            </Card>

            <Card style={tailwind("text-center border-0 shadow-lg bg-card/70 backdrop-blur-sm hover:shadow-xl transition-shadow")}>
              <CardContent style={tailwind("p-8")}>
                <View style={tailwind("w-16 h-16 bg-gradient-to-br from-primary to-wearzy-600 rounded-full flex items-center justify-center mx-auto mb-4")}>
                  <Recycle color="white" size={32} />
                </View>
                <Text style={tailwind("text-xl font-semibold text-foreground mb-3")}>Sustainable Fashion</Text>
                <Text style={tailwind("text-muted-foreground")}>
                  Reduce waste and support circular fashion. Share what you own, wear what you love, and make a positive environmental impact.
                </Text>
              </CardContent>
            </Card>

            <Card style={tailwind("text-center border-0 shadow-lg bg-card/70 backdrop-blur-sm hover:shadow-xl transition-shadow")}>
              <CardContent style={tailwind("p-8")}>
                <View style={tailwind("w-16 h-16 bg-gradient-to-br from-primary to-wearzy-600 rounded-full flex items-center justify-center mx-auto mb-4")}>
                  <Shield color="white" size={32} />
                </View>
                <Text style={tailwind("text-xl font-semibold text-foreground mb-3")}>Campus Safe</Text>
                <Text style={tailwind("text-muted-foreground")}>
                  University email verification ensures you're connecting with real students. Safe, secure, and community-driven.
                </Text>
              </CardContent>
            </Card>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={tailwind("py-16 px-4 bg-gradient-to-r from-primary to-wearzy-700")}>
        <View style={tailwind("container mx-auto text-center")}>
          <Text style={tailwind("text-3xl font-bold text-white mb-4")}>Ready to Transform Your Wardrobe?</Text>
          <Text style={tailwind("text-xl text-wearzy-100 mb-8 max-w-2xl mx-auto")}>
            Join your campus clothing community today. Sign up with your university email and start sharing amazing fashion with fellow students.
          </Text>
          <Link to="/signup" component={TouchableOpacity}>
            <Button size="lg" style={tailwind("bg-white text-primary px-8 py-3 text-lg font-semibold flex-row items-center justify-center")}>
              <Text>Get Started - It's Free</Text>
              <ArrowRight color="#000" size={20} style={{ marginLeft: 8 }} />
            </Button>
          </Link>
          <Text style={tailwind("text-sm text-wearzy-200 mt-4")}>
            Already have an account?{' '}
            <Link to="/login" component={TouchableOpacity}>
              <Text style={tailwind("text-white hover:underline font-medium")}>Sign in here</Text>
            </Link>
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={tailwind("bg-wearzy-900 py-8 px-4")}>
        <View style={tailwind("container mx-auto flex-row justify-between items-center")}>
          <View style={tailwind("flex-row items-center space-x-2")}>
            <View style={tailwind("w-6 h-6 bg-gradient-to-br from-wearzy-400 to-wearzy-600 rounded flex items-center justify-center")}>
              <CoatHanger color="white" size={16} />
            </View>
            <Text style={tailwind("text-lg font-bold text-wearzy-100")}>Wearzy</Text>
          </View>

          <View style={tailwind("flex-row space-x-6 text-sm")}>
            {["About", "How it Works", "Support", "Privacy", "Terms"].map((text) => (
              <Link key={text} to={`/${text.toLowerCase().replace(/\s/g, '-')}`} component={TouchableOpacity}>
                <Text style={tailwind("text-wearzy-100 hover:text-white")}>{text}</Text>
              </Link>
            ))}
          </View>
        </View>
        <Text style={tailwind("border-t border-wearzy-800 mt-8 pt-4 text-center text-sm text-wearzy-300")}>
          © 2024 Wearzy. Transforming campus fashion, one outfit at a time.
        </Text>
      </View>
    </ScrollView>
  );
}
