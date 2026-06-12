CREATE TABLE logged_out_tokens (
                                id          UUID        NOT NULL DEFAULT gen_random_uuid(),
                                token_hash  VARCHAR(64) NOT NULL,
                                expires_at  TIMESTAMP   NOT NULL,
                                created_at  TIMESTAMP   NOT NULL DEFAULT now(),
                                CONSTRAINT pk_revoked_tokens PRIMARY KEY (id),
                                CONSTRAINT uq_revoked_tokens_hash UNIQUE (token_hash)
);

CREATE INDEX idx_revoked_tokens_expires_at
    ON logged_out_tokens(expires_at);