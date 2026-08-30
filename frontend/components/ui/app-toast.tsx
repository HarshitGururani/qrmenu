"use client";

import confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const TOAST_MESSAGES: Record<string, string> = {
  welcome: "Your account was created successfully!",
  account_created: "Welcome! Your account is ready.",
  logged_in: "Logged in successfully.",
  restaurant_saved: "Restaurant saved successfully.",
  onboarding_complete: "Your onboarding is complete!",
};

export function AppToast() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lastHandledToast = useRef<string | null>(null);

  useEffect(() => {
    const toastKey = searchParams.get("toast");
    if (!toastKey) {
      lastHandledToast.current = null;
      return;
    }

    if (lastHandledToast.current === toastKey) {
      return;
    }

    lastHandledToast.current = toastKey;

    const message = TOAST_MESSAGES[toastKey] ?? "Success!";

    toast.success(message, {
      duration: 3200,
      icon: <CheckCircle2 className="h-5 w-5" />,
      style: {
        background: "#0f172a",
        color: "#f8fafc",
        borderRadius: "12px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: 600,
      },
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.75 },
      colors: ["#10b981", "#34d399", "#fbbf24", "#38bdf8"],
    });

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("toast");

    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname;

    const timer = window.setTimeout(() => {
      router.replace(nextUrl, { scroll: false });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [pathname, router, searchParams]);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3200,
      }}
    />
  );
}
