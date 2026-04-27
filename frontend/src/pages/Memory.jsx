import { useEffect, useState } from "react";

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
    <div style={{ padding: "20px" }}>
      <h1>Facts You've Shared</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={newFact}
          onChange={(e) => setNewFact(e.target.value)}
          placeholder="Add a fact..."
          style={{ width: "300px", padding: "8px" }}
        />
        <button onClick={addMemory} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      <button onClick={deleteAll} style={{ marginBottom: "20px" }}>
        Delete All Memory
      </button>

      <ul>
        {memories.map((m) => (
          <li key={m.id} style={{ marginBottom: "10px" }}>
            {editingId === m.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ width: "300px", padding: "8px" }}
                />
                <button onClick={() => updateMemory(m.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {m.fact}
                <button
                  onClick={() => {
                    setEditingId(m.id);
                    setEditingText(m.fact);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMemory(m.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
