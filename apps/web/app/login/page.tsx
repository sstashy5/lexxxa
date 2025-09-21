"use client";

import { useState } from "react";
import { apiBase } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@lexa.local");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`${apiBase()}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error || "Giriş başarısız");
      } else {
        setMsg("Giriş başarılı! Anasayfaya yönlendiriliyor...");
        setTimeout(() => {
          window.location.href = "/";
        }, 600);
      }
    } catch (e) {
      setMsg("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            className="w-full rounded bg-black/30 border border-white/20 px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Şifre</label>
          <input
            className="w-full rounded bg-black/30 border border-white/20 px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-primary-hover transition disabled:opacity-60"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
        <a className="ml-3 text-sm hover:text-primary" href="/register">
          Hesabın yok mu? Kayıt ol
        </a>
      </form>
      {msg && <p className="mt-4 text-white/70">{msg}</p>}
    </div>
  );
}