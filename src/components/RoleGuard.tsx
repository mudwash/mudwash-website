"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/sign-in?returnTo=/admin");
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}

export function UserGuard({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/sign-in");
      } else if (isAdmin) {
        // Admin trying to access a user-only route
        router.push("/admin");
      }
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050505]">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
      </div>
    );
  }

  if (!user || isAdmin) {
    return null;
  }

  return <>{children}</>;
}
