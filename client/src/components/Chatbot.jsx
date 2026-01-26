import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi! Need help finding a gig?", sender: "bot" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      // 2. Send to Backend
      // Ensure your backend server is running on port 5000
      const { data } = await axios.post("http://localhost:5000/chatbot", { 
        message: currentInput 
      });

      // 3. Add Bot Reply
      const botMsg = { text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { text: "Error connecting to server.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
      
      {/* 1. Chat Window */}
      {isOpen && (
        <div style={{
          width: "300px",
          height: "400px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          marginBottom: "15px",
          overflow: "hidden",
          border: "1px solid #ddd"
        }}>
          {/* Header */}
          <div style={{ background: "#4caf50", color: "white", padding: "10px", fontWeight: "bold" }}>
            QuickQuid Support
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto", background: "#f9f9f9" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                marginBottom: "8px",
                textAlign: msg.sender === "user" ? "right" : "left"
              }}>
                <span style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  background: msg.sender === "user" ? "#4caf50" : "#e0e0e0",
                  color: msg.sender === "user" ? "white" : "black",
                  fontSize: "14px"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div style={{ fontSize: "12px", color: "#888" }}>Typing...</div>}
          </div>

          {/* Input Area */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              style={{ flex: 1, border: "none", padding: "10px", outline: "none" }}
            />
            <button 
              onClick={sendMessage} 
              style={{ background: "none", border: "none", color: "#4caf50", fontWeight: "bold", padding: "0 15px", cursor: "pointer" }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* 2. Toggle Button (The floating circle) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>

    </div>
  );
};

export default Chatbot;