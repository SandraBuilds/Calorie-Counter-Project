
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { BMIForm } from "@/components/BMIForm";
import type { UserProfile } from "@/pages/Index";

interface AuthFormProps {
  isLogin: boolean;
  onLogin: (user: UserProfile) => void;
  onToggleMode: () => void;
}

export const AuthForm = ({ isLogin, onLogin, onToggleMode }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBMIForm, setShowBMIForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Mock login validation
        if (formData.email && formData.password) {
          onLogin({
            name: formData.name || formData.email.split('@')[0],
            email: formData.email,
            dailyCalorieGoal: 2000,
            dailyStepGoal: 10000
          });
          toast.success("Welcome back! 🌸");
        } else {
          toast.error("Please fill in all fields");
        }
      } else {
        // For signup, show BMI form first
        if (formData.name && formData.email && formData.password) {
          setShowBMIForm(true);
          toast.success("Great! Let's set up your profile 📝");
        } else {
          toast.error("Please fill in all fields");
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBMIFormComplete = (bmiData: Partial<UserProfile>) => {
    const userData: UserProfile = {
      name: formData.name,
      email: formData.email,
      ...bmiData
    };
    onLogin(userData);
    toast.success("Account created successfully! 🎉");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showBMIForm && !isLogin) {
    return <BMIForm onComplete={handleBMIFormComplete} />;
  }

  return (
    <Card className="w-full animate-fade-in border-pink-primary/20 shadow-lg">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground">
          {isLogin ? "Welcome Back" : "Join CalorieCare"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {isLogin 
            ? "Sign in to track your calories" 
            : "Create an account to start your journey"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 border-pink-primary/30 focus:border-pink-primary"
                  required={!isLogin}
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 border-pink-primary/30 focus:border-pink-primary"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 pr-10 border-pink-primary/30 focus:border-pink-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-pink-primary hover:bg-pink-dark text-foreground font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={onToggleMode}
              className="text-pink-dark hover:text-pink-primary font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
