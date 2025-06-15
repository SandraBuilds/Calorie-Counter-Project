
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserProfile } from "@/pages/Index";

interface BMIFormProps {
  onComplete: (data: Partial<UserProfile>) => void;
}

export const BMIForm = ({ onComplete }: BMIFormProps) => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    activityLevel: "",
    dailyCalorieGoal: "",
    dailyStepGoal: ""
  });

  const calculateBMR = () => {
    const age = parseInt(formData.age);
    const height = parseInt(formData.height);
    const weight = parseInt(formData.weight);
    const gender = formData.gender;

    if (!age || !height || !weight || !gender) return 1800;

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Apply activity level multiplier
    const multipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    return Math.round(bmr * (multipliers[formData.activityLevel as keyof typeof multipliers] || 1.2));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const calculatedCalories = formData.dailyCalorieGoal ? 
      parseInt(formData.dailyCalorieGoal) : calculateBMR();

    const data: Partial<UserProfile> = {
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      gender: formData.gender as 'male' | 'female' | 'other',
      activityLevel: formData.activityLevel as UserProfile['activityLevel'],
      dailyCalorieGoal: calculatedCalories,
      dailyStepGoal: parseInt(formData.dailyStepGoal) || 10000
    };

    onComplete(data);
  };

  return (
    <Card className="w-full max-w-lg mx-auto animate-fade-in border-pink-primary/20 shadow-lg">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground">
          Complete Your Profile
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Help us personalize your calorie and fitness goals
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Gender</Label>
            <RadioGroup 
              value={formData.gender} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Activity Level</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (very hard exercise, physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calorieGoal">Daily Calorie Goal (optional)</Label>
              <Input
                id="calorieGoal"
                type="number"
                placeholder="Auto-calculated"
                value={formData.dailyCalorieGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, dailyCalorieGoal: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stepGoal">Daily Step Goal</Label>
              <Input
                id="stepGoal"
                type="number"
                placeholder="10000"
                value={formData.dailyStepGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, dailyStepGoal: e.target.value }))}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-primary hover:bg-pink-dark text-foreground font-medium transition-colors"
          >
            Complete Setup
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
