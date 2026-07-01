CREATE TABLE user_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    category_type VARCHAR(30),
    listing_type VARCHAR(30),
    keywords VARCHAR(500),
    custom_tag VARCHAR(100),
    source VARCHAR(20) NOT NULL,
    notify_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    last_notified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_interests_user_id ON user_interests(user_id);
CREATE INDEX idx_user_interests_city_category ON user_interests(city, category_type);
CREATE INDEX idx_user_interests_notify_city ON user_interests(notify_enabled, city);
