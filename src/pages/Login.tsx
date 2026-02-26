import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bot, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"employee" | "it-staff" | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    if (!selectedRole) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive",
      });
      return;
    }

    // Mock authentication - in production this would validate against a backend
    toast({
      title: "Success!",
      description: `Logged in as ${selectedRole === "employee" ? "Employee" : "IT Staff"}`,
    });

    // Navigate based on role
    if (selectedRole === "employee") {
      navigate("/employee");
    } else {
      navigate("/it-staff");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-white/80 text-lg">
            Sign in to access your helpdesk
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow border-2 ${
              selectedRole === "employee" 
                ? "border-primary bg-primary/5 shadow-glow" 
                : "border-border bg-card hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("employee")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedRole === "employee" 
                  ? "bg-gradient-primary shadow-glow" 
                  : "bg-muted"
              }`}>
                <Users className={`w-8 h-8 ${selectedRole === "employee" ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Employee Portal</h3>
                <p className="text-muted-foreground">
                  Raise tickets and track your IT issues
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow border-2 ${
              selectedRole === "it-staff" 
                ? "border-secondary bg-secondary/5 shadow-glow" 
                : "border-border bg-card hover:border-secondary/50"
            }`}
            onClick={() => setSelectedRole("it-staff")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedRole === "it-staff" 
                  ? "bg-gradient-to-br from-secondary to-secondary-glow shadow-glow" 
                  : "bg-muted"
              }`}>
                <Bot className={`w-8 h-8 ${selectedRole === "it-staff" ? "text-white" : "text-muted-foreground"}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">IT Staff Portal</h3>
                <p className="text-muted-foreground">
                  Manage tickets and resolve issues
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-lg animate-scale-in">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 transition-all duration-300 focus:shadow-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 transition-all duration-300 focus:shadow-md"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base"
              variant={selectedRole === "it-staff" ? "secondary" : "gradient"}
              disabled={!selectedRole}
            >
              Sign In
            </Button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Home
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
