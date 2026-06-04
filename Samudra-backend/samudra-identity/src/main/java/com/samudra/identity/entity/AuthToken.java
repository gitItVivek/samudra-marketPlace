package com.samudra.identity.entity;

import com.samudra.common.config.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "auth_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthToken extends BaseEntity {

    // logical reference to users.id — no FK constraint (cross-module)
    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String tokenHash;

    @Column(length = 255)
    private String deviceInfo;

    @Column(length = 45)
    private String ipAddress;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column
    private Instant revokedAt;
}
