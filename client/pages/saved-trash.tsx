"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";

interface TrashItem {
  item: string;
  aiResult: string;
  finalResult: string;
  source: string;
  createdAt: string;
}

export default function SavedTrashPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [trashItems, setTrashItems] = useState<TrashItem[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.replace("/unauthorized");
      return;
    }
    setToken(storedToken);

    fetch("http://localhost:5001/api/trash", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => setTrashItems(data))
      .catch((err) => console.error(err));
  }, [router]);

  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <h1>Saved Trash</h1>
        {trashItems.length === 0 ? (
          <p>No trash items saved yet.</p>
        ) : (
          <ul>
            {trashItems.map((t, idx) => (
              <li key={idx}>
                {t.item} - {t.finalResult} (source: {t.source})
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}


