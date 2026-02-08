
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/navigation";

export default function TrashPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [item, setItem] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate AI classification
    const aiResult = item.toLowerCase().includes("plastic") ? "Recycle" : "Landfill";
    setResult(aiResult);
    setItem("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />

      <h1>♻️ AI Trash Sorter</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter trash item..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <button type="submit">Sort It</button>
      </form>

      {result && (
        <div className="trash-card">
          <p><strong>Result:</strong> {result}</p>
          <p><strong>Source:</strong> ai-assisted</p>
        </div>
      )}

      {/* Show login/signup prompt only if not authenticated */}
      {!token && (
        <div style={{ marginTop: "1.5rem", color: "#065f46" }}>
          <p>Login or Sign Up to save your progress!</p>
          <button
            style={{ marginRight: "1rem" }}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button onClick={() => router.push("/signup")}>Sign Up</button>
        </div>
      )}
    </div>
  );
}


