"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  // Auto-scroll to bottom when messages update OR chat is opened
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow the Framer Motion animation to start
      // and the DOM to be fully painted
      const timeoutId = setTimeout(() => {
        const scrollContainer = scrollRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (scrollContainer) {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [messages, isLoading, isOpen]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("planora_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("planora_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const body = {
        message: input,
        // Ensure history only contains what Gemini understands
        history: messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.parts[0].text }],
        })),
      };

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 503 || response.status === 500) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [
              {
                text: "Planora Assistant is a bit busy right now due to high demand. Please try again in a few seconds!",
              },
            ],
          },
        ]);
        return;
      }

      const data = await response.json();
      const botMessage: Message = {
        role: "model",
        parts: [{ text: data.reply }],
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("planora_chat_history");
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex-col items-end gap-0">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="origin-bottom-right"
          >
            <Card className="flex h-[500px] w-80 flex-col overflow-hidden border-primary/20 p-0 shadow-2xl sm:w-96">
              <CardHeader className="m-0 flex flex-row items-center justify-between space-y-0 rounded-t-none bg-primary p-4 text-primary-foreground">
                <CardTitle className="text-sm leading-none font-bold">
                  Planora Assistant
                </CardTitle>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="h-7 px-2 text-[10px] text-white hover:bg-primary-foreground/20"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-white hover:bg-primary-foreground/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4" ref={scrollRef}>
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                          m.role === "user"
                            ? "rounded-tr-none bg-primary text-primary-foreground"
                            : "rounded-tl-none border bg-muted text-foreground"
                        }`}
                      >
                        <p className="leading-relaxed">{m.parts[0].text}</p>
                        <span className="mt-1 block text-right text-[10px] opacity-50">
                          {new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="mb-4 flex justify-start">
                      <div className="rounded-2xl rounded-tl-none border bg-muted px-4 py-3">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>

              <CardFooter className="border-t p-3">
                <form
                  className="flex w-full gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <Input
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
