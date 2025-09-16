import { useState } from 'react';
import { User, Mail, Lock, Bell, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { mockAuth, type User as UserType } from '@/lib/auth';

interface ProfileSettingsProps {
  user: UserType;
  onClose: () => void;
}

export const ProfileSettings = ({ user, onClose }: ProfileSettingsProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    reviewNotifications: false,
    marketingEmails: false,
    publicProfile: true
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (preference: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [preference]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data in localStorage (mock)
    const updatedUser = { ...user, name: formData.name, email: formData.email };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
    
    setIsLoading(false);
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New passwords don't match.",
        variant: "destructive"
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
    
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="movie-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your display name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </div>
          <Button onClick={handleSaveProfile} disabled={isLoading} className="gold-gradient">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="movie-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Keep your account secure by updating your password regularly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <Button 
            onClick={handleChangePassword} 
            disabled={isLoading || !formData.currentPassword || !formData.newPassword}
            variant="outline"
          >
            <Lock className="w-4 h-4 mr-2" />
            {isLoading ? 'Updating...' : 'Change Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="movie-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Manage how you receive notifications and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about your reviews and activity
                </p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Review Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone comments on your reviews
                </p>
              </div>
              <Switch
                checked={preferences.reviewNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('reviewNotifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features and movie recommendations
                </p>
              </div>
              <Switch
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="movie-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>
            Control who can see your profile and activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Profile</Label>
              <p className="text-sm text-muted-foreground">
                Allow other users to view your profile and reviews
              </p>
            </div>
            <Switch
              checked={preferences.publicProfile}
              onCheckedChange={(checked) => handlePreferenceChange('publicProfile', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close Settings
        </Button>
      </div>
    </div>
  );
};