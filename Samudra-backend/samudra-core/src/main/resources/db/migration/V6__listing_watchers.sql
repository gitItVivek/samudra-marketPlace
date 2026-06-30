CREATE TABLE listing_watchers (
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (listing_id, user_id)
);

CREATE INDEX idx_listing_watchers_listing_id ON listing_watchers(listing_id);
