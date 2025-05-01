
/**
 * Zomato Chatbot Application
 * 
 * This React application implements a chatbot interface for Zomato with the following features:
 * - Real-time chat interface with user and bot messages
 * - Typewriter effect for bot responses to enhance user experience
 * - API integration with a backend server running on localhost:8000
 * - Loading states with visual typing indicators
 * - Auto-scrolling to keep the newest messages in view
 * 
 * The component structure:
 * - Chat header with bot avatar and status
 * - Messages container showing conversation history
 * - Typing indicator when bot is "thinking"
 * - Typewriter animation for bot responses
 * - Input area with emoji button and send functionality
 */
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { Typewriter } from "react-simple-typewriter";
import botAvatar from '../src/bot.png';

function App() {
  // State management for messages, user input, loading status, and bot typing text
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm Zomato Bot. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");
  const messagesEndRef = useRef(null);

  /**
   * Scrolls to the bottom of the message container
   * Ensures the newest messages are always visible to the user
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Effect hook to scroll to bottom whenever messages change
   * or when loading state/typing state updates
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, botTypingText]);

  /**
   * Handles sending user message and getting bot response
   * 1. Adds user message to the chat
   * 2. Shows loading/typing indicator
   * 3. Sends request to backend API
   * 4. Displays bot response with typewriter effect
   */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setBotTypingText("thinking"); // triggers animation placeholder

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

  /**
   * Allows user to send message by pressing Enter key
   * Improves accessibility and user experience
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Chat header with bot profile information */}
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

      {/* Messages container displaying the conversation history */}
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

        {/* Typing indicator shown when bot is processing */}
        {loading && (
          <div className="message-wrapper bot">
            <div className="bot-avatar">
              <img src={botAvatar} alt="Bot" />
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

        {/* Typewriter effect for bot responses */}
        {botTypingText && !loading && (
          <div className="message-wrapper bot">
            <div className="bot-avatar">
              <img src={botAvatar} alt="Bot" />
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

      {/* Chat input area with emoji button and send functionality */}
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