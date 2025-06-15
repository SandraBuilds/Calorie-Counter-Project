
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus } from "lucide-react";
import { toast } from "sonner";

interface StepTrackerProps {
  steps: number;
  stepGoal: number;
  onUpdateSteps: (steps: number) => void;
}

export const StepTracker = ({ steps, stepGoal, onUpdateSteps }: StepTrackerProps) => {
  const [stepInput, setStepInput] = useState("");

  const handleAddSteps = (e: React.FormEvent) => {
    e.preventDefault();
    const additionalSteps = parseInt(stepInput);
    if (additionalSteps && additionalSteps > 0) {
      const newSteps = steps + additionalSteps;
      onUpdateSteps(newSteps);
      setStepInput("");
      toast.success(`Added ${additionalSteps.toLocaleString()} steps! 👟`);
    }
  };

  const handleSetSteps = () => {
    const totalSteps = parseInt(stepInput);
    if (totalSteps >= 0) {
      onUpdateSteps(totalSteps);
      setStepInput("");
      toast.success(`Steps updated to ${totalSteps.toLocaleString()}! 🚶‍♀️`);
    }
  };

  const progressPercentage = Math.min((steps / stepGoal) * 100, 100);
  const caloriesBurned = Math.round(steps * 0.04); // Rough estimate: 0.04 calories per step

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-pink-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <Calendar className="h-5 w-5 text-pink-dark" />
            <span>Step Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-foreground">
                {steps.toLocaleString()}
              </div>
              <p className="text-muted-foreground">
                of {stepGoal.toLocaleString()} daily goal
              </p>
            </div>
            
            <Progress value={progressPercentage} className="h-4" />
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-pink-light/30 rounded-lg">
                <div className="text-lg font-semibold text-foreground">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-sm text-muted-foreground">Goal Progress</p>
              </div>
              <div className="p-3 bg-green-light/30 rounded-lg">
                <div className="text-lg font-semibold text-foreground">
                  ~{caloriesBurned}
                </div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddSteps} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stepInput" className="text-foreground font-medium">
                Update Steps
              </Label>
              <Input
                id="stepInput"
                type="number"
                placeholder="Enter step count"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                className="border-pink-primary/30 focus:border-pink-primary"
                min="0"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="flex-1 bg-pink-primary hover:bg-pink-dark text-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Steps
              </Button>
              <Button
                type="button"
                onClick={handleSetSteps}
                variant="outline"
                className="flex-1 border-pink-primary text-pink-dark hover:bg-pink-light"
              >
                Set Total
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
