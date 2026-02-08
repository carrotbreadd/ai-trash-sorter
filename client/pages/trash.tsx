"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TrashPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [item, setItem] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  // Check for token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSort = async () => {
    // Example: call AI or rules API
    const aiResult = "Recycle"; // Replace with your API call

    setResult(aiResult);
    setSource("ai-assisted");

    if (token) {
      // Save to server if logged in
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
    <div>
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
          <button onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/signup")}>Sign Up</button>
        </div>
      )}
    </div>
  );
}


