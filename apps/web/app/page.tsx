export default function Page() {
  return (
    <div className="py-12">
      <section className="rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 border border-white/10 p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          LexaCreative <span className="text-primary">Demo</span>
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl">
          Puan (jeton) tabanlı demo. Market, oyunlar (Mines/Wheel), iddia ve günlük bonus ile hızlı referans uygulaması.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/market" className="inline-flex items-center px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-primary-hover transition">
            Marketi Gör
          </a>
          <a href="/games/mines" className="inline-flex items-center px-4 py-2 rounded border border-white/20 hover:border-primary transition">
            Mines Oyna
          </a>
        </div>
      </section>
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 p-6">
          <h2 className="font-bold mb-2">Günlük Bonus</h2>
          <p className="text-white/70">Her 24 saatte +1000 jeton. Giriş yapınca aktif olur.</p>
        </div>
        <div className="rounded-xl border border-white/10 p-6">
          <h2 className="font-bold mb-2">Provably Fair</h2>
          <p className="text-white/70">SHA256 + HMAC ile doğrulanabilir sonuçlar. Mines doğrulama paneli bulunur.</p>
        </div>
      </section>
    </div>
  );
}
