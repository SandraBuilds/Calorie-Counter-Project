
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";
import { toast } from "sonner";
import type { UserProfile } from "@/pages/Index";

interface GoalSettingsProps {
  user: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const GoalSettings = ({ user, onUpdateProfile }: GoalSettingsProps) => {
  const [calorieGoal, setCalorieGoal] = useState(user.dailyCalorieGoal?.toString() || "2000");
  const [stepGoal, setStepGoal] = useState(user.dailyStepGoal?.toString() || "10000");
  const [weight, setWeight] = useState(user.weight?.toString() || "");

  const calculateBMI = () => {
    if (user.height && user.weight) {
      const heightInMeters = user.height / 100;
      const bmi = user.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal weight", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const handleSave = () => {
    const updates: Partial<UserProfile> = {
      dailyCalorieGoal: parseInt(calorieGoal),
      dailyStepGoal: parseInt(stepGoal)
    };

    if (weight && parseFloat(weight) !== user.weight) {
      updates.weight = parseFloat(weight);
    }

    onUpdateProfile(updates);
    toast.success("Goals updated successfully! 🎯");
  };

  const bmiValue = calculateBMI();
  const bmiInfo = bmiValue ? getBMICategory(parseFloat(bmiValue)) : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-pink-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <Target className="h-5 w-5 text-pink-dark" />
            <span>Goal Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="calorieGoal" className="text-foreground font-medium">
                Daily Calorie Goal
              </Label>
              <Input
                id="calorieGoal"
                type="number"
                value={calorieGoal}
                onChange={(e) => setCalorieGoal(e.target.value)}
                className="border-pink-primary/30 focus:border-pink-primary"
                min="1000"
                max="5000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stepGoal" className="text-foreground font-medium">
                Daily Step Goal
              </Label>
              <Input
                id="stepGoal"
                type="number"
                value={stepGoal}
                onChange={(e) => setStepGoal(e.target.value)}
                className="border-pink-primary/30 focus:border-pink-primary"
                min="1000"
                max="50000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-foreground font-medium">
                Current Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={user.weight?.toString() || "Enter weight"}
                className="border-pink-primary/30 focus:border-pink-primary"
                min="30"
                max="300"
                step="0.1"
              />
            </div>
          </div>

          {user.height && user.weight && bmiValue && bmiInfo && (
            <div className="p-4 bg-pink-light/20 rounded-lg border border-pink-primary/10">
              <h3 className="font-semibold text-foreground mb-2">Your BMI</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground">{bmiValue}</span>
                  <span className={`ml-2 font-medium ${bmiInfo.color}`}>
                    {bmiInfo.category}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Height: {user.height}cm, Weight: {user.weight}kg
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleSave}
            className="w-full bg-pink-primary hover:bg-pink-dark text-foreground font-medium transition-colors"
          >
            Save Goals
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
