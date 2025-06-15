
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Utensils, Search } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
  date: string;
}

interface PreviousMealsProps {
  meals: Meal[];
}

export const PreviousMeals = ({ meals }: PreviousMealsProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Group meals by date
  const mealsByDate = meals.reduce((acc, meal) => {
    if (!acc[meal.date]) {
      acc[meal.date] = [];
    }
    acc[meal.date].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  // Filter meals based on search term
  const filteredMealsByDate = Object.entries(mealsByDate).reduce((acc, [date, dateMeals]) => {
    const filteredMeals = dateMeals.filter(meal => 
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredMeals.length > 0) {
      acc[date] = filteredMeals;
    }
    return acc;
  }, {} as Record<string, Meal[]>);

  const sortedDates = Object.keys(filteredMealsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Card className="border-pink-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Calendar className="h-5 w-5 text-pink-dark" />
          <span>Meal History</span>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-pink-primary/30 focus:border-pink-primary"
          />
        </div>
      </CardHeader>
      <CardContent>
        {sortedDates.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🍽️</div>
            <p className="text-muted-foreground">
              {searchTerm ? "No meals found matching your search" : "No meal history yet"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {!searchTerm && "Start adding meals to see your history!"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((date) => {
              const dateMeals = filteredMealsByDate[date];
              const totalCalories = dateMeals.reduce((sum, meal) => sum + meal.calories, 0);
              const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <div key={date} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{formattedDate}</h3>
                    <span className="text-sm font-medium text-green-dark">
                      {totalCalories} calories total
                    </span>
                  </div>
                  <div className="space-y-2">
                    {dateMeals.map((meal, index) => (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-3 bg-pink-light/30 rounded-lg border border-pink-primary/10 hover:bg-pink-light/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3">
                          <Utensils className="h-4 w-4 text-pink-dark" />
                          <div>
                            <h4 className="font-medium text-foreground">{meal.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="font-medium">{meal.calories} cal</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{meal.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
