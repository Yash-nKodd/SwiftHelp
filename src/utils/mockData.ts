import { Ticket, ChatMessage } from "@/types/ticket";

export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "VPN Connection Failed",
    description: "Unable to connect to corporate VPN. Getting 'Authentication failed' error.",
    category: "vpn",
    priority: "high",
    status: "open",
    createdBy: "john.doe@company.com",
    createdAt: new Date("2025-01-15T09:30:00"),
    updatedAt: new Date("2025-01-15T09:30:00"),
    aiSuggestion: "Try resetting your VPN credentials in the security settings portal."
  },
  {
    id: "TKT-002",
    title: "Printer Not Working",
    description: "Office printer on 3rd floor is not responding to print commands.",
    category: "printer",
    priority: "medium",
    status: "assigned",
    createdBy: "sarah.smith@company.com",
    assignedTo: "IT Support Team A",
    createdAt: new Date("2025-01-15T10:15:00"),
    updatedAt: new Date("2025-01-15T10:45:00"),
    aiSuggestion: "Check printer queue and restart print spooler service."
  },
  {
    id: "TKT-003",
    title: "SAP Access Request",
    description: "Need access to SAP module MM for procurement tasks.",
    category: "sap",
    priority: "medium",
    status: "in-progress",
    createdBy: "mike.johnson@company.com",
    assignedTo: "IT Support Team B",
    createdAt: new Date("2025-01-14T14:20:00"),
    updatedAt: new Date("2025-01-15T08:30:00")
  },
  {
    id: "TKT-004",
    title: "Laptop Overheating",
    description: "Work laptop getting extremely hot and fan is very loud.",
    category: "hardware",
    priority: "high",
    status: "open",
    createdBy: "emma.wilson@company.com",
    createdAt: new Date("2025-01-15T11:00:00"),
    updatedAt: new Date("2025-01-15T11:00:00"),
    aiSuggestion: "Clean laptop vents and update thermal management drivers."
  },
  {
    id: "TKT-005",
    title: "Email Not Syncing",
    description: "Outlook not syncing emails since yesterday afternoon.",
    category: "software",
    priority: "medium",
    status: "resolved",
    createdBy: "alex.brown@company.com",
    assignedTo: "IT Support Team A",
    createdAt: new Date("2025-01-14T16:30:00"),
    updatedAt: new Date("2025-01-15T09:15:00"),
    resolvedAt: new Date("2025-01-15T09:15:00")
  },
  {
    id: "TKT-006",
    title: "Network Speed Issues",
    description: "Internet connection is very slow in conference room B.",
    category: "network",
    priority: "low",
    status: "assigned",
    createdBy: "david.lee@company.com",
    assignedTo: "Network Team",
    createdAt: new Date("2025-01-15T08:00:00"),
    updatedAt: new Date("2025-01-15T08:30:00")
  }
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: "msg-1",
    role: "assistant",
    content: "Hello! I'm your AI helpdesk assistant. How can I help you today?",
    timestamp: new Date("2025-01-15T09:00:00")
  }
];

export const knowledgeBaseArticles = [
  {
    id: "kb-001",
    title: "How to Reset VPN Password",
    category: "vpn",
    content: "To reset your VPN password: 1. Go to security portal, 2. Click 'Reset VPN Credentials', 3. Follow email instructions",
    views: 245
  },
  {
    id: "kb-002",
    title: "Printer Configuration Guide",
    category: "printer",
    content: "Complete guide to setting up network printers on Windows and Mac systems",
    views: 189
  },
  {
    id: "kb-003",
    title: "SAP Access Levels Explained",
    category: "sap",
    content: "Understanding different SAP module access levels and how to request them",
    views: 156
  },
  {
    id: "kb-004",
    title: "Troubleshooting Network Issues",
    category: "network",
    content: "Common network problems and their solutions including DNS, WiFi, and VPN issues",
    views: 312
  },
  {
    id: "kb-005",
    title: "Hardware Maintenance Tips",
    category: "hardware",
    content: "Best practices for maintaining your work laptop, keyboard, and other peripherals",
    views: 198
  }
];
