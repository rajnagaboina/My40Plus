"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "./storage";
export function PageTracker() { const pathname = usePathname(); useEffect(() => { if (!pathname.startsWith("/admin")) trackEvent("page_view", pathname); }, [pathname]); return null; }
