import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Mic, Paperclip, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/types/ticket";
import { mockChatHistory } from "@/utils/mockData";

const ChatInterface = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("vpn")) {
      return "I can help you with VPN issues. Common solutions:\n\n1. Reset your VPN credentials in the security portal\n2. Check if your account is locked\n3. Ensure you're using the latest VPN client\n\nWould you like me to create a ticket for IT support?";
    } else if (lowerInput.includes("printer")) {
      return "For printer issues, try these steps:\n\n1. Check if the printer is online\n2. Restart the print spooler service\n3. Remove and re-add the printer\n\nShould I log a ticket for hardware support?";
    } else if (lowerInput.includes("password") || lowerInput.includes("reset")) {
      return "For password resets:\n\n1. Visit the self-service portal: portal.company.com\n2. Click 'Forgot Password'\n3. Follow the email instructions\n\nNeed help with any other account issues?";
    } else if (lowerInput.includes("sap")) {
      return "I can assist with SAP-related issues. Are you experiencing:\n\n1. Access problems?\n2. Module functionality issues?\n3. Data entry concerns?\n\nPlease provide more details so I can help better.";
    } else {
      return "I understand you need assistance. To help you better, could you please provide more details about:\n\n• What system or service is affected?\n• What error messages are you seeing?\n• When did the issue start?\n\nI'm here to help resolve your IT issues quickly!";
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Input",
        description: "Voice recognition would be activated here",
      });
    }
  };

  const handleAttachment = () => {
    toast({
      title: "Upload File",
      description: "File upload dialog would open here",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-primary p-4 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">AI Helpdesk Assistant</h2>
              <p className="text-sm text-white/80">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" 
                    ? "bg-primary" 
                    : "bg-secondary"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl p-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-card border-t border-border">
          <div className="flex items-end space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAttachment}
              className="flex-shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              className={`flex-shrink-0 transition-all ${
                isListening 
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-glow-pulse" 
                  : "hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Describe your IT issue..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex-shrink-0 h-12 px-6"
              variant="gradient"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
