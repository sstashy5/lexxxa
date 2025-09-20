# LexaCreative (demo)

Monorepo for a 1-week demo: Next.js web + NestJS API + Prisma + PostgreSQL. Points-based (no real money).

## Quickstart

1. Copy env
```bash
cp .env.example .env
```

2. Install
```bash
pnpm install
```

3. Generate Prisma client and push DB
```bash
pnpm dlx prisma generate --schema apps/api/prisma/schema.prisma
pnpm --filter @lexa/api db:push
```

4. Seed demo data
```bash
pnpm --filter @lexa/api db:seed
```

5. Run
```bash
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000
- Health: http://localhost:4000/health

## Tech

- apps/web: Next.js 14 (App Router) + Tailwind + TypeScript
- apps/api: NestJS 10 + Prisma + PostgreSQL
- Styling: Dark with gold accent (#F6C344 hover #D97706)

See docs:
- [docs/market-spec.md](docs/market-spec.md)
- [docs/bets-spec.md](docs/bets-spec.md)
- [docs/provably-fair.md](docs/provably-fair.md)
- [docs/timeline.md](docs/timeline.md)
