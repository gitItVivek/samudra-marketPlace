-- =============================================================================
-- Samudra Marketplace — V5__auction_and_categories.sql
-- Auction columns on listings, bids table, seed root categories.
-- =============================================================================

ALTER TABLE listings
    ADD COLUMN sale_type           VARCHAR(20)   NOT NULL DEFAULT 'FIXED_PRICE',
    ADD COLUMN starting_price      NUMERIC(12,2) NULL,
    ADD COLUMN auction_ends_at     TIMESTAMP     NULL,
    ADD COLUMN current_bid_amount  NUMERIC(12,2) NULL,
    ADD COLUMN current_bid_id      UUID          NULL,
    ADD COLUMN seller_bids_seen_at TIMESTAMP     NULL;

CREATE INDEX idx_listings_auction_scheduler
    ON listings (sale_type, status, auction_ends_at)
    WHERE deleted_at IS NULL;

CREATE TABLE bids (
    id          UUID          NOT NULL DEFAULT gen_random_uuid(),
    listing_id  UUID          NOT NULL,
    bidder_id   UUID          NOT NULL,
    amount      NUMERIC(12,2) NOT NULL,
    created_at  TIMESTAMP     NOT NULL DEFAULT now(),

    CONSTRAINT pk_bids PRIMARY KEY (id)
);

CREATE INDEX idx_bids_listing_created
    ON bids (listing_id, created_at DESC);

CREATE INDEX idx_bids_bidder_id
    ON bids (bidder_id);

-- Seed one default category per CategoryType (stable UUIDs for idempotent re-run guard)
INSERT INTO categories (id, name, slug, description, category_type, display_order, is_active, created_at, updated_at)
VALUES
    ('11111111-1111-1111-1111-111111111101', 'Electronics', 'electronics', 'Electronics and gadgets', 'ELECTRONICS', 1, true, now(), now()),
    ('11111111-1111-1111-1111-111111111102', 'Vehicles', 'vehicles', 'Cars, bikes, and vehicles', 'VEHICLES', 2, true, now(), now()),
    ('11111111-1111-1111-1111-111111111103', 'Property', 'property', 'Property listings', 'PROPERTY', 3, true, now(), now()),
    ('11111111-1111-1111-1111-111111111104', 'Furniture & Home', 'furniture-home', 'Furniture and home items', 'FURNITURE_HOME', 4, true, now(), now()),
    ('11111111-1111-1111-1111-111111111105', 'Fashion', 'fashion', 'Clothing and fashion', 'FASHION', 5, true, now(), now()),
    ('11111111-1111-1111-1111-111111111106', 'Books & Media', 'books-media', 'Books and media', 'BOOKS_MEDIA', 6, true, now(), now()),
    ('11111111-1111-1111-1111-111111111107', 'Sports & Fitness', 'sports-fitness', 'Sports and fitness gear', 'SPORTS_FITNESS', 7, true, now(), now()),
    ('11111111-1111-1111-1111-111111111108', 'Services', 'services', 'Services offered', 'SERVICES', 8, true, now(), now()),
    ('11111111-1111-1111-1111-111111111109', 'Jobs', 'jobs', 'Job listings', 'JOBS', 9, true, now(), now()),
    ('11111111-1111-1111-1111-111111111110', 'Pets', 'pets', 'Pets and pet supplies', 'PETS', 10, true, now(), now()),
    ('11111111-1111-1111-1111-111111111111', 'Agriculture', 'agriculture', 'Agriculture and farming', 'AGRICULTURE', 11, true, now(), now()),
    ('11111111-1111-1111-1111-111111111112', 'Other', 'other', 'Other categories', 'OTHER', 12, true, now(), now())
ON CONFLICT (slug) DO NOTHING;
