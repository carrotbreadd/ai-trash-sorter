"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/trash");
  };

  return (
    <nav className="navbar" style={{ justifyContent: "center" }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link href="/trash">Trash Sorter</Link>
        {token && <Link href="/saved-trash">Saved Trash</Link>}
        {!token && <Link href="/login">Login</Link>}
        {!token && <Link href="/signup">Sign Up</Link>}
        {token && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}


