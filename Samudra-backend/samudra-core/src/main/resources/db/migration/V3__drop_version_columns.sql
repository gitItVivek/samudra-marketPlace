-- =============================================================================
-- Samudra Marketplace — V3__drop_version_columns.sql
-- Remove optimistic-locking version column from all tables (not used in app).
-- =============================================================================

ALTER TABLE users DROP COLUMN IF EXISTS version;
ALTER TABLE auth_tokens DROP COLUMN IF EXISTS version;
ALTER TABLE marketplace_profiles DROP COLUMN IF EXISTS version;
ALTER TABLE categories DROP COLUMN IF EXISTS version;
ALTER TABLE listings DROP COLUMN IF EXISTS version;
ALTER TABLE listing_images DROP COLUMN IF EXISTS version;
ALTER TABLE listing_attributes DROP COLUMN IF EXISTS version;
ALTER TABLE communities DROP COLUMN IF EXISTS version;
ALTER TABLE community_members DROP COLUMN IF EXISTS version;
ALTER TABLE community_listings DROP COLUMN IF EXISTS version;
ALTER TABLE community_rules DROP COLUMN IF EXISTS version;
ALTER TABLE reviews DROP COLUMN IF EXISTS version;
ALTER TABLE conversations DROP COLUMN IF EXISTS version;
ALTER TABLE messages DROP COLUMN IF EXISTS version;
ALTER TABLE verification_challenges DROP COLUMN IF EXISTS version;
