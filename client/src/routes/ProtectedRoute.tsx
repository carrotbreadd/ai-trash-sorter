
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Wrap any page that requires login.
 * Redirects to /unauthorized if no token is found.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.replace("/unauthorized"); // redirect if not logged in
    } else {
      setToken(storedToken);
    }

    setIsAuthChecked(true);
  }, [router]);

  // Prevent rendering children until auth check is complete
  if (!isAuthChecked || !token) return null;

  return <>{children}</>;
}

