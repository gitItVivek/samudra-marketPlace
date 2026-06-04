-- =============================================================================
-- Samudra Marketplace — V1__init_schema.sql
-- Full initial schema migration
-- Modules: identity, listing, community, messaging, auction
-- Convention:
--   - All PKs are UUID
--   - Cross-module references are logical UUIDs (no FK constraints)
--   - Within-module references use real FK constraints
--   - Enums stored as VARCHAR(30) — enforced at application layer
--   - Timestamps in UTC using TIMESTAMP (maps to Instant in Java)
--   - Soft delete via deleted_at only where recovery is needed
--   - Optimistic locking via version BIGINT on all entities
-- =============================================================================


-- =============================================================================
-- EXTENSIONS
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- for gen_random_uuid() if needed


-- =============================================================================
-- MODULE: samudra-identity
-- Tables: users, auth_tokens, marketplace_profiles
-- =============================================================================

CREATE TABLE users (
                       id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                       email           VARCHAR(255)  NULL,
                       phone           VARCHAR(15)   NULL,
                       password_hash   VARCHAR(255)  NULL,
                       google_id       VARCHAR(255)  NULL,
                       facebook_id     VARCHAR(255)  NULL,
                       display_name    VARCHAR(100)  NOT NULL,
                       status          VARCHAR(30)   NOT NULL DEFAULT 'ACTIVE',
                       role            VARCHAR(30)   NOT NULL DEFAULT 'USER',
                       is_verified     BOOLEAN       NOT NULL DEFAULT false,
                       created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                       updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                       deleted_at      TIMESTAMP     NULL,
                       version         BIGINT        NOT NULL DEFAULT 0,

                       CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE UNIQUE INDEX idx_users_email
    ON users(email) WHERE email IS NOT NULL;

CREATE UNIQUE INDEX idx_users_phone
    ON users(phone) WHERE phone IS NOT NULL;

CREATE UNIQUE INDEX idx_users_google_id
    ON users(google_id) WHERE google_id IS NOT NULL;

CREATE UNIQUE INDEX idx_users_facebook_id
    ON users(facebook_id) WHERE facebook_id IS NOT NULL;

CREATE INDEX idx_users_status
    ON users(status);

-- -----------------------------------------------------------------------------

CREATE TABLE auth_tokens (
                             id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                             user_id         UUID          NOT NULL,
                             token_hash      VARCHAR(255)  NOT NULL,
                             device_info     VARCHAR(255)  NULL,
                             ip_address      VARCHAR(45)   NULL,
                             expires_at      TIMESTAMP     NOT NULL,
                             revoked_at      TIMESTAMP     NULL,
                             created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                             updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                             version         BIGINT        NOT NULL DEFAULT 0,

                             CONSTRAINT pk_auth_tokens PRIMARY KEY (id)
    -- user_id: logical ref to users.id — no FK constraint (cross-module pattern)
);

CREATE INDEX idx_auth_tokens_user_id
    ON auth_tokens(user_id);

CREATE INDEX idx_auth_tokens_token_hash
    ON auth_tokens(token_hash);

-- -----------------------------------------------------------------------------

CREATE TABLE marketplace_profiles (
                                      id                      UUID          NOT NULL DEFAULT gen_random_uuid(),
                                      user_id                 UUID          NOT NULL,
                                      bio                     TEXT          NULL,
                                      avatar_url              VARCHAR(500)  NULL,
                                      city                    VARCHAR(100)  NULL,
                                      state                   VARCHAR(100)  NULL,
                                      avg_rating              NUMERIC(3,2)  NOT NULL DEFAULT 0.00,
                                      total_reviews           INT           NOT NULL DEFAULT 0,
                                      total_listings          INT           NOT NULL DEFAULT 0,
                                      total_sold              INT           NOT NULL DEFAULT 0,
                                      total_removed           INT           NOT NULL DEFAULT 0,
                                      response_time_minutes   INT           NULL,
                                      last_active_at          TIMESTAMP     NULL,
                                      is_profile_public       BOOLEAN       NOT NULL DEFAULT true,
                                      created_at              TIMESTAMP     NOT NULL DEFAULT now(),
                                      updated_at              TIMESTAMP     NOT NULL DEFAULT now(),
                                      deleted_at              TIMESTAMP     NULL,
                                      version                 BIGINT        NOT NULL DEFAULT 0,

                                      CONSTRAINT pk_marketplace_profiles PRIMARY KEY (id)
    -- user_id: logical ref to users.id — no FK constraint (cross-module pattern)
);

CREATE UNIQUE INDEX idx_marketplace_profiles_user_id
    ON marketplace_profiles(user_id);

CREATE INDEX idx_marketplace_profiles_city
    ON marketplace_profiles(city);


-- =============================================================================
-- MODULE: samudra-listing
-- Tables: categories, listings, listing_images, listing_attributes,
--         listing_promotions
-- =============================================================================

CREATE TABLE categories (
                            id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                            name            VARCHAR(100)  NOT NULL,
                            slug            VARCHAR(100)  NOT NULL,
                            description     TEXT          NULL,
                            category_type   VARCHAR(30)   NOT NULL,
                            parent_id       UUID          NULL,
                            icon_url        VARCHAR(500)  NULL,
                            display_order   INT           NOT NULL DEFAULT 0,
                            is_active       BOOLEAN       NOT NULL DEFAULT true,
                            created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                            updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                            version         BIGINT        NOT NULL DEFAULT 0,

                            CONSTRAINT pk_categories PRIMARY KEY (id),
                            CONSTRAINT fk_categories_parent
                                FOREIGN KEY (parent_id) REFERENCES categories(id)
);

CREATE UNIQUE INDEX idx_categories_slug
    ON categories(slug);

CREATE INDEX idx_categories_category_type
    ON categories(category_type);

CREATE INDEX idx_categories_parent_id
    ON categories(parent_id);

-- -----------------------------------------------------------------------------

CREATE TABLE listings (
                          id                  UUID          NOT NULL DEFAULT gen_random_uuid(),
                          user_id             UUID          NOT NULL,
                          category_id         UUID          NOT NULL,
                          category_type       VARCHAR(30)   NOT NULL,
                          title               VARCHAR(255)  NOT NULL,
                          description         TEXT          NULL,
                          listing_type        VARCHAR(30)   NOT NULL,
                          condition           VARCHAR(30)   NULL,
                          status              VARCHAR(30)   NOT NULL DEFAULT 'DRAFT',
                          price               NUMERIC(12,2) NULL,
                          currency            VARCHAR(5)    NOT NULL DEFAULT 'INR',
                          city                VARCHAR(100)  NOT NULL,
                          state               VARCHAR(100)  NOT NULL,
                          locality            VARCHAR(100)  NULL,
                          latitude            NUMERIC(10,7) NULL,
                          longitude           NUMERIC(10,7) NULL,
                          view_count          INT           NOT NULL DEFAULT 0,
                          chat_count          INT           NOT NULL DEFAULT 0,
                          is_boosted          BOOLEAN       NOT NULL DEFAULT false,
                          boosted_until       TIMESTAMP     NULL,
                          expires_at          TIMESTAMP     NULL,
                          sold_at             TIMESTAMP     NULL,
                          removed_at          TIMESTAMP     NULL,
                          taken_down_at       TIMESTAMP     NULL,
                          taken_down_reason   TEXT          NULL,
                          created_at          TIMESTAMP     NOT NULL DEFAULT now(),
                          updated_at          TIMESTAMP     NOT NULL DEFAULT now(),
                          deleted_at          TIMESTAMP     NULL,
                          version             BIGINT        NOT NULL DEFAULT 0,

                          CONSTRAINT pk_listings PRIMARY KEY (id)
    -- user_id:    logical ref to users.id     — no FK (cross-module)
    -- category_id: logical ref to categories.id — no FK (cross-module)
);

CREATE INDEX idx_listings_user_id
    ON listings(user_id);

CREATE INDEX idx_listings_category_id
    ON listings(category_id);

CREATE INDEX idx_listings_category_type
    ON listings(category_type);

CREATE INDEX idx_listings_status
    ON listings(status);

CREATE INDEX idx_listings_city_status
    ON listings(city, status);

CREATE INDEX idx_listings_listing_type
    ON listings(listing_type);

CREATE INDEX idx_listings_price
    ON listings(price);

CREATE INDEX idx_listings_created_at
    ON listings(created_at DESC);

CREATE INDEX idx_listings_boosted
    ON listings(is_boosted, boosted_until)
    WHERE is_boosted = true;

-- -----------------------------------------------------------------------------

CREATE TABLE listing_images (
                                id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                                listing_id      UUID          NOT NULL,
                                url             VARCHAR(500)  NOT NULL,
                                display_order   INT           NOT NULL DEFAULT 0,
                                is_cover        BOOLEAN       NOT NULL DEFAULT false,
                                width           INT           NULL,
                                height          INT           NULL,
                                size_bytes      INT           NULL,
                                created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                version         BIGINT        NOT NULL DEFAULT 0,

                                CONSTRAINT pk_listing_images PRIMARY KEY (id),
                                CONSTRAINT fk_listing_images_listing
                                    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

CREATE INDEX idx_listing_images_listing_id
    ON listing_images(listing_id);

CREATE INDEX idx_listing_images_cover
    ON listing_images(listing_id, is_cover)
    WHERE is_cover = true;

-- -----------------------------------------------------------------------------

CREATE TABLE listing_attributes (
                                    id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                                    listing_id      UUID          NOT NULL,
                                    attribute_key   VARCHAR(100)  NOT NULL,
                                    attribute_value VARCHAR(500)  NOT NULL,
                                    display_label   VARCHAR(100)  NULL,
                                    display_order   INT           NOT NULL DEFAULT 0,
                                    created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                    updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                    version         BIGINT        NOT NULL DEFAULT 0,

                                    CONSTRAINT pk_listing_attributes PRIMARY KEY (id),
                                    CONSTRAINT fk_listing_attributes_listing
                                        FOREIGN KEY (listing_id) REFERENCES listings(id)
);

CREATE INDEX idx_listing_attributes_listing_id
    ON listing_attributes(listing_id);

CREATE INDEX idx_listing_attributes_key
    ON listing_attributes(listing_id, attribute_key);

-- -----------------------------------------------------------------------------




-- =============================================================================
-- MODULE: samudra-community
-- Tables: communities, community_members, community_listings, community_rules,
--         reviews, reports, follows
-- =============================================================================

CREATE TABLE communities (
                             id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                             created_by      UUID          NOT NULL,
                             name            VARCHAR(150)  NOT NULL,
                             slug            VARCHAR(150)  NOT NULL,
                             description     TEXT          NULL,
                             category_type   VARCHAR(30)   NOT NULL,
                             city            VARCHAR(100)  NOT NULL,
                             state           VARCHAR(100)  NOT NULL,
                             cover_image_url VARCHAR(500)  NULL,
                             status          VARCHAR(30)   NOT NULL DEFAULT 'ACTIVE',
                             is_private      BOOLEAN       NOT NULL DEFAULT false,
                             member_count    INT           NOT NULL DEFAULT 0,
                             listing_count   INT           NOT NULL DEFAULT 0,
                             created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                             updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                             deleted_at      TIMESTAMP     NULL,
                             version         BIGINT        NOT NULL DEFAULT 0,

                             CONSTRAINT pk_communities PRIMARY KEY (id)
    -- created_by: logical ref to users.id — no FK (cross-module)
);

CREATE UNIQUE INDEX idx_communities_slug
    ON communities(slug);

CREATE INDEX idx_communities_category_type
    ON communities(category_type);

CREATE INDEX idx_communities_city
    ON communities(city);

CREATE INDEX idx_communities_city_category
    ON communities(city, category_type);

CREATE INDEX idx_communities_created_by
    ON communities(created_by);

CREATE INDEX idx_communities_status
    ON communities(status)
    WHERE status = 'ACTIVE';

-- -----------------------------------------------------------------------------

CREATE TABLE community_members (
                                   id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                                   community_id    UUID          NOT NULL,
                                   user_id         UUID          NOT NULL,
                                   role            VARCHAR(30)   NOT NULL DEFAULT 'MEMBER',
                                   status          VARCHAR(30)   NOT NULL DEFAULT 'ACTIVE',
                                   joined_at       TIMESTAMP     NOT NULL DEFAULT now(),
                                   banned_at       TIMESTAMP     NULL,
                                   ban_reason      TEXT          NULL,
                                   created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                   updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                   version         BIGINT        NOT NULL DEFAULT 0,

                                   CONSTRAINT pk_community_members PRIMARY KEY (id),
                                   CONSTRAINT fk_community_members_community
                                       FOREIGN KEY (community_id) REFERENCES communities(id),
                                   CONSTRAINT uq_community_members_community_user
                                       UNIQUE (community_id, user_id)
    -- user_id: logical ref to users.id — no FK (cross-module)
);

CREATE INDEX idx_community_members_community_id
    ON community_members(community_id);

CREATE INDEX idx_community_members_user_id
    ON community_members(user_id);

CREATE INDEX idx_community_members_role
    ON community_members(community_id, role);

-- -----------------------------------------------------------------------------

CREATE TABLE community_listings (
                                    id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                                    community_id    UUID          NOT NULL,
                                    listing_id      UUID          NOT NULL,
                                    posted_by       UUID          NOT NULL,
                                    is_approved     BOOLEAN       NOT NULL DEFAULT true,
                                    approved_at     TIMESTAMP     NULL,
                                    approved_by     UUID          NULL,
                                    created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                    updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                    version         BIGINT        NOT NULL DEFAULT 0,

                                    CONSTRAINT pk_community_listings PRIMARY KEY (id),
                                    CONSTRAINT fk_community_listings_community
                                        FOREIGN KEY (community_id) REFERENCES communities(id),
                                    CONSTRAINT uq_community_listings_community_listing
                                        UNIQUE (community_id, listing_id)
    -- listing_id:  logical ref to listings.id — no FK (cross-module)
    -- posted_by:   logical ref to users.id    — no FK (cross-module)
    -- approved_by: logical ref to users.id    — no FK (cross-module)
);

CREATE INDEX idx_community_listings_community_id
    ON community_listings(community_id);

CREATE INDEX idx_community_listings_listing_id
    ON community_listings(listing_id);

CREATE INDEX idx_community_listings_posted_by
    ON community_listings(posted_by);

-- -----------------------------------------------------------------------------

CREATE TABLE community_rules (
                                 id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                                 community_id    UUID          NOT NULL,
                                 rule_text       TEXT          NOT NULL,
                                 display_order   INT           NOT NULL DEFAULT 0,
                                 created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                 updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                                 version         BIGINT        NOT NULL DEFAULT 0,

                                 CONSTRAINT pk_community_rules PRIMARY KEY (id),
                                 CONSTRAINT fk_community_rules_community
                                     FOREIGN KEY (community_id) REFERENCES communities(id)
);

CREATE INDEX idx_community_rules_community_id
    ON community_rules(community_id);

-- -----------------------------------------------------------------------------

CREATE TABLE reviews (
                         id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                         reviewer_id     UUID          NOT NULL,
                         target_user_id  UUID          NOT NULL,
                         listing_id      UUID          NULL,
                         rating          INT           NOT NULL,
                         comment         TEXT          NULL,
                         created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                         updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                         version         BIGINT        NOT NULL DEFAULT 0,

                         CONSTRAINT pk_reviews PRIMARY KEY (id),
                         CONSTRAINT uq_reviews_reviewer_listing
                             UNIQUE (reviewer_id, listing_id),
                         CONSTRAINT chk_reviews_rating
                             CHECK (rating >= 1 AND rating <= 5)
    -- reviewer_id:    logical ref to users.id    — no FK (cross-module)
    -- target_user_id: logical ref to users.id    — no FK (cross-module)
    -- listing_id:     logical ref to listings.id — no FK (cross-module)
);

CREATE INDEX idx_reviews_reviewer_id
    ON reviews(reviewer_id);

CREATE INDEX idx_reviews_target_user_id
    ON reviews(target_user_id);

CREATE INDEX idx_reviews_listing_id
    ON reviews(listing_id);


-- =============================================================================
-- MODULE: samudra-messaging
-- Tables: conversations, messages
-- =============================================================================

CREATE TABLE conversations (
                               id                  UUID          NOT NULL DEFAULT gen_random_uuid(),
                               listing_id          UUID          NOT NULL,
                               buyer_id            UUID          NOT NULL,
                               seller_id           UUID          NOT NULL,
                               status              VARCHAR(30)   NOT NULL DEFAULT 'ACTIVE',
                               last_message_at     TIMESTAMP     NULL,
                               last_message_text   VARCHAR(255)  NULL,
                               buyer_unread_count  INT           NOT NULL DEFAULT 0,
                               seller_unread_count INT           NOT NULL DEFAULT 0,
                               created_at          TIMESTAMP     NOT NULL DEFAULT now(),
                               updated_at          TIMESTAMP     NOT NULL DEFAULT now(),
                               version             BIGINT        NOT NULL DEFAULT 0,

                               CONSTRAINT pk_conversations PRIMARY KEY (id),
                               CONSTRAINT uq_conversations_listing_buyer
                                   UNIQUE (listing_id, buyer_id)
    -- listing_id: logical ref to listings.id — no FK (cross-module)
    -- buyer_id:   logical ref to users.id    — no FK (cross-module)
    -- seller_id:  logical ref to users.id    — no FK (cross-module)
);

CREATE INDEX idx_conversations_listing_id
    ON conversations(listing_id);

CREATE INDEX idx_conversations_buyer_id
    ON conversations(buyer_id);

CREATE INDEX idx_conversations_seller_id
    ON conversations(seller_id);

CREATE INDEX idx_conversations_last_message_at
    ON conversations(last_message_at DESC);

CREATE INDEX idx_conversations_buyer_list
    ON conversations(buyer_id, last_message_at DESC);

CREATE INDEX idx_conversations_seller_list
    ON conversations(seller_id, last_message_at DESC);

-- -----------------------------------------------------------------------------

CREATE TABLE messages (
                          id              UUID          NOT NULL DEFAULT gen_random_uuid(),
                          conversation_id UUID          NOT NULL,
                          sender_id       UUID          NOT NULL,
                          message_type    VARCHAR(30)   NOT NULL DEFAULT 'TEXT',
                          content         TEXT          NULL,
                          image_url       VARCHAR(500)  NULL,
                          offer_amount    NUMERIC(12,2) NULL,
                          is_read         BOOLEAN       NOT NULL DEFAULT false,
                          read_at         TIMESTAMP     NULL,
                          created_at      TIMESTAMP     NOT NULL DEFAULT now(),
                          updated_at      TIMESTAMP     NOT NULL DEFAULT now(),
                          version         BIGINT        NOT NULL DEFAULT 0,

                          CONSTRAINT pk_messages PRIMARY KEY (id),
                          CONSTRAINT fk_messages_conversation
                              FOREIGN KEY (conversation_id) REFERENCES conversations(id)
    -- sender_id: logical ref to users.id — no FK (cross-module)
);

CREATE INDEX idx_messages_conversation_id
    ON messages(conversation_id);

CREATE INDEX idx_messages_conversation_created
    ON messages(conversation_id, created_at ASC);

CREATE INDEX idx_messages_sender_id
    ON messages(sender_id);

CREATE INDEX idx_messages_unread
    ON messages(conversation_id, is_read)
    WHERE is_read = false;



-- =============================================================================
-- END OF V1__init_schema.sql
-- Total tables  : 18
-- Total indexes : 57
-- Modules covered: identity (3), listing (5), community (7), messaging (2),
--                  auction (2) + pgcrypto extension
-- =============================================================================

