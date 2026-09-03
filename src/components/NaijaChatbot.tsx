import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  RotateCcw, 
  Copy, 
  Check, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2,
  Zap
} from 'lucide-react';
import Markdown from 'react-markdown';
import { trackChatQuery } from '../utils/analytics';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NaijaChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  diagnosticContext?: {
    matchedNiche?: string;
    device?: string;
    weeklyHours?: string;
    location?: string;
    proudAchievement?: string;
  };
  initialPrompt?: string;
}

const DEFAULT_QUICK_QUESTIONS = [
  "Can I learn coding with a 4GB RAM laptop and phone data?",
  "What is the real difference between Frontend, Backend, and Full-Stack?",
  "How can a beginner in Nigeria land foreign freelance clients?",
  "Which pays faster: UI/UX Design or Web Development?",
  "Tell me about 3MTT and free tech scholarships in Nigeria.",
  "How can I study tech while working a 9-5 job in Lagos traffic?"
];

export const NaijaChatbot: React.FC<NaijaChatbotProps> = ({
  isOpen,
  onClose,
  diagnosticContext,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `**Kedu & Welcome! I am Tizzi, your Naija Tech Career Guide & Mentor.** 🇳🇬\n\nAsk me anything about starting tech in Nigeria — whether you're navigating **NEPA power cuts**, managing **limited data subscriptions**, choosing between **Frontend, Backend, UI/UX, or Data**, or looking for **free scholarships like 3MTT and DevCareer**.\n\nWhat would you like to explore today?`,
        timestamp: new Date(),
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle initial prompt if passed
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);
    trackChatQuery();

    try {
      // Format messages history for the API
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: historyPayload,
          context: diagnosticContext,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "I didn't catch that. Could you please rephrase?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `**Omo, small network wahala occurred.** 🔌\n\nPlease check your internet connection and try sending your question again. If you are developing locally, ensure your backend server is running and your \`GEMINI_API_KEY\` is active in **Settings > Secrets**.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        role: 'assistant',
        content: `**Chat history refreshed!** What tech topic, roadmap, or career question would you like guidance on?`,
        timestamp: new Date(),
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      id="naija-chatbot-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="naija-chatbot-panel"
        className={`w-full bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded
            ? 'sm:w-[720px] h-[92vh] sm:h-[85vh]'
            : 'sm:w-[460px] h-[85vh] sm:h-[640px]'
        }`}
      >
        {/* Header Bar */}
        <div className="bg-stone-900 text-white p-4 px-5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs relative">
              <Bot className="w-5 h-5 text-emerald-200" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-stone-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  Tizzi Naija Tech Mentor
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-tight">
                Practical, honest Nigerian tech career guidance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-stone-400">
            <button
              type="button"
              onClick={handleClearHistory}
              title="Reset conversation"
              className="p-1.5 rounded-lg hover:text-white hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse width" : "Expand width"}
              className="hidden sm:block p-1.5 rounded-lg hover:text-white hover:bg-stone-800 transition-colors"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close chat"
              className="p-1.5 rounded-lg hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Diagnostic Context Pill if available */}
        {diagnosticContext?.matchedNiche && (
          <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900 shrink-0">
            <div className="flex items-center gap-1.5 font-medium truncate">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="truncate">
                Active Context: <strong>{diagnosticContext.matchedNiche}</strong> ({diagnosticContext.device || 'Setup'})
              </span>
            </div>
          </div>
        )}

        {/* Messages Scrollable Thread */}
        <div 
          id="chat-messages-container"
          className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-stone-50/60"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4 text-emerald-100" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 shadow-2xs relative group ${
                  msg.role === 'user'
                    ? 'bg-emerald-800 text-white rounded-br-xs'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-bl-xs'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-stone prose-xs sm:prose-sm max-w-none text-stone-800 space-y-2 leading-relaxed">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                )}

                {/* Message action bar */}
                <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-stone-400">
                  <span>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 hover:text-stone-700 transition-opacity"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <User className="w-4 h-4 text-stone-200" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 text-xs sm:text-sm justify-start items-center">
              <div className="w-7 h-7 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4 text-emerald-100" />
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs p-3.5 shadow-2xs flex items-center gap-2 text-stone-600">
                <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
                <span className="text-xs font-medium">Tizzi is thinking & crafting your answer...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-stone-100/90 border-t border-stone-200/80 overflow-x-auto shrink-0 flex items-center gap-2 scrollbar-none">
          <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 shrink-0 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Quick Ask:
          </span>
          {DEFAULT_QUICK_QUESTIONS.slice(0, 4).map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-[11px] whitespace-nowrap px-3 py-1 rounded-full bg-white border border-stone-300 text-stone-700 hover:border-emerald-600 hover:text-emerald-800 hover:bg-emerald-50/50 transition-all shrink-0 font-medium disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3.5 sm:p-4 bg-white border-t border-stone-200 shrink-0 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about coding, power, data, freelancing, or tech roles..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl border border-stone-300 bg-stone-50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-2xl bg-emerald-800 text-white hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:hover:bg-emerald-800 shrink-0 shadow-xs"
            title="Send Message"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
