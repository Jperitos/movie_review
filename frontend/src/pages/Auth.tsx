import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { Film } from 'lucide-react';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage = ({ onSuccess }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Film className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">MovieReviews</h1>
          <p className="text-muted-foreground">
            Discover, review, and share your favorite movies
          </p>
        </div>
        
        <AuthForm 
          isLogin={isLogin}
          onSuccess={onSuccess}
          onToggleMode={() => setIsLogin(!isLogin)}
        />
      </div>
    </div>
  );
};