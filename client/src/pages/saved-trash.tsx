"use client";

import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";

interface TrashItem {
  _id: string;
  item: string;
  aiResult: string;
  finalResult: string;
  createdAt: string;
}

export default function SavedTrashPage() {
  const [token, setToken] = useState<string | null>(null);
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      fetch("http://localhost:5001/api/trash", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => res.json())
        .then((data) => setTrashItems(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />

      <h1>Saved Trash</h1>

      {!token && <p>Please login to view saved trash.</p>}

      {token && trashItems.length === 0 && <p>No saved trash yet!</p>}

      {token && trashItems.map((t) => (
        <div key={t._id} className="trash-card">
          <p><strong>Item:</strong> {t.item}</p>
          <p><strong>AI Result:</strong> {t.aiResult}</p>
          <p><strong>Final Result:</strong> {t.finalResult}</p>
          <p><strong>Date:</strong> {new Date(t.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}


