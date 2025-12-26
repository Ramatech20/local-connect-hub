import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Minimize2, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthProvider";
import { useConversations, Conversation } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";
import { formatDistanceToNow } from "date-fns";

const MessagingCenter = () => {
  const { user } = useAuth();
  const { conversations, loading: convsLoading, createConversation } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const { messages, loading: msgsLoading, sendMessage } = useMessages(
    selectedConversation?.id || null
  );
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const formatTime = (dateStr: string) => {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
  };

  const totalUnread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);

  if (!user) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs text-destructive-foreground font-medium">
            {totalUnread > 9 ? "9+" : totalUnread}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-96 bg-card rounded-2xl shadow-xl border border-border overflow-hidden transition-all duration-300 ${
        isMinimized ? "h-14" : "h-[500px]"
      }`}
    >
      {/* Header */}
      <div className="h-14 bg-primary flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {selectedConversation && (
            <button
              onClick={() => setSelectedConversation(null)}
              className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary-foreground" />
            </button>
          )}
          <p className="text-sm font-medium text-primary-foreground">
            {selectedConversation
              ? selectedConversation.other_user?.full_name || "Chat"
              : "Messages"}
          </p>
          {totalUnread > 0 && !selectedConversation && (
            <span className="px-2 py-0.5 bg-primary-foreground/20 rounded-full text-xs text-primary-foreground">
              {totalUnread} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-primary-foreground" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {!selectedConversation ? (
            // Conversation List
            <ScrollArea className="h-[444px]">
              {convsLoading ? (
                <div className="p-4 text-center text-muted-foreground">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No conversations yet</p>
                  <p className="text-sm mt-1">Start chatting with a provider!</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className="w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        {conv.other_user?.avatar_url ? (
                          <img
                            src={conv.other_user.avatar_url}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground truncate">
                            {conv.other_user?.full_name || "User"}
                          </p>
                          {conv.unread_count ? (
                            <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                              {conv.unread_count}
                            </span>
                          ) : null}
                        </div>
                        {conv.last_message && (
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.last_message.content}
                          </p>
                        )}
                        {conv.last_message && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTime(conv.last_message.created_at)}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          ) : (
            // Messages View
            <>
              <ScrollArea className="h-[388px] p-4">
                {msgsLoading ? (
                  <div className="text-center text-muted-foreground">Loading...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No messages yet</p>
                    <p className="text-sm">Say hello!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_id === user.id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.sender_id === user.id
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-secondary text-foreground rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender_id === user.id
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </ScrollArea>

              {/* Input */}
              <div className="h-[56px] p-2 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 h-10 bg-secondary/50 border-0"
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="h-10 w-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MessagingCenter;
