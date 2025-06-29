// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@/providers/AuthProvider";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { useEffect } from 'react';

// This page now acts as a router based on user role.
export default function DashboardRouterPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for the auth state to be loaded
    if (isLoading) {
      return;
    }

    // Redirect based on role
    if (user?.role === 'Creator') {
        // Creators stay on the current path, which can now be the creator dashboard
        // Or you can redirect them explicitly to a specific path like '/creator-dashboard'
        // For this example, we assume this folder structure holds the creator dashboard
        // So no redirect is needed if they land here. Let's make it explicit for clarity.
        router.replace('/creator-dashboard'); // Example explicit route
    } else if (user?.role === 'Enterprise') {
        router.replace('/company-dashboard'); // Redirect enterprise users to their dashboard
    } else if (!user) {
        // If for some reason there is no user after loading, redirect to login
        router.replace('/login');
    }
  }, [user, isLoading, router]);


  // Display a loading state while the redirection logic runs
  return (
    <div className="flex-grow flex items-center justify-center h-full">
      <LoadingSpinner />
    </div>
  );
}