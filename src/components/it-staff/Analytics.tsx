import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";
import { mockTickets } from "@/utils/mockData";

const Analytics = () => {
  const totalTickets = mockTickets.length;
  const resolvedTickets = mockTickets.filter(t => t.status === "resolved").length;
  const openTickets = mockTickets.filter(t => t.status === "open").length;
  const inProgressTickets = mockTickets.filter(t => t.status === "in-progress" || t.status === "assigned").length;
  
  const resolutionRate = Math.round((resolvedTickets / totalTickets) * 100);
  const avgResolutionTime = "4.2 hours"; // Mock data
  
  const categoryBreakdown = mockTickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityBreakdown = mockTickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: BarChart3,
      trend: "+12%",
      trendUp: true,
      color: "bg-primary"
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      icon: CheckCircle,
      trend: "+5%",
      trendUp: true,
      color: "bg-success"
    },
    {
      title: "Open Tickets",
      value: openTickets,
      icon: Clock,
      trend: "-8%",
      trendUp: false,
      color: "bg-warning"
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      icon: AlertTriangle,
      trend: "+3%",
      trendUp: true,
      color: "bg-secondary"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Monitor performance and track metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${stat.trendUp ? "text-success" : "text-destructive"}`}
                >
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tickets by Category</h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([category, count]) => {
                const percentage = Math.round((count / totalTickets) * 100);
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{category}</span>
                      <span className="text-muted-foreground">{count} tickets ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Priority Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
          <div className="space-y-4">
            {Object.entries(priorityBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([priority, count]) => {
                const percentage = Math.round((count / totalTickets) * 100);
                const colors: Record<string, string> = {
                  critical: "bg-destructive",
                  high: "bg-warning",
                  medium: "bg-primary",
                  low: "bg-muted-foreground"
                };
                
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded-full ${colors[priority]}`} />
                      <span className="capitalize font-medium">{priority}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{count}</span>
                      <span className="text-sm text-muted-foreground">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      {/* SLA Compliance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-4xl font-bold text-success mb-2">94%</p>
            <p className="text-sm text-muted-foreground">SLA Compliance</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">{avgResolutionTime}</p>
            <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-4xl font-bold text-secondary mb-2">8.7</p>
            <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
