"use client"

import { useRouter } from "next/navigation";
import { useSession } from "../session";
import { useEffect } from "react";
import { useToast } from "../toast";

export default function AuthMiddleware({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const session = useSession();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (session.data.initialized) {
      if (!session.has("token")) {
        toast.show("error", "You must be logged in to access this page");
        router.replace("/login");
      }
    }
  }, [session.data.initialized]);

  return children;
}
