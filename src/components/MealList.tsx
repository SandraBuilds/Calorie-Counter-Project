
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Clock, Utensils } from "lucide-react";
import { toast } from "sonner";

interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
}

interface MealListProps {
  meals: Meal[];
  onDeleteMeal: (mealId: string) => void;
}

export const MealList = ({ meals, onDeleteMeal }: MealListProps) => {
  const handleDelete = (mealId: string, mealName: string) => {
    onDeleteMeal(mealId);
    toast.success(`${mealName} removed from your meals`);
  };

  return (
    <Card className="border-pink-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Utensils className="h-5 w-5 text-pink-dark" />
          <span>Today's Meals</span>
          <span className="text-sm font-normal text-muted-foreground">
            ({meals.length} {meals.length === 1 ? 'meal' : 'meals'})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {meals.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🍽️</div>
            <p className="text-muted-foreground">No meals added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start tracking by adding your first meal!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {meals.map((meal, index) => (
              <div
                key={meal.id}
                className="flex items-center justify-between p-3 bg-pink-light/30 rounded-lg border border-pink-primary/10 hover:bg-pink-light/50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{meal.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span className="font-medium">{meal.calories} cal</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDelete(meal.id, meal.name)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
