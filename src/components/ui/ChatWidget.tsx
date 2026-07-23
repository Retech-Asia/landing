"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

/* ── Types ──────────────────────────────────────────────────── */

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

/* ── Auto-response logic ────────────────────────────────────── */

const SERVICES_LIST = [
  "Custom Software Development",
  "CMS Development",
  "CRM Development",
  "ERP Solutions",
  "AI-Powered Solutions",
  "Mobile App Development",
];

function getAutoResponse(message: string): string {
  const lower = message.toLowerCase();

  if (/\b(roi|savings|save|cost savings|calculator|how much save|outsource savings)\b/.test(lower)) {
    return "Great question about outsourcing savings! Check out our ROI Calculator on the Dedicated Teams service page \u2014 it lets you compare costs for different team sizes against US, EU, and Australian rates with multi-year projections. You can also visit our contact page for a custom savings analysis!";
  }

  if (/\b(price|pricing|cost|budget|how much|quote|rate)\b/.test(lower)) {
    return "Great question about pricing! Project costs vary depending on scope, technology, and timeline. The best way to get an accurate estimate is to fill out our contact form \u2014 we\u2019ll prepare a tailored proposal within 24 hours. Visit our contact page to get started!";
  }

  if (/\b(service|services|offer|what do you do|capability)\b/.test(lower)) {
    return `We offer 6 core services:\n\n${SERVICES_LIST.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nWould you like to know more about any of these? Feel free to ask or visit our contact page for a free consultation!`;
  }

  if (/\b(hire|team|dedicated|staff|engineer|developer|outsource)\b/.test(lower)) {
    return "We specialize in Dedicated Teams \u2014 a model where we assemble a team of engineers, designers, and project managers who work exclusively on your project. It\u2019s like having your own offshore tech team. Visit our contact page to discuss your team needs!";
  }

  return "Thanks for reaching out! To give you the best answer, we\u2019d love to learn more about your project. Book a free consultation through our contact page and we\u2019ll get back to you within 24 hours.";
}

/* ── Timestamp formatting ───────────────────────────────────── */

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ── Typing indicator ───────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-black/[0.04] px-4 py-2.5">
        <div className="flex items-center gap-1" aria-label="Bot is typing">
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-foreground-muted"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-foreground-muted"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
          />
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-foreground-muted"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hi! How can we help you today? Ask about our services, pricing, or hiring a dedicated team.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape + focus trap
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Focus trap — keep Tab within the popup
      if (e.key === "Tab" && popupRef.current) {
        const focusable = popupRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const handleSend = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const text = inputValue.trim();
      if (!text) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      // Simulate bot thinking delay
      const typingDelay = 800 + Math.random() * 700;
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: generateId(),
          role: "bot",
          text: getAutoResponse(text),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, typingDelay);
    },
    [inputValue]
  );

  const handleClear = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text: "Hi! How can we help you today? Ask about our services, pricing, or hiring a dedicated team.",
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
    // Refocus input after clearing
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-50 w-[370px] max-w-[calc(100vw-48px)] rounded-2xl border border-black/[0.08] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] outline-none flex flex-col"
            style={{ maxHeight: "min(520px, calc(100vh - 140px))" }}
            role="dialog"
            aria-label="Chat with us"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand/10">
                  <MessageCircle
                    size={14}
                    className="text-brand"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  Help Assistant
                  <span className="ml-2 text-[10px] font-medium uppercase tracking-wider text-foreground-muted">
                    Automated
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear chat"
                  title="Clear chat"
                  className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-background-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close chat"
                  className="rounded-lg p-2 text-foreground-muted transition-colors hover:bg-background-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 cursor-pointer"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line",
                      msg.role === "user"
                        ? "bg-brand text-white rounded-br-md"
                        : "bg-black/[0.04] text-foreground rounded-bl-md"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-foreground-muted mt-1 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-black/[0.06] px-4 py-3 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message"
                className="flex-1 rounded-xl border border-black/[0.08] bg-white px-3.5 py-2 text-base text-foreground placeholder:text-foreground-muted outline-none transition-all duration-200 focus:border-brand/40 focus:ring-2 focus:ring-brand/10"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Send message"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand text-white transition-all duration-200 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse ring */}
        <span
          className="absolute inset-0 animate-[ping_2s_ease-out_infinite] rounded-full bg-brand/30"
          aria-hidden="true"
        />
        <motion.button
          type="button"
          aria-label={open ? "Close chat" : "Open chat"}
          onClick={() => setOpen((prev) => !prev)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand text-white shadow-lg transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

