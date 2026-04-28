import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{
        marginLeft: "260px",
        padding: "30px",
        width: "100%",
        boxSizing: "border-box"
      }}>
        {children}
      </div>
    </div>
  );
}
