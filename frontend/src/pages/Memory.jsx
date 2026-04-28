import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import Card from "../components/Card";


export default function Memory() {
  const [memories, setMemories] = useState([]);
  const [newFact, setNewFact] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const loadMemories = async () => {
    const res = await fetch("http://localhost:3000/api/memory");
    const data = await res.json();
    setMemories(data);
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const addMemory = async () => {
    if (!newFact.trim()) return;

    await fetch("http://localhost:3000/api/memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fact: newFact })
    });

    setNewFact("");
    loadMemories();
  };

  const deleteMemory = async (id) => {
    await fetch(`http://localhost:3000/api/memory/${id}`, {
      method: "DELETE"
    });
    loadMemories();
  };

  const updateMemory = async (id) => {
    await fetch(`http://localhost:3000/api/memory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fact: editingText })
    });

    setEditingId(null);
    setEditingText("");
    loadMemories();
  };

  const deleteAll = async () => {
    await fetch("http://localhost:3000/api/memory", {
      method: "DELETE"
    });
    loadMemories();
  };

 return (
  <Layout>
    <h1 style={{ marginBottom: "20px" }}>Facts You've Shared</h1>

    <Card>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={newFact}
          onChange={(e) => setNewFact(e.target.value)}
          placeholder="Add a fact..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={addMemory}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#0067c0",
            color: "white",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>
    </Card>

    <Card>
      <button
        onClick={deleteAll}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#d9534f",
          color: "white",
          cursor: "pointer"
        }}
      >
        Delete All Memory
      </button>
    </Card>

    <Card>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {memories.map((m) => (
          <li
            key={m.id}
            style={{
              padding: "12px",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {editingId === m.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginRight: "10px"
                  }}
                />
                <button
                  onClick={() => updateMemory(m.id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    marginRight: "6px"
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    background: "#6c757d",
                    color: "white",
                    border: "none"
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{m.fact}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => {
                      setEditingId(m.id);
                      setEditingText(m.fact);
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "#0067c0",
                      color: "white",
                      border: "none"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMemory(m.id)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "#d9534f",
                      color: "white",
                      border: "none"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </Card>
  </Layout>
);

}
