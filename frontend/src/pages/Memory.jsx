import Layout from "../components/Layout";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { AddIcon, TrashIcon, EditIcon, SaveIcon, CancelIcon } from "../icons/Icons";

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
          />
          <button className="btn-primary" onClick={addMemory} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <AddIcon />
            Add
          </button>
        </div>
      </Card>

      <Card>
        <button className="btn-danger" onClick={deleteAll} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <TrashIcon />
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
                    style={{ flex: 1, marginRight: "10px" }}
                  />
                  <button className="btn-primary" onClick={() => updateMemory(m.id)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <SaveIcon />
                    Save
                  </button>
                  <button className="btn-neutral" onClick={() => setEditingId(null)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <CancelIcon />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{m.fact}</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-primary" onClick={() => { setEditingId(m.id); setEditingText(m.fact); }} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <EditIcon />
                      Edit
                    </button>
                    <button className="btn-danger" onClick={() => deleteMemory(m.id)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <TrashIcon />
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
