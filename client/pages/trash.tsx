"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";

export default function TrashPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [item, setItem] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleSort = async () => {
    const aiResult = "Recycle"; // replace with actual AI logic
    setResult(aiResult);
    setSource("ai-assisted");

    if (token) {
      try {
        await fetch("http://localhost:5001/api/trash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ item, aiResult, source: "ai-assisted" }),
        });
      } catch (err) {
        console.error("Failed to save trash:", err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <h1>♻️ AI Trash Sorter</h1>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter your trash"
        />
        <button onClick={handleSort}>Sort It</button>

        {result && (
          <div>
            <p>Result: {result}</p>
            <p>Source: {source}</p>
          </div>
        )}

        {!token && (
          <div>
            <p>Login to save your progress!</p>
          </div>
        )}
      </div>
    </>
  );
}


