import { useState } from "react";
import { MessageCircle, Send, X, Minimize2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface ChatWidgetProps {
  providerName: string;
  providerImage?: string;
  isOnline?: boolean;
}

const ChatWidget = ({ providerName, providerImage, isOnline = true }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! I'm ${providerName}. How can I help you today?`,
      sender: "other",
      timestamp: new Date(),
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: "Thank you for your message! I'll get back to you shortly. You can also book a service directly through my profile.",
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
        {isOnline && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-card" />
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-80 bg-card rounded-2xl shadow-elevated border border-border overflow-hidden transition-all duration-300 ${
        isMinimized ? "h-14" : "h-[450px]"
      }`}
    >
      {/* Header */}
      <div
        className="h-14 gradient-primary flex items-center justify-between px-4 cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-3">
          {providerImage ? (
            <img
              src={providerImage}
              alt={providerName}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary-foreground/30"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-primary-foreground">{providerName}</p>
            <div className="flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${isOnline ? "bg-success" : "bg-muted-foreground"}`}
              />
              <span className="text-xs text-primary-foreground/70">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-primary-foreground" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="h-[340px] overflow-y-auto p-4 space-y-4 bg-secondary/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-foreground rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="h-[56px] p-2 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 h-10 bg-secondary/50 border-0"
              />
              <Button
                size="sm"
                onClick={sendMessage}
                disabled={!message.trim()}
                className="h-10 w-10 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;
