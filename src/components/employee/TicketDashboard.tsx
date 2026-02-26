import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, CheckCircle2, Eye } from "lucide-react";
import { mockTickets } from "@/utils/mockData";
import { Ticket } from "@/types/ticket";

const TicketDashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const userTickets = mockTickets.filter(t => t.createdBy === "john.doe@company.com" || t.createdBy === "sarah.smith@company.com");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-warning/10 text-warning border-warning/20";
      case "assigned": return "bg-primary/10 text-primary border-primary/20";
      case "in-progress": return "bg-secondary/10 text-secondary border-secondary/20";
      case "resolved": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      case "high": return "bg-warning/10 text-warning border-warning/20";
      case "medium": return "bg-primary/10 text-primary border-primary/20";
      case "low": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <Clock className="w-4 h-4" />;
      case "assigned":
      case "in-progress": return <AlertCircle className="w-4 h-4" />;
      case "resolved": return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">My Tickets</h2>
        <p className="text-muted-foreground">Track and manage your IT support requests</p>
      </div>

      {userTickets.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Tickets Yet</h3>
          <p className="text-muted-foreground">Use the AI Assistant to create your first ticket</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {userTickets.map((ticket) => (
            <Card 
              key={ticket.id}
              className="p-6 hover:shadow-md transition-all duration-300 cursor-pointer border-l-4 border-l-primary"
              onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                    <Badge className={`${getStatusColor(ticket.status)} border`}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1 capitalize">{ticket.status.replace("-", " ")}</span>
                    </Badge>
                    <Badge className={`${getPriorityColor(ticket.priority)} border`}>
                      {ticket.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{ticket.title}</h3>
                  <p className="text-muted-foreground text-sm">{ticket.description}</p>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>

              {selectedTicket?.id === ticket.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <span className="ml-2 font-medium capitalize">{ticket.category}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <span className="ml-2 font-medium">{ticket.createdAt.toLocaleDateString()}</span>
                    </div>
                    {ticket.assignedTo && (
                      <div>
                        <span className="text-muted-foreground">Assigned to:</span>
                        <span className="ml-2 font-medium">{ticket.assignedTo}</span>
                      </div>
                    )}
                    {ticket.resolvedAt && (
                      <div>
                        <span className="text-muted-foreground">Resolved:</span>
                        <span className="ml-2 font-medium">{ticket.resolvedAt.toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {ticket.aiSuggestion && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">AI Suggestion</p>
                          <p className="text-sm text-muted-foreground">{ticket.aiSuggestion}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketDashboard;
