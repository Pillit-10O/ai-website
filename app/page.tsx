"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey 👋 I’m your assistant. Say something like 'remember my name is Alex'.",
    },
  ]);

  const [input, setInput] = useState("");
  const [memory, setMemory] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Load memory from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("memory");
    if (saved) setMemory(JSON.parse(saved));
  }, []);

  // Save memory to localStorage
  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(memory));
  }, [memory]);

  // Auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;

    const text = input;

    const userMsg: Message = {
      role: "user",
      content: text,
    };

    // 🧠 MEMORY SYSTEM (simple but works)
    if (text.toLowerCase().includes("remember")) {
      setMemory((prev) => [...prev, text]);
    }

    const aiMsg: Message = {
      role: "assistant",
      content:
        memory.length > 0
          ? `Got it 👍 I’ve stored ${memory.length} memory item(s).`
          : "Got it 👍",
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  }

  return (
    <div className="relative z-10 flex flex-col h-screen bg-[#0b0b0f] text-white">

      {/* HEADER */}
      <div className="border-b border-white/10 p-4 text-center font-semibold">
        My AI Chat
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 rounded-br-sm"
                  : "bg-white/10 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div className="border-t border-white/10 p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Message..."
          className="flex-1 bg-white/5 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}