-- Remove duplicate saved interests (keep oldest row per user + search fingerprint)
DELETE FROM user_interests a
    USING user_interests b
WHERE a.id > b.id
  AND a.user_id = b.user_id
  AND lower(a.city) = lower(b.city)
  AND COALESCE(lower(a.keywords), '') = COALESCE(lower(b.keywords), '')
  AND COALESCE(a.category_type, '') = COALESCE(b.category_type, '')
  AND COALESCE(a.listing_type, '') = COALESCE(b.listing_type, '')
  AND COALESCE(lower(a.custom_tag), '') = COALESCE(lower(b.custom_tag), '');

CREATE UNIQUE INDEX uq_user_interests_fingerprint ON user_interests (
    user_id,
    lower(city),
    COALESCE(lower(keywords), ''),
    COALESCE(category_type, ''),
    COALESCE(listing_type, ''),
    COALESCE(lower(custom_tag), '')
);

CREATE TABLE listing_alert_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL,
    listing_title VARCHAR(500) NOT NULL,
    listing_city VARCHAR(100) NOT NULL,
    delivered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_listing_alert_per_user UNIQUE (user_id, listing_id)
);

CREATE INDEX idx_listing_alert_notifications_user_delivered
    ON listing_alert_notifications (user_id, delivered_at DESC);
