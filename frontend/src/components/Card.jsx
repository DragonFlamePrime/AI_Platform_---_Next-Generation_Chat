export default function Card({ children }) {
  return (
    <div
      className="card-hover"
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom: "20px",
        border: "1px solid #e5e5e5"
      }}
    >
      {children}
    </div>
  );
}
