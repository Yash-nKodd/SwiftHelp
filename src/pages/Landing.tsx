import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bot, Users, BarChart3, Shield, Zap, Brain } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Chatbot",
      description: "Instant ticket creation with voice and text support"
    },
    {
      icon: Brain,
      title: "Smart Classification",
      description: "NLP-based automatic ticket categorization and routing"
    },
    {
      icon: Zap,
      title: "Auto-Resolution",
      description: "Common issues resolved automatically without human intervention"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights with SLA tracking and performance metrics"
    },
    {
      icon: Users,
      title: "Unified Dashboard",
      description: "All tickets from multiple sources in one place"
    },
    {
      icon: Shield,
      title: "Proactive Alerts",
      description: "Smart notifications before issues become critical"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Smart Helpdesk
              <span className="block text-primary-glow">Powered by AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Transform your IT support with intelligent ticket management, automated resolutions, and real-time analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="gradient" 
                size="lg"
                onClick={() => navigate("/login")}
                className="text-lg px-8 py-6 h-auto"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/login")}
                className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Smart Helpdesk?
            </h2>
            <p className="text-xl text-muted-foreground">
              Next-generation IT support with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scale-in border border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your IT Support?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of companies already using Smart Helpdesk
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate("/login")}
            className="text-lg px-8 py-6 h-auto bg-white text-primary hover:bg-white/90 hover:scale-105 border-0"
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2025 Smart Helpdesk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
