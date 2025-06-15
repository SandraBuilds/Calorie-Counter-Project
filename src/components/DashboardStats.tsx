
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Utensils, TrendingDown, Calendar } from "lucide-react";

interface DashboardStatsProps {
  dailyGoal: number;
  consumed: number;
  remaining: number;
  steps: number;
  stepGoal: number;
}

export const DashboardStats = ({ dailyGoal, consumed, remaining, steps, stepGoal }: DashboardStatsProps) => {
  const progressPercentage = Math.min((consumed / dailyGoal) * 100, 100);
  const stepProgressPercentage = Math.min((steps / stepGoal) * 100, 100);
  const isOverGoal = consumed > dailyGoal;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-pink-primary/20 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Daily Goal
          </CardTitle>
          <Target className="h-4 w-4 text-pink-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{dailyGoal}</div>
          <p className="text-xs text-muted-foreground">calories per day</p>
        </CardContent>
      </Card>

      <Card className="border-green-primary/20 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Consumed
          </CardTitle>
          <Utensils className="h-4 w-4 text-green-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{consumed}</div>
          <p className="text-xs text-muted-foreground">calories today</p>
          <div className="mt-2">
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card className={`shadow-lg hover:shadow-xl transition-shadow ${
        isOverGoal ? 'border-destructive/20' : 'border-secondary/20'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {isOverGoal ? 'Over Goal' : 'Remaining'}
          </CardTitle>
          <TrendingDown className={`h-4 w-4 ${
            isOverGoal ? 'text-destructive' : 'text-secondary'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            isOverGoal ? 'text-destructive' : 'text-foreground'
          }`}>
            {Math.abs(remaining)}
          </div>
          <p className="text-xs text-muted-foreground">
            {isOverGoal ? 'calories over goal' : 'calories left'}
          </p>
        </CardContent>
      </Card>

      <Card className="border-pink-primary/20 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Steps Today
          </CardTitle>
          <Calendar className="h-4 w-4 text-pink-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{steps.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">of {stepGoal.toLocaleString()} goal</p>
          <div className="mt-2">
            <Progress 
              value={stepProgressPercentage} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
