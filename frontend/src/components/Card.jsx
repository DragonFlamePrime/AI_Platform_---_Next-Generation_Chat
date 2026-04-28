export default function Card({ children }) {
  return (
    <div
      className="card-hover"
      style={{
        background: "var(--card-bg)",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px var(--shadow)",
        marginBottom: "20px",
        border: "1px solid var(--card-border)"
      }}
    >
      {children}
    </div>
  );
}
