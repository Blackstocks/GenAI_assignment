// src/App.js
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { Typewriter } from "react-simple-typewriter";
import botAvatar from '../src/bot.png';

function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm Zomato Bot. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, botTypingText]);

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
    <div className="chat-container">
      <div className="chat-header">
        <div className="profile">
          <div className="avatar">
            <img src={botAvatar} alt="Bot avatar" />
          </div>
          <div className="info">
            <h3>Zomato Bot</h3>
            <span className="status">
              <span className="status-dot"></span> We're online!
            </span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message-wrapper ${msg.from === "bot" ? "bot" : "user"}`}
          >
            {msg.from === "bot" && (
              <div className="bot-avatar">
                <img src={botAvatar} alt="Bot" />
              </div>
            )}
            <div className={`message ${msg.from}`}>
              <span>{msg.text}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-wrapper bot">
            <div className="bot-avatar">
              <img src="https://via.placeholder.com/30" alt="Bot" />
            </div>
            <div className="message bot typing">
              <span className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}

        {botTypingText && !loading && (
          <div className="message-wrapper bot">
            <div className="bot-avatar">
              <img src="https://via.placeholder.com/30" alt="Bot" />
            </div>
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
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <div className="input-wrapper">
          <button className="emoji-button">😊</button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your message..."
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={!input.trim()}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
        <div className="powered-by">
          POWERED BY <strong>ZOMATO</strong>
        </div>
      </div>
    </div>
  );
}

export default App;