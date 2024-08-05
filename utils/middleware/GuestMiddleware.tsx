"use client"

import { useRouter } from "next/navigation";
import { useSession } from "../session";
import { useEffect } from "react";

export default function GuestMiddleware({
  children
} : Readonly<{
  children: React.ReactNode
}>) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data.initialized) {
      if (session.has("token")) {
        router.replace("/vote");
      }
    }
  }, [session.data.initialized]);

  return children;
}
