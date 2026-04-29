import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Load conversation messages
  useEffect(() => {
    fetch(`/api/chat/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        scrollToBottom();
      });
  }, [id]);

  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Send a message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    const res = await fetch(`/api/chat/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    // Append AI response
    setMessages((prev) => [...prev, data.assistantMessage]);
    setLoading(false);
    scrollToBottom();
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        marginLeft: "260px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        color: "var(--text)"
      }}
    >
      {/* CHAT AREA */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          paddingBottom: "120px",
          boxSizing: "border-box"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "12px",
                background:
                  msg.role === "user"
                    ? "var(--button-primary)"
                    : "var(--card-bg)",
                color: msg.role === "user" ? "white" : "var(--text)",
                boxShadow: "0 2px 6px var(--shadow)"
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ opacity: 0.6, marginBottom: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "20px",
                background: "var(--card-bg)",
                borderRadius: "6px",
                animation: "pulse 1s infinite ease-in-out"
              }}
            ></div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT AREA */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "260px",
          right: 0,
          padding: "20px",
          background: "var(--bg)",
          borderTop: "1px solid var(--card-border)",
          display: "flex",
          gap: "10px"
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Send a message..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid var(--input-border)",
            background: "var(--input-bg)",
            color: "var(--text)"
          }}
        />

        <button
          onClick={sendMessage}
          className="btn-primary"
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
