import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
          width: "100%",
          boxSizing: "border-box",
          transition: "background 0.25s ease, color 0.25s ease"
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
