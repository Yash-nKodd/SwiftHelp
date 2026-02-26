import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Kanban, LogOut } from "lucide-react";
import TicketBoard from "@/components/it-staff/TicketBoard";
import Analytics from "@/components/it-staff/Analytics";

type Tab = "board" | "analytics";

const ITStaffPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("board");

  const handleLogout = () => {
    navigate("/login");
  };

  const tabs = [
    { id: "board" as Tab, label: "Ticket Board", icon: Kanban },
    { id: "analytics" as Tab, label: "Analytics", icon: LayoutDashboard }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-secondary-glow flex items-center justify-center">
              <Kanban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">IT Staff Portal</h1>
              <p className="text-xs text-muted-foreground">Ticket Management</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? "text-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary animate-scale-in" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "board" && <TicketBoard />}
        {activeTab === "analytics" && <Analytics />}
      </main>
    </div>
  );
};

export default ITStaffPortal;
