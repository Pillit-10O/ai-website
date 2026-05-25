"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I’m your AI. Ask me anything." }
  ]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: "Thinking... 🤖" }
    ];

    setMessages(newMessages);
    setInput("");
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0f0f0f",
      color: "white"
    }}>
      
      {/* messages */}
      <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      {/* input */}
      <div style={{ display: "flex", padding: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "none"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 10,
            padding: "10px 20px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}