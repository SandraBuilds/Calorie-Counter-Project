
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface MealFormProps {
  onAddMeal: (meal: { name: string; calories: number }) => void;
}

const motivationalQuotes = [
  "You're doing amazing! Every healthy choice counts! 🌟",
  "Progress, not perfection! Keep going! 💪",
  "Your body is your temple - treat it with love! 🏛️",
  "Small steps lead to big changes! 🚶‍♀️✨",
  "You're stronger than your excuses! 💎",
  "Healthy eating is a form of self-respect! 🥗💖",
  "Every meal is a new opportunity to nourish yourself! 🌱",
  "You're building a healthier, happier you! 🌈",
  "Consistency is key - you've got this! 🔑",
  "Listen to your body and fuel it well! 👂💚"
];

export const MealForm = ({ onAddMeal }: MealFormProps) => {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRandomQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mealName.trim() || !calories) {
      toast.error("Please fill in both meal name and calories");
      return;
    }

    const calorieValue = parseInt(calories);
    if (calorieValue <= 0) {
      toast.error("Please enter a valid calorie amount");
      return;
    }

    setIsLoading(true);

    // Simulate processing time for quote generation
    setTimeout(() => {
      onAddMeal({
        name: mealName.trim(),
        calories: calorieValue
      });

      // Show motivational quote
      const quote = getRandomQuote();
      toast.success(quote, {
        duration: 4000,
        icon: <Sparkles className="h-4 w-4" />
      });

      setMealName("");
      setCalories("");
      setIsLoading(false);
    }, 800);
  };

  return (
    <Card className="border-pink-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Plus className="h-5 w-5 text-pink-dark" />
          <span>Add Meal</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealName" className="text-foreground font-medium">
              Meal Name
            </Label>
            <Input
              id="mealName"
              type="text"
              placeholder="e.g., Grilled Chicken Salad"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="border-pink-primary/30 focus:border-pink-primary"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories" className="text-foreground font-medium">
              Calories
            </Label>
            <Input
              id="calories"
              type="number"
              placeholder="e.g., 350"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="border-pink-primary/30 focus:border-pink-primary"
              min="1"
              disabled={isLoading}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-pink-primary hover:bg-pink-dark text-foreground font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 animate-spin" />
                <span>Adding Meal...</span>
              </div>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Meal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
