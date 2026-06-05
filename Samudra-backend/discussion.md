# Samudra_Marketplace — Discussion & Decisions

## Product name

**Samudra_Marketplace** — community-first local marketplace (not a Facebook Marketplace clone).

## Vision (one paragraph)

Users discover and post listings (fixed price; later auction) in a **global** feed or inside **Communities** (e.g. "Bangalore Flats & Flatmates"). Buyers and sellers message per listing. The system is built for learning with production-grade practices: clear modules, DB migrations, auth, tests, later Docker and minimal AWS.

## Key questions answered

### Q1: Custom problem vs LLD catalog?

We define our own problem statement. The LLD doc `online-auction-system.md` is reused as the **auction sale mode** inside listings, not a separate application.

### Q2: Include auction?

**Yes, Phase 2.** MVP = fixed-price listings only. Auction = `sale_type=AUCTION` + bids + scheduled close.

### Q3: Community / group marketplaces?

**Yes — core differentiator.** Modeled as `Community` + `CommunityMember` + listings with `community_id`.

### Q4: Monolith or multi-module Gradle?

**Modular monolith:** multiple Gradle modules, **one** Spring Boot deployable, **one** MySQL database. Avoid microservices until post-MVP.

### Q5: Where does code live?

| Path | Purpose |
|------|---------|
| `C:\General\Samudra_Marketplace` | **Backend + docs** (IntelliJ) — canonical backend work |
| `C:\General\Samudra_Marketplace\Samudra-backend` | Gradle app (entities, Flyway, repos go here) |
| `C:\Work\Samudra_Marketplace\Samudra-frontend` | **Frontend** (VS Code) — separate clone/path |
| `C:\General\Samudra_Marketplace\docs\` | Shared design docs (copy of `discussion.md` may live next to backend too) |

This file: `Samudra-backend/discussion.md` — working notes while coding backend.

### Q6: AWS credits?

Local-first. Billing alarms before any resource. Single small sandbox when demo-ready. See [hld/02-architecture-overview.md](hld/02-architecture-overview.md).

## Decision log

Decision history is now maintained in a dedicated file:

- [decision-log.md](decision-log.md)

## Open questions (decide before coding)

- [ ] Email verification in MVP or stub?
- [ ] Phone OTP later?
- [ ] Location: city text field vs lat/long?
- [ ] Image storage: local disk MVP vs S3 when on AWS?
- [ ] Community join: open join vs admin approval for MVP?

## Related documents

| Document | Purpose |
|----------|---------|
| [problem-statement.md](problem-statement.md) | What we are building and for whom |
| [roadmap.md](roadmap.md) | Phased delivery |
| [schema-design-discussion.md](schema-design-discussion.md) | **Active:** tables, enums, modules — align before changing V1/entities |
| [decision-log.md](decision-log.md) | Dated progress and decision map |
| [hld/](hld/) | High-level architecture |
| [lld/](lld/) | Domain, schema, APIs (update after schema alignment) |

---

## Discussion update — package naming + schema pause (2026-06-03)

### Package naming — agreed

Module source must live under:

```text
samudra-<module>/src/main/java/com/samudra/<module>/
```

Example: `com.samudra.messaging`, `com.samudra.listing`.

Not: `samudracore/samudramessaging` (Spring Initializr default).

`samudra-core` may still use `com.samudracore` in a few files — align to `com.samudra.core` when we next edit core (optional, not blocking).

### Schema and entities — pause for alignment

First-pass `V1__init_schema.sql` and JPA entities are **drafts only**.

You have not run the app in a “locked” environment yet, so we can still change **V1 in place**.

**Next step is discussion, not more code:** see [schema-design-discussion.md](schema-design-discussion.md).

Key gaps identified:

- No **listing category** (item type: electronics, furniture, etc.)
- No **item condition** (new / used)
- **Community category** vs **listing category** must stay separate concepts
- Auction, messaging, reports stay out of MVP tables

**Do not revert existing code** — update SQL + entities together after you confirm section 10 in the schema doc.

### Decision log

Daily-style updates: [decision-log.md](decision-log.md) (entry added for 2026-06-03).

## Next steps

1. Review and sign off `problem-statement.md`
2. Agree MVP scope in `lld/03-api-mvp.md` and `lld/02-database-schema-mvp.md`
3. Create `backend/` Gradle skeleton (multi-module modular monolith)
4. Implement Flyway V1 from schema doc
5. First vertical slice: create community → post listing → browse/search listings

---

## Discussion update — endpoint style, priority, and article alignment (2026-06-02)

This section captures the latest discussion and final decisions before backend scaffold starts.

### 1) Endpoint naming: no `/api` prefix

**Your ask:** do not keep `/api` in any endpoint.  
**Decision:** accepted.

- We will use base path `v1` (without `/api`) for versioning clarity.
- Example: `/v1/listings`, `/v1/communities/{id}/join`, `/v1/messages/conversations`.
- Reason: cleaner URLs while still preserving versioning discipline.

**Status:** completed in docs (`hld/04-data-flows.md`, `lld/03-api-mvp.md`, `lld/06-security-auth.md`).

### 2) A&A (Authentication and Authorization) priority

**Your ask:** A&A is important but not priority until core MVP is stable.  
**Decision:** accepted with practical guardrails.

- A&A remains in docs, but it is **deferred in implementation sequence**.
- Core execution order will be:
  1. community + listing flows
  2. search/browse quality
  3. auction integration (Phase 2)
  4. messaging
  5. A&A hardening and rollout before go-live
- For early local development, we can use temporary dev-mode identity stubs (e.g., header-based `x-dev-user-id`) and switch to real JWT later.

### 3) Reordering HLD flows

**Your feedback:** “Register and authenticate” should not be Flow 1 right now.  
**Decision:** agreed.

Proposed new flow order in HLD:

1. Seller posts a listing (core supply)
2. Buyer searches and views listing (core demand)
3. Buyer contacts seller (messaging)
4. Community creation/join/post flow
5. Auction bid flow (Phase 2)
6. Auction close flow (Phase 2)
7. Register/authenticate flow (supporting capability, implemented later)

### 4) External article integration decision

Reference reviewed:  
[Design a system to build marketplace Feature for Facebook](https://programmingappliedai.substack.com/p/design-a-system-to-build-marketplace)

**Confirmation:** yes, article HLD and the 4 interaction flows were reviewed and compared against our docs.

**Can/should we follow the article fully?**

- **No, not fully** (it is large-scale, microservice-heavy, Kafka/Elastic-first design).
- **Yes, selectively** (we should absorb its good ideas in a simpler architecture).

### 5) What we adopt now from the article (simple and useful)

We will integrate these into Samudra design now:

1. **Search-first buyer flow** as a primary HLD flow.
2. **Listing + chat first** strategy.
3. API families for:
   - listings
   - search
   - messaging
   - user profile (minimal)
4. Future trust-and-safety placeholders:
   - reporting endpoints
   - moderation queue (manual first, no ML)

### 6) What we explicitly defer from the article

Deferred (post-MVP / later):

- Kafka event backbone
- Elasticsearch as mandatory dependency (we can start with SQL search)
- recommendation service
- high-scale assumptions (50M/day etc.)
- ML fraud detection pipeline

### 7) Clarification on moderation API from article

#### API #7: `POST /reports/listings/{listingId}`

- This is for user-generated abuse/scam reporting.
- It is useful even for MVP trust and safety.
- **Decision for Samudra:** keep a **simple v1**:
  - create report
  - store reason/details
  - admin reviews manually
  - no ML model in v1

### 8) Final direction (go/no-go decision)

**Go forward with Samudra’s current modular-monolith design, not a direct microservice copy of the article.**  
We integrate selected ideas from the article while protecting scope, speed, and AWS budget.

### 9) AWS budget fit check (40-day window)

This strategy is aligned with the credit constraint:

- local-first build
- minimal AWS only after working MVP
- no event infra/search infra until justified
- one small live environment at first

### 10) Immediate implementation instructions (updated)

If you are aligned with current docs, you should start scaffolding now.

#### Recommended module plan (confirmed)

| Module | Responsibility | Phase |
|--------|----------------|-------|
| `samudra-common` | Exceptions, shared types, utilities | 1 |
| `samudra-identity` | User and profile data (A&A implementation deferred) | 1 |
| `samudra-listing` | Listings, images metadata, fixed price | 1 |
| `samudra-community` | Communities, membership, scoped feeds | 1 |
| `samudra-app` | Boot main, controllers, routing, Flyway | 1 |
| `samudra-auction` | Bids, auction lifecycle | 2 |
| `samudra-messaging` | Conversations, messages | 3 |

#### Scaffold approach (IntelliJ or start.spring.io)

1. Create root project in `backend/` as Gradle (Groovy), Java 17.
2. Create only `samudra-app` as Spring Boot module initially.
3. Add the remaining modules as plain Java libraries (`java-library`) in Gradle.
4. Wire dependencies from `samudra-app` to feature modules.
5. Add Flyway + MySQL driver only in `samudra-app`.
6. Add a simple health endpoint and one listing read endpoint first.

#### First coding sprint (in order)

1. Flyway V1 tables (`users`, `communities`, `community_members`, `listings`, `listing_images`)
2. Community create + join
3. Create listing in community
4. Global and community feed read APIs
5. Search API (SQL-based filters)

A&A remains documented but implementation can be stubbed during this sprint.

---

## Two paths, two IDEs — understood (2026-06-04)

You keep **one git repo** but **two working copies** so IntelliJ (backend @ `C:\General\...`) and VS Code (frontend @ `C:\Work\...`) do not fight over branch checkouts.

| Copy | IDE | Branch focus |
|------|-----|----------------|
| `C:\General\Samudra_Marketplace` | IntelliJ | `feature/*-backend` (or similar) |
| `C:\Work\Samudra_Marketplace` | VS Code | `feature/*-frontend` (or similar) |

**Why the assistant saw “no entities” earlier:** it scanned `C:\Work\...\Samudra-backend`, which is an older/empty copy. Real backend code (entities, Flyway V1) lives under **`C:\General\Samudra_Marketplace\Samudra-backend`**.

**When asking for help:** say “use General backend path” (or paste `C:\General\Samudra_Marketplace\Samudra-backend`).

### Better options than maintaining two full directory copies

| Approach | Pros | Cons |
|----------|------|------|
| **Two clones (what you do now)** | Simple; each IDE owns a folder | Duplicate disk; easy to drift; must merge/push between copies |
| **Git worktree** (recommended upgrade) | **One repo**, two folders, **different branches checked out at once** | One-time `git worktree add` learning |
| **Separate repos** (mono-repo split) | Clean CI per app | Overkill for learning; more release friction |

**Git worktree example (same repo, two paths):**

```bash
# From your main clone (e.g. C:\General\Samudra_Marketplace)
git worktree add C:\Work\Samudra_Marketplace-frontend feature/samudra-frontend-MVP
# Backend stays on C:\General\Samudra_Marketplace on feature/samudra-backend-MVP
```

IntelliJ opens `General`, VS Code opens `Work\Samudra_Marketplace-frontend` — **branch switches in one IDE do not affect the other**. No need to duplicate the whole tree.

You are **good** with the two-copy approach for now; consider worktrees when duplication annoys you.

---

## Spring Data repositories — MVP design (2026-06-04)

**Canonical backend path:** `C:\General\Samudra_Marketplace\Samudra-backend`

### What is a “repository” here?

Spring Data **`JpaRepository<Entity, UUID>`** interface — one per aggregate/table (mostly).  
Repositories are **only** used by **DAL impl** (Extranet pattern), not by services directly.

```text
Service → DAL → DALImpl → Repository → PostgreSQL
```

**Package rule:** `com.samudra.<module>.repository`  
**Scan:** declared in `SamudraJpaConfig` (`samudra-core`) — add each new package there.

---

### How many repositories? (full schema vs MVP)

Flyway `V1__init_schema.sql` defines **14 tables** (footer in SQL file says 18 — ignore; `listing_promotions`, `reports`, `follows`, auction tables are **not** in V1).

| Module | Table | Entity (exists?) | Repository | MVP priority |
|--------|-------|------------------|------------|--------------|
| **samudra-identity** | `users` | Yes | `UserRepository` | **P0** — fix ID type (see below) |
| | `auth_tokens` | Yes | `AuthTokenRepository` | P2 (A&A later) |
| | `marketplace_profiles` | Yes | `MarketplaceProfileRepository` | P1 — seller profile / public card |
| **samudra-listing** | `categories` | Yes | `CategoryRepository` | P1 — category strip / filters |
| | `listings` | Yes | `ListingRepository` | **P0** — feed + detail |
| | `listing_images` | Yes | `ListingImageRepository` | P1 — detail gallery |
| | `listing_attributes` | Yes | `ListingAttributeRepository` | P2 — detail specs |
| **samudra-community** | `communities` | Yes | `CommunityRepository` | **P0** — list / detail / create |
| | `community_members` | Yes | `CommunityMemberRepository` | **P0** — join / “your communities” |
| | `community_listings` | Yes | `CommunityListingRepository` | P1 — link listing ↔ community |
| | `community_rules` | Yes | `CommunityRuleRepository` | P2 — rules tab |
| | `reviews` | Yes | `ReviewRepository` | P2 — profile reviews |
| **samudra-messaging** | `conversations` | Yes | `ConversationRepository` | P1 — chat inbox |
| | `messages` | Yes | `MessageRepository` | P1 — chat thread |

**MVP repo count:** create **8 now** (P0 + core P1), add **6 later** (P2).

| Phase | Count | Repositories |
|-------|-------|----------------|
| **Now (MVP slice 1–2)** | **8** | `User`, `Listing`, `Category`, `Community`, `CommunityMember`, `MarketplaceProfile`, `Conversation`, `Message` |
| **Next** | +3 | `ListingImage`, `CommunityListing`, `CommunityRule` |
| **Later (A&A / trust)** | +3 | `AuthToken`, `ListingAttribute`, `Review` |

**Why one repo per table (mostly)?**

- Matches Extranet (`ContractRepository`, `DocumentRepository`, …).
- Spring Data generates `save`, `findById`, query methods for free.
- DAL stays thin: compose multiple repos when one use-case needs joins.

**When not to add a repo yet:** table exists but **no API** in this sprint (e.g. `auth_tokens` until JWT).

---

### Fix before creating more repos

`UserRepository` currently extends `JpaRepository<User, Long>` but `BaseEntity.id` is **`UUID`**. Change to:

```java
public interface UserRepository extends JpaRepository<User, UUID> { ... }
```

All new repositories: **`JpaRepository<Ent, UUID>`**.

---

### `SamudraJpaConfig` — keep in sync

Today:

```java
@EntityScan: identity, community, listing
@EnableJpaRepositories: identity, community, listing
```

**Messaging entities exist** but messaging is **not** scanned. When you add messaging repos:

```java
"com.samudra.messaging.entity"
"com.samudra.messaging.repository"
```

Enable JPA auditing on `SamudraCoreApplication` if not already (`@EnableJpaAuditing`) so `createdAt` / `updatedAt` populate.

---

## Step-by-step — create repositories for MVP

Work in **`C:\General\Samudra_Marketplace\Samudra-backend`**. Branch: your backend feature branch.

### Step 0 — Preconditions

- [ ] `./gradlew clean build` passes  
- [ ] Flyway V1 applied to local PostgreSQL  
- [ ] Fix `UserRepository` → `UUID`  

### Step 1 — `samudra-listing` (highest priority — feeds frontend)

Create package: `samudra-listing/src/main/java/com/samudra/listing/repository/`

| File | Extends | Starter query methods (add as needed) |
|------|---------|--------------------------------------|
| `ListingRepository.java` | `JpaRepository<Listing, UUID>` | `Page<Listing> findByStatusAndCityOrderByCreatedAtDesc(ListingStatus status, String city, Pageable page)`; `Optional<Listing> findByIdAndStatus(UUID id, ListingStatus status)` |
| `CategoryRepository.java` | `JpaRepository<Category, UUID>` | `List<Category> findByIsActiveTrueOrderByDisplayOrderAsc()`; `Optional<Category> findBySlug(String slug)` |

Optional same sprint:

| `ListingImageRepository.java` | `List<ListingImage> findByListingIdOrderByDisplayOrderAsc(UUID listingId)` |

**Do not** put business logic in repositories — only persistence queries.

### Step 2 — `samudra-community`

Package: `com.samudra.community.repository`

| File | Starter methods |
|------|-----------------|
| `CommunityRepository.java` | `Page<Community> findByStatusAndCity(...)`; `Optional<Community> findBySlug(String slug)`; `boolean existsBySlug(String slug)` |
| `CommunityMemberRepository.java` | `Optional<CommunityMember> findByCommunityIdAndUserId(UUID, UUID)`; `List<CommunityMember> findByUserIdAndStatus(...)`; `boolean existsByCommunityIdAndUserId(...)` |

### Step 3 — `samudra-identity`

Package: `com.samudra.identity.repository`

| File | Starter methods |
|------|-----------------|
| `UserRepository.java` | **Fix UUID**; keep `findByEmail`, `existsByEmail` |
| `MarketplaceProfileRepository.java` | `Optional<MarketplaceProfile> findByUserId(UUID userId)` |

### Step 4 — `samudra-messaging`

1. Update `SamudraJpaConfig` with messaging packages.  
2. Package: `com.samudra.messaging.repository`

| File | Starter methods |
|------|-----------------|
| `ConversationRepository.java` | `List<Conversation> findByBuyerIdOrderByLastMessageAtDesc(UUID buyerId)`; `findBySellerIdOrderByLastMessageAtDesc`; `Optional<Conversation> findByListingIdAndBuyerId(UUID listingId, UUID buyerId)` |
| `MessageRepository.java` | `List<Message> findByConversationIdOrderByCreatedAtAsc(UUID conversationId)` |

### Step 5 — Verify

```bash
cd C:\General\Samudra_Marketplace\Samudra-backend
gradlew.bat clean build
gradlew.bat :samudra-core:bootRun
```

Spring should log repository beans registered (no “failed to create repository” errors).

### Step 6 — What comes **after** repositories (do not skip order)

1. **DAL interface + DALImpl** per module (wrap repos).  
2. **DTOs** from `docs/lld/03-api-mvp.md` + frontend shapes.  
3. **Mapper** entity ↔ DTO.  
4. **Service** (transactional).  
5. **Controller** in `samudra-core` under `/v1/...`.

---

## Repository naming conventions

| Rule | Example |
|------|---------|
| Interface name | `{Entity}Repository` |
| ID type | Always `UUID` |
| Annotation | `@Repository` optional on interface (Spring Data picks it up via `@EnableJpaRepositories`) |
| Custom queries | Prefer method names; use `@Query` only when necessary |
| Pagination | `Page<T>` + `Pageable` for feeds (“see more” = `page++`) |
| Soft delete | Entities use `deletedAt` — queries should filter `deletedAt is null` (method name or `@Query`) |

---

## Module → repository checklist (copy into PR description)

```text
samudra-identity
  [x] UserRepository (fix UUID)
  [ ] MarketplaceProfileRepository
  [ ] AuthTokenRepository — deferred

samudra-listing
  [ ] ListingRepository
  [ ] CategoryRepository
  [ ] ListingImageRepository
  [ ] ListingAttributeRepository — deferred

samudra-community
  [ ] CommunityRepository
  [ ] CommunityMemberRepository
  [ ] CommunityListingRepository
  [ ] CommunityRuleRepository — deferred
  [ ] ReviewRepository — deferred

samudra-messaging
  [ ] SamudraJpaConfig updated
  [ ] ConversationRepository
  [ ] MessageRepository
```

---

## Decision (2026-06-04)

| Decision | Rationale |
|----------|-----------|
| 8 repositories for MVP P0/P1 | Covers listing feed, community, chat inbox, profile stub |
| Repositories only behind DAL | Matches Extranet; keeps services testable |
| General path = backend source of truth | Work copy avoids Work-path stale tree |
| Consider git worktree later | Same repo, two branches, two folders, less duplication than full copy |
