import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Ticket, BookOpen, LogOut } from "lucide-react";
import ChatInterface from "@/components/employee/ChatInterface";
import TicketDashboard from "@/components/employee/TicketDashboard";
import KnowledgeBase from "@/components/employee/KnowledgeBase";

type Tab = "chat" | "tickets" | "knowledge";

const EmployeePortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  const handleLogout = () => {
    navigate("/login");
  };

  const tabs = [
    { id: "chat" as Tab, label: "AI Assistant", icon: MessageSquare },
    { id: "tickets" as Tab, label: "My Tickets", icon: Ticket },
    { id: "knowledge" as Tab, label: "Knowledge Base", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Employee Portal</h1>
              <p className="text-xs text-muted-foreground">Smart Helpdesk</p>
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
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-scale-in" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "chat" && <ChatInterface />}
        {activeTab === "tickets" && <TicketDashboard />}
        {activeTab === "knowledge" && <KnowledgeBase />}
      </main>
    </div>
  );
};

export default EmployeePortal;
