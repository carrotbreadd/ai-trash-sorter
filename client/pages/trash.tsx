"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../src/routes/ProtectedRoute";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TrashResult {
  result: string;
  source: string;
}

export default function TrashSorterPage() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState<TrashResult | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSort = async () => {
    if (!item.trim()) return;

    try {
      // Send to AI backend
      const aiRes = await axios.post(
        "http://localhost:5001/api/classify",
        { item },
        { headers: { "Content-Type": "application/json" } }
      );

      const trashResult: TrashResult = {
        result: aiRes.data.result,
        source: aiRes.data.source,
      };

      setResult(trashResult);

      // If user is logged in, save result to backend
      if (token) {
        await axios.post(
          "http://localhost:5001/api/trash",
          {
            item,
            aiResult: trashResult.result,
            source: trashResult.source,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h1>♻️ AI Trash Sorter</h1>

      {!token && (
        <div style={{ margin: "1rem 0", color: "orange" }}>
          You are using the trash sorter as a guest. Log in to save your progress!
        </div>
      )}

      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter trash item..."
        style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
      />
      <button onClick={handleSort} style={{ padding: "0.5rem 1rem" }}>
        Sort It
      </button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <div>
            <strong>Result:</strong> {result.result}
          </div>
          <div>
            <strong>Source:</strong> {result.source}
          </div>
        </div>
      )}
    </div>
  );
}


