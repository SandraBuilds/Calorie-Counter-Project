
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-pink-primary shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-pink-dark">🌸 CalorieCare</h1>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4 text-green-dark" />
              <span className="text-foreground">{user.name}</span>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-pink-primary hover:bg-pink-light transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
