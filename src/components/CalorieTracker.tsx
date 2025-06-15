
import { useState } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { MealForm } from "@/components/MealForm";
import { MealList } from "@/components/MealList";
import { PreviousMeals } from "@/components/PreviousMeals";
import { StepTracker } from "@/components/StepTracker";
import { GoalSettings } from "@/components/GoalSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserProfile } from "@/pages/Index";

interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
  date: string;
}

interface CalorieTrackerProps {
  user: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const CalorieTracker = ({ user, onUpdateProfile }: CalorieTrackerProps) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [steps, setSteps] = useState(0);

  const today = new Date().toDateString();
  const todaysMeals = meals.filter(meal => meal.date === today);
  const totalConsumed = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const remaining = (user.dailyCalorieGoal || 2000) - totalConsumed;

  const addMeal = (mealData: { name: string; calories: number }) => {
    const newMeal: Meal = {
      id: Date.now().toString(),
      name: mealData.name,
      calories: mealData.calories,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      date: today
    };
    setMeals(prev => [...prev, newMeal]);
    console.log("Meal added:", newMeal);
  };

  const deleteMeal = (mealId: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== mealId));
    console.log("Meal deleted:", mealId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user.name}! 🌟
        </h2>
        <p className="text-muted-foreground">
          Let's track your calories and steps for today
        </p>
      </div>

      <DashboardStats
        dailyGoal={user.dailyCalorieGoal || 2000}
        consumed={totalConsumed}
        remaining={remaining}
        steps={steps}
        stepGoal={user.dailyStepGoal || 10000}
      />

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="settings">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MealForm onAddMeal={addMeal} />
            <MealList meals={todaysMeals} onDeleteMeal={deleteMeal} />
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <PreviousMeals meals={meals} />
        </TabsContent>
        
        <TabsContent value="steps">
          <StepTracker 
            steps={steps} 
            stepGoal={user.dailyStepGoal || 10000}
            onUpdateSteps={setSteps} 
          />
        </TabsContent>
        
        <TabsContent value="settings">
          <GoalSettings user={user} onUpdateProfile={onUpdateProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
