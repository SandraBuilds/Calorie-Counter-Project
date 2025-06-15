
import { useState } from "react";
import { CalorieTracker } from "@/components/CalorieTracker";
import { AuthForm } from "@/components/AuthForm";
import { Header } from "@/components/Header";

export interface UserProfile {
  name: string;
  email: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  gender?: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  dailyCalorieGoal?: number;
  dailyStepGoal?: number;
}

const Index = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    console.log("User logged in:", userData);
  };

  const handleLogout = () => {
    setUser(null);
    console.log("User logged out");
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-light via-background to-green-light">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {user ? (
          <CalorieTracker user={user} onUpdateProfile={updateUserProfile} />
        ) : (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                🌸 CalorieCare
              </h1>
              <p className="text-muted-foreground">
                Track your calories with care and style
              </p>
            </div>
            
            <AuthForm 
              isLogin={showLogin} 
              onLogin={handleLogin}
              onToggleMode={() => setShowLogin(!showLogin)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
