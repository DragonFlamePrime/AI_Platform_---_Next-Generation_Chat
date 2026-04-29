import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeIcon, MemoryIcon, NewConversationIcon, AppearanceIcon } from "../icons/Icons";

export default function Sidebar() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  // Load conversations from backend
  useEffect(() => {
    fetch("/api/conversations")
      .then((res) => res.json())
      .then((data) => {
        // newest first
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setConversations(sorted);
      });
  }, []);

  // Create a new conversation
  const createConversation = async () => {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const convo = await res.json();
    navigate(`/chat/${convo.id}`);
  };

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        borderRight: "1px solid var(--sidebar-border)",
        padding: "24px",
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        position: "fixed",
        left: 0,
        top: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
        boxShadow: "2px 0 6px rgba(0,0,0,0.25)"
      }}
    >
      {/* TOP SECTION */}
      <div>
        <h2 style={{ marginBottom: "24px", fontWeight: 600 }}>Settings</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Link
            to="/"
            className="sidebar-link"
            style={{
              textDecoration: "none",
              color: "var(--sidebar-text)",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <HomeIcon size={18} />
            Home
          </Link>

          {/* NEW CONVERSATION BUTTON */}
          <button
            onClick={createConversation}
            className="sidebar-link"
            style={{
              background: "transparent",
              border: "none",
              padding: "0",
              margin: "0",
              cursor: "pointer",
              color: "var(--sidebar-text)",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <NewConversationIcon size={18} />
            New Conversation
          </button>

          <Link
            to="/memory"
            className="sidebar-link"
            style={{
              textDecoration: "none",
              color: "var(--sidebar-text)",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <MemoryIcon size={18} />
            Memory
          </Link>

          <Link
            to="/appearance"
            className="sidebar-link"
            style={{
              textDecoration: "none",
              color: "var(--sidebar-text)",
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <AppearanceIcon size={18} />
            Appearance
          </Link>
        </nav>
      </div>

      {/* BOTTOM SECTION — CONVERSATION LIST */}
      <div
        style={{
          marginTop: "20px",
          overflowY: "auto",
          maxHeight: "200px", // shows ~2 items before scrolling
          paddingRight: "6px"
        }}
      >
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/chat/${c.id}`)}
            className="sidebar-link"
            style={{
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "6px",
              marginBottom: "6px",
              color: "var(--sidebar-text)"
            }}
          >
            {c.title || "Untitled Conversation"}
          </div>
        ))}
      </div>

      {/* PROFILE SECTION */}
      <div
        style={{
          marginTop: "20px",
          opacity: 0.7,
          fontSize: "14px"
        }}
      >
        Account
      </div>
    </div>
  );
}
