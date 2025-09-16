import { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { AuthPage } from './Auth';
import { Dashboard } from './Dashboard';
import { mockAuth } from '@/lib/auth';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = mockAuth.getCurrentUser();
    if (currentUser) {
      setCurrentView('dashboard');
    }
    setIsLoading(false);
  }, []);

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('landing');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (currentView === 'auth') {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
