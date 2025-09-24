import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, TestTube, Users, Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Learn{" "}
                  <span className="text-white/90">BISINDO</span>
                  <br />
                  Sign Language
                </h1>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Master Bahasa Isyarat Indonesia through interactive lessons, 
                  practice tests, and accessible learning tools designed for everyone.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/learn">
                  <Button className="btn-hero text-lg h-14 px-8">
                    Start Learning
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/test">
                  <Button variant="outline" className="h-14 px-8 text-lg bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Practice Tests
                    <TestTube className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>26 Letters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Interactive Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Accessible Design</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="float-animation">
                <img
                  src={heroImage}
                  alt="People learning and using Indonesian sign language"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About BISINDO Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Learn BISINDO?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BISINDO (Bahasa Isyarat Indonesia) is the official sign language of Indonesia. 
              Learning sign language opens doors to communication, inclusion, and understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="interactive-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Build Connections</CardTitle>
                <CardDescription className="text-lg">
                  Connect with the deaf and hard-of-hearing community in meaningful ways
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sign language breaks down communication barriers and fosters 
                  understanding between hearing and deaf communities.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Promote Inclusion</CardTitle>
                <CardDescription className="text-lg">
                  Be part of creating a more inclusive and accessible society
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your knowledge of sign language can help make public spaces, 
                  workplaces, and communities more welcoming for everyone.
                </p>
              </CardContent>
            </Card>

            <Card className="interactive-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-success" />
                </div>
                <CardTitle className="text-2xl">Expand Skills</CardTitle>
                <CardDescription className="text-lg">
                  Develop cognitive abilities and visual-spatial intelligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learning sign language enhances memory, concentration, 
                  and multitasking abilities while expanding your communication skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Start with the BISINDO alphabet and work your way up to full conversations. 
            Our interactive platform makes learning fun and effective.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 border-2 border-primary/20">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Learn the Alphabet</h3>
              <p className="text-muted-foreground mb-6">
                Master all 26 letters of the BISINDO alphabet with interactive cards 
                and detailed instructions for each sign.
              </p>
              <Link to="/learn">
                <Button className="btn-hero w-full">
                  Start Learning
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-2xl p-8 border-2 border-secondary/20">
              <TestTube className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Practice & Test</h3>
              <p className="text-muted-foreground mb-6">
                Challenge yourself with interactive tests that help you practice 
                and remember what you've learned.
              </p>
              <Link to="/test">
                <Button className="btn-secondary w-full">
                  Take a Test
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
