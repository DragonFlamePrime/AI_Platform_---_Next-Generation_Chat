import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "260px",
      height: "100vh",
      borderRight: "1px solid #e5e5e5",
      padding: "20px",
      boxSizing: "border-box",
      background: "#fafafa",
      position: "fixed",
      left: 0,
      top: 0
    }}>
      <h2 style={{ marginBottom: "30px" }}>Settings</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Home
        </Link>

        <Link to="/memory" style={{ textDecoration: "none", color: "#333" }}>
          Memory
        </Link>
      </nav>
    </div>
  );
}
