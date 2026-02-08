"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.replace("/unauthorized");
    } else {
      setToken(storedToken);
    }
    setIsAuthChecked(true);
  }, [router]);

  if (!isAuthChecked || !token) return null;

  return <>{children}</>;
}



