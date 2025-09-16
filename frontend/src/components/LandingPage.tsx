import { useState } from 'react';
import { Film, Star, Users, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-cinema.jpg';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: Film,
      title: 'Discover Movies',
      description: 'Explore thousands of movies from every genre and era'
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Share your thoughts and rate movies with our 5-star system'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow movie lovers and discover new favorites'
    },
    {
      icon: Zap,
      title: 'Personalized',
      description: 'Get recommendations based on your viewing history and ratings'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Movies' },
    { number: '50K+', label: 'Reviews' },
    { number: '25K+', label: 'Users' },
    { number: '4.8', label: 'Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold">MovieReviews</h1>
          </div>
          
          <Button onClick={onGetStarted} className="gold-gradient">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next
              <span className="block text-primary">Favorite Movie</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Join thousands of movie enthusiasts in rating, reviewing, 
              and discovering incredible films from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gold-gradient text-lg px-8 py-6"
                onClick={onGetStarted}
              >
                Start Reviewing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10"
              >
                Browse Movies
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose MovieReviews?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to explore, rate, and discuss movies 
              with a passionate community of film lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="movie-card text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-primary/10">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Movie Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of movie enthusiasts and discover 
              your next favorite film today.
            </p>
            <Button 
              size="lg" 
              className="gold-gradient text-lg px-12 py-6"
              onClick={onGetStarted}
            >
              Join MovieReviews
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 rounded-lg bg-primary/10">
                <Film className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">MovieReviews</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 MovieReviews. Discover your next favorite film.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};