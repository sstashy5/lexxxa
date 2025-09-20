export function apiBase() {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  }
  return (window as any).__API_BASE__ || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}