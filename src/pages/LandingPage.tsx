import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, Clock, Target, ArrowRight, Calendar, Users, Zap } from "lucide-react"
import { useState } from "react";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/callback",
      },
    });

    if (error) {
      console.error("Error logging in with Google:", error.message);
      alert("Error logging in with Google: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/djyicm00q/image/upload/v1757922976/minimalist-workspace-featuring-sleek-laptop-light-colored-desk-two-cylindrical-containers-hold-pencils-desk-lamp-casts-374137885_ufrpwm.webp"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-20 text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Plan Smarter,
            <br /> Study Better
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Wevent helps students organize tasks, track projects, and never miss a deadline again.
          </p>

          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-foreground">
                  Welcome to Wevent
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4 py-4">
                <p className="text-muted-foreground text-center">
                  Sign in with your Google account to start organizing your academic life
                </p>
                <Button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-3"
                >
                  <img
                    src="https://res.cloudinary.com/djyicm00q/image/upload/v1757923201/Google__G__logo.svg_womaxb.png"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Transform Your Productivity
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to stay organized, meet deadlines, and excel in your studies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">Smart Task Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered task organization that adapts to your study patterns and helps prioritize what matters most.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">Project Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Break down complex projects into manageable steps with visual progress tracking and milestone
                celebrations.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">Deadline Reminders</h3>
              <p className="text-muted-foreground leading-relaxed">
                Never miss another deadline with intelligent notifications that adapt to your schedule and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Built for Student Success
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Wevent understands the unique challenges students face. Our platform is designed to reduce stress and
                increase productivity.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Reduce Academic Stress</h4>
                    <p className="text-muted-foreground">Stay on top of assignments and never feel overwhelmed again</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Collaborate Effectively</h4>
                    <p className="text-muted-foreground">Share projects and coordinate with classmates seamlessly</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Boost Performance</h4>
                    <p className="text-muted-foreground">Achieve better grades through better organization</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://res.cloudinary.com/djyicm00q/image/upload/v1757922976/minimalist-workspace-featuring-sleek-laptop-light-colored-desk-two-cylindrical-containers-hold-pencils-desk-lamp-casts-374137885_ufrpwm.webp"
                alt="Student productivity workspace"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Transform Your Academic Life?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of students who have already improved their productivity with Wevent
          </p>
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/50 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Wevent</h3>
          <p className="text-muted-foreground mb-6">
            Empowering students to achieve their academic goals through smart organization
          </p>
          <div className="text-sm text-muted-foreground">© 2025 Wevent. Built for student success.</div>
        </div>
      </footer>
    </div>
  )
}
