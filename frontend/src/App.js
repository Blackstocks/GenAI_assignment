// src/App.js
import React, { useState } from "react";
import "./App.css";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I’m Zomato Bot. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setBotTypingText("thinking"); // trigger animation placeholder

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();

      // Simulate delay before typing response
      setTimeout(() => {
        setBotTypingText(data.answer);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <h2>Zomato Chatbot 🍽️</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.from === "bot" ? "bot" : "user"}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}

        {loading && (
          <div className="message bot">
            <em>🤖 Thinking...</em>
          </div>
        )}

        {botTypingText && !loading && (
          <div className="message bot">
            <span className="typewriter">
              <Typewriter
                words={[botTypingText]}
                loop={1}
                cursor
                typeSpeed={40}
                deleteSpeed={9999}
                delaySpeed={1000}
                onLoopDone={() => {
                  setMessages((prev) => [
                    ...prev,
                    { from: "bot", text: botTypingText },
                  ]);
                  setBotTypingText("");
                }}
              />
            </span>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
