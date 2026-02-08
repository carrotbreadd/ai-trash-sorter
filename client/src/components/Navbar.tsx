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
    router.push("/");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link>{" "}
      {token && (
        <>
          | <Link href="/saved-trash">Saved Trash</Link>
          | <button onClick={handleLogout}>Logout</button>
        </>
      )}
      {!token && (
        <>
          | <Link href="/login">Login</Link>
          | <Link href="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

