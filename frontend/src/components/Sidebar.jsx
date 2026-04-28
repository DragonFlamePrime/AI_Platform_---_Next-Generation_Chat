import { Link } from "react-router-dom";
import { HomeIcon, MemoryIcon } from "../icons/Icons";

export default function Sidebar() {
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
        transition: "background 0.25s ease, border-color 0.25s ease, color 0.25s ease",
        boxShadow: "2px 0 6px rgba(0,0,0,0.25)"
      }}
    >
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
      </nav>
    </div>
  );
}
