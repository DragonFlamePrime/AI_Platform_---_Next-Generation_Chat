import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "260px",
      height: "100vh",
      borderRight: "1px solid #ddd",
      padding: "24px",
      background: "white",
      position: "fixed",
      left: 0,
      top: 0,
      boxSizing: "border-box"
    }}>
      <h2 style={{ marginBottom: "24px", fontWeight: 600 }}>Settings</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333", fontSize: "15px" }}>
          Home
        </Link>

        <Link to="/memory" style={{ textDecoration: "none", color: "#333", fontSize: "15px" }}>
          Memory
        </Link>
      </nav>
    </div>
  );
}
