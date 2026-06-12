-- =============================================================================
-- Samudra Marketplace — V2__verification_challenges.sql
-- Email OTP verification (V1 scope: EMAIL only)
-- =============================================================================

CREATE TABLE verification_challenges (
                                         id                  UUID          NOT NULL DEFAULT gen_random_uuid(),
                                         user_id             UUID          NOT NULL,
                                         verification_type   VARCHAR(30)   NOT NULL,   -- EMAIL (use VerificationType enum)
                                         target              VARCHAR(255)  NOT NULL,   -- normalized email address
                                         otp_hash            VARCHAR(255)  NOT NULL,     -- BCrypt hash of 6-digit code
                                         status              VARCHAR(30)   NOT NULL DEFAULT 'PENDING',
                                         attempt_count       INT           NOT NULL DEFAULT 0,
                                         expires_at          TIMESTAMP     NOT NULL,
                                         verified_at         TIMESTAMP     NULL,
                                         created_at          TIMESTAMP     NOT NULL DEFAULT now(),
                                         updated_at          TIMESTAMP     NOT NULL DEFAULT now(),
                                         version             BIGINT        NOT NULL DEFAULT 0,

                                         CONSTRAINT pk_verification_challenges PRIMARY KEY (id)
    -- user_id: logical ref to users.id — no FK (cross-module pattern)
);

CREATE INDEX idx_verification_challenges_user_id
    ON verification_challenges(user_id);

CREATE INDEX idx_verification_challenges_target_status
    ON verification_challenges(target, verification_type, status);

CREATE INDEX idx_verification_challenges_user_pending
    ON verification_challenges(user_id, status)
    WHERE status = 'PENDING';