# Samudra_Marketplace

Community-first local peer-to-peer marketplace: listings, specialized **Communities** (e.g. city housing groups), and optional **auctions** (Phase 2).


## Repository layout

```text
Samudra_Marketplace/
  docs/       Design: problem statement, HLD, LLD, decisions
  backend/    Spring Boot modular monolith (scaffold pending)
  frontend/   React SPA (planned Phase 4)
  docker/     Compose files (planned Phase 1)
```

## Documentation index

| Document | Description |
|----------|-------------|
| [docs/discussion.md](docs/discussion.md) | Decisions, Q&A, open questions |
| [docs/problem-statement.md](docs/problem-statement.md) | Problem and MVP success criteria |
| [docs/roadmap.md](docs/roadmap.md) | Phased delivery |
| [docs/hld/](docs/hld/) | High-level architecture |
| [docs/lld/](docs/lld/) | Schema, APIs, auction, communities, security |

## Current phase

**Phase 0 — Design.** Review docs, then scaffold `backend/` Gradle project.

## Principles

- Local-first development ($0 AWS until demo-ready)
- Modular monolith before microservices
- You implement; agent assists with design review and targeted snippets

## License

TBD (personal learning project).
