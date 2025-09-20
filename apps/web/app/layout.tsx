import "./../styles/globals.css";
import React from "react";

export const metadata = {
  title: "LexaCreative",
  description: "Demo app — points only"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <header className="border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur z-50">
          <div className="mx-auto max-w-6xl flex items-center gap-4 p-3">
            <img src="/logo-placeholder.svg" alt="LexaCreative Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold">LexaCreative</span>
            <nav className="ml-auto flex items-center gap-4 text-sm">
              <a className="hover:text-primary" href="/">Anasayfa</a>
              <a className="hover:text-primary" href="/market">Market</a>
              <a className="hover:text-primary" href="/games/mines">Mines</a>
              <a className="hover:text-primary" href="/games/wheel">Wheel</a>
              <a className="hover:text-primary" href="/bets">İddia</a>
              <a className="hover:text-primary" href="/login">Giriş Yap</a>
              <a className="hover:text-primary" href="/register">Kayıt Ol</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
