import { Link } from "react-router-dom";
import { HomeIcon, MemoryIcon } from "../icons/Icons";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        padding: "24px",
        background: "white",
        position: "fixed",
        left: 0,
        top: 0,
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ marginBottom: "24px", fontWeight: 600 }}>Settings</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#333",
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
          style={{
            textDecoration: "none",
            color: "#333",
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
