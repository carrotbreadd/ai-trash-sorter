"use client";

import { useState } from "react";

export default function HomePage() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!item) return;

    setLoading(true);
    setResult(null);
    setSource(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:5001/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResult(data.result);
      setSource(data.source);
    } catch (err: any) {
      console.error(err);
      setError("Error connecting to server");
    }

    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>♻️ AI Trash Sorter</h1>

      <input
        type="text"
        placeholder="Enter item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
      />

      <button onClick={handleSubmit} style={{ padding: "0.5rem 1rem" }}>
        Sort It
      </button>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Result: {result}</h2>
          <p>Source: {source}</p>
        </div>
      )}
    </main>
  );
}
