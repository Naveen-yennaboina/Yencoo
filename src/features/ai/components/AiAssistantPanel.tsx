import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { X, Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { executeAiAction, clearConversation as clearConversationAction } from "@/actions/ai-actions";
import { usePathname } from "next/navigation";

interface AiAssistantPanelProps {
  lessonId: string;
  initialMessages?: { id: string; role: string; content: string; createdAt: Date }[];
  onClose: () => void;
}

const INITIAL_SUGGESTIONS = [
  "Explain this concept simply",
  "Give me an example",
  "Summarize this lesson"
];

export function AiAssistantPanel({ lessonId, initialMessages = [], onClose }: AiAssistantPanelProps) {
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>(
    initialMessages.map(m => ({ id: m.id, role: m.role, content: m.content }))
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const pathname = usePathname();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const tempUserMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempUserMsgId, role: 'user', content: text }]);
    setInputValue("");
    setIsTyping(true);

    await executeAiAction(lessonId, "chat", { prompt: text }, pathname);
    
    setIsTyping(false);
  };

  const handleQuickAction = async (actionType: string, payload: any = {}) => {
    setIsTyping(true);
    await executeAiAction(lessonId, actionType, payload, pathname);
    setIsTyping(false);
  };

  useEffect(() => {
    // Sync with server state changes
    setMessages(initialMessages.map(m => ({ id: m.id, role: m.role, content: m.content })));
  }, [initialMessages]);

  const handleClear = async () => {
    setMessages([]);
    await clearConversationAction(lessonId, pathname);
  };

  return (
    <div className="flex flex-col h-full bg-card border-l border-border w-full md:w-80 lg:w-[400px] shrink-0 shadow-xl z-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="font-semibold">AI Assistant</h2>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <Button variant="ghost" size="icon" onClick={handleClear} className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Bot className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">How can I help?</h3>
              <p className="text-sm text-muted-foreground px-4">
                I can explain concepts, provide examples, or answer questions about this lesson.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-[250px]">
              {INITIAL_SUGGESTIONS.map((suggestion) => (
                <Button 
                  key={suggestion} 
                  variant="outline" 
                  className="w-full text-xs justify-start font-normal h-auto py-2"
                  onClick={() => handleSendMessage(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex gap-3 max-w-[90%]", 
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'user' ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                )}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm",
                  msg.role === 'user' 
                    ? "bg-secondary text-secondary-foreground rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-none"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl text-sm bg-muted text-foreground rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Quick Actions (Scrollable horizontal) */}
      <div className="p-2 border-t border-border bg-muted/20 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Button variant="secondary" size="sm" onClick={() => handleQuickAction("explain", { concept: "this lesson" })} className="text-xs h-7" disabled={isTyping}>
          Explain
        </Button>
        <Button variant="secondary" size="sm" onClick={() => handleQuickAction("summarize")} className="text-xs h-7" disabled={isTyping}>
          Summarize
        </Button>
        <Button variant="secondary" size="sm" onClick={() => handleQuickAction("translate", { language: "Spanish" })} className="text-xs h-7" disabled={isTyping}>
          Translate (ES)
        </Button>
        <Button variant="secondary" size="sm" onClick={() => handleQuickAction("flashcards")} className="text-xs h-7" disabled={isTyping}>
          Flashcards
        </Button>
      </div>
      
      {/* Input Area */}
      <div className="p-4 bg-background">
        <form 
          className="flex items-end gap-2 bg-muted rounded-xl p-1 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
        >
          <textarea
            className="flex-1 max-h-32 min-h-[40px] bg-transparent border-0 focus:ring-0 resize-none outline-none text-sm py-2.5 px-3"
            placeholder="Ask AI..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputValue);
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isTyping}
            className="h-10 w-10 shrink-0 rounded-lg mb-0.5 mr-0.5"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
