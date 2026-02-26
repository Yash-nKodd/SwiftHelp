import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, AlertTriangle, CheckCircle } from "lucide-react";
import { mockTickets } from "@/utils/mockData";
import { Ticket, TicketStatus } from "@/types/ticket";
import { useToast } from "@/hooks/use-toast";

const TicketBoard = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const columns: { status: TicketStatus; title: string; icon: any }[] = [
    { status: "open", title: "New", icon: Clock },
    { status: "assigned", title: "Assigned", icon: User },
    { status: "in-progress", title: "In Progress", icon: AlertTriangle },
    { status: "resolved", title: "Resolved", icon: CheckCircle }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      case "high": return "bg-warning/10 text-warning border-warning/20";
      case "medium": return "bg-primary/10 text-primary border-primary/20";
      case "low": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    setTickets(prev => 
      prev.map(t => 
        t.id === ticketId 
          ? { ...t, status: newStatus, updatedAt: new Date() }
          : t
      )
    );
    toast({
      title: "Ticket Updated",
      description: `Ticket moved to ${newStatus.replace("-", " ")}`,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Ticket Board</h2>
        <p className="text-muted-foreground">Manage and track all support tickets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTickets = tickets.filter(t => t.status === column.status);
          const Icon = column.icon;

          return (
            <div key={column.status} className="flex flex-col">
              <div className="bg-card rounded-lg p-4 mb-3 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-secondary" />
                    <h3 className="font-semibold">{column.title}</h3>
                  </div>
                  <Badge variant="secondary">{columnTickets.length}</Badge>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                {columnTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className="p-4 hover:shadow-md transition-all duration-300 cursor-pointer border-l-4 border-l-secondary"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <h4 className="font-semibold text-sm mt-1 line-clamp-2">
                          {ticket.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={`${getPriorityColor(ticket.priority)} border text-xs`}>
                          {ticket.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {ticket.category}
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {ticket.createdBy.split("@")[0]}
                        </div>
                      </div>

                      {ticket.aiSuggestion && (
                        <div className="bg-primary/5 rounded p-2 text-xs">
                          <p className="font-medium text-primary mb-1">AI Suggestion</p>
                          <p className="text-muted-foreground line-clamp-2">
                            {ticket.aiSuggestion}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {column.status !== "resolved" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-full text-xs h-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus = column.status === "open" 
                                ? "assigned" 
                                : column.status === "assigned" 
                                ? "in-progress" 
                                : "resolved";
                              handleStatusChange(ticket.id, nextStatus);
                            }}
                          >
                            Move →
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketBoard;
